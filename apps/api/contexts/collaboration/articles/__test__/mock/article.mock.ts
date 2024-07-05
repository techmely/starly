export const MOCK_ARTICLES = [
    {
        "id": 13,
        "title": "Go: Exploring new loop semantics",
        "content": "<p></p><img src=\"https://lh3.googleusercontent.com/6fGFtMFBLGzWaECR4LcRZggeu8vWx7XHCsSuVj5dSEEpRmfCHl6PGZEuS4PXke1pcjCtvZ5YWTVIsW29YBjrg4agVabZXM3v0U_HNkuER7-D?publiz-file-id=20\" data-width=\"1024\" data-height=\"1024\" data-blur-hash=\"\" alt=\"Golang Market Store – GolangMarket Gopher Store\" data-file-name=\"IMG_1994.JPG?v=1538235558&amp;width=1445\" data-file-size=\"104547\"><p><br>Go 1.22 has just been released with a bunch of new features and improvements. In this article, we will explore the new loop semantics and how they can be used to write more expressive and readable code.</p><h2>1. Loop variable is no longer be shared between iterations</h2><p>Previously, the loop variable was shared between iterations, from go 1.21 (experimental) and now with go 1.22, the loop variable is created anew with each iteration, effectively eliminating one of the most common foot gun in Go (for both experienced and new gophers). This is no longer needed:</p><pre><code class=\"language-go\">for i := 0; i &lt; 10; i++ {\n    i := i\n    go func () {\n        fmt.Println(i)\n    }()\n}\n</code></pre><p>or this</p><pre><code class=\"language-go\">for i := 0; i &lt; 10; i++ {\n    go func (i int) {\n        fmt.Println(i)\n    }(i)\n}\n</code></pre><p>now you can do the more intuitive way:</p><pre><code class=\"language-go\">for i := 0; i &lt; 10; i++ {\n    go func () {\n        fmt.Println(i)\n    }()\n}\n</code></pre><h2>2. Range over an integer</h2><p>This feature is straightforward, instead of</p><pre><code class=\"language-go\">for i := 0; i &lt; 10; i++ {\n    fmt.Println(i)\n}\n</code></pre><p>now you can do</p><pre><code class=\"language-go\">for i := range 10 {\n    fmt.Println(i)\n}\n</code></pre><p>and achieve the same result, pretty neat, right?</p><h2>3. Range over a function</h2><p>For me, this is one of the most exciting updates to the Go language in a long time. Now Go have a standard way to handle iterator, which is a common pattern in other languages.<br>With preceding go versions, there wasn’t a standard way to iterate through a data structure, generic is not yet available in the language so, you couldn’t write a simple iterator for different data structures.</p><ul><li><p><code>bufio.Scanner</code> is an iterator through an <code>io.Reader</code>, where the <code>Scan</code> method advances to the next value. The value is returned by a <code>Bytes</code> method. Errors are collected and returned by an <code>Err</code> method.</p></li><li><p><code>database/sql.Rows</code> iterates through the results of a database query, where the <code>Next</code> method advances to the next row and the value is returned by a <code>Scan</code> method which can return an error.</p></li></ul><h3>Let’s have a look at the new loop semantics in action:</h3><p><strong><em>please note that despite this feature is available in go 1.22, it’s still experimental and may change in the future, plus you have to build your program using </em></strong><code>GOEXPERIMENT=rangefunc</code></p><pre><code class=\"language-go\">// iterate from 0 to 9\nIn10 := func(yield func(int) bool) {\n    for i := range 10 {\n        if !yield(i) {\n            return\n        }\n    }\n}\nfor v := range In10 {\n    fmt.Println(v) // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9\n}\n</code></pre><ul><li><p><code>In10</code> is a function that takes a function <code>yield</code> as an argument.</p></li><li><p>The <code>yield</code> function takes an integer and returns a boolean, whenever <code>In10</code> is used, the loop body will specify the <code>yield</code> function, and the <code>In10</code> function will call the <code>yield</code> function with the current value of the loop variable.</p></li><li><p>You can easily see that the yield function have a signature that return a bool but the loop body itself does not return anything, this is because inside the loop body, <code>continue</code> or nothing will be translated to <code>return true</code> and <code>break</code> will be translated to <code>return false</code>. Give the user the ability to control the iteration from the loop body.</p></li></ul><p>The compiler will change the for over function to something that looks like this:</p><pre><code class=\"language-go\">Int10(func(i int) bool {\n    fmt.Println(i)\n    return true\n})\n</code></pre><p><strong><em>this explanation is somewhat oversimplified, the actual implementation is more complex, you can find more about it </em></strong><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://go.googlesource.com/go/+/refs/changes/41/510541/7/src/cmd/compile/internal/rangefunc/rewrite.go\"><strong><em>here</em></strong></a><br>Besides the one parameter yield function mentioned above, functions that can be ranged over can have zero or two parameters, as long as they have the following signature:</p><pre><code class=\"language-go\">package iter\n\ntype Seq0 func(yield func() bool) bool\ntype Seq[V any] func(yield func(V) bool) bool\ntype Seq2[K, V any] func(yield func(K, V) bool) bool\n</code></pre><p><strong>More examples:</strong></p><pre><code class=\"language-go\">// iterate over a specific range with start and end value\nInRange := func(start, end int) func(yield func(int) bool) {\n    return func(yield func(int) bool) {\n        for i := start; i &lt; end; i++ {\n            if !yield(i) {\n                return\n            }\n        }\n    }\n}\n\nfor x := range InRange(5, 10) {\n    fmt.Println(x) // 5, 6, 7, 8, 9\n}\n</code></pre><pre><code class=\"language-go\">// iterate over words in a string separated by space\nWords := func(s string) func(yield func(int, string) bool) {\n    words := strings.Split(s, &quot; &quot;)\n    return func(yield func(int, string) bool) {\n        for i, word := range words {\n            if !yield(i, word) {\n                return\n            }\n        }\n    }\n}\n\nfor i, word := range Words(&quot;sun rises in the east&quot;) {\n    fmt.Println(i, word) // 0 sun 1 rises 2 in 3 the 4 east\n}\n</code></pre><p>usually, while using some polling based library, you have to write a loop like this:</p><pre><code class=\"language-go\">for {\n    m, err := reader.ReadMessage(context.Background()) \n    if err != nil {\n        // handle error\n        continue\n    }\n    // handle message\n}\t\t\n</code></pre><p>you can leverage the new loop semantics to write a more expressive message poller:</p><pre><code class=\"language-go\">ReaderIterator := func (reader Reader) func (func (Message, error) bool) {\n    return func (yield func (Message, error) bool) {\n        for {\n            m, err := reader.ReadMessage(context.Background())\n            if !yield(m, err) {\n                break\n            }\n        }\n    }\n}\n\nfor message err := range ReaderIterator(reader) {\n    if err != nil {\n        // handle error\n    }\n    // handle message\n}\n</code></pre><h3>Pull iterator</h3><p>All the examples above are push iterators, pushing values to the yield function. But that is not always the case in the real world, sometimes you want to pull values from the iterator.<br>The <code>Pull</code> function from <code>iter</code> package converse a <code>Seq</code>- standard push iterator to a pull iterator. Calling <code>Pull</code> will start an iteration and returns a pair of functions <code>next</code> and <code>stop</code>, which return the next value from the iterator and stop it, respectively.</p><pre><code class=\"language-go\">InRange := func(start, end int) func(yield func(int) bool) {\n    return func(yield func(int) bool) {\n        for i := start; i &lt; end; i++ {\n            if !yield(i) {\n                return\n            }\n        }\n    }\n}\nnext, stop := iter.Pull(InRange(5, 7))\ndefer stop()\nfor value, more := next(); more; value, more = next() {\n    fmt.Println(value) // 5, 6\n}\n</code></pre><p><strong>The new loop semantics surely is a great addition to the Go language as it opens the door for more idiomatic APIs with range functions.</strong></p><h2>References:</h2><ul><li><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://tip.golang.org/doc/go1.22\">Go 1.22 Release Notes</a></p></li><li><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/golang/go/issues/61405\">spec: add range over int, range over func</a></p></li><li><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/golang/go/issues/61897\">iter: new package for iterators</a></p></li><li><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://go.dev/wiki/RangefuncExperiment#what-will-idiomatic-apis-with-range-functions-look-like\">Go Wiki: Rangefunc Experiment</a></p></li></ul>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph"
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "Golang Market Store – GolangMarket Gopher Store",
                        "src": "https://lh3.googleusercontent.com/6fGFtMFBLGzWaECR4LcRZggeu8vWx7XHCsSuVj5dSEEpRmfCHl6PGZEuS4PXke1pcjCtvZ5YWTVIsW29YBjrg4agVabZXM3v0U_HNkuER7-D?publiz-file-id=20",
                        "width": 1024,
                        "height": 1024,
                        "blurHash": "",
                        "fileName": "IMG_1994.JPG?v=1538235558&width=1445",
                        "fileSize": "104547"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "hardBreak"
                        },
                        {
                            "text": "Go 1.22 has just been released with a bunch of new features and improvements. In this article, we will explore the new loop semantics and how they can be used to write more expressive and readable code.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "1. Loop variable is no longer be shared between iterations",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Previously, the loop variable was shared between iterations, from go 1.21 (experimental) and now with go 1.22, the loop variable is created anew with each iteration, effectively eliminating one of the most common foot gun in Go (for both experienced and new gophers). This is no longer needed:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "for i := 0; i < 10; i++ {\n    i := i\n    go func () {\n        fmt.Println(i)\n    }()\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "or this",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "for i := 0; i < 10; i++ {\n    go func (i int) {\n        fmt.Println(i)\n    }(i)\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "now you can do the more intuitive way:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "for i := 0; i < 10; i++ {\n    go func () {\n        fmt.Println(i)\n    }()\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "2. Range over an integer",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "This feature is straightforward, instead of",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "for i := 0; i < 10; i++ {\n    fmt.Println(i)\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "now you can do",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "for i := range 10 {\n    fmt.Println(i)\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "and achieve the same result, pretty neat, right?",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "3. Range over a function",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "For me, this is one of the most exciting updates to the Go language in a long time. Now Go have a standard way to handle iterator, which is a common pattern in other languages.",
                            "type": "text"
                        },
                        {
                            "type": "hardBreak"
                        },
                        {
                            "text": "With preceding go versions, there wasn’t a standard way to iterate through a data structure, generic is not yet available in the language so, you couldn’t write a simple iterator for different data structures.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "bufio.Scanner",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " is an iterator through an ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "io.Reader",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ", where the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Scan",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " method advances to the next value. The value is returned by a ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Bytes",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " method. Errors are collected and returned by an ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Err",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " method.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "database/sql.Rows",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " iterates through the results of a database query, where the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Next",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " method advances to the next row and the value is returned by a ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Scan",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " method which can return an error.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 3
                    },
                    "content": [
                        {
                            "text": "Let’s have a look at the new loop semantics in action:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "please note that despite this feature is available in go 1.22, it’s still experimental and may change in the future, plus you have to build your program using ",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                },
                                {
                                    "type": "italic"
                                }
                            ]
                        },
                        {
                            "text": "GOEXPERIMENT=rangefunc",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "// iterate from 0 to 9\nIn10 := func(yield func(int) bool) {\n    for i := range 10 {\n        if !yield(i) {\n            return\n        }\n    }\n}\nfor v := range In10 {\n    fmt.Println(v) // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "In10",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " is a function that takes a function ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "yield",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " as an argument.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "The ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "yield",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " function takes an integer and returns a boolean, whenever ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "In10",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " is used, the loop body will specify the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "yield",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " function, and the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "In10",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " function will call the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "yield",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " function with the current value of the loop variable.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "You can easily see that the yield function have a signature that return a bool but the loop body itself does not return anything, this is because inside the loop body, ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "continue",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " or nothing will be translated to ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "return true",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " and ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "break",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " will be translated to ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "return false",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ". Give the user the ability to control the iteration from the loop body.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "The compiler will change the for over function to something that looks like this:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "Int10(func(i int) bool {\n    fmt.Println(i)\n    return true\n})\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "this explanation is somewhat oversimplified, the actual implementation is more complex, you can find more about it ",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                },
                                {
                                    "type": "italic"
                                }
                            ]
                        },
                        {
                            "text": "here",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener noreferrer nofollow",
                                        "href": "https://go.googlesource.com/go/+/refs/changes/41/510541/7/src/cmd/compile/internal/rangefunc/rewrite.go",
                                        "class": null,
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "bold"
                                },
                                {
                                    "type": "italic"
                                }
                            ]
                        },
                        {
                            "type": "hardBreak"
                        },
                        {
                            "text": "Besides the one parameter yield function mentioned above, functions that can be ranged over can have zero or two parameters, as long as they have the following signature:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "package iter\n\ntype Seq0 func(yield func() bool) bool\ntype Seq[V any] func(yield func(V) bool) bool\ntype Seq2[K, V any] func(yield func(K, V) bool) bool\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "More examples:",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "// iterate over a specific range with start and end value\nInRange := func(start, end int) func(yield func(int) bool) {\n    return func(yield func(int) bool) {\n        for i := start; i < end; i++ {\n            if !yield(i) {\n                return\n            }\n        }\n    }\n}\n\nfor x := range InRange(5, 10) {\n    fmt.Println(x) // 5, 6, 7, 8, 9\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "// iterate over words in a string separated by space\nWords := func(s string) func(yield func(int, string) bool) {\n    words := strings.Split(s, \" \")\n    return func(yield func(int, string) bool) {\n        for i, word := range words {\n            if !yield(i, word) {\n                return\n            }\n        }\n    }\n}\n\nfor i, word := range Words(\"sun rises in the east\") {\n    fmt.Println(i, word) // 0 sun 1 rises 2 in 3 the 4 east\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "usually, while using some polling based library, you have to write a loop like this:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "for {\n    m, err := reader.ReadMessage(context.Background()) \n    if err != nil {\n        // handle error\n        continue\n    }\n    // handle message\n}\t\t\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "you can leverage the new loop semantics to write a more expressive message poller:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "ReaderIterator := func (reader Reader) func (func (Message, error) bool) {\n    return func (yield func (Message, error) bool) {\n        for {\n            m, err := reader.ReadMessage(context.Background())\n            if !yield(m, err) {\n                break\n            }\n        }\n    }\n}\n\nfor message err := range ReaderIterator(reader) {\n    if err != nil {\n        // handle error\n    }\n    // handle message\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 3
                    },
                    "content": [
                        {
                            "text": "Pull iterator",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "All the examples above are push iterators, pushing values to the yield function. But that is not always the case in the real world, sometimes you want to pull values from the iterator.",
                            "type": "text"
                        },
                        {
                            "type": "hardBreak"
                        },
                        {
                            "text": "The ",
                            "type": "text"
                        },
                        {
                            "text": "Pull",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " function from ",
                            "type": "text"
                        },
                        {
                            "text": "iter",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " package converse a ",
                            "type": "text"
                        },
                        {
                            "text": "Seq",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": "- standard push iterator to a pull iterator. Calling ",
                            "type": "text"
                        },
                        {
                            "text": "Pull",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " will start an iteration and returns a pair of functions ",
                            "type": "text"
                        },
                        {
                            "text": "next",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " and ",
                            "type": "text"
                        },
                        {
                            "text": "stop",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": ", which return the next value from the iterator and stop it, respectively.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": "go"
                    },
                    "content": [
                        {
                            "text": "InRange := func(start, end int) func(yield func(int) bool) {\n    return func(yield func(int) bool) {\n        for i := start; i < end; i++ {\n            if !yield(i) {\n                return\n            }\n        }\n    }\n}\nnext, stop := iter.Pull(InRange(5, 7))\ndefer stop()\nfor value, more := next(); more; value, more = next() {\n    fmt.Println(value) // 5, 6\n}\n",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "The new loop semantics surely is a great addition to the Go language as it opens the door for more idiomatic APIs with range functions.",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "References:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Go 1.22 Release Notes",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://tip.golang.org/doc/go1.22",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "spec: add range over int, range over func",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/golang/go/issues/61405",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "iter: new package for iterators",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/golang/go/issues/61897",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Go Wiki: Rangefunc Experiment",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://go.dev/wiki/RangefuncExperiment#what-will-idiomatic-apis-with-range-functions-look-like",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 5,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "explore the new go's loop semantics and how they can be used to write more expressive and readable code.",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "Golang Market Store – GolangMarket Gopher Store",
                "src": "https://lh3.googleusercontent.com/6fGFtMFBLGzWaECR4LcRZggeu8vWx7XHCsSuVj5dSEEpRmfCHl6PGZEuS4PXke1pcjCtvZ5YWTVIsW29YBjrg4agVabZXM3v0U_HNkuER7-D?publiz-file-id=20",
                "width": 1024,
                "height": 1024,
                "blurHash": "",
                "fileName": "IMG_1994.JPG?v=1538235558&width=1445",
                "fileSize": "104547"
            }
        },
        "createdAt": "2024-05-08T10:46:17.752Z",
        "updatedAt": "2024-05-08T10:46:17.752Z",
        "author": {
            "id": 5,
            "displayName": "Duc Hoang Manh",
            "metadata": null
        }
    },
    {
        "id": 12,
        "title": "Main differences between Intel and AMD chips",
        "content": "<img src=\"https://lh3.googleusercontent.com/qLfaWhCehhq7T0sTaxRbwQYxvCQJQTv-u07lfkU5GLEkhvt1jWNxs7k3hWZGcAcAvBcfaeYEFXUfvk5X15A51C5r7mMn8v5ASc-3ywiRha1k?publiz-file-id=19\" data-width=\"1200\" data-height=\"720\" data-blur-hash=\"ULAdQMY8jvVrt2R%jFo300VXbFtQMwsmkCS1\" alt=\"\" data-file-name=\"0_z6DBs7FzNFcMLWiU.webp\" data-file-size=\"45260\"><p>Intel and AMD are two major players in the semiconductor industry, particularly known for their CPUs (Central Processing Units). While both companies produce processors for a wide range of devices, including desktops, laptops, servers, and more, there are several key differences between Intel and AMD chips:</p><ol><li><p><strong>Architecture</strong>: Intel and AMD have different CPU architectures. Intel traditionally uses its own x86 architecture, while AMD has historically used x86 as well but has also introduced its own architectures such as AMD64 (x86-64) and Ryzen.</p></li><li><p><strong>Manufacturing Process</strong>: Intel and AMD often use different manufacturing processes for their chips. For example, Intel has historically been ahead in terms of manufacturing technology, often being the first to introduce new nodes such as 10nm and 7nm. AMD has typically lagged behind in this regard, relying on third-party foundries like TSMC for manufacturing.</p></li><li><p><strong>Performance and Efficiency</strong>: Both companies compete in terms of performance and power efficiency. At various times, one or the other may have an advantage in certain benchmarks or workloads. AMD has gained recognition in recent years for offering competitive performance with its Ryzen series processors, particularly in multi-threaded workloads. Intel, on the other hand, has traditionally been known for strong single-threaded performance, although AMD has made significant strides in this area as well.</p></li><li><p><strong>Integrated Graphics</strong>: Intel often integrates graphics processing units (GPUs) into its CPUs, offering integrated graphics solutions for systems that don&apos;t require discrete graphics cards. AMD also offers CPUs with integrated graphics, but their APUs (Accelerated Processing Units) tend to offer better graphics performance compared to Intel&apos;s integrated graphics solutions.</p></li><li><p><strong>Pricing and Market Segments</strong>: Historically, AMD has positioned itself as a more budget-friendly option compared to Intel, offering competitive performance at lower price points. However, the pricing dynamics can vary depending on the specific product lineup and market conditions.</p></li><li><p><strong>Platform Compatibility</strong>: Intel and AMD chips may require different motherboard chipsets and socket types, which can impact compatibility with other system components. This means that upgrading or building a system with an AMD CPU may require a different motherboard compared to one with an Intel CPU.</p></li></ol>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/qLfaWhCehhq7T0sTaxRbwQYxvCQJQTv-u07lfkU5GLEkhvt1jWNxs7k3hWZGcAcAvBcfaeYEFXUfvk5X15A51C5r7mMn8v5ASc-3ywiRha1k?publiz-file-id=19",
                        "width": 1200,
                        "height": 720,
                        "blurHash": "ULAdQMY8jvVrt2R%jFo300VXbFtQMwsmkCS1",
                        "fileName": "0_z6DBs7FzNFcMLWiU.webp",
                        "fileSize": "45260"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Intel and AMD are two major players in the semiconductor industry, particularly known for their CPUs (Central Processing Units). While both companies produce processors for a wide range of devices, including desktops, laptops, servers, and more, there are several key differences between Intel and AMD chips:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Architecture",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Intel and AMD have different CPU architectures. Intel traditionally uses its own x86 architecture, while AMD has historically used x86 as well but has also introduced its own architectures such as AMD64 (x86-64) and Ryzen.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Manufacturing Process",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Intel and AMD often use different manufacturing processes for their chips. For example, Intel has historically been ahead in terms of manufacturing technology, often being the first to introduce new nodes such as 10nm and 7nm. AMD has typically lagged behind in this regard, relying on third-party foundries like TSMC for manufacturing.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Performance and Efficiency",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Both companies compete in terms of performance and power efficiency. At various times, one or the other may have an advantage in certain benchmarks or workloads. AMD has gained recognition in recent years for offering competitive performance with its Ryzen series processors, particularly in multi-threaded workloads. Intel, on the other hand, has traditionally been known for strong single-threaded performance, although AMD has made significant strides in this area as well.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Integrated Graphics",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Intel often integrates graphics processing units (GPUs) into its CPUs, offering integrated graphics solutions for systems that don't require discrete graphics cards. AMD also offers CPUs with integrated graphics, but their APUs (Accelerated Processing Units) tend to offer better graphics performance compared to Intel's integrated graphics solutions.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Pricing and Market Segments",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Historically, AMD has positioned itself as a more budget-friendly option compared to Intel, offering competitive performance at lower price points. However, the pricing dynamics can vary depending on the specific product lineup and market conditions.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Platform Compatibility",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Intel and AMD chips may require different motherboard chipsets and socket types, which can impact compatibility with other system components. This means that upgrading or building a system with an AMD CPU may require a different motherboard compared to one with an Intel CPU.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 4,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "When it comes to the battle of CPUs, there is no fiercer competition than Intel vs AMD. In fact, aside from these two companies, there is virtually no other processor that comes close to competing in the processor ring.",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/qLfaWhCehhq7T0sTaxRbwQYxvCQJQTv-u07lfkU5GLEkhvt1jWNxs7k3hWZGcAcAvBcfaeYEFXUfvk5X15A51C5r7mMn8v5ASc-3ywiRha1k?publiz-file-id=19",
                "width": 1200,
                "height": 720,
                "blurHash": "ULAdQMY8jvVrt2R%jFo300VXbFtQMwsmkCS1",
                "fileName": "0_z6DBs7FzNFcMLWiU.webp",
                "fileSize": "45260"
            }
        },
        "createdAt": "2024-05-08T07:02:16.856Z",
        "updatedAt": "2024-05-08T07:02:16.856Z",
        "author": {
            "id": 4,
            "displayName": "",
            "metadata": {
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/DFFx-hqI2Zckk-9kgCqwR698qnHz5d_5MI5fSalGh0_w7ltKqk8CRkspnX3QFoaxO7lPijaLDIsuv29XsTakrfVEXXX2abCIBNe13o6tLmX0hA?publiz-file-id=21"
                }
            }
        }
    },
    {
        "id": 11,
        "title": "Using sync package to implement Mutex in Go",
        "content": "<img src=\"https://lh3.googleusercontent.com/F2pOywN-X-2cvaJLd_qz6Jteo-akJZw-wvvvNdoIPIvGSRxsrnd9Zm3uvF7UynJs_ubzd85VqLbdgZNApb_GjnFiL9-z0GXRbanKfUedEVnu?publiz-file-id=18\" data-width=\"720\" data-height=\"418\" data-blur-hash=\"UMHW@hX=pKV]WIbeajoe-yn2nNj?x:VtV[j@\" alt=\"\" data-file-name=\"1__FVk0JkZ3ML_nJD2SwF-4A.webp\" data-file-size=\"13112\"><p>In Go, you can implement a mutex (short for mutual exclusion) using the <code>sync</code> package, specifically the <code>sync.Mutex</code> type. Here&apos;s a simple example demonstrating how to use a mutex to protect a critical section of code:</p><pre><code>package main\n\nimport (\n\t&quot;fmt&quot;\n\t&quot;sync&quot;\n\t&quot;time&quot;\n)\n\n// Shared resource\nvar counter int\n\n// Mutex to synchronize access to the shared resource\nvar mutex sync.Mutex\n\n// Function to increment the counter safely using a mutex\nfunc incrementCounter() {\n\t// Lock the mutex to prevent concurrent access to the shared resource\n\tmutex.Lock()\n\tdefer mutex.Unlock() // Ensure the mutex is unlocked when the function exits\n\n\t// Critical section: Manipulate the shared resource\n\tcounter++\n\tfmt.Println(&quot;Counter incremented to:&quot;, counter)\n}\n\nfunc main() {\n\t// Number of goroutines (simulating concurrent access)\n\tnumGoroutines := 5\n\n\t// Create multiple goroutines to concurrently increment the counter\n\tfor i := 0; i &lt; numGoroutines; i++ {\n\t\tgo incrementCounter()\n\t}\n\n\t// Sleep to allow goroutines to execute\n\ttime.Sleep(time.Second)\n\n\t// Output the final value of the counter\n\tfmt.Println(&quot;Final counter value:&quot;, counter)\n}</code></pre><ol><li><p>We define a shared resource <code>counter</code> that multiple goroutines will concurrently access.</p></li><li><p>We create a mutex named <code>mutex</code> using <code>sync.Mutex</code>.</p></li><li><p>The <code>incrementCounter</code> function is defined to increment the <code>counter</code> safely using the mutex. It locks the mutex before accessing the critical section and defers unlocking the mutex to ensure it&apos;s always released.</p></li><li><p>In the <code>main</code> function, we create multiple goroutines to concurrently call <code>incrementCounter</code>.</p></li><li><p>After a brief delay to allow the goroutines to execute, we output the final value of the counter.</p></li></ol><p>By using the mutex, we ensure that only one goroutine can access the critical section (incrementing the counter) at any given time, preventing data races and ensuring the correctness of the program.</p>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/F2pOywN-X-2cvaJLd_qz6Jteo-akJZw-wvvvNdoIPIvGSRxsrnd9Zm3uvF7UynJs_ubzd85VqLbdgZNApb_GjnFiL9-z0GXRbanKfUedEVnu?publiz-file-id=18",
                        "width": 720,
                        "height": 418,
                        "blurHash": "UMHW@hX=pKV]WIbeajoe-yn2nNj?x:VtV[j@",
                        "fileName": "1__FVk0JkZ3ML_nJD2SwF-4A.webp",
                        "fileSize": "13112"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "In Go, you can implement a mutex (short for mutual exclusion) using the ",
                            "type": "text"
                        },
                        {
                            "text": "sync",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " package, specifically the ",
                            "type": "text"
                        },
                        {
                            "text": "sync.Mutex",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " type. Here's a simple example demonstrating how to use a mutex to protect a critical section of code:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n\t\"time\"\n)\n\n// Shared resource\nvar counter int\n\n// Mutex to synchronize access to the shared resource\nvar mutex sync.Mutex\n\n// Function to increment the counter safely using a mutex\nfunc incrementCounter() {\n\t// Lock the mutex to prevent concurrent access to the shared resource\n\tmutex.Lock()\n\tdefer mutex.Unlock() // Ensure the mutex is unlocked when the function exits\n\n\t// Critical section: Manipulate the shared resource\n\tcounter++\n\tfmt.Println(\"Counter incremented to:\", counter)\n}\n\nfunc main() {\n\t// Number of goroutines (simulating concurrent access)\n\tnumGoroutines := 5\n\n\t// Create multiple goroutines to concurrently increment the counter\n\tfor i := 0; i < numGoroutines; i++ {\n\t\tgo incrementCounter()\n\t}\n\n\t// Sleep to allow goroutines to execute\n\ttime.Sleep(time.Second)\n\n\t// Output the final value of the counter\n\tfmt.Println(\"Final counter value:\", counter)\n}",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "We define a shared resource ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "counter",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " that multiple goroutines will concurrently access.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "We create a mutex named ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "mutex",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " using ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "sync.Mutex",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ".",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "The ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "incrementCounter",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " function is defined to increment the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "counter",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " safely using the mutex. It locks the mutex before accessing the critical section and defers unlocking the mutex to ensure it's always released.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "In the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "main",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " function, we create multiple goroutines to concurrently call ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "incrementCounter",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ".",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "After a brief delay to allow the goroutines to execute, we output the final value of the counter.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "By using the mutex, we ensure that only one goroutine can access the critical section (incrementing the counter) at any given time, preventing data races and ensuring the correctness of the program.",
                            "type": "text"
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 4,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "Simple example demonstrating how to use a mutex",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/F2pOywN-X-2cvaJLd_qz6Jteo-akJZw-wvvvNdoIPIvGSRxsrnd9Zm3uvF7UynJs_ubzd85VqLbdgZNApb_GjnFiL9-z0GXRbanKfUedEVnu?publiz-file-id=18",
                "width": 720,
                "height": 418,
                "blurHash": "UMHW@hX=pKV]WIbeajoe-yn2nNj?x:VtV[j@",
                "fileName": "1__FVk0JkZ3ML_nJD2SwF-4A.webp",
                "fileSize": "13112"
            }
        },
        "createdAt": "2024-05-08T06:47:13.574Z",
        "updatedAt": "2024-05-08T06:47:13.574Z",
        "author": {
            "id": 4,
            "displayName": "",
            "metadata": {
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/DFFx-hqI2Zckk-9kgCqwR698qnHz5d_5MI5fSalGh0_w7ltKqk8CRkspnX3QFoaxO7lPijaLDIsuv29XsTakrfVEXXX2abCIBNe13o6tLmX0hA?publiz-file-id=21"
                }
            }
        }
    },
    {
        "id": 10,
        "title": "Heap storage model in PostgreSQL",
        "content": "<img src=\"https://lh3.googleusercontent.com/EkhwXsbkK7aXLZRaIi61-d4dx-ZzCULnqQUP9Ep-6b8xsPUlFsjOcTdMM80SgR0A7jYiTQIZXKqDRdhzGOiUXrIpMyqwOTdqsLcXwBREkbBf?publiz-file-id=17\" data-width=\"870\" data-height=\"457\" data-blur-hash=\"U5BN1V}8u*NdXl;{-9Iq%KxYNG$#2]%0M{xt\" alt=\"\" data-file-name=\"Blog-PostgreSQL-Internals-Part-1-Understanding-Database-Cluster-Database-and-Tables-1-1-870x457.png\" data-file-size=\"196358\"><p>In PostgreSQL, the heap storage model refers to the way data is organized within tables. Here&apos;s how it works:</p><ol><li><p><strong>Unsorted Storage</strong>: In a heap storage model, rows are stored in no particular order within the data pages of a table. When new rows are inserted, they are simply added to the end of the table&apos;s data pages.</p></li><li><p><strong>Tuple Structure</strong>: Each row, also known as a tuple, consists of a header and the actual data values. The header contains information such as the number of columns, null flags, and other metadata.</p></li><li><p><strong>Visibility Information</strong>: PostgreSQL uses a multiversion concurrency control (MVCC) mechanism to manage concurrent transactions. Each tuple contains visibility information, including a transaction ID indicating the creating transaction and a &quot;till when&quot; field indicating until when the tuple is visible.</p></li><li><p><strong>Indexes for Retrieval</strong>: While the data within the heap itself is unsorted, PostgreSQL uses indexes to efficiently retrieve data based on specific criteria. Indexes are separate data structures that provide ordered access to the tuples based on the values of certain columns.</p></li><li><p><strong>Autovacuum</strong>: PostgreSQL employs a background process called autovacuum to manage the space within the heap. Autovacuum is responsible for reclaiming space occupied by deleted or updated tuples, thereby preventing excessive bloat and ensuring efficient use of storage.</p></li></ol>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/EkhwXsbkK7aXLZRaIi61-d4dx-ZzCULnqQUP9Ep-6b8xsPUlFsjOcTdMM80SgR0A7jYiTQIZXKqDRdhzGOiUXrIpMyqwOTdqsLcXwBREkbBf?publiz-file-id=17",
                        "width": 870,
                        "height": 457,
                        "blurHash": "U5BN1V}8u*NdXl;{-9Iq%KxYNG$#2]%0M{xt",
                        "fileName": "Blog-PostgreSQL-Internals-Part-1-Understanding-Database-Cluster-Database-and-Tables-1-1-870x457.png",
                        "fileSize": "196358"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "In PostgreSQL, the heap storage model refers to the way data is organized within tables. Here's how it works:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Unsorted Storage",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": In a heap storage model, rows are stored in no particular order within the data pages of a table. When new rows are inserted, they are simply added to the end of the table's data pages.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Tuple Structure",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Each row, also known as a tuple, consists of a header and the actual data values. The header contains information such as the number of columns, null flags, and other metadata.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Visibility Information",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": PostgreSQL uses a multiversion concurrency control (MVCC) mechanism to manage concurrent transactions. Each tuple contains visibility information, including a transaction ID indicating the creating transaction and a \"till when\" field indicating until when the tuple is visible.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Indexes for Retrieval",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": While the data within the heap itself is unsorted, PostgreSQL uses indexes to efficiently retrieve data based on specific criteria. Indexes are separate data structures that provide ordered access to the tuples based on the values of certain columns.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Autovacuum",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": PostgreSQL employs a background process called autovacuum to manage the space within the heap. Autovacuum is responsible for reclaiming space occupied by deleted or updated tuples, thereby preventing excessive bloat and ensuring efficient use of storage.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 4,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "The heap storage model in PostgreSQL offers simplicity and flexibility, for specific use cases where ordered storage or specialized access methods are required.",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/EkhwXsbkK7aXLZRaIi61-d4dx-ZzCULnqQUP9Ep-6b8xsPUlFsjOcTdMM80SgR0A7jYiTQIZXKqDRdhzGOiUXrIpMyqwOTdqsLcXwBREkbBf?publiz-file-id=17",
                "width": 870,
                "height": 457,
                "blurHash": "U5BN1V}8u*NdXl;{-9Iq%KxYNG$#2]%0M{xt",
                "fileName": "Blog-PostgreSQL-Internals-Part-1-Understanding-Database-Cluster-Database-and-Tables-1-1-870x457.png",
                "fileSize": "196358"
            }
        },
        "createdAt": "2024-05-08T06:29:55.443Z",
        "updatedAt": "2024-05-08T06:29:55.443Z",
        "author": {
            "id": 4,
            "displayName": "",
            "metadata": {
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/DFFx-hqI2Zckk-9kgCqwR698qnHz5d_5MI5fSalGh0_w7ltKqk8CRkspnX3QFoaxO7lPijaLDIsuv29XsTakrfVEXXX2abCIBNe13o6tLmX0hA?publiz-file-id=21"
                }
            }
        }
    },
    {
        "id": 9,
        "title": "Mutex and lock serve a similar purpose, but what's different?",
        "content": "<p>Mutex and lock are synchronization mechanisms used in concurrent programming to control access to shared resources by multiple threads or processes. Although they serve a similar purpose, there are some differences between them:</p><img src=\"https://lh3.googleusercontent.com/WiQw4n2hoImC6PS22j15GkKBLN21-jUWNX6UwxiDWA3qvxQ3ugnPF3SlbB0_tTXGtavfGUVDn2t6R8Wff9jcVG3_0OneicAKLpMM_KY7nBfQ?publiz-file-id=16\" data-width=\"640\" data-height=\"480\" data-blur-hash=\"U3N^Vs0I4kDa9F.6.5RQ00NGRiV{^-4W9Ht9\" alt=\"\" data-file-name=\"sddefault.jpg\" data-file-size=\"35644\"><ol><li><p><strong>Scope</strong>:</p><ul><li><p><strong>Mutex (Mutual Exclusion)</strong>: Typically, mutexes are system-wide or global in scope, meaning they can be used to synchronize threads or processes across the entire system.</p></li><li><p><strong>Lock</strong>: Locks are often used within a single process or application to synchronize threads.</p></li></ul></li><li><p><strong>Usage</strong>:</p><ul><li><p><strong>Mutex</strong>: Mutexes are often used to provide exclusive access to shared resources. A thread that wants to access a shared resource locks the mutex, performs its operation, and then unlocks the mutex.</p></li><li><p><strong>Lock</strong>: Locks are a more general term and can refer to various synchronization primitives, including mutexes, semaphores, and spinlocks.</p></li></ul></li><li><p><strong>Implementation</strong>:</p><ul><li><p><strong>Mutex</strong>: Mutexes are typically implemented using hardware primitives like atomic operations or software constructs like semaphores. They ensure that only one thread can acquire the lock at a time.</p></li><li><p><strong>Lock</strong>: Locks can encompass a broader range of synchronization mechanisms. They can be implemented using mutexes, spinlocks, semaphores, or other techniques, depending on the requirements and characteristics of the system.</p></li></ul></li><li><p><strong>Flexibility</strong>:</p><ul><li><p><strong>Mutex</strong>: Mutexes often provide a simple binary state - locked or unlocked. They are well-suited for scenarios where exclusive access to a resource is required.</p></li><li><p><strong>Lock</strong>: Locks can be more flexible, allowing for different modes of operation such as shared locks (multiple threads can read but not write) and exclusive locks (only one thread can write).</p></li></ul></li></ol>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Mutex and lock are synchronization mechanisms used in concurrent programming to control access to shared resources by multiple threads or processes. Although they serve a similar purpose, there are some differences between them:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/WiQw4n2hoImC6PS22j15GkKBLN21-jUWNX6UwxiDWA3qvxQ3ugnPF3SlbB0_tTXGtavfGUVDn2t6R8Wff9jcVG3_0OneicAKLpMM_KY7nBfQ?publiz-file-id=16",
                        "width": 640,
                        "height": 480,
                        "blurHash": "U3N^Vs0I4kDa9F.6.5RQ00NGRiV{^-4W9Ht9",
                        "fileName": "sddefault.jpg",
                        "fileSize": "35644"
                    }
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Scope",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ":",
                                            "type": "text"
                                        }
                                    ]
                                },
                                {
                                    "type": "bulletList",
                                    "content": [
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Mutex (Mutual Exclusion)",
                                                            "type": "text",
                                                            "marks": [
                                                                {
                                                                    "type": "bold"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "text": ": Typically, mutexes are system-wide or global in scope, meaning they can be used to synchronize threads or processes across the entire system.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Lock",
                                                            "type": "text",
                                                            "marks": [
                                                                {
                                                                    "type": "bold"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "text": ": Locks are often used within a single process or application to synchronize threads.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Usage",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ":",
                                            "type": "text"
                                        }
                                    ]
                                },
                                {
                                    "type": "bulletList",
                                    "content": [
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Mutex",
                                                            "type": "text",
                                                            "marks": [
                                                                {
                                                                    "type": "bold"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "text": ": Mutexes are often used to provide exclusive access to shared resources. A thread that wants to access a shared resource locks the mutex, performs its operation, and then unlocks the mutex.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Lock",
                                                            "type": "text",
                                                            "marks": [
                                                                {
                                                                    "type": "bold"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "text": ": Locks are a more general term and can refer to various synchronization primitives, including mutexes, semaphores, and spinlocks.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Implementation",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ":",
                                            "type": "text"
                                        }
                                    ]
                                },
                                {
                                    "type": "bulletList",
                                    "content": [
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Mutex",
                                                            "type": "text",
                                                            "marks": [
                                                                {
                                                                    "type": "bold"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "text": ": Mutexes are typically implemented using hardware primitives like atomic operations or software constructs like semaphores. They ensure that only one thread can acquire the lock at a time.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Lock",
                                                            "type": "text",
                                                            "marks": [
                                                                {
                                                                    "type": "bold"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "text": ": Locks can encompass a broader range of synchronization mechanisms. They can be implemented using mutexes, spinlocks, semaphores, or other techniques, depending on the requirements and characteristics of the system.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Flexibility",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ":",
                                            "type": "text"
                                        }
                                    ]
                                },
                                {
                                    "type": "bulletList",
                                    "content": [
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Mutex",
                                                            "type": "text",
                                                            "marks": [
                                                                {
                                                                    "type": "bold"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "text": ": Mutexes often provide a simple binary state - locked or unlocked. They are well-suited for scenarios where exclusive access to a resource is required.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Lock",
                                                            "type": "text",
                                                            "marks": [
                                                                {
                                                                    "type": "bold"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "text": ": Locks can be more flexible, allowing for different modes of operation such as shared locks (multiple threads can read but not write) and exclusive locks (only one thread can write).",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 4,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "Mutexes are a specific type of lock used for mutual exclusion, while locks encompass a broader range of synchronization mechanisms",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/WiQw4n2hoImC6PS22j15GkKBLN21-jUWNX6UwxiDWA3qvxQ3ugnPF3SlbB0_tTXGtavfGUVDn2t6R8Wff9jcVG3_0OneicAKLpMM_KY7nBfQ?publiz-file-id=16",
                "width": 640,
                "height": 480,
                "blurHash": "U3N^Vs0I4kDa9F.6.5RQ00NGRiV{^-4W9Ht9",
                "fileName": "sddefault.jpg",
                "fileSize": "35644"
            }
        },
        "createdAt": "2024-05-08T06:08:10.481Z",
        "updatedAt": "2024-05-08T06:08:10.481Z",
        "author": {
            "id": 4,
            "displayName": "",
            "metadata": {
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/DFFx-hqI2Zckk-9kgCqwR698qnHz5d_5MI5fSalGh0_w7ltKqk8CRkspnX3QFoaxO7lPijaLDIsuv29XsTakrfVEXXX2abCIBNe13o6tLmX0hA?publiz-file-id=21"
                }
            }
        }
    },
    {
        "id": 8,
        "title": "Introduce Javascript Event Loop for newbie",
        "content": "<img src=\"https://lh3.googleusercontent.com/RUm4uqFbwibICgO_7BochdSqLu9tTa7MxzhmBQZlbtgwMtteBZWp5bl-_Go28QESBxnXpYpHcGdu8EE5Ei5tBHqS5AQhcBhhVDwWuYtRZUvb?publiz-file-id=15\" data-width=\"1280\" data-height=\"720\" data-blur-hash=\"UaI7sv0y}[W=H}xaNafR9hxGIojZw7xaaKni\" alt=\"\" data-file-name=\"maxresdefault (1).jpg\" data-file-size=\"112095\"><p>The event loop enables JavaScript to handle asynchronous operations efficiently, ensuring that your application remains responsive and doesn&apos;t get bogged down by time-consuming tasks.</p><ol><li><p><strong>Single Threaded Nature</strong>: JavaScript is single-threaded, meaning it can only execute one piece of code at a time. This thread is responsible for executing your JavaScript code line by line.</p></li><li><p><strong>Synchronous vs Asynchronous Code</strong>: JavaScript can execute code synchronously (line by line) and asynchronously (out of order). Synchronous code runs sequentially, blocking further execution until it&apos;s done. Asynchronous code doesn&apos;t wait for its execution to finish; instead, it delegates it to other parts of the system, allowing the main thread to continue.</p></li><li><p><strong>Event Queue</strong>: When an asynchronous operation completes, it&apos;s placed in the Event Queue. This queue holds tasks (like event handlers, AJAX callbacks, setTimeout functions) that are ready to be executed.</p></li><li><p><strong>Event Loop</strong>: The Event Loop&apos;s job is to monitor the Call Stack and the Event Queue. When the Call Stack is empty (i.e., there&apos;s no synchronous code left to execute), the Event Loop checks if there are any tasks in the Event Queue. If there are, it moves them from the Event Queue to the Call Stack, where they&apos;re executed one by one.</p></li><li><p><strong>Execution Context</strong>: Each time a function is called, an Execution Context is created and pushed onto the Call Stack. This context holds information about the function&apos;s variables, scope, and arguments. When the function finishes, its context is popped off the stack.</p></li><li><p><strong>Concurrency Model</strong>: Through this mechanism, JavaScript achieves concurrency without multi-threading. While it&apos;s single-threaded, it can manage multiple tasks concurrently by handling asynchronous operations via the Event Loop.</p></li></ol>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/RUm4uqFbwibICgO_7BochdSqLu9tTa7MxzhmBQZlbtgwMtteBZWp5bl-_Go28QESBxnXpYpHcGdu8EE5Ei5tBHqS5AQhcBhhVDwWuYtRZUvb?publiz-file-id=15",
                        "width": 1280,
                        "height": 720,
                        "blurHash": "UaI7sv0y}[W=H}xaNafR9hxGIojZw7xaaKni",
                        "fileName": "maxresdefault (1).jpg",
                        "fileSize": "112095"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "The event loop enables JavaScript to handle asynchronous operations efficiently, ensuring that your application remains responsive and doesn't get bogged down by time-consuming tasks.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Single Threaded Nature",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": JavaScript is single-threaded, meaning it can only execute one piece of code at a time. This thread is responsible for executing your JavaScript code line by line.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Synchronous vs Asynchronous Code",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": JavaScript can execute code synchronously (line by line) and asynchronously (out of order). Synchronous code runs sequentially, blocking further execution until it's done. Asynchronous code doesn't wait for its execution to finish; instead, it delegates it to other parts of the system, allowing the main thread to continue.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Event Queue",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": When an asynchronous operation completes, it's placed in the Event Queue. This queue holds tasks (like event handlers, AJAX callbacks, setTimeout functions) that are ready to be executed.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Event Loop",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": The Event Loop's job is to monitor the Call Stack and the Event Queue. When the Call Stack is empty (i.e., there's no synchronous code left to execute), the Event Loop checks if there are any tasks in the Event Queue. If there are, it moves them from the Event Queue to the Call Stack, where they're executed one by one.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Execution Context",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Each time a function is called, an Execution Context is created and pushed onto the Call Stack. This context holds information about the function's variables, scope, and arguments. When the function finishes, its context is popped off the stack.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Concurrency Model",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Through this mechanism, JavaScript achieves concurrency without multi-threading. While it's single-threaded, it can manage multiple tasks concurrently by handling asynchronous operations via the Event Loop.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 4,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events.",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/RUm4uqFbwibICgO_7BochdSqLu9tTa7MxzhmBQZlbtgwMtteBZWp5bl-_Go28QESBxnXpYpHcGdu8EE5Ei5tBHqS5AQhcBhhVDwWuYtRZUvb?publiz-file-id=15",
                "width": 1280,
                "height": 720,
                "blurHash": "",
                "fileName": "maxresdefault (1).jpg",
                "fileSize": "112095"
            }
        },
        "createdAt": "2024-05-07T15:33:06.204Z",
        "updatedAt": "2024-05-07T15:33:06.204Z",
        "author": {
            "id": 4,
            "displayName": "",
            "metadata": {
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/DFFx-hqI2Zckk-9kgCqwR698qnHz5d_5MI5fSalGh0_w7ltKqk8CRkspnX3QFoaxO7lPijaLDIsuv29XsTakrfVEXXX2abCIBNe13o6tLmX0hA?publiz-file-id=21"
                }
            }
        }
    },
    {
        "id": 7,
        "title": "Nomad vs Kubernetes",
        "content": "<img src=\"https://lh3.googleusercontent.com/dSSwx5FDu7LkVUuExKI30xbyCmA622teM0PVD5uI6YnlwmA32hLIBbvwU0kGCEsw7Rc8WUEeydfGh31sXGFjoLdzNWgDsQXnMEaSNeZys5I?publiz-file-id=14\" data-width=\"702\" data-height=\"471\" data-blur-hash=\"U65=%~XbDiV$V=oNRjob8wV#x]kh.TotM_aS\" alt=\"\" data-file-name=\"Nomad-vs-Kubernetes.png\" data-file-size=\"85611\"><p>In the realm of container orchestration and microservices, two giants, Nomad and Kubernetes, have emerged as prominent contenders. Both offer unique features that cater to various use cases, from small startups to established enterprises.</p><ol><li><p><strong>Nomad</strong>:</p><ul><li><p>Nomad is developed by HashiCorp and is part of its suite of DevOps tools, which also includes Terraform and Vault.</p></li><li><p>It&apos;s designed to be simple, easy to set up, and lightweight.</p></li><li><p>Nomad focuses on simplicity and flexibility, providing a straightforward way to deploy and manage applications across a cluster of machines.</p></li><li><p>It supports multiple workload types, including Docker containers, VMs, and standalone executables.</p></li><li><p>Nomad has a more minimalist approach compared to Kubernetes, which can make it easier to get started with for smaller deployments or organizations that prefer simplicity.</p></li></ul></li><li><p><strong>Kubernetes</strong>:</p><ul><li><p>Kubernetes, often abbreviated as K8s, is an open-source container orchestration platform originally developed by Google and now maintained by the Cloud Native Computing Foundation (CNCF).</p></li><li><p>It&apos;s highly extensible and has a large ecosystem of tools and services built around it.</p></li><li><p>Kubernetes is known for its robustness and scalability, making it suitable for large-scale deployments in production environments.</p></li><li><p>It provides advanced features for managing containerized applications, including automated scaling, rolling updates, service discovery, and load balancing.</p></li><li><p>Kubernetes has a steeper learning curve compared to Nomad due to its complexity and rich feature set, but it offers more options and capabilities for managing complex containerized workloads.</p></li></ul></li></ol><p>If you prioritize simplicity and ease of use, Nomad might be a better fit for your needs. On the other hand, if you require advanced features and scalability for large-scale deployments, Kubernetes would be a more suitable choice. Ultimately, the decision between Nomad and Kubernetes depends on your specific requirements, preferences, and the complexity of your infrastructure.</p>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/dSSwx5FDu7LkVUuExKI30xbyCmA622teM0PVD5uI6YnlwmA32hLIBbvwU0kGCEsw7Rc8WUEeydfGh31sXGFjoLdzNWgDsQXnMEaSNeZys5I?publiz-file-id=14",
                        "width": 702,
                        "height": 471,
                        "blurHash": "U65=%~XbDiV$V=oNRjob8wV#x]kh.TotM_aS",
                        "fileName": "Nomad-vs-Kubernetes.png",
                        "fileSize": "85611"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "In the realm of container orchestration and microservices, two giants, Nomad and Kubernetes, have emerged as prominent contenders. Both offer unique features that cater to various use cases, from small startups to established enterprises.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Nomad",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ":",
                                            "type": "text"
                                        }
                                    ]
                                },
                                {
                                    "type": "bulletList",
                                    "content": [
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Nomad is developed by HashiCorp and is part of its suite of DevOps tools, which also includes Terraform and Vault.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "It's designed to be simple, easy to set up, and lightweight.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Nomad focuses on simplicity and flexibility, providing a straightforward way to deploy and manage applications across a cluster of machines.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "It supports multiple workload types, including Docker containers, VMs, and standalone executables.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Nomad has a more minimalist approach compared to Kubernetes, which can make it easier to get started with for smaller deployments or organizations that prefer simplicity.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Kubernetes",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ":",
                                            "type": "text"
                                        }
                                    ]
                                },
                                {
                                    "type": "bulletList",
                                    "content": [
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Kubernetes, often abbreviated as K8s, is an open-source container orchestration platform originally developed by Google and now maintained by the Cloud Native Computing Foundation (CNCF).",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "It's highly extensible and has a large ecosystem of tools and services built around it.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Kubernetes is known for its robustness and scalability, making it suitable for large-scale deployments in production environments.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "It provides advanced features for managing containerized applications, including automated scaling, rolling updates, service discovery, and load balancing.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Kubernetes has a steeper learning curve compared to Nomad due to its complexity and rich feature set, but it offers more options and capabilities for managing complex containerized workloads.",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "If you prioritize simplicity and ease of use, Nomad might be a better fit for your needs. On the other hand, if you require advanced features and scalability for large-scale deployments, Kubernetes would be a more suitable choice. Ultimately, the decision between Nomad and Kubernetes depends on your specific requirements, preferences, and the complexity of your infrastructure.",
                            "type": "text"
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 4,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "Nomad and Kubernetes are both popular tools used for container orchestration and management, but they have different approaches and strengths.",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/dSSwx5FDu7LkVUuExKI30xbyCmA622teM0PVD5uI6YnlwmA32hLIBbvwU0kGCEsw7Rc8WUEeydfGh31sXGFjoLdzNWgDsQXnMEaSNeZys5I?publiz-file-id=14",
                "width": 702,
                "height": 471,
                "blurHash": "U65=%~XbDiV$V=oNRjob8wV#x]kh.TotM_aS",
                "fileName": "Nomad-vs-Kubernetes.png",
                "fileSize": "85611"
            }
        },
        "createdAt": "2024-05-07T15:29:33.875Z",
        "updatedAt": "2024-05-07T15:29:33.875Z",
        "author": {
            "id": 4,
            "displayName": "",
            "metadata": {
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/DFFx-hqI2Zckk-9kgCqwR698qnHz5d_5MI5fSalGh0_w7ltKqk8CRkspnX3QFoaxO7lPijaLDIsuv29XsTakrfVEXXX2abCIBNe13o6tLmX0hA?publiz-file-id=21"
                }
            }
        }
    },
    {
        "id": 6,
        "title": "Top 10 Container Network Interface (CNI) plugins for Kubernetes",
        "content": "<img src=\"https://lh3.googleusercontent.com/loevpeW5W1J4dgIzUjNINu-X08UCAYjjqRum92H0wuV0i6QcIwqkLDt4xzX6DnkNYLBpdLbP6IgmO95hH-BqiBQGlYS0wZKMSKMF1X05fkc?publiz-file-id=13\" data-width=\"617\" data-height=\"500\" data-blur-hash=\"UDQ9l#AA#;xn*0M}W9j^^t$%xsai^f%0R+WT\" alt=\"\" data-file-name=\"2327.blog.jpg\" data-file-size=\"83664\"><ol><li><p><strong>Calico</strong>: Calico is a popular CNI plugin that provides networking and network policy enforcement for Kubernetes clusters. It&apos;s known for its scalability and flexibility, making it suitable for large-scale deployments.</p></li><li><p><strong>Flannel</strong>: Flannel is a simple and lightweight CNI plugin designed for Kubernetes networking. It uses overlay networks to connect containers across different hosts and is commonly used in smaller or development environments.</p></li><li><p><strong>Cilium</strong>: Cilium is a CNI plugin that provides network connectivity and security enforcement using eBPF (extended Berkeley Packet Filter) technology. It offers advanced features such as transparent encryption, API-aware network security, and network visibility.</p></li><li><p><strong>Weave Net</strong>: Weave Net is a CNI plugin that provides simple and robust networking for Kubernetes clusters. It creates a virtual network that connects containers across hosts and supports features like encryption and network segmentation.</p></li><li><p><strong>Antrea</strong>: Antrea is a CNI plugin developed specifically for Kubernetes that aims to provide simple and scalable networking and security features. It&apos;s built on top of Open vSwitch (OVS) and supports features like network policy enforcement and observability.</p></li><li><p><strong>Kube-router</strong>: Kube-router is a CNI plugin that provides networking and routing capabilities for Kubernetes clusters. It&apos;s designed to be lightweight and efficient, with support for features like network policy enforcement and IPVS-based load balancing.</p></li><li><p><strong>Multus CNI</strong>: Multus CNI is a multi-network CNI plugin that allows Kubernetes pods to have multiple network interfaces. It&apos;s useful for scenarios where pods require connectivity to multiple networks, such as connecting to both overlay and underlay networks.</p></li><li><p><strong>OVN-Kubernetes</strong>: OVN-Kubernetes is a CNI plugin that integrates the Open Virtual Network (OVN) with Kubernetes. It provides networking and security features using OVN&apos;s distributed overlay network and supports features like network policy enforcement and distributed load balancing.</p></li></ol><p>These are just a few examples of CNI plugins available for Kubernetes. Each plugin has its own set of features, advantages, and use cases, so it&apos;s important to evaluate them based on your specific requirements and environment.</p>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/loevpeW5W1J4dgIzUjNINu-X08UCAYjjqRum92H0wuV0i6QcIwqkLDt4xzX6DnkNYLBpdLbP6IgmO95hH-BqiBQGlYS0wZKMSKMF1X05fkc?publiz-file-id=13",
                        "width": 617,
                        "height": 500,
                        "blurHash": "UDQ9l#AA#;xn*0M}W9j^^t$%xsai^f%0R+WT",
                        "fileName": "2327.blog.jpg",
                        "fileSize": "83664"
                    }
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Calico",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Calico is a popular CNI plugin that provides networking and network policy enforcement for Kubernetes clusters. It's known for its scalability and flexibility, making it suitable for large-scale deployments.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Flannel",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Flannel is a simple and lightweight CNI plugin designed for Kubernetes networking. It uses overlay networks to connect containers across different hosts and is commonly used in smaller or development environments.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Cilium",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Cilium is a CNI plugin that provides network connectivity and security enforcement using eBPF (extended Berkeley Packet Filter) technology. It offers advanced features such as transparent encryption, API-aware network security, and network visibility.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Weave Net",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Weave Net is a CNI plugin that provides simple and robust networking for Kubernetes clusters. It creates a virtual network that connects containers across hosts and supports features like encryption and network segmentation.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Antrea",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Antrea is a CNI plugin developed specifically for Kubernetes that aims to provide simple and scalable networking and security features. It's built on top of Open vSwitch (OVS) and supports features like network policy enforcement and observability.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Kube-router",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Kube-router is a CNI plugin that provides networking and routing capabilities for Kubernetes clusters. It's designed to be lightweight and efficient, with support for features like network policy enforcement and IPVS-based load balancing.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Multus CNI",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": Multus CNI is a multi-network CNI plugin that allows Kubernetes pods to have multiple network interfaces. It's useful for scenarios where pods require connectivity to multiple networks, such as connecting to both overlay and underlay networks.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "OVN-Kubernetes",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "bold"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": OVN-Kubernetes is a CNI plugin that integrates the Open Virtual Network (OVN) with Kubernetes. It provides networking and security features using OVN's distributed overlay network and supports features like network policy enforcement and distributed load balancing.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "These are just a few examples of CNI plugins available for Kubernetes. Each plugin has its own set of features, advantages, and use cases, so it's important to evaluate them based on your specific requirements and environment.",
                            "type": "text"
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 4,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "Kubernetes 1.30 supports Container Network Interface (CNI) plugins for cluster networking. You must use a CNI plugin that is compatible with your cluster and that suits your needs.",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/loevpeW5W1J4dgIzUjNINu-X08UCAYjjqRum92H0wuV0i6QcIwqkLDt4xzX6DnkNYLBpdLbP6IgmO95hH-BqiBQGlYS0wZKMSKMF1X05fkc?publiz-file-id=13",
                "width": 617,
                "height": 500,
                "blurHash": "UDQ9l#AA#;xn*0M}W9j^^t$%xsai^f%0R+WT",
                "fileName": "2327.blog.jpg",
                "fileSize": "83664"
            }
        },
        "createdAt": "2024-05-07T15:22:22.876Z",
        "updatedAt": "2024-05-07T15:22:22.876Z",
        "author": {
            "id": 4,
            "displayName": "",
            "metadata": {
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/DFFx-hqI2Zckk-9kgCqwR698qnHz5d_5MI5fSalGh0_w7ltKqk8CRkspnX3QFoaxO7lPijaLDIsuv29XsTakrfVEXXX2abCIBNe13o6tLmX0hA?publiz-file-id=21"
                }
            }
        }
    },
    {
        "id": 5,
        "title": "React open source point of sale software",
        "content": "<p>Simpos is an intuitive interface and powerful features point of sale client software for Odoo back end using React.</p><img src=\"https://lh3.googleusercontent.com/xmMyIU_Dad0WlevDTYa7_WrHY-p7vo9MWCBcLwD4MSYu7B-wrwm9Ay8XUzWWT6fz_0a2pRzYTBTFJraWLAX3WEint_5fuC8TW6K63Tl7RHxB?publiz-file-id=11\" data-width=\"800\" data-height=\"400\" data-blur-hash=\"UGKoru0000~DnPV@spbF00^l%3Rjf8NGf8a{\" alt=\"\" data-file-name=\"github_banner.png\" data-file-size=\"200041\"><p>It brings better experiences and easy to customize your point of sale and still keeping a comprehensive Odoo features for back end operations such as accounting and inventory. Some highlight features of the this version:</p><ul><li><p>Compatible with any hardware including Sunmi devices (I&apos;m using Sumni T2 at my bakery shop)</p></li><li><p>Offline POS support</p></li><li><p>Multiple orders simultaneously (for restaurant mode use-case)</p></li><li><p>Record customer information</p></li><li><p>Multiple payment methods support</p></li><li><p>Multiple cashiers</p></li><li><p>Vibration card order support</p></li><li><p>Table tag order support</p></li><li><p>Bar code scanner support</p></li><li><p>Kitchen printer via network support</p></li><li><p>Customer screen support (for advertising, customer order review use-case)</p></li><li><p>Discount directly or percentage discount support</p></li><li><p>Responsive layout</p></li><li><p>Multiple price list support</p></li><li><p>...and many more</p></li></ul><h2>❤️ Technical specifications</h2><p>Basic dependencies used:</p><ul><li><p>Web library uses <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/facebook/react\"><u>ReactJS</u></a></p></li><li><p>Web router uses <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/remix-run/react-router\"><u>React Router</u></a></p></li><li><p>Multi-platform app is built with <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/tauri-apps/tauri\"><u>Tauri</u></a></p></li><li><p>Offline database is IndexedDB and uses <a target=\"_blank\" rel=\"nofollow\" href=\"https://dexie.org/\"><u>Dexie.js</u></a></p></li><li><p>UI framework uses <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/chakra-ui/chakra-ui\"><u>Chakra UI</u></a></p></li><li><p>Front end tooling uses <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/vitejs/vite\"><u>Vite</u></a></p></li><li><p>Complex state uses <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/statelyai/xstate\"><u>XState</u></a></p></li><li><p>HTTP client uses <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/axios/axios\"><u>Axios</u></a></p></li></ul><p>Advanced technologies used and why:</p><ol><li><p>Web Worker</p><ul><li><p>To continuous bulk download product images as blob</p></li><li><p>To sync data between multiple browser tabs</p></li><li><p>Not at this version but will use for background sync</p></li></ul></li><li><p>IndexedDB</p><ul><li><p>To store all application data including products, orders</p></li><li><p>To create composite index base on several product key-paths to support full product text search</p></li></ul></li><li><p>Tauri</p><ul><li><p>To create multi-platform desktop app</p></li></ul></li></ol><h2>⚡️ Quick start</h2><ol><li><p>Run <code>pnpm install</code> to install dependencies</p></li><li><p>Run <code>pnpm dev</code> to start development</p></li><li><p>Open <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"http://localhost:5173\"><u>http://localhost:5173</u></a></p></li></ol>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Simpos is an intuitive interface and powerful features point of sale client software for Odoo back end using React.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/xmMyIU_Dad0WlevDTYa7_WrHY-p7vo9MWCBcLwD4MSYu7B-wrwm9Ay8XUzWWT6fz_0a2pRzYTBTFJraWLAX3WEint_5fuC8TW6K63Tl7RHxB?publiz-file-id=11",
                        "width": 800,
                        "height": 400,
                        "blurHash": "UGKoru0000~DnPV@spbF00^l%3Rjf8NGf8a{",
                        "fileName": "github_banner.png",
                        "fileSize": "200041"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "It brings better experiences and easy to customize your point of sale and still keeping a comprehensive Odoo features for back end operations such as accounting and inventory. Some highlight features of the this version:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Compatible with any hardware including Sunmi devices (I'm using Sumni T2 at my bakery shop)",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Offline POS support",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Multiple orders simultaneously (for restaurant mode use-case)",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Record customer information",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Multiple payment methods support",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Multiple cashiers",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Vibration card order support",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Table tag order support",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Bar code scanner support",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Kitchen printer via network support",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Customer screen support (for advertising, customer order review use-case)",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Discount directly or percentage discount support",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Responsive layout",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Multiple price list support",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "...and many more",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "❤️ Technical specifications",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Basic dependencies used:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Web library uses ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "ReactJS",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/facebook/react",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Web router uses ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "React Router",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/remix-run/react-router",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Multi-platform app is built with ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Tauri",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/tauri-apps/tauri",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Offline database is IndexedDB and uses ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Dexie.js",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "nofollow",
                                                        "href": "https://dexie.org/",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "UI framework uses ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Chakra UI",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/chakra-ui/chakra-ui",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Front end tooling uses ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Vite",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/vitejs/vite",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Complex state uses ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "XState",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/statelyai/xstate",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "HTTP client uses ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "Axios",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/axios/axios",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Advanced technologies used and why:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Web Worker",
                                            "type": "text"
                                        }
                                    ]
                                },
                                {
                                    "type": "bulletList",
                                    "content": [
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "To continuous bulk download product images as blob",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "To sync data between multiple browser tabs",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "Not at this version but will use for background sync",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "IndexedDB",
                                            "type": "text"
                                        }
                                    ]
                                },
                                {
                                    "type": "bulletList",
                                    "content": [
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "To store all application data including products, orders",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "To create composite index base on several product key-paths to support full product text search",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Tauri",
                                            "type": "text"
                                        }
                                    ]
                                },
                                {
                                    "type": "bulletList",
                                    "content": [
                                        {
                                            "type": "listItem",
                                            "content": [
                                                {
                                                    "type": "paragraph",
                                                    "content": [
                                                        {
                                                            "text": "To create multi-platform desktop app",
                                                            "type": "text"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "⚡️ Quick start",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Run ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "pnpm install",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " to install dependencies",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Run ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "pnpm dev",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " to start development",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Open ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "http://localhost:5173",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "http://localhost:5173",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 1,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "Simpos is an intuitive interface and powerful features point of sale client software for Odoo back end using React",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/xmMyIU_Dad0WlevDTYa7_WrHY-p7vo9MWCBcLwD4MSYu7B-wrwm9Ay8XUzWWT6fz_0a2pRzYTBTFJraWLAX3WEint_5fuC8TW6K63Tl7RHxB?publiz-file-id=11",
                "width": 800,
                "height": 400,
                "blurHash": "UGKoru0000~DnPV@spbF00^l%3Rjf8NGf8a{",
                "fileName": "github_banner.png",
                "fileSize": "200041"
            }
        },
        "createdAt": "2024-05-07T11:16:41.807Z",
        "updatedAt": "2024-05-07T11:16:41.807Z",
        "author": {
            "id": 1,
            "displayName": "Hieu Tran Duc",
            "metadata": {
                "cover": {
                    "src": "https://lh3.googleusercontent.com/ZAqQixeEOXcSxeiz1J84RGuUAVl6tF_86uw60GSjhUcWJkjRBe3n7vOhm98WAyvHSnd32MymfwAZyN-ALCda1K_8jj-JHrL9ETVHrzT1sgc?publiz-file-id=32"
                },
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/QnVRmNePHsrbFJvyEbtdHDuJ0xA4HlKcgVtJsMx7MO_TyJrh1ewX9fU4N728I9QNowgFTwLjiOVgXTi1iyjTdBNVnTOhZlLOw5tjWMcoMzo?publiz-file-id=22"
                }
            }
        }
    },
    {
        "id": 4,
        "title": "Building multi tenancy website with Nuxt",
        "content": "<img src=\"https://lh3.googleusercontent.com/bzU1TDtP2vlo1US0RqBJb92NPrCv8jnbeLVWOAdNtjreoR24wjfGUUg5GaTwWozZFVrU6H29R_tak44GwX_CbQ1KCoFVXkhQnnxvw08KIdQ9?publiz-file-id=10\" data-width=\"1000\" data-height=\"562\" data-blur-hash=\"U25}pxxu00Rj~qofD%RjIUj[%Mof00Rj~qt7\" alt=\"\" data-file-name=\"nuxt-multi-tenancy.jpg\" data-file-size=\"41006\"><h2>Features</h2><p>⛰  Multi-tenancy Nuxt dynamic tenant sites support by subdomains</p><p>🌻  Multiple Nuxt app sites in pages folder</p><p>🦄  Custom domain for each tenant route in pages folder</p><p>✨  A fully functional sample playground deployed on Vercel</p><h2>Quick Setup</h2><ol><li><p>Add <code>nuxt-multi-tenancy</code> dependency to your project</p></li></ol><pre><code># Using pnpm\npnpm add -D nuxt-multi-tenancy\n\n# Using yarn\nyarn add --dev nuxt-multi-tenancy\n\n# Using npm\nnpm install --save-dev nuxt-multi-tenancy</code></pre><ol start=\"2\"><li><p>Add <code>nuxt-multi-tenancy</code> to the <code>modules</code> section of <code>nuxt.config.ts</code></p></li></ol><pre><code>export default defineNuxtConfig({\n  modules: [\n    &apos;nuxt-multi-tenancy&apos;\n  ]\n})</code></pre><ol start=\"3\"><li><p>If you want to use dynamic tenants, create <code>[site]</code> folder under your Nuxt <code>pages</code> directory, you can check the <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/hieuhani/nuxt-multi-tenancy/blob/main/playground/pages/%5Bsite%5D\"><u>playground&apos;s pages folder</u></a> for referencing.</p></li></ol><p>That&apos;s it! You can now use Nuxt Multi-tenancy in your Nuxt app ✨</p><ol start=\"4\"><li><p>If you want to have some additional system sites to be serving as a sub domain, for example: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/hieuhani/nuxt-multi-tenancy/blob/main/playground/pages/jobs\"><u>jobs page</u></a> to be serving as <a target=\"_blank\" rel=\"nofollow\" href=\"https://jobs.nuxtdev.xyz/\"><u>https://jobs.nuxtdev.xyz/</u></a></p></li></ol><p>Configure the sites property to add the list of tenant you want to be serving as system sites.</p><pre><code>export default defineNuxtConfig({\n  modules: [&apos;nuxt-multi-tenancy&apos;],\n  multiTenancy: {\n    tenantDynamicRoute: &apos;site&apos;,\n    rootDomains: [&quot;nuxtdev.local&quot;, &quot;nuxtdev.xyz&quot;],\n    sites: [&apos;jobs&apos;]\n  },\n})</code></pre><ol start=\"5\"><li><p>If you want to custom domain for each tenant route, configure the <code>customDomains</code> property a map with key of domain and value of mapping tenant route. For example: <code>nuxtnews.com</code> to <code>news</code> route.</p></li></ol><pre><code>export default defineNuxtConfig({\n  modules: [&apos;nuxt-multi-tenancy&apos;],\n  multiTenancy: {\n    tenantDynamicRoute: &apos;site&apos;,\n    rootDomains: [&quot;nuxtdev.local&quot;, &quot;nuxtdev.xyz&quot;],\n    customDomains: {\n      &quot;nuxtnews.com&quot;: &quot;news&quot;\n    }\n  },\n})</code></pre><h2>Options</h2><p>Configure Nuxt Multi-tenancy module with the <code>multiTenancy</code> property.</p><pre><code>export default defineNuxtConfig({\n  modules: [&apos;nuxt-multi-tenancy&apos;],\n  // default options\n  multiTenancy: {\n    tenantDynamicRoute: &apos;site&apos;,\n    rootDomains: [&quot;nuxtdev.local&quot;, &quot;nuxtdev.xyz&quot;],\n    sites: [],\n    customDomains: {},\n  },\n})</code></pre><h2>useTenant composition API</h2><p>Use useTenant() to get the tenant ID</p><pre><code>import { useTenant } from &apos;#imports&apos;\nconst tenant = useTenant()</code></pre><h2>Development</h2><pre><code># Install dependencies\nyarn install\n\n# Generate type stubs\nyarn dev:prepare\n\n# Develop with the playground\nyarn dev\n\n# Build the playground\nyarn dev:build\n\n# Run ESLint\nyarn lint\n\n# Run Vitest\nyarn test\nyarn test:watch\n\n# Release new version\nyarn release</code></pre><h2>Demo</h2><p>You can view the demo at <a target=\"_blank\" rel=\"nofollow\" href=\"https://nuxtdev.xyz/\"><u>nuxtdev.xyz</u></a></p><p>Features:</p><ul><li><p>A home page to list top first 30 articles from dev.to</p></li><li><p>Tenant detail page. For example: <a target=\"_blank\" rel=\"nofollow\" href=\"https://devteam.nuxtdev.xyz/\"><u>The Dev Team organization</u></a></p></li><li><p>A custom static tenant page. For example: <a target=\"_blank\" rel=\"nofollow\" href=\"https://jobs.nuxtdev.xyz/\"><u>VueJobs</u></a></p></li><li><p>An article detail page</p></li></ul><p>Github repository: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/hieuhani/nuxt-multi-tenancy\">https://github.com/hieuhani/nuxt-multi-tenancy</a></p>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/bzU1TDtP2vlo1US0RqBJb92NPrCv8jnbeLVWOAdNtjreoR24wjfGUUg5GaTwWozZFVrU6H29R_tak44GwX_CbQ1KCoFVXkhQnnxvw08KIdQ9?publiz-file-id=10",
                        "width": 1000,
                        "height": 562,
                        "blurHash": "U25}pxxu00Rj~qofD%RjIUj[%Mof00Rj~qt7",
                        "fileName": "nuxt-multi-tenancy.jpg",
                        "fileSize": "41006"
                    }
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Features",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "⛰  Multi-tenancy Nuxt dynamic tenant sites support by subdomains",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "🌻  Multiple Nuxt app sites in pages folder",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "🦄  Custom domain for each tenant route in pages folder",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "✨  A fully functional sample playground deployed on Vercel",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Quick Setup",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 1
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Add ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "nuxt-multi-tenancy",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " dependency to your project",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "# Using pnpm\npnpm add -D nuxt-multi-tenancy\n\n# Using yarn\nyarn add --dev nuxt-multi-tenancy\n\n# Using npm\nnpm install --save-dev nuxt-multi-tenancy",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 2
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Add ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "nuxt-multi-tenancy",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " to the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "modules",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " section of ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "nuxt.config.ts",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "export default defineNuxtConfig({\n  modules: [\n    'nuxt-multi-tenancy'\n  ]\n})",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 3
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "If you want to use dynamic tenants, create ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "[site]",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " folder under your Nuxt ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "pages",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " directory, you can check the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "playground's pages folder",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/hieuhani/nuxt-multi-tenancy/blob/main/playground/pages/%5Bsite%5D",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " for referencing.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "That's it! You can now use Nuxt Multi-tenancy in your Nuxt app ✨",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 4
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "If you want to have some additional system sites to be serving as a sub domain, for example: ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "jobs page",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener noreferrer nofollow",
                                                        "href": "https://github.com/hieuhani/nuxt-multi-tenancy/blob/main/playground/pages/jobs",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " to be serving as ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "https://jobs.nuxtdev.xyz/",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "nofollow",
                                                        "href": "https://jobs.nuxtdev.xyz/",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Configure the sites property to add the list of tenant you want to be serving as system sites.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "export default defineNuxtConfig({\n  modules: ['nuxt-multi-tenancy'],\n  multiTenancy: {\n    tenantDynamicRoute: 'site',\n    rootDomains: [\"nuxtdev.local\", \"nuxtdev.xyz\"],\n    sites: ['jobs']\n  },\n})",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "orderedList",
                    "attrs": {
                        "start": 5
                    },
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "If you want to custom domain for each tenant route, configure the ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "customDomains",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " property a map with key of domain and value of mapping tenant route. For example: ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "nuxtnews.com",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " to ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "news",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "code"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " route.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "export default defineNuxtConfig({\n  modules: ['nuxt-multi-tenancy'],\n  multiTenancy: {\n    tenantDynamicRoute: 'site',\n    rootDomains: [\"nuxtdev.local\", \"nuxtdev.xyz\"],\n    customDomains: {\n      \"nuxtnews.com\": \"news\"\n    }\n  },\n})",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Options",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Configure Nuxt Multi-tenancy module with the ",
                            "type": "text"
                        },
                        {
                            "text": "multiTenancy",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " property.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "export default defineNuxtConfig({\n  modules: ['nuxt-multi-tenancy'],\n  // default options\n  multiTenancy: {\n    tenantDynamicRoute: 'site',\n    rootDomains: [\"nuxtdev.local\", \"nuxtdev.xyz\"],\n    sites: [],\n    customDomains: {},\n  },\n})",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "useTenant composition API",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Use useTenant() to get the tenant ID",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "import { useTenant } from '#imports'\nconst tenant = useTenant()",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Development",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "# Install dependencies\nyarn install\n\n# Generate type stubs\nyarn dev:prepare\n\n# Develop with the playground\nyarn dev\n\n# Build the playground\nyarn dev:build\n\n# Run ESLint\nyarn lint\n\n# Run Vitest\nyarn test\nyarn test:watch\n\n# Release new version\nyarn release",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Demo",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "You can view the demo at ",
                            "type": "text"
                        },
                        {
                            "text": "nuxtdev.xyz",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "nofollow",
                                        "href": "https://nuxtdev.xyz/",
                                        "class": null,
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Features:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "A home page to list top first 30 articles from dev.to",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Tenant detail page. For example: ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "The Dev Team organization",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "nofollow",
                                                        "href": "https://devteam.nuxtdev.xyz/",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "A custom static tenant page. For example: ",
                                            "type": "text"
                                        },
                                        {
                                            "text": "VueJobs",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "nofollow",
                                                        "href": "https://jobs.nuxtdev.xyz/",
                                                        "class": null,
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "An article detail page",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Github repository: ",
                            "type": "text"
                        },
                        {
                            "text": "https://github.com/hieuhani/nuxt-multi-tenancy",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener noreferrer nofollow",
                                        "href": "https://github.com/hieuhani/nuxt-multi-tenancy",
                                        "class": null,
                                        "target": "_blank"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 1,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "Comprehensive Nuxt module to build multi tenancy website",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/bzU1TDtP2vlo1US0RqBJb92NPrCv8jnbeLVWOAdNtjreoR24wjfGUUg5GaTwWozZFVrU6H29R_tak44GwX_CbQ1KCoFVXkhQnnxvw08KIdQ9?publiz-file-id=10",
                "width": 1000,
                "height": 562,
                "blurHash": "U25}pxxu00Rj~qofD%RjIUj[%Mof00Rj~qt7",
                "fileName": "nuxt-multi-tenancy.jpg",
                "fileSize": "41006"
            }
        },
        "createdAt": "2024-05-07T10:41:16.617Z",
        "updatedAt": "2024-05-07T10:41:16.617Z",
        "author": {
            "id": 1,
            "displayName": "Hieu Tran Duc",
            "metadata": {
                "cover": {
                    "src": "https://lh3.googleusercontent.com/ZAqQixeEOXcSxeiz1J84RGuUAVl6tF_86uw60GSjhUcWJkjRBe3n7vOhm98WAyvHSnd32MymfwAZyN-ALCda1K_8jj-JHrL9ETVHrzT1sgc?publiz-file-id=32"
                },
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/QnVRmNePHsrbFJvyEbtdHDuJ0xA4HlKcgVtJsMx7MO_TyJrh1ewX9fU4N728I9QNowgFTwLjiOVgXTi1iyjTdBNVnTOhZlLOw5tjWMcoMzo?publiz-file-id=22"
                }
            }
        }
    },
    {
        "id": 3,
        "title": "Build infrastructure with Terraform and Packer on AWS EC2 to run your Docker application",
        "content": "<p>This is a hands-on tutorial to help you deploy a web service or application to AWS EC2 and configure Cloudflare to manage your domain fully automated infrastructure with Terraform, Docker, and Github Actions.</p><img src=\"https://lh3.googleusercontent.com/7PKDQLzlgUcAW6xK5_WVZMUhwxSleW22rp9L20socLWXXltxeIFbxf8y6m9GXVM0v7fJ4IMPzv5PluWnpp0Yjw0v7tP0BgskgZLFTzTw1-w?publiz-file-id=7\" data-width=\"1400\" data-height=\"934\" data-blur-hash=\"\" alt=\"\" data-file-name=\"0*a8GyjgPc-5oivt2-\" data-file-size=\"250862\"><p>Photo by <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://unsplash.com/@switch_dtp_fotografie?utm_source=medium&amp;utm_medium=referral\"><u>Lucas van Oort</u></a> on <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://unsplash.com/?utm_source=medium&amp;utm_medium=referral\"><u>Unsplash</u></a></p><p>This tutorial is suitable for developers who want to deploy the application to the server for testing or small production scale purpose only, but you can adopt or improve any part as your needs. The application will be running in a single EC2 instance.</p><p>Before you start this tutorial, you may want to check the prerequisites to follow this tutorial:</p><ul><li><p>AWS account: you can register for the free tier, we will use AWS to host the custom AMI and create an EC2 instance (t2.nano or t2.micro is just fine).</p></li><li><p>Docker Hub: we use Docker hub for hosting our application image, you might want to use Amazon ECR but the free-tier is allowed to get 500MB-month for one year.</p></li><li><p>Cloudflare account: we use Cloudflare to manage our domain DNS records as well as an inbound proxy.</p></li></ul><p>Some software you need to install on your machine:</p><ul><li><p><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html\"><u>AWS CLI</u></a>: It’s necessary for provisioning the EC2 instance and uploading Amazon AMI.</p></li><li><p><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://learn.hashicorp.com/tutorials/terraform/install-cli\"><u>Terraform</u></a>: We will use our local Terraform CLI to try and develop the TF script.</p></li><li><p><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://learn.hashicorp.com/tutorials/packer/get-started-install-cli\"><u>Packer</u></a>: We use Packer to build the machine image for OS and dependencies.</p></li><li><p><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://docs.docker.com/engine/install/\"><u>Docker</u></a>: To build and run your Docker image.</p></li></ul><p>You can use your existing or create a new project directory, the overall structure could look like:</p><pre><code>├── backend\n│   ├── Dockerfile\n│   ├── app\n│   │   ├── __init__.py\n│   │   └── main.py\n│   └── pyproject.toml\n└── infrastructure\n    ├── packer\n    │   └── aws-docker.pkr.hcl\n    └── terraform\n        ├── main.tf\n        ├── terraform.tfvars\n        ├── variables.tf\n        └── versions.tf</code></pre><p>No need to care about the backend folder, I put it there for the demonstration purpose only.</p><h1><strong>Write Terraform configuration</strong></h1><p>By default, Terraform will load all *.tf files to load the configuration, you can totally write all configurations in a single <code>main.tf</code> file, but here I would want to split into multiple files to help easier to maintain.</p><p>At first, we create a <code>versions.tf</code> file to maintain Terraform providers using this snippet:</p><pre><code>terraform {\n  required_providers {\n    aws = {\n      source = &quot;hashicorp/aws&quot;\n    }\n    cloudflare = {\n      source = &quot;cloudflare/cloudflare&quot;\n    }\n  }\n  required_version = &quot;&gt;= 0.14.9&quot;\n}</code></pre><p>Here we are using <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://registry.terraform.io/providers/hashicorp/aws/latest/docs\"><u>AWS</u></a> and <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs\"><u>Cloudflare</u></a> providers. You can omit Cloudflare providers if you don’t intend to use Cloudflare to manage your DNS record.</p><p>Next, we create a <code>main.tf</code> file to manage resources and configurations for Terraform:</p><pre><code>provider &quot;aws&quot; {\n  region = &quot;ap-southeast-1&quot; # aws region\n}provider &quot;cloudflare&quot; {\n  email     = &quot;your_account@cloudflare.com&quot; # cloudflare email\n  api_token = &quot;cloudflare_api_token&quot; # cloudflare api token\n}</code></pre><p>For the AWS provider, I would recommend declaring the default region. For full AWS provider reference, please check <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://registry.terraform.io/providers/hashicorp/aws/latest/docs#argument-reference\"><u>here</u></a>.</p><p>For the Cloudflare provider, let’s take a look at the reference <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs#argument-reference\"><u>here</u></a>.</p><h2><strong>Using Packer to build Amazon AMI</strong></h2><p>Next, we will create an EC2 instance resource, this is the server to run our Docker application, we can choose any OS that supports Docker but here I’d like to use Ubuntu with Docker installed. We will use the aws_instance resource to manage this action. You might want to check the full reference of aws_instance resource <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance\"><u>here</u></a>. The aws_instance resource requires AMI to use for the instance, AMI is Amazon Machines Images you might see it when you launch a new EC2 instance on AWS console.</p><img src=\"https://lh3.googleusercontent.com/70PdhMJCIxZEqz1gYZUe8Hwe-8oc8MYV_5LuCAL52q4jyL1vri3GFB0ITKCbuBOSUsjOqfyFNcjJ1DQcURWbTxk-VnTMu3bsxv8Co9AqWiii-A?publiz-file-id=8\" data-width=\"1085\" data-height=\"856\" data-blur-hash=\"\" alt=\"\" data-file-name=\"1*MJvfCe8lrZLfNXis_i2_cg.png\" data-file-size=\"273551\"><p>Because we use Docker to run the application, you can search for an AMI by Docker, there are some available AMIs that installed Docker, but almost all of them are Deep Learning AMIs and that installed a lot of extra stuff and they are not available for free-tier. To solve this, I would propose to use <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://www.packer.io/\"><u>Packer</u></a> to build the AWS AMI that is based on Ubuntu and install Docker.</p><p>Create a new directory: <code>packer</code> then create a <code>ubuntu-docker.pkr.hcl</code> file with this snippet:</p><pre><code>packer {\n  required_plugins {\n    amazon = {\n      version = &quot;&gt;= 0.0.1&quot;\n      source  = &quot;github.com/hashicorp/amazon&quot;\n    }\n  }\n}source &quot;amazon-ebs&quot; &quot;ubuntu&quot; {\n  ami_name      = &quot;packer-docker-aws&quot;\n  instance_type = &quot;t2.nano&quot;\n  region        = &quot;ap-southeast-1&quot;\n  source_ami_filter {\n    filters = {\n      name                = &quot;ubuntu/images/*ubuntu-focal-20.04-amd64-server-*&quot;\n      root-device-type    = &quot;ebs&quot;\n      virtualization-type = &quot;hvm&quot;\n    }\n    most_recent = true\n    owners      = [&quot;099720109477&quot;]\n  }\n  ssh_username = &quot;ubuntu&quot;\n}build {\n  sources = [\n    &quot;source.amazon-ebs.ubuntu&quot;\n  ]\n  provisioner &quot;shell&quot; {\n    inline = [\n      &quot;sudo apt-get update&quot;,\n      &quot;sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common&quot;,\n      &quot;curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -&quot;,\n      &quot;sudo add-apt-repository &apos;deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable&apos;&quot;,\n      &quot;sudo apt-get update&quot;,\n      &quot;sudo apt-get install -y docker-ce&quot;,\n      &quot;sudo usermod -aG docker ubuntu&quot;,\n    ]\n  }\n}</code></pre><p>The syntax is similar with Terraform because they use HCL and you can check <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://learn.hashicorp.com/tutorials/packer/aws-get-started-build-image\"><u>this tutorial</u></a> to learn more about the Packer configuration, they explain every block in detail. But I would want to highlight some blocks.</p><p>Source block <code>amazon-ebs</code> is one of Amazon AMI builder types, it is EBS-backed AMIs and generally recommended by Amazon. You can check more AMI Builders <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://www.packer.io/docs/builders/amazon\"><u>here</u></a>. In the <code>amazon-ebs</code> configuration block, it is required to choose <code>instance_type</code> which is <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://aws.amazon.com/ec2/instance-types/\"><u>EC2 instance type</u></a> to use <strong>while building</strong> the AMI. The second required field is <code>source_ami</code> but we can use <code>source_ami_filter</code> to filter then populate. The full reference for the filter you can take a look <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeImages.html\"><u>here</u></a>.</p><p>Next, you will add a provisioner to the template, this allows you to completely automate modifications to the machine image, you have options to use shell scripts, file uploads, or integrations with any modern configuration management tools such as Chef, Puppet, or Ansible… you can take the full available options <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://www.packer.io/docs/provisioners\"><u>here</u></a>. In the snippet above, we use <code>shell</code> to install Docker.</p><p>Now, we initialize the Packer template</p><pre><code>packer init .</code></pre><p>Build the image with the provisioner. This process also publishes the AMI to AWS, so make sure that you have installed and configured AWS CLI with the account that is granted enough permissions to complete this task. You can refer to <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://www.packer.io/docs/builders/amazon#iam-task-or-instance-role\"><u>this policy document</u></a> to update the Amazon IAM user group permissions. To me, I used: <code>AmazonEC2FullAccess</code></p><pre><code>packer build ubuntu-docker.pkr.hcl</code></pre><p>You can check the log to see what’s going on, generally, the steps for AWS AMI builder are:</p><ul><li><p>Finding the base AMI</p></li><li><p>Creating the keypair and it is assigned to a security group</p></li><li><p>Launching an AWS instance</p></li><li><p>Authorizing access by the key pair created by the last step</p></li><li><p>Executing the inline shell script</p></li><li><p>Stopping the AWS instance</p></li><li><p>Creating AMI</p></li><li><p>Cleaning up temporary files</p></li></ul><p>In the output, you will see the AMI ID, you can visit the AWS AMI page to verify that Packer successfully built your AMI.</p><img src=\"https://lh3.googleusercontent.com/64BRyrbgUtMLB3eYK_n8QiECEKbipivFLNOeowJ5OF64DYpaxI1g4CxioUa-W6n6JPO_mrhv0hGCdsPPXzVMthZdCh_pY9fvHav3SfA3BkzyVw?publiz-file-id=9\" data-width=\"1146\" data-height=\"915\" data-blur-hash=\"Ui9[ZblCs:o#OwWBaIWBW?n#oIj[aeR*R+WX\" alt=\"\" data-file-name=\"1*Y2c-PGNCA36lxncSgbO6ug.png\" data-file-size=\"144872\"><p>Next, now we have our necessary AMI and come back to <code>terraform/main.tf</code> file and add this snippet:</p><pre><code>resource &quot;aws_instance&quot; &quot;your_server&quot; {\n  ami           = &quot;&lt;replace_your_ami_here&gt;&quot;\n  instance_type = &quot;t2.nano&quot;\n  tags = {\n    Name = &quot;YourServerInstance&quot;\n  }\n}output &quot;instance_ip&quot; {\n  description = &quot;The public ip for ssh access&quot;\n  value       = aws_instance.your_server.public_ip\n}</code></pre><p>Initialize Terraform with this command</p><pre><code>terraform init</code></pre><p>You can use <code>terraform fmt</code> to format your HCL code then <code>terraform validate</code> to validate your configuration. You might want to use <code>terraform plan</code> to review your infrastructure.</p><p>Now we can roll out our infrastructure with this command</p><pre><code>terraform apply</code></pre><p>In the shell, you will see the plan and the question to ask you for the confirmation to act type <code>yes</code> to approve.</p><p>If the message shows <code>Apply complete!</code> you’ve now created infrastructure successfully. You can visit the AWS console to see your running EC2 instance running.</p><p>Now, we have the running EC2 instance, you might ask how to access the newly created instance?</p><p>That is a valid question, we have to do more 2 extra steps:</p><h2><strong>Add an authorized ssh key</strong></h2><p>We need to add a key pair to access to EC2 instance by using the<a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair\"><u> aws_key_pair resource</u></a>. Open <code>terraform/main.tf</code> and add this snippet:</p><pre><code>resource &quot;aws_key_pair&quot; &quot;deployer&quot; {\n  key_name   = &quot;deployer-key&quot;\n  public_key = &quot;&lt;replace_with_your_public_key&gt;&quot;\n}</code></pre><p>You can check the specification of the key format in the <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#how-to-generate-your-own-key-and-import-it-to-aws\"><u>AWS documentation</u></a>. Here I will assume that you installed Git and ssh-keygen utility. To access the EC2 instance from your computer, you can get the public key by:</p><pre><code>cat ~/.ssh/id_rsa.pub</code></pre><p>If <code>id_rsa.pub</code> is not available, you can type <code>ssh-keygen</code> to generate the new one. It is as simple as copying the public key to Github to check out the code by SSH.</p><p>Back to modify the aws_instance resource, we have to add to key name, now the aws_instance block should be:</p><pre><code>resource &quot;aws_instance&quot; &quot;your_server&quot; {\n  ami           = &quot;&lt;replace_your_ami_here&gt;&quot;\n  instance_type = &quot;t2.nano&quot;\n  key_name      = &quot;deployer-key&quot;\n  tags = {\n    Name = &quot;YourServerInstance&quot;\n  }\n}</code></pre><h2><strong>Update the security group to allow inbound access by port 22</strong></h2><p>You can config the access by using the <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group_rule\"><u>aws_security_group_rule resource</u></a>. But for simplifying, we can access Security Groups in the AWS console to edit the inbound rules to allow accessing port 22. In this configuration screen, you might want to update the inbound rule for your application to make it accessible. Normally you can set it to allow HTTP access (port 80), later in this post, we will config Cloudflare to manage our DNS record, SSL Support, or if you want to use Cloudflare proxy, please refer to <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://support.cloudflare.com/hc/en-us/articles/200169156-Identifying-network-ports-compatible-with-Cloudflare-s-proxy\"><u>this documentation</u></a> to choose the port.</p><p>Yay, now you can just type <code>terraform apply</code> then <code>yes</code> to approve the changes.</p><p>(Updating)</p><p>You can get the full sample project here: <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://github.com/hieuhani/terraform-docker-aws-bootstrap\"><u>https://github.com/hieuhani/terraform-docker-aws-bootstrap</u></a></p>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "This is a hands-on tutorial to help you deploy a web service or application to AWS EC2 and configure Cloudflare to manage your domain fully automated infrastructure with Terraform, Docker, and Github Actions.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/7PKDQLzlgUcAW6xK5_WVZMUhwxSleW22rp9L20socLWXXltxeIFbxf8y6m9GXVM0v7fJ4IMPzv5PluWnpp0Yjw0v7tP0BgskgZLFTzTw1-w?publiz-file-id=7",
                        "width": 1400,
                        "height": 934,
                        "blurHash": "",
                        "fileName": "0*a8GyjgPc-5oivt2-",
                        "fileSize": "250862"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Photo by ",
                            "type": "text"
                        },
                        {
                            "text": "Lucas van Oort",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://unsplash.com/@switch_dtp_fotografie?utm_source=medium&utm_medium=referral",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " on ",
                            "type": "text"
                        },
                        {
                            "text": "Unsplash",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://unsplash.com/?utm_source=medium&utm_medium=referral",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "This tutorial is suitable for developers who want to deploy the application to the server for testing or small production scale purpose only, but you can adopt or improve any part as your needs. The application will be running in a single EC2 instance.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Before you start this tutorial, you may want to check the prerequisites to follow this tutorial:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "AWS account: you can register for the free tier, we will use AWS to host the custom AMI and create an EC2 instance (t2.nano or t2.micro is just fine).",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Docker Hub: we use Docker hub for hosting our application image, you might want to use Amazon ECR but the free-tier is allowed to get 500MB-month for one year.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Cloudflare account: we use Cloudflare to manage our domain DNS records as well as an inbound proxy.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Some software you need to install on your machine:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "AWS CLI",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener ugc nofollow",
                                                        "href": "https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html",
                                                        "class": "az xs",
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": It’s necessary for provisioning the EC2 instance and uploading Amazon AMI.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Terraform",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener ugc nofollow",
                                                        "href": "https://learn.hashicorp.com/tutorials/terraform/install-cli",
                                                        "class": "az xs",
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": We will use our local Terraform CLI to try and develop the TF script.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Packer",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener ugc nofollow",
                                                        "href": "https://learn.hashicorp.com/tutorials/packer/get-started-install-cli",
                                                        "class": "az xs",
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": We use Packer to build the machine image for OS and dependencies.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Docker",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "link",
                                                    "attrs": {
                                                        "rel": "noopener ugc nofollow",
                                                        "href": "https://docs.docker.com/engine/install/",
                                                        "class": "az xs",
                                                        "target": "_blank"
                                                    }
                                                },
                                                {
                                                    "type": "underline"
                                                }
                                            ]
                                        },
                                        {
                                            "text": ": To build and run your Docker image.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "You can use your existing or create a new project directory, the overall structure could look like:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "├── backend\n│   ├── Dockerfile\n│   ├── app\n│   │   ├── __init__.py\n│   │   └── main.py\n│   └── pyproject.toml\n└── infrastructure\n    ├── packer\n    │   └── aws-docker.pkr.hcl\n    └── terraform\n        ├── main.tf\n        ├── terraform.tfvars\n        ├── variables.tf\n        └── versions.tf",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "No need to care about the backend folder, I put it there for the demonstration purpose only.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 1
                    },
                    "content": [
                        {
                            "text": "Write Terraform configuration",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "By default, Terraform will load all *.tf files to load the configuration, you can totally write all configurations in a single ",
                            "type": "text"
                        },
                        {
                            "text": "main.tf",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " file, but here I would want to split into multiple files to help easier to maintain.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "At first, we create a ",
                            "type": "text"
                        },
                        {
                            "text": "versions.tf",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " file to maintain Terraform providers using this snippet:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "terraform {\n  required_providers {\n    aws = {\n      source = \"hashicorp/aws\"\n    }\n    cloudflare = {\n      source = \"cloudflare/cloudflare\"\n    }\n  }\n  required_version = \">= 0.14.9\"\n}",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Here we are using ",
                            "type": "text"
                        },
                        {
                            "text": "AWS",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://registry.terraform.io/providers/hashicorp/aws/latest/docs",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " and ",
                            "type": "text"
                        },
                        {
                            "text": "Cloudflare",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " providers. You can omit Cloudflare providers if you don’t intend to use Cloudflare to manage your DNS record.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Next, we create a ",
                            "type": "text"
                        },
                        {
                            "text": "main.tf",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " file to manage resources and configurations for Terraform:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "provider \"aws\" {\n  region = \"ap-southeast-1\" # aws region\n}provider \"cloudflare\" {\n  email     = \"your_account@cloudflare.com\" # cloudflare email\n  api_token = \"cloudflare_api_token\" # cloudflare api token\n}",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "For the AWS provider, I would recommend declaring the default region. For full AWS provider reference, please check ",
                            "type": "text"
                        },
                        {
                            "text": "here",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://registry.terraform.io/providers/hashicorp/aws/latest/docs#argument-reference",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ".",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "For the Cloudflare provider, let’s take a look at the reference ",
                            "type": "text"
                        },
                        {
                            "text": "here",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs#argument-reference",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ".",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Using Packer to build Amazon AMI",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Next, we will create an EC2 instance resource, this is the server to run our Docker application, we can choose any OS that supports Docker but here I’d like to use Ubuntu with Docker installed. We will use the aws_instance resource to manage this action. You might want to check the full reference of aws_instance resource ",
                            "type": "text"
                        },
                        {
                            "text": "here",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ". The aws_instance resource requires AMI to use for the instance, AMI is Amazon Machines Images you might see it when you launch a new EC2 instance on AWS console.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/70PdhMJCIxZEqz1gYZUe8Hwe-8oc8MYV_5LuCAL52q4jyL1vri3GFB0ITKCbuBOSUsjOqfyFNcjJ1DQcURWbTxk-VnTMu3bsxv8Co9AqWiii-A?publiz-file-id=8",
                        "width": 1085,
                        "height": 856,
                        "blurHash": "",
                        "fileName": "1*MJvfCe8lrZLfNXis_i2_cg.png",
                        "fileSize": "273551"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Because we use Docker to run the application, you can search for an AMI by Docker, there are some available AMIs that installed Docker, but almost all of them are Deep Learning AMIs and that installed a lot of extra stuff and they are not available for free-tier. To solve this, I would propose to use ",
                            "type": "text"
                        },
                        {
                            "text": "Packer",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://www.packer.io/",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " to build the AWS AMI that is based on Ubuntu and install Docker.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Create a new directory: ",
                            "type": "text"
                        },
                        {
                            "text": "packer",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " then create a ",
                            "type": "text"
                        },
                        {
                            "text": "ubuntu-docker.pkr.hcl",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " file with this snippet:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "packer {\n  required_plugins {\n    amazon = {\n      version = \">= 0.0.1\"\n      source  = \"github.com/hashicorp/amazon\"\n    }\n  }\n}source \"amazon-ebs\" \"ubuntu\" {\n  ami_name      = \"packer-docker-aws\"\n  instance_type = \"t2.nano\"\n  region        = \"ap-southeast-1\"\n  source_ami_filter {\n    filters = {\n      name                = \"ubuntu/images/*ubuntu-focal-20.04-amd64-server-*\"\n      root-device-type    = \"ebs\"\n      virtualization-type = \"hvm\"\n    }\n    most_recent = true\n    owners      = [\"099720109477\"]\n  }\n  ssh_username = \"ubuntu\"\n}build {\n  sources = [\n    \"source.amazon-ebs.ubuntu\"\n  ]\n  provisioner \"shell\" {\n    inline = [\n      \"sudo apt-get update\",\n      \"sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common\",\n      \"curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -\",\n      \"sudo add-apt-repository 'deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable'\",\n      \"sudo apt-get update\",\n      \"sudo apt-get install -y docker-ce\",\n      \"sudo usermod -aG docker ubuntu\",\n    ]\n  }\n}",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "The syntax is similar with Terraform because they use HCL and you can check ",
                            "type": "text"
                        },
                        {
                            "text": "this tutorial",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://learn.hashicorp.com/tutorials/packer/aws-get-started-build-image",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " to learn more about the Packer configuration, they explain every block in detail. But I would want to highlight some blocks.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Source block ",
                            "type": "text"
                        },
                        {
                            "text": "amazon-ebs",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " is one of Amazon AMI builder types, it is EBS-backed AMIs and generally recommended by Amazon. You can check more AMI Builders ",
                            "type": "text"
                        },
                        {
                            "text": "here",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://www.packer.io/docs/builders/amazon",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ". In the ",
                            "type": "text"
                        },
                        {
                            "text": "amazon-ebs",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " configuration block, it is required to choose ",
                            "type": "text"
                        },
                        {
                            "text": "instance_type",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " which is ",
                            "type": "text"
                        },
                        {
                            "text": "EC2 instance type",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://aws.amazon.com/ec2/instance-types/",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " to use ",
                            "type": "text"
                        },
                        {
                            "text": "while building",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        },
                        {
                            "text": " the AMI. The second required field is ",
                            "type": "text"
                        },
                        {
                            "text": "source_ami",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " but we can use ",
                            "type": "text"
                        },
                        {
                            "text": "source_ami_filter",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " to filter then populate. The full reference for the filter you can take a look ",
                            "type": "text"
                        },
                        {
                            "text": "here",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeImages.html",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ".",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Next, you will add a provisioner to the template, this allows you to completely automate modifications to the machine image, you have options to use shell scripts, file uploads, or integrations with any modern configuration management tools such as Chef, Puppet, or Ansible… you can take the full available options ",
                            "type": "text"
                        },
                        {
                            "text": "here",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://www.packer.io/docs/provisioners",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ". In the snippet above, we use ",
                            "type": "text"
                        },
                        {
                            "text": "shell",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " to install Docker.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Now, we initialize the Packer template",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "packer init .",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Build the image with the provisioner. This process also publishes the AMI to AWS, so make sure that you have installed and configured AWS CLI with the account that is granted enough permissions to complete this task. You can refer to ",
                            "type": "text"
                        },
                        {
                            "text": "this policy document",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://www.packer.io/docs/builders/amazon#iam-task-or-instance-role",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " to update the Amazon IAM user group permissions. To me, I used: ",
                            "type": "text"
                        },
                        {
                            "text": "AmazonEC2FullAccess",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "packer build ubuntu-docker.pkr.hcl",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "You can check the log to see what’s going on, generally, the steps for AWS AMI builder are:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Finding the base AMI",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Creating the keypair and it is assigned to a security group",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Launching an AWS instance",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Authorizing access by the key pair created by the last step",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Executing the inline shell script",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Stopping the AWS instance",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Creating AMI",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Cleaning up temporary files",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "In the output, you will see the AMI ID, you can visit the AWS AMI page to verify that Packer successfully built your AMI.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/64BRyrbgUtMLB3eYK_n8QiECEKbipivFLNOeowJ5OF64DYpaxI1g4CxioUa-W6n6JPO_mrhv0hGCdsPPXzVMthZdCh_pY9fvHav3SfA3BkzyVw?publiz-file-id=9",
                        "width": 1146,
                        "height": 915,
                        "blurHash": "Ui9[ZblCs:o#OwWBaIWBW?n#oIj[aeR*R+WX",
                        "fileName": "1*Y2c-PGNCA36lxncSgbO6ug.png",
                        "fileSize": "144872"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Next, now we have our necessary AMI and come back to ",
                            "type": "text"
                        },
                        {
                            "text": "terraform/main.tf",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " file and add this snippet:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "resource \"aws_instance\" \"your_server\" {\n  ami           = \"<replace_your_ami_here>\"\n  instance_type = \"t2.nano\"\n  tags = {\n    Name = \"YourServerInstance\"\n  }\n}output \"instance_ip\" {\n  description = \"The public ip for ssh access\"\n  value       = aws_instance.your_server.public_ip\n}",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Initialize Terraform with this command",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "terraform init",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "You can use ",
                            "type": "text"
                        },
                        {
                            "text": "terraform fmt",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " to format your HCL code then ",
                            "type": "text"
                        },
                        {
                            "text": "terraform validate",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " to validate your configuration. You might want to use ",
                            "type": "text"
                        },
                        {
                            "text": "terraform plan",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " to review your infrastructure.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Now we can roll out our infrastructure with this command",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "terraform apply",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "In the shell, you will see the plan and the question to ask you for the confirmation to act type ",
                            "type": "text"
                        },
                        {
                            "text": "yes",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " to approve.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "If the message shows ",
                            "type": "text"
                        },
                        {
                            "text": "Apply complete!",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " you’ve now created infrastructure successfully. You can visit the AWS console to see your running EC2 instance running.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Now, we have the running EC2 instance, you might ask how to access the newly created instance?",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "That is a valid question, we have to do more 2 extra steps:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Add an authorized ssh key",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "We need to add a key pair to access to EC2 instance by using the",
                            "type": "text"
                        },
                        {
                            "text": " aws_key_pair resource",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ". Open ",
                            "type": "text"
                        },
                        {
                            "text": "terraform/main.tf",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " and add this snippet:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "resource \"aws_key_pair\" \"deployer\" {\n  key_name   = \"deployer-key\"\n  public_key = \"<replace_with_your_public_key>\"\n}",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "You can check the specification of the key format in the ",
                            "type": "text"
                        },
                        {
                            "text": "AWS documentation",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#how-to-generate-your-own-key-and-import-it-to-aws",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ". Here I will assume that you installed Git and ssh-keygen utility. To access the EC2 instance from your computer, you can get the public key by:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "cat ~/.ssh/id_rsa.pub",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "If ",
                            "type": "text"
                        },
                        {
                            "text": "id_rsa.pub",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " is not available, you can type ",
                            "type": "text"
                        },
                        {
                            "text": "ssh-keygen",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " to generate the new one. It is as simple as copying the public key to Github to check out the code by SSH.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Back to modify the aws_instance resource, we have to add to key name, now the aws_instance block should be:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "codeBlock",
                    "attrs": {
                        "language": null
                    },
                    "content": [
                        {
                            "text": "resource \"aws_instance\" \"your_server\" {\n  ami           = \"<replace_your_ami_here>\"\n  instance_type = \"t2.nano\"\n  key_name      = \"deployer-key\"\n  tags = {\n    Name = \"YourServerInstance\"\n  }\n}",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Update the security group to allow inbound access by port 22",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "You can config the access by using the ",
                            "type": "text"
                        },
                        {
                            "text": "aws_security_group_rule resource",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group_rule",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ". But for simplifying, we can access Security Groups in the AWS console to edit the inbound rules to allow accessing port 22. In this configuration screen, you might want to update the inbound rule for your application to make it accessible. Normally you can set it to allow HTTP access (port 80), later in this post, we will config Cloudflare to manage our DNS record, SSL Support, or if you want to use Cloudflare proxy, please refer to ",
                            "type": "text"
                        },
                        {
                            "text": "this documentation",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://support.cloudflare.com/hc/en-us/articles/200169156-Identifying-network-ports-compatible-with-Cloudflare-s-proxy",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " to choose the port.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Yay, now you can just type ",
                            "type": "text"
                        },
                        {
                            "text": "terraform apply",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " then ",
                            "type": "text"
                        },
                        {
                            "text": "yes",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "code"
                                }
                            ]
                        },
                        {
                            "text": " to approve the changes.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "(Updating)",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "You can get the full sample project here: ",
                            "type": "text"
                        },
                        {
                            "text": "https://github.com/hieuhani/terraform-docker-aws-bootstrap",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://github.com/hieuhani/terraform-docker-aws-bootstrap",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 1,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "This is a hands-on tutorial to help you deploy a web service or application to AWS EC2 and configure Cloudflare to manage your domain fully automated infrastructure with Terraform, Docker, and Github Actions.",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/7PKDQLzlgUcAW6xK5_WVZMUhwxSleW22rp9L20socLWXXltxeIFbxf8y6m9GXVM0v7fJ4IMPzv5PluWnpp0Yjw0v7tP0BgskgZLFTzTw1-w?publiz-file-id=7",
                "width": 1400,
                "height": 934,
                "blurHash": "",
                "fileName": "0*a8GyjgPc-5oivt2-",
                "fileSize": "250862"
            }
        },
        "createdAt": "2024-05-05T10:01:13.052Z",
        "updatedAt": "2024-05-05T10:01:13.052Z",
        "author": {
            "id": 1,
            "displayName": "Hieu Tran Duc",
            "metadata": {
                "cover": {
                    "src": "https://lh3.googleusercontent.com/ZAqQixeEOXcSxeiz1J84RGuUAVl6tF_86uw60GSjhUcWJkjRBe3n7vOhm98WAyvHSnd32MymfwAZyN-ALCda1K_8jj-JHrL9ETVHrzT1sgc?publiz-file-id=32"
                },
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/QnVRmNePHsrbFJvyEbtdHDuJ0xA4HlKcgVtJsMx7MO_TyJrh1ewX9fU4N728I9QNowgFTwLjiOVgXTi1iyjTdBNVnTOhZlLOw5tjWMcoMzo?publiz-file-id=22"
                }
            }
        }
    },
    {
        "id": 2,
        "title": "Building your BFF with GraphQL",
        "content": "<p>Following the microservice architecture, we often have multiple API services and the developers need to ad-hoc integrate with them. This post is about using GraphQL to create a backend for the front end as a unified aggregation layer at the edge.</p><img src=\"https://lh3.googleusercontent.com/B7Ey45ivJNOhnS3Qb5HD_FthCIGwHXWoSN6VyH7IGhgJEChSaDNJAFYNlQWbpl1lOBvo4QdT4UteMIML-OOH4AH4SDtnUcJl8zsW2xnMZM51UA?publiz-file-id=6\" data-width=\"1400\" data-height=\"933\" data-blur-hash=\"U5DRypp{~WyE0z^QS~nh014n4n=E}S9[M|s,\" alt=\"\" data-file-name=\"0*3b3TSIYl5YDAnu82\" data-file-size=\"337194\"><p>Photo by <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://unsplash.com/@inakihxz?utm_source=medium&amp;utm_medium=referral\"><u>Iñaki del Olmo</u></a> on <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://unsplash.com/?utm_source=medium&amp;utm_medium=referral\"><u>Unsplash</u></a></p><p>As a front-end developer, I love to focus on UI/UX and what the users see is a single monolithic product and they might not want to know about underlying APIs. Back-end developers often want to decouple the API layer. To achieve the dual goal, we can rely on GraphQL to build up a backend for the front end as an extra layer to consolidate and aggregate data from these API services and delivery to the front end side as a single endpoint.</p><p>Following the definition of BFF by Sam Newman and associates, the BFF is tightly coupled to a specific user experience and needs to aggregate multiple downstream calls to deliver user functionalities. Not to say nothing of we often have various clients such as web browser, mobile browser, iOS/Android application.</p><h1><strong>Why GraphQL?</strong></h1><p>GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.</p><h2><strong>Query for what you need</strong></h2><p>Each client has different perspectives about data shape, for example: getting user details (basic information, addresses, contacts…), the mobile version might have options to click to navigate to view the list of addresses or contacts, but in the web version with larger display area, it might display everything.</p><h2><strong>Multiple queries at once request</strong></h2><p>Sometimes we need to make multiple API calls and will choose to fetch the data sequentially or parallelly, more logic and round trips added. With GraphQL you can make many requests at once.</p><h2><strong>Static type generation</strong></h2><p>We can not avoid the benefit of static type when developing the application, that’s why TypeScript has been increasing in its popularity for the last couple of years. Some tools offer TypeScript definition code generation from the GraphQL queries <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://www.graphql-code-generator.com/\"><u>GraphQL Code Generator</u></a> or <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://github.com/apollographql/apollo-tooling\"><u>Apollo Codegen</u></a>.</p><h2><strong>Single source of truth for clients</strong></h2><p>We can choose to define all GraphQL schema before developing, the backend side could rely on the schema definition to develop, and the front end side can trust the data shape. Later when something needs to be changed from the other services, we have a less painful choice to patch the update.</p><h2><strong>Rapid prototype development</strong></h2><p>GraphQL has a single endpoint and the client can decide which data to get. We can think it’s like using raw queries to access the server database.</p><h2><strong>Self-documented</strong></h2><p>To build up a GraphQL service, we need to create the schema for everything from model definition to resolvers. As the schema is tightly coupled with the development code we will naturally update the docs.</p><h1><strong>GraphQL drawbacks</strong></h1><p>Since GraphQL has only one endpoint, it’s nearly impossible to rely on HTTP cache control as well as route-based authorization rules.</p><p>Almost all people can point out that using a single endpoint will lead to a bottleneck and we have to spend time to scale and maintain the availability for that. Luckily we can learn from <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"az xs\" href=\"https://netflixtechblog.com/how-netflix-scales-its-api-with-graphql-federation-part-1-ae3557c187e2\"><u>how Netflix scales its API with GraphQL federation</u></a>.</p><p>When applying GraphQL, people tend to migrate all other Restful APIs to GraphQL because using both of them feels weird for the perfectionist. Consequently, it always takes an extra workload for the development process.</p><p>When using GraphQL especially Apollo GraphQL, the client-side often comes with Apollo Client and it makes your client setup is more cumbersome.</p><p>A well-known problem when people explore GraphQL is N+1 queries, it’s the same as the ORM problem. Of course, we might hear about DataLoader as a data fetching layer to reduce requests by batching and caching but to me, I’d prefer to do an eager query.</p>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Following the microservice architecture, we often have multiple API services and the developers need to ad-hoc integrate with them. This post is about using GraphQL to create a backend for the front end as a unified aggregation layer at the edge.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/B7Ey45ivJNOhnS3Qb5HD_FthCIGwHXWoSN6VyH7IGhgJEChSaDNJAFYNlQWbpl1lOBvo4QdT4UteMIML-OOH4AH4SDtnUcJl8zsW2xnMZM51UA?publiz-file-id=6",
                        "width": 1400,
                        "height": 933,
                        "blurHash": "U5DRypp{~WyE0z^QS~nh014n4n=E}S9[M|s,",
                        "fileName": "0*3b3TSIYl5YDAnu82",
                        "fileSize": "337194"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Photo by ",
                            "type": "text"
                        },
                        {
                            "text": "Iñaki del Olmo",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://unsplash.com/@inakihxz?utm_source=medium&utm_medium=referral",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " on ",
                            "type": "text"
                        },
                        {
                            "text": "Unsplash",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://unsplash.com/?utm_source=medium&utm_medium=referral",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "As a front-end developer, I love to focus on UI/UX and what the users see is a single monolithic product and they might not want to know about underlying APIs. Back-end developers often want to decouple the API layer. To achieve the dual goal, we can rely on GraphQL to build up a backend for the front end as an extra layer to consolidate and aggregate data from these API services and delivery to the front end side as a single endpoint.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Following the definition of BFF by Sam Newman and associates, the BFF is tightly coupled to a specific user experience and needs to aggregate multiple downstream calls to deliver user functionalities. Not to say nothing of we often have various clients such as web browser, mobile browser, iOS/Android application.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 1
                    },
                    "content": [
                        {
                            "text": "Why GraphQL?",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Query for what you need",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Each client has different perspectives about data shape, for example: getting user details (basic information, addresses, contacts…), the mobile version might have options to click to navigate to view the list of addresses or contacts, but in the web version with larger display area, it might display everything.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Multiple queries at once request",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Sometimes we need to make multiple API calls and will choose to fetch the data sequentially or parallelly, more logic and round trips added. With GraphQL you can make many requests at once.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Static type generation",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "We can not avoid the benefit of static type when developing the application, that’s why TypeScript has been increasing in its popularity for the last couple of years. Some tools offer TypeScript definition code generation from the GraphQL queries ",
                            "type": "text"
                        },
                        {
                            "text": "GraphQL Code Generator",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://www.graphql-code-generator.com/",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " or ",
                            "type": "text"
                        },
                        {
                            "text": "Apollo Codegen",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://github.com/apollographql/apollo-tooling",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ".",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Single source of truth for clients",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "We can choose to define all GraphQL schema before developing, the backend side could rely on the schema definition to develop, and the front end side can trust the data shape. Later when something needs to be changed from the other services, we have a less painful choice to patch the update.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Rapid prototype development",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "GraphQL has a single endpoint and the client can decide which data to get. We can think it’s like using raw queries to access the server database.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Self-documented",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "To build up a GraphQL service, we need to create the schema for everything from model definition to resolvers. As the schema is tightly coupled with the development code we will naturally update the docs.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 1
                    },
                    "content": [
                        {
                            "text": "GraphQL drawbacks",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Since GraphQL has only one endpoint, it’s nearly impossible to rely on HTTP cache control as well as route-based authorization rules.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Almost all people can point out that using a single endpoint will lead to a bottleneck and we have to spend time to scale and maintain the availability for that. Luckily we can learn from ",
                            "type": "text"
                        },
                        {
                            "text": "how Netflix scales its API with GraphQL federation",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://netflixtechblog.com/how-netflix-scales-its-api-with-graphql-federation-part-1-ae3557c187e2",
                                        "class": "az xs",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ".",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "When applying GraphQL, people tend to migrate all other Restful APIs to GraphQL because using both of them feels weird for the perfectionist. Consequently, it always takes an extra workload for the development process.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "When using GraphQL especially Apollo GraphQL, the client-side often comes with Apollo Client and it makes your client setup is more cumbersome.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "A well-known problem when people explore GraphQL is N+1 queries, it’s the same as the ORM problem. Of course, we might hear about DataLoader as a data fetching layer to reduce requests by batching and caching but to me, I’d prefer to do an eager query.",
                            "type": "text"
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 1,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "Using GraphQL to create a backend for the front end as a unified aggregation layer at the edge",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/B7Ey45ivJNOhnS3Qb5HD_FthCIGwHXWoSN6VyH7IGhgJEChSaDNJAFYNlQWbpl1lOBvo4QdT4UteMIML-OOH4AH4SDtnUcJl8zsW2xnMZM51UA?publiz-file-id=6",
                "width": 1400,
                "height": 933,
                "blurHash": "",
                "fileName": "0*3b3TSIYl5YDAnu82",
                "fileSize": "337194"
            }
        },
        "createdAt": "2024-05-05T09:59:56.752Z",
        "updatedAt": "2024-05-05T09:59:56.752Z",
        "author": {
            "id": 1,
            "displayName": "Hieu Tran Duc",
            "metadata": {
                "cover": {
                    "src": "https://lh3.googleusercontent.com/ZAqQixeEOXcSxeiz1J84RGuUAVl6tF_86uw60GSjhUcWJkjRBe3n7vOhm98WAyvHSnd32MymfwAZyN-ALCda1K_8jj-JHrL9ETVHrzT1sgc?publiz-file-id=32"
                },
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/QnVRmNePHsrbFJvyEbtdHDuJ0xA4HlKcgVtJsMx7MO_TyJrh1ewX9fU4N728I9QNowgFTwLjiOVgXTi1iyjTdBNVnTOhZlLOw5tjWMcoMzo?publiz-file-id=22"
                }
            }
        }
    },
    {
        "id": 1,
        "title": "Client-to-microservice communication strategy in a nutshell",
        "content": "<p>In recent years, microservice architecture has been becoming popular and being widely adopted by many various companies. The outcome often comes with several API services. In most cases, the client-side should be the one to aggregate data from different API services to deliver a seamless experience to the end-user.</p><img src=\"https://lh3.googleusercontent.com/TAq74FfngAOHGEATyoCpKbnQtf44CVhv-tHj5oNEWQNAG_KMRau-xejDEOXvdLNo-gxNLRYnejGu7jxV51CMtblcXJpeeNyGNT4edYSt4hXAXg?publiz-file-id=1\" data-width=\"1400\" data-height=\"933\" data-blur-hash=\"\" alt=\"\" data-file-name=\"0*80e6YqsC74oQQQAZ\" data-file-size=\"82707\"><p>Photo by <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"af rq\" href=\"https://unsplash.com/@jasonrosewell?utm_source=medium&amp;utm_medium=referral\"><u>Jason Rosewell</u></a> on <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"af rq\" href=\"https://unsplash.com/?utm_source=medium&amp;utm_medium=referral\"><u>Unsplash</u></a></p><p>Before digging in, I would scope the terms using in this post:</p><ul><li><p><em>Client —</em> A client may be a SPA website, a server sider rending website, a mobile application, an IoT device, or other integration services… but we will focus on web and mobile applications.</p></li><li><p>Web service APIs — There are SOAP, RPC (JSON-RPC, XML RPC, gRPC), REST.</p></li><li><p>Realtime APIs techniques — There are HTTP Long polling, Websocket, WebRTC, MQTT…</p></li><li><p>Web rendering techniques — Client-side rendering (initialize with HTML and CSS then the content comes from Javascript), Server-side rendering (server responses an HTML string), Universal rendering (combine the best of both client-side rendering and server-side rendering)</p></li></ul><p>Choosing the technique to integrate clients and servers to use depends on the context of the application and these use cases. As a front end developer, we usually concern about:</p><ul><li><p>Service API endpoint: This will be the first question then are there multiple API endpoints or a single API endpoint?</p></li><li><p>Authentication: Cookies or JWT Bearer token?</p></li><li><p>Protocol: REST, RPC or do we need to support realtime with WebSocket or Long Polling?</p></li><li><p>Response data: What is the data interchange format is using? JSON or XML, gRPC? What about metadata conversion? Is the key field in the camel or snake case? What about data normalization?</p></li><li><p>Data synchronization: How we consolidate data from the server with client data?</p></li><li><p>Cooking data: when dealing with multiple data sources, we will need to compute derived data, but should that task is in server or client?</p></li></ul><p>In a microservice architecture, the communication between services is also the most important factor, and they may use different effective protocols, data formats and that maybe not friendly with web front end developer (gRPC for example) but to support the client, they might need to expose extra HTTP Restful endpoint. Each microservice exposes a set of fine-grained endpoints and this can impact client-to-microservice communication.</p><p>To easier catch up the problem, let’s imagine that we are developing a shopping application (I would get the example from <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"af rq\" href=\"https://www.nginx.com/blog/building-microservices-using-an-api-gateway/#product-details-scenario\"><u>this blog post</u></a>) and it’s likely that you need to implement a product details page.</p><img src=\"https://lh3.googleusercontent.com/7xVhfON79Tse3LJ07AVCnSNOuP7_6hmgl5dQe3O-rrW4xVXZ7LbgtggPBkEULXGAk0_BhaImBMAUlKhXAPge3Uma44xEUTbPfs1WxawYDvH8FQ?publiz-file-id=2\" data-width=\"640\" data-height=\"299\" data-blur-hash=\"\" alt=\"\" data-file-name=\"1*SzYE1SfHPQh_hao7wBuKNQ.png\" data-file-size=\"85452\"><p>This page does not only show the basic information such as name, description, price, but it may also show:</p><ul><li><p>Shopping cart items</p></li><li><p>Order history</p></li><li><p>Customer reviews</p></li><li><p>Inventory status</p></li><li><p>Shipping options</p></li><li><p>Promotion information</p></li><li><p>Product recommendation</p></li><li><p>…</p></li></ul><p>To have data to display this page in the microservice, the client has to communicate with:</p><ul><li><p>Shopping cart service — to get the information about a user cart, it is not all about the cart items, it may need just a number of items in the cart</p></li><li><p>Order service — to display the brief of order information, it may need just the last order time</p></li><li><p>Inventory service — to display the inventory status, but it also needs just the number of remaining items or it may ask the policy service to display the buying tag, such as: Out of stock or Contact or Available in different locations…</p></li><li><p>Shipping service — to display the information about the shipping option, it is also not everything in the shipping entity response.</p></li><li><p>Realtime promotion service — when you see the customer stays in this product too long and you want to encourage her to buy, a promotion may be distributed…</p></li><li><p>…</p></li></ul><p>I guess you may think in mind: Oh, just a simple page consumes data from so many data sources (API services) or the number of items in the cart is just a number, does it necessary to get the whole cart data? Will the cart service expose an endpoint just for returning the number of items in the cart? When we want to personalize data by some factors like a user gender, location, or age range…it is so messed up.</p><p>Now, it is enough background to get in, let’s look at 2 popular options.</p><h1><strong>Direct client-to-microservice communication</strong></h1><p>A client app can make requests directly to some of the microservices.</p><img src=\"https://lh3.googleusercontent.com/CvNDByOvH0rBAgeDc1iyoZXsI83WS1HpceS9XBuh92bO5m0JZvEGU_vxLIjkrpBtsv-LeOa4C-6pEm-2krbOIBZftYuRrzzJqveKl-wbOOhQ?publiz-file-id=3\" data-width=\"918\" data-height=\"537\" data-blur-hash=\"\" alt=\"\" data-file-name=\"1*ShUrqBepv_1bcYrUSz6ygg.png\" data-file-size=\"91955\"><p>Image credit: .NET microservices — Architecture e-book</p><p>This communication architecture could be good enough for a small microservice-based application. However, when you build large and complex applications as the example above, that approach faces a few issues.</p><p>Consider the following questions/issues when developing a large application based on microservices:</p><ul><li><p>How can client apps minimize the number of network requests to the backend and reduce chatty communication to multiple services?</p></li><li><p>What do we do when we need data from multiple dependant services?</p></li><li><p>How can client apps communicate with services that use non-Internet-friendly protocol?</p></li><li><p>The front end developers need to know multiple areas of the application are decomposed in microservices.</p></li><li><p>Too many round trips can result in multiple network round trips between the client and the server, adding significant latency.</p></li><li><p>Security issues also need to be a concern because all the microservices must be exposed to the ‘external world’, making the attack surface larger.</p></li></ul><h1><strong>API Gateway</strong></h1><h2><strong>Single API Gateway</strong></h2><p>This is a service that provides a single-entry point for certain groups of microservices. It’s similar to the <a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"af rq\" href=\"https://en.wikipedia.org/wiki/Facade_pattern\"><u>Facade pattern</u></a> from object-oriented design, but in this case, it’s part of a distributed system.</p><p>Therefore, the API gateway sits between the client and the microservices, it plays as a reverse proxy, routing requests to services and can also provide additional cross-cutting features such as authentication and cache.</p><img src=\"https://lh3.googleusercontent.com/kZcl1HhPs8Uoy_9OFb4SzawwAuq93IO6PtAPY3-B_tTrQaitu6kbulbE3MlA9I1MSlm7GGf6IH5077wa9gmcJLJawAwEVYmLHM0ZHo9dO2Uo?publiz-file-id=4\" data-width=\"1400\" data-height=\"812\" data-blur-hash=\"\" alt=\"\" data-file-name=\"1*2AGOO_t8enHH8HEGi3Vxrg.png\" data-file-size=\"280066\"><p>Image credit: .NET microservices — Architecture e-book</p><p>This API gateway will be growing and maybe bloated and could be similar to a monolithic service.</p><h2><strong>Multiple API Gateways</strong></h2><p>API Gateways should be segregated based on business boundaries. Or we can choose to develop a different API Gateway for different clients (mobile or web). In this case, we have a pattern “Backend for Frontend” (<a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"af rq\" href=\"https://samnewman.io/patterns/architectural/bff/\"><u>BFF</u></a>) where each API Gateway can provide a different API tailored for each client.</p><img src=\"https://lh3.googleusercontent.com/FWA7Fj63KE-MQRIN_fMPF2w6xggJjlEy5b30uaHg2QsL0FQDka286If9iipnK-nqlA5BM7NGRv4uqCrOJk9Ye25x5Lodrb1magXlZdjKvX0?publiz-file-id=5\" data-width=\"1400\" data-height=\"786\" data-blur-hash=\"UBK1zcD*D%-;t8~qa#D%?bM{RiRia#D%xuog\" alt=\"\" data-file-name=\"1*z9BnTrevOhTvr_QQY4CoNw.png\" data-file-size=\"302094\"><p>Image credit: .NET microservices — Architecture e-book</p><p>At Netflix, they have also adopted this pattern: the Backend for Frontend pattern per client (Android, iOS, TV, Web).</p><h2><strong>API Gateway drawbacks</strong></h2><ul><li><p>Creating an additional possible single point of failure</p></li><li><p>If not scaled out properly, the API gateway can become a bottleneck</p></li><li><p>Requiring additional development cost and future maintenance</p></li><li><p>It will slow down the team development if we do not prepare the adoption plan carefully</p></li></ul><p>Everything comes with pros and cons, especially choosing things not as simple as comparing the number of pros and cons, following the trend, or seeing others do that. To me, I tend to follow the core principle or the concept of how it works. Then I will choose if it matches the spirit or the strategic direction.</p><p><strong>Direct client-to-microservice communication — </strong>front-end developers need to spread tasks for API data integration from multiple services and developing UI/UX. This way is appropriate when the team skill is comprehensive, good in both data manipulation and aesthetic ability.</p><p><strong>API gateway </strong>is centralized management, API gateway has the ability to focus on what it does with a huge of supporting tools, the result is front end developers can focus on developing better UI/UX for end-user without requiring time for the complexity of data integration. This way is appropriate when we have a specialized team.</p><p>Next post I will write about using GraphQL to implement the BFF pattern. I choose GraphQL because the concept is very simple: instead of having multiple “dumb” endpoints, have a single “smart” endpoint that can take in complex queries, and then massage the data output into whatever shape the client requires.</p><h1><strong>References:</strong></h1><p><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"af rq\" href=\"https://docs.microsoft.com/en-us/dotnet/architecture/microservices/\"><u>.NET Microservices — Architecture e-book</u></a>: I use this resource for the concept and the standard term.</p><p><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"af rq\" href=\"https://www.nginx.com/blog/building-microservices-using-an-api-gateway/\"><u>Building Microservices: Using an API Gateway</u></a>: I follow this series to understand Microservice.</p><p><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"af rq\" href=\"https://www.researchgate.net/publication/319187656_Processes_Motivations_and_Issues_for_Migrating_to_Microservices_Architectures_An_Empirical_Investigation\"><u>Processes, Motivations, and Issues for Migrating to Microservices Architectures: An Empirical Investigation</u></a>: I refer to this paper for the numbers, statistics, of these researchers to avoid opinionated thinking.</p><p><a target=\"_blank\" rel=\"noopener\" class=\"af rq\" href=\"https://medium.com/walmartglobaltech/building-a-decoupled-architecture-to-optimize-our-mobile-apps-7bc4a0d6da37\"><u>Building a Decoupled Architecture to Optimize our Mobile Apps</u></a>: From Walmart, I can learn the cost of having a legacy architecture.</p><p><a target=\"_blank\" rel=\"noopener ugc nofollow\" class=\"af rq\" href=\"https://simplicable.com/new/smart-endpoints-and-dumb-pipes\"><u>Smart endpoints and dumb pipes design principle</u></a></p>",
        "contentJson": {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "In recent years, microservice architecture has been becoming popular and being widely adopted by many various companies. The outcome often comes with several API services. In most cases, the client-side should be the one to aggregate data from different API services to deliver a seamless experience to the end-user.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/TAq74FfngAOHGEATyoCpKbnQtf44CVhv-tHj5oNEWQNAG_KMRau-xejDEOXvdLNo-gxNLRYnejGu7jxV51CMtblcXJpeeNyGNT4edYSt4hXAXg?publiz-file-id=1",
                        "width": 1400,
                        "height": 933,
                        "blurHash": "",
                        "fileName": "0*80e6YqsC74oQQQAZ",
                        "fileSize": "82707"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Photo by ",
                            "type": "text"
                        },
                        {
                            "text": "Jason Rosewell",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://unsplash.com/@jasonrosewell?utm_source=medium&utm_medium=referral",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " on ",
                            "type": "text"
                        },
                        {
                            "text": "Unsplash",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://unsplash.com/?utm_source=medium&utm_medium=referral",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Before digging in, I would scope the terms using in this post:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Client —",
                                            "type": "text",
                                            "marks": [
                                                {
                                                    "type": "italic"
                                                }
                                            ]
                                        },
                                        {
                                            "text": " A client may be a SPA website, a server sider rending website, a mobile application, an IoT device, or other integration services… but we will focus on web and mobile applications.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Web service APIs — There are SOAP, RPC (JSON-RPC, XML RPC, gRPC), REST.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Realtime APIs techniques — There are HTTP Long polling, Websocket, WebRTC, MQTT…",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Web rendering techniques — Client-side rendering (initialize with HTML and CSS then the content comes from Javascript), Server-side rendering (server responses an HTML string), Universal rendering (combine the best of both client-side rendering and server-side rendering)",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Choosing the technique to integrate clients and servers to use depends on the context of the application and these use cases. As a front end developer, we usually concern about:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Service API endpoint: This will be the first question then are there multiple API endpoints or a single API endpoint?",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Authentication: Cookies or JWT Bearer token?",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Protocol: REST, RPC or do we need to support realtime with WebSocket or Long Polling?",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Response data: What is the data interchange format is using? JSON or XML, gRPC? What about metadata conversion? Is the key field in the camel or snake case? What about data normalization?",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Data synchronization: How we consolidate data from the server with client data?",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Cooking data: when dealing with multiple data sources, we will need to compute derived data, but should that task is in server or client?",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "In a microservice architecture, the communication between services is also the most important factor, and they may use different effective protocols, data formats and that maybe not friendly with web front end developer (gRPC for example) but to support the client, they might need to expose extra HTTP Restful endpoint. Each microservice exposes a set of fine-grained endpoints and this can impact client-to-microservice communication.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "To easier catch up the problem, let’s imagine that we are developing a shopping application (I would get the example from ",
                            "type": "text"
                        },
                        {
                            "text": "this blog post",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://www.nginx.com/blog/building-microservices-using-an-api-gateway/#product-details-scenario",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ") and it’s likely that you need to implement a product details page.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/7xVhfON79Tse3LJ07AVCnSNOuP7_6hmgl5dQe3O-rrW4xVXZ7LbgtggPBkEULXGAk0_BhaImBMAUlKhXAPge3Uma44xEUTbPfs1WxawYDvH8FQ?publiz-file-id=2",
                        "width": 640,
                        "height": 299,
                        "blurHash": "",
                        "fileName": "1*SzYE1SfHPQh_hao7wBuKNQ.png",
                        "fileSize": "85452"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "This page does not only show the basic information such as name, description, price, but it may also show:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Shopping cart items",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Order history",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Customer reviews",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Inventory status",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Shipping options",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Promotion information",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Product recommendation",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "…",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "To have data to display this page in the microservice, the client has to communicate with:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Shopping cart service — to get the information about a user cart, it is not all about the cart items, it may need just a number of items in the cart",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Order service — to display the brief of order information, it may need just the last order time",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Inventory service — to display the inventory status, but it also needs just the number of remaining items or it may ask the policy service to display the buying tag, such as: Out of stock or Contact or Available in different locations…",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Shipping service — to display the information about the shipping option, it is also not everything in the shipping entity response.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Realtime promotion service — when you see the customer stays in this product too long and you want to encourage her to buy, a promotion may be distributed…",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "…",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "I guess you may think in mind: Oh, just a simple page consumes data from so many data sources (API services) or the number of items in the cart is just a number, does it necessary to get the whole cart data? Will the cart service expose an endpoint just for returning the number of items in the cart? When we want to personalize data by some factors like a user gender, location, or age range…it is so messed up.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Now, it is enough background to get in, let’s look at 2 popular options.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 1
                    },
                    "content": [
                        {
                            "text": "Direct client-to-microservice communication",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "A client app can make requests directly to some of the microservices.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/CvNDByOvH0rBAgeDc1iyoZXsI83WS1HpceS9XBuh92bO5m0JZvEGU_vxLIjkrpBtsv-LeOa4C-6pEm-2krbOIBZftYuRrzzJqveKl-wbOOhQ?publiz-file-id=3",
                        "width": 918,
                        "height": 537,
                        "blurHash": "",
                        "fileName": "1*ShUrqBepv_1bcYrUSz6ygg.png",
                        "fileSize": "91955"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Image credit: .NET microservices — Architecture e-book",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "This communication architecture could be good enough for a small microservice-based application. However, when you build large and complex applications as the example above, that approach faces a few issues.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Consider the following questions/issues when developing a large application based on microservices:",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "How can client apps minimize the number of network requests to the backend and reduce chatty communication to multiple services?",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "What do we do when we need data from multiple dependant services?",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "How can client apps communicate with services that use non-Internet-friendly protocol?",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "The front end developers need to know multiple areas of the application are decomposed in microservices.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Too many round trips can result in multiple network round trips between the client and the server, adding significant latency.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Security issues also need to be a concern because all the microservices must be exposed to the ‘external world’, making the attack surface larger.",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 1
                    },
                    "content": [
                        {
                            "text": "API Gateway",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Single API Gateway",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "This is a service that provides a single-entry point for certain groups of microservices. It’s similar to the ",
                            "type": "text"
                        },
                        {
                            "text": "Facade pattern",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://en.wikipedia.org/wiki/Facade_pattern",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": " from object-oriented design, but in this case, it’s part of a distributed system.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Therefore, the API gateway sits between the client and the microservices, it plays as a reverse proxy, routing requests to services and can also provide additional cross-cutting features such as authentication and cache.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/kZcl1HhPs8Uoy_9OFb4SzawwAuq93IO6PtAPY3-B_tTrQaitu6kbulbE3MlA9I1MSlm7GGf6IH5077wa9gmcJLJawAwEVYmLHM0ZHo9dO2Uo?publiz-file-id=4",
                        "width": 1400,
                        "height": 812,
                        "blurHash": "",
                        "fileName": "1*2AGOO_t8enHH8HEGi3Vxrg.png",
                        "fileSize": "280066"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Image credit: .NET microservices — Architecture e-book",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "This API gateway will be growing and maybe bloated and could be similar to a monolithic service.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "Multiple API Gateways",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "API Gateways should be segregated based on business boundaries. Or we can choose to develop a different API Gateway for different clients (mobile or web). In this case, we have a pattern “Backend for Frontend” (",
                            "type": "text"
                        },
                        {
                            "text": "BFF",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://samnewman.io/patterns/architectural/bff/",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ") where each API Gateway can provide a different API tailored for each client.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "imageBlock",
                    "attrs": {
                        "alt": "",
                        "src": "https://lh3.googleusercontent.com/FWA7Fj63KE-MQRIN_fMPF2w6xggJjlEy5b30uaHg2QsL0FQDka286If9iipnK-nqlA5BM7NGRv4uqCrOJk9Ye25x5Lodrb1magXlZdjKvX0?publiz-file-id=5",
                        "width": 1400,
                        "height": 786,
                        "blurHash": "UBK1zcD*D%-;t8~qa#D%?bM{RiRia#D%xuog",
                        "fileName": "1*z9BnTrevOhTvr_QQY4CoNw.png",
                        "fileSize": "302094"
                    }
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Image credit: .NET microservices — Architecture e-book",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "At Netflix, they have also adopted this pattern: the Backend for Frontend pattern per client (Android, iOS, TV, Web).",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 2
                    },
                    "content": [
                        {
                            "text": "API Gateway drawbacks",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "bulletList",
                    "content": [
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Creating an additional possible single point of failure",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "If not scaled out properly, the API gateway can become a bottleneck",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "Requiring additional development cost and future maintenance",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "listItem",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "text": "It will slow down the team development if we do not prepare the adoption plan carefully",
                                            "type": "text"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Everything comes with pros and cons, especially choosing things not as simple as comparing the number of pros and cons, following the trend, or seeing others do that. To me, I tend to follow the core principle or the concept of how it works. Then I will choose if it matches the spirit or the strategic direction.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Direct client-to-microservice communication — ",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        },
                        {
                            "text": "front-end developers need to spread tasks for API data integration from multiple services and developing UI/UX. This way is appropriate when the team skill is comprehensive, good in both data manipulation and aesthetic ability.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "API gateway ",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        },
                        {
                            "text": "is centralized management, API gateway has the ability to focus on what it does with a huge of supporting tools, the result is front end developers can focus on developing better UI/UX for end-user without requiring time for the complexity of data integration. This way is appropriate when we have a specialized team.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Next post I will write about using GraphQL to implement the BFF pattern. I choose GraphQL because the concept is very simple: instead of having multiple “dumb” endpoints, have a single “smart” endpoint that can take in complex queries, and then massage the data output into whatever shape the client requires.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "heading",
                    "attrs": {
                        "level": 1
                    },
                    "content": [
                        {
                            "text": "References:",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": ".NET Microservices — Architecture e-book",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://docs.microsoft.com/en-us/dotnet/architecture/microservices/",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ": I use this resource for the concept and the standard term.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Building Microservices: Using an API Gateway",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://www.nginx.com/blog/building-microservices-using-an-api-gateway/",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ": I follow this series to understand Microservice.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Processes, Motivations, and Issues for Migrating to Microservices Architectures: An Empirical Investigation",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://www.researchgate.net/publication/319187656_Processes_Motivations_and_Issues_for_Migrating_to_Microservices_Architectures_An_Empirical_Investigation",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ": I refer to this paper for the numbers, statistics, of these researchers to avoid opinionated thinking.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Building a Decoupled Architecture to Optimize our Mobile Apps",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener",
                                        "href": "https://medium.com/walmartglobaltech/building-a-decoupled-architecture-to-optimize-our-mobile-apps-7bc4a0d6da37",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        },
                        {
                            "text": ": From Walmart, I can learn the cost of having a legacy architecture.",
                            "type": "text"
                        }
                    ]
                },
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": "Smart endpoints and dumb pipes design principle",
                            "type": "text",
                            "marks": [
                                {
                                    "type": "link",
                                    "attrs": {
                                        "rel": "noopener ugc nofollow",
                                        "href": "https://simplicable.com/new/smart-endpoints-and-dumb-pipes",
                                        "class": "af rq",
                                        "target": "_blank"
                                    }
                                },
                                {
                                    "type": "underline"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "parentId": null,
        "authorId": 1,
        "organizationId": null,
        "type": "POST",
        "status": "PUBLISHED",
        "metadata": {
            "excerpt": "Front end clients require an effective communication channel to interact with independent back-end microservices",
            "metaSchemaId": 1,
            "featuredImage": {
                "alt": "",
                "src": "https://lh3.googleusercontent.com/TAq74FfngAOHGEATyoCpKbnQtf44CVhv-tHj5oNEWQNAG_KMRau-xejDEOXvdLNo-gxNLRYnejGu7jxV51CMtblcXJpeeNyGNT4edYSt4hXAXg?publiz-file-id=1",
                "width": 1400,
                "height": 933,
                "blurHash": "",
                "fileName": "0*80e6YqsC74oQQQAZ",
                "fileSize": "82707"
            }
        },
        "createdAt": "2024-05-05T09:25:54.751Z",
        "updatedAt": "2024-05-05T09:25:54.751Z",
        "author": {
            "id": 1,
            "displayName": "Hieu Tran Duc",
            "metadata": {
                "cover": {
                    "src": "https://lh3.googleusercontent.com/ZAqQixeEOXcSxeiz1J84RGuUAVl6tF_86uw60GSjhUcWJkjRBe3n7vOhm98WAyvHSnd32MymfwAZyN-ALCda1K_8jj-JHrL9ETVHrzT1sgc?publiz-file-id=32"
                },
                "avatar": {
                    "src": "https://lh3.googleusercontent.com/QnVRmNePHsrbFJvyEbtdHDuJ0xA4HlKcgVtJsMx7MO_TyJrh1ewX9fU4N728I9QNowgFTwLjiOVgXTi1iyjTdBNVnTOhZlLOw5tjWMcoMzo?publiz-file-id=22"
                }
            }
        }
    }
]
