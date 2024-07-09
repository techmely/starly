System/Technical Design Doc Template

Author:

Status: Draft / Under Review / Published

Sign Off: <List of reviewers>

Overview
Objective
Describe at a high level the goals of the project.

[To be filled]

Background
Introduce the current state of things, enough for the intended audience to understand the rest of the document. Links to other supporting documents like one-pager, roadmap.


[To be filled]

Problem Statement
What are the problems with the current state, and why is it important to do this project? What benefits will solving the problem provide?


[To be filled]

Goals & Metrics
What metrics will be used to measure and determine the success of this design?


[To be filled]

Assumptions
List down the assumptions that were made in the background and the approaches. They can be mentioned further down if specific to certain approaches or over here if applicable to the problem. Mentioning this helps readers be aware of important tradeoffs that have already been considered and have good justification.


[To be filled]

Personnel
Who are the people involved and what are their roles?


[To be filled]

Glossary
List of terms used in the design to get readers aligned on the definition and improve clarity.


[To be filled]

Requirements
Functional Requirements
Key characteristics and behaviors of the system or feature. If the system or feature is user facing, list down a summary of user interactions.


[To be filled]

Non-functional Requirements
Performance, reliability, availability, etc. Characteristics that don’t affect whether users can achieve their goal but can affect the experience.


[To be filled]

Not in Scope
Requirements that are not covered by this design, they could be rare scenarios that have minor impact or things that aren’t important now and will be covered in future.


[To be filled]

Proposed Design
Architecture
Architecture diagram that sketches the services and components within or leveraged by the system. Blocks can be used to denote services/components and arrows between them to represent the flow of data. Additional diagrams can also be used, e.g. state transition diagram, sequence diagram, etc.


[To be filled]

User Flow
Describe how users use the new feature or product. Focus on users’ interactions, e.g. what and how the user provides inputs, the outputs they receive and how they’re displayed.


[To be filled]

Component Design
Deep dive into each component/service. Cover these aspects of each component/service:

Data model
API definition
Details of how to achieve certain functionality the component/service is responsible for. Consider describing the following:
Description of behavior
Algorithm
Pseudocode
State transition diagram, sequence diagram, etc
Design choices and tradeoffs

[To be filled]

Dependencies
Identify critical dependencies in advance and make thoughtful choices about what systems to use depending on their SLAs, fault tolerance and timeline. Answer the following questions:

What dependencies are critical for your system and what are not?
Why should the design depend on those systems? Are there other alternatives?
For dependencies that are still in progress, when are they expected to be ready for your consumption? Any risks there?

[To be filled]

Resiliency
Discuss how the system handles scenarios like 10x throughput, dependency failure, component failure, disaster readiness/recovery.


[To be filled]

Privacy/Security/Legal Implications
Discuss privacy, security, and legal concerns where relevant. What are the roles involved in the system and who can access what data? Are there any privacy requirements and how are they enforced? What are possible attack vectors and how to handle them?


[To be filled]

Alternative Designs
What other approaches were considered? Describe the high level approach and tradeoffs compared with the proposed design. You may want to mention this section higher if there are a few plausible options, or it’s important to help people understand why the design was chosen.


[To be filled]

Testing
How to test and verify the correctness and effectiveness of the design?

Unit / Integration / E2E tests
Performance tests (latency, stress testing)
Internal dogfooding process: target group, instructions, etc.
Bug bashes
QA process
Shadow environment and traffic for testing

[To be filled]

Monitoring
What metrics need to be collected? Which are existing and which are new?
What new logging needs to be added?
What new alerts need to be created?
How do you monitor rollout? User feedback / Dashboard metrics / Alerts

[To be filled]

Rollout Plan
How you plan to launch your system to users:

What’s the rollout strategy? Phased gradually / by geography / certain user groups? Why was this plan chosen over alternatives?
List out the critical feature flags needed.
Highlight the experiments planned, what hypotheses they are intended to prove or questions to answer. What results indicate success?
If the design replaces an existing system, what’s the migration plan and deprecation plan of the old system?
Do you have the necessary personnel available during the rollout? Are the relevant team oncall personnel aware of what they need to do?
What’s the rollback plan if something goes wrong during rollout?

[To be filled]

Potential Issues
Risks
List concerns that may result in missed timelines or goals. Examples include resource unavailability, known/unknown constraints, dependencies on other projects/teams, etc.


[To be filled]

Open Questions
What questions do we not have answers to? How can we get answers? Will the lack of clarity block progress and introduce risk to the timelines?


[To be filled]

Discussions
Prefer leaving inline comments since if possible (most collaborative documents support this), but you may use this section to capture questions from reviewers.


[To be filled]

Appendix
Links to additional resources: documentation, publications, blog posts, other design docs.


[To be filled]

Revision History
List of significant revisions made to the document, each line should include a description, author, date.


[To be filled]
