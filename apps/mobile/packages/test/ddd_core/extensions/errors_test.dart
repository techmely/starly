import 'package:ddd_core/ddd_core.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('ValueFailure', () {
    test('exceedingLength creates correct object', () {
      final failure =
          ValueFailure<int>.exceedingLength(failedValue: 10, max: 5);

      expect(failure.runtimeType, failure.runtimeType);
      expect(failure.failedValue, 10);
    });

    test('empty creates correct object', () {
      final failure = ValueFailure<String>.empty(failedValue: 'username');

      expect(failure.runtimeType, Empty<String>(failedValue: '').runtimeType);
      expect(failure.failedValue, 'username');
    });

    test('empty creates correct object', () {
      final failure = ValueFailure<String>.empty(failedValue: 'username');

      expect(failure.runtimeType, Empty<String>(failedValue: '').runtimeType);
      expect(failure.failedValue, 'username');
    });
  });
}
