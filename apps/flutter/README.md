# The research documentation about all things in Flutter

I. **Flutter architectural**

1.  MVC (the oldest things that you can find in an architected, but that’s not mean is not important.)

**Pros** 

- Well-established pattern with clear separation of concerns.
- Easy to understand and implement, especially for small to medium-sized applications.
- Promotes reusability and maintainability due to its modular nature.

**Cons**

- This can lead to tightly coupled components, making the codebase difficult to maintain and extend.
- Difficulty in handling complex UI interactions and state management.

2. Provider 

**Pros** 

- Simplify data allocation and disposal of resources (data)
- Lazy loading of data
- Reduces boilerplate code
- Devtool friendly
- Improves scalability
- Makes InheritedWidgets easier to use.

**Cons**

- May accidentally call unnecessary updates. Not every change in the state of an object needs to trigger an update. However, if you are using Provider then they will trigger an update all the time when there is a change. (never recommend with a large system like Tech mely ecosystem)

**When**

- If the app is not too complex and has few models.
- If you are expecting lower memory utilization and faster execution time.
- If developers are not familiar with ***Streams.***

3. Blocs (Fucking recommend cuz our app will fucking big :)) )

**Pros** 

- Separates presentation layer from Business
- Simplify app testing
- Better performance for large data sizes.

**Cons**

- Effective only if you have a big application.
- You need to use streams in both directions which may create more boilerplate than Provider.

**When**

- Best architecture if you are familiar with the streams.
- Use it if you have a complex app and want to reduce memory utilization while having better performance.

⇒ Architecture:

1. **Presentation layer**
    - Oversees the arrangement of widgets and transfers user inputs to the domain layer.
    - Encompasses widgets, states, and controllers.
    - The presentation layer handles the UI and does not directly contact the data layer.
2. **Domain layer**
    - Manages business logic and entities.
    - Retrieves models from the data layer and enables modification by the application layer.
    - The domain layer sits between the other two, communicating between them and containing the business logic.
3. **Data layer**
    - Engages with external data sources, including databases, APIs, and services.
    - Primarily responsible for fetching and storing data.
4. **Application layer**
    - Establishes connections between the presentation layer and other layers through services.
    - Houses services capable of modifying models.

⇒ State Management: Using flutter_bloc