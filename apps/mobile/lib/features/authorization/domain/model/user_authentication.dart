class User {
  final String id;
  final String email;
  final String password;
  final String name;
  final List<String> roles;

  User({
    required this.id,
    required this.email,
    required this.password,
    required this.name,
    this.roles = const [],
  });
}
