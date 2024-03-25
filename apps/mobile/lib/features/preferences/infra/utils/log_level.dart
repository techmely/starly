enum LogLevel {
  info(level: 800),
  warning(level: 900),
  error(level: 1200);

  final int level;

  const LogLevel({required this.level});
}
