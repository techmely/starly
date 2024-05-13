# D/D/D

Tính đóng gói, maintain dễ dàng và khả năng scale up gần như là vô tận là khả năng và tiềm năng mà Domain-Driven Design hiện tại đang mang lại cho dự án của team. Cuốn sách Implementing - Domain-Driven Design là một cuốn sách ổn để đi vọc lại kiến thức từ đầu cho member đang bỡ ngỡ về khái niệm này. (Thực sự thì bạn nên tim hiểu về sách thay vì ngồi nghe kiến thức trên youtube). Okay, và mình sẽ liệt kê những điều tinh hoa của từng chapter một cho bạn tìm hiểu cùng nhe

Chaper 1

**Can I DDD?**
You can implement DDD if you have
• A passion for creating excellent software every day, and the tenacity to
achieve that goal
• The eagerness to learn and improve, and the fortitude to admit you need to
• The aptitude to understand software patterns and how to properly apply
them
• The skill and patience to explore design alternatives using proven agile
methods
• The courage to challenge the status quo
• The desire and ability to pay attention to details, to experiment and
discover
• A drive to seek ways to code smarter and better

**What is a Domain Model?**

It’s a software model of the very specific business domain you are working in. Often
it’s implemented as an object model, where those objects have both data and behavior with literal and accurate business meaning.
Using DDD, you never try to model the whole business enterprise with a single, large domain model. Phew, that’s good :)))

Why You Should Do DDD
• Put domain experts and developers on a level playing field, which pro-
duces software that makes perfect sense to the business, not just the coders. This doesn’t mean merely tolerating the opposite group. It means becoming one cohesive, tight-knit team.
• That “makes sense to the business” thing means investing in the business by making software that is as close as possible to what the business leaders and experts would create if they were the coders.
• You can actually teach the business more about itself. No domain expert no C-level manager, no one, ever knows every single thing about the business. It’s a constant discovery process that becomes more insightful over time. With DDD, everybody learns because everybody contributes to discovery discussions.
• Centralizing knowledge is key because with that the business is capable of ensuring that understanding the software is not locked in “tribal knowledge,” available only to a select few, who are usually only the developers.
• There are zero translations between the domain experts, the software
developers, and the software. That doesn’t mean maybe some few translations. It means zero translations because your team develops a common, shared language that everyone on the team speaks.
• The design is the code, and the code is the design. The design is how it works. Knowing the best code design comes through quick experimental models using an agile discovery process.
• DDD provides sound software development techniques that address both strategic and tactical design. Strategic design helps us understand what are the most important software investments to make, what existing software assets to leverage in order to get there fastest and safest, and who must be involved. Tactical design helps us craft a single elegant model of a solution using time-tested, proven software building blocks.
Like any good, high-yielding investment, DDD has some up-front cost of
time and effort for the team. Considering the typical challenges encountered by every software development effort will reinforce the need to invest in a sound software development approach.

**How to Do DDD**

*Ubiquitous Language*
The Ubiquitous Language is a shared team language. It’s shared by domain
experts and developers alike. In fact, it’s shared by everyone on the project
team. No matter your role on the team, since you are on the team you use the
Ubiquitous Language of the project.

A: So, You Think You Know What a Ubiquitous Language Is
B: Obviously it’s the language of the business.
A: Well, no.
B: Surely it must be adopting industry standard terminology.
A: No, not really.
B: Clearly it’s the lingo used by the domain experts.
A: Sorry, but no.
B: The Ubiquitous Language is a shared language developed by the team—a team
composed of both domain experts and software developers.
That’s it. Now you’ve got it!

the Language is more centered on how the business itself thinks and operates. Also, many times two or more domain experts disagree on concepts and terms, and they are actually wrong about some because they haven’t thought of every case before. So, as the experts and developers work together to craft a model of the domain, they use discussion with both consensus and compromise to achieve the very best Language for the project. The team never compromises on the quality of the Language, just on the best concepts, terms, and meanings. Initial consensus is
not the end, however. The Language grows and changes over time as tiny and large breakthroughs are achieved, much like any other living language.

*Ubiquitous, but Not Universal*
Some further clarification about the reach of a Ubiquitous Language is in order. There are a few basic concepts that we need to keep carefully in mind:
• Ubiquitous means “pervasive,” or “found everywhere,” as spoken among the team and expressed by the single domain model that the team develops.
• The use of the word ubiquitous is not an attempt to describe some kind
of enterprise-wide, company-wide, or worldwide, universal domain
language.
• There is one Ubiquitous Language per Bounded Context.
• Bounded Contexts are relatively small, smaller than we might at first imagine. A Bounded Context is large enough only to capture the complete Ubiquitous Language of the isolated business domain, and no larger.
• The Language is ubiquitous only within the team that is working on the project that develops in an isolated Bounded Context.
• On a single project that develops a single Bounded Context, there are always one or more additional isolated Bounded Contexts with which it integrates using Context Maps. Each of the multiple Bounded Contexts that integrate has its own Ubiquitous Language, even though some
terms of each may overlap.
• If you try to apply a single Ubiquitous Language to an entire enterprise, or worse, universally among many enterprises, you will fail.