// ignore_for_file: unused_element

import 'dart:async';
import 'dart:developer';

import 'package:flutter/foundation.dart';
import 'package:techmely_app/features/preferences/infra/utils/log_level.dart';

void logI(
  String message, {
  DateTime? time,
  int? sequenceNumber,
  int level = 0,
  String name = '',
  Zone? zone,
  Object? error,
  StackTrace? stackTrace,
}) {
  if (kDebugMode) {
    log("[DEBUG]$message",
        sequenceNumber: sequenceNumber,
        level: LogLevel.info.level,
        name: name,
        zone: zone,
        error: error,
        stackTrace: stackTrace);
  }
}

void logE(
  String message, {
  DateTime? time,
  int? sequenceNumber,
  int level = 0,
  String name = '',
  Zone? zone,
  Object? error,
  StackTrace? stackTrace,
}) {
  if (kDebugMode) {
    log("[ERROR]$message",
        sequenceNumber: sequenceNumber,
        level: LogLevel.error.level,
        name: name,
        zone: zone,
        error: error,
        stackTrace: stackTrace);
  }
}

void logW(
  String message, {
  DateTime? time,
  int? sequenceNumber,
  int level = 0,
  String name = '',
  Zone? zone,
  Object? error,
  StackTrace? stackTrace,
}) {
  if (kDebugMode) {
    log("[WARNING]$message",
        sequenceNumber: sequenceNumber,
        level: LogLevel.warning.level,
        name: name,
        zone: zone,
        error: error,
        stackTrace: stackTrace);
  }
}
