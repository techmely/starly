abstract class LoggerPort {
  void info(String message,
      {Map<String, dynamic>? extra = null, String? timestamp});

  void debug(String message,
      {Map<String, dynamic>? extra = null, String? timestamp});

  void error(String message,
      {Map<String, dynamic>? extra,
      String? timestamp,
      String? stacktrace,
      String? userId});

  void warning(String message,
      {Map<String, dynamic>? extra, String? timestamp, String? stacktrace});
}
