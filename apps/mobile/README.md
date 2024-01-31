# techmely_app

A new Flutter project.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

1. Why:

- We want to determine what types of database that we use for storage (might want to change it later on)
- We want to adhere to SOLID principles since we are using OOP for this project.
- We want to ensure that UI layers do not care what is going on at the data layer at all.
- We might want to separate each layer into different packages.

2. Application - Di - Domain - Infrastructure - L10N - Presentation.
3. Presentation layer consist of

- Pages
- Widgets

4. Domain layer

- Core (Value objects, Failures)
- Repositories interface
- Entities
- Typically one function, but can be more if functions are related.
- Remember, one class has one responsibility only.

5. Infrastructure layer

- Core
- Data Source
  - locals (Database)
  - remotes (API)
- Repositories (Implementation from Domain layer)
- Models
- Services

6. Application layer

- State Management solution (Bloc Framework)
- States according to that framework
- Notifiers according to that framework

7. Another part

- DI pattern
  Dependency Injection is a great design pattern that allows us to eliminate rigid dependencies between elements and it makes the application more flexible, easy to expand scales and maintain. In the project we use Plugin injectable and get_it to implement DI and we have also defined classes so you can easily implement DI in the DI layer.

- Routes
  The project has predefined Named routes (Go Router)

- resources

- All resources (images, fonts, videos, ...) must be placed in the assets class
  Getting started
  Get dependencies and generate necessary files.

We'll handle the generation of required files for 🚀 your onboarding!

8. Localization
   Using this library to handle multi-languages. Follow this guide to understand and config languages files
