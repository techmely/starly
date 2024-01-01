declare global {
  type HeadMetaAuthor = {
    name: string;
    url: string;
  };

  type HeadMetaRobots = {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
    nocache?: boolean;
    notranslate?: boolean;
    indexifembedded?: boolean;
    nositelinkssearchbox?: boolean;
    unavailable_after?: string;
    "max-video-preview"?: number | string;
    "max-image-preview"?: "none" | "standard" | "large";
    "max-snippet"?: number;
    googleBot?: string | HeadMetaRobots;
  };

  interface HeadMetadata {
    title?: string;
    description?: string;
    thumbnail?: string;
    /**
     * The robots setting for the document.
     *
     * @see https://developer.mozilla.org/docs/Glossary/Robots.txt
     * @example
     *
     * { index: false, follow: false }
     * <meta name="robots" content="noindex, nofollow" />
     * ```
     */
    robots?: HeadMetaRobots;
    /**
     * @example
     * { canonical: "https://example.com" }
     * <link rel="canonical" href="https://example.com" />
     */
    canonical?: string;
    /**
     * <meta name="application-name" content="Techmely" />
     */
    applicationName?: string;
    /**
     * @example * <meta name="author" content="Techmely Team" />
     * <link rel="author" href="https://techmely.com/about-us" />
     */
    authors?: HeadMetaAuthor | HeadMetaAuthor[];
    /**
     * @example * <meta name="generator" content="VikeJs" />
     */
    generator?: string;
    /**
     * @example <meta name="keywords" content="education, documents, blog, courses" />
     * ```
     */
    keywords?: string | string[];
    /**
     * @example <meta name="creator" content="Techmely Team" />
     */
    creator?: string;
    /**
     * <meta name="publisher" content="Cloudflare" />
     * ```
     */
    publisher?: string;
    /**
     * The category meta name property.
     * @example
     * "Education"
     * <meta name="category" content="Education" />
     */
    category?: string;
  }
}

export {};