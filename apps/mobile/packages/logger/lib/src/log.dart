import 'package:logger/src/port/logger_port.dart';

class Log implements LoggerPort {
  @override
  void error(String message,
      {Map<String, dynamic>? extra,
      String? timestamp,
      String? stacktrace,
      String? userId}) {
    print("\x1B[31m [ERROR]:${DateTime.now()} $message \x1B[0m");
  }

  @override
  void info(String message,
      {Map<String, dynamic>? extra = null, String? timestamp}) {
    print("\x1B[36m [INFO]:${DateTime.now()} $message \x1B[0m");
  }

  @override
  void debug(String message,
      {Map<String, dynamic>? extra = null, String? timestamp}) {
    print("\x1B[32m [DEBUG]:${DateTime.now()} $message \x1B[0m");
  }

  @override
  void warning(String message,
      {Map<String, dynamic>? extra, String? timestamp, String? stacktrace}) {
    print("\x1B[33m [WARNING]:${DateTime.now()} $message \x1B[0m");
  }
}
