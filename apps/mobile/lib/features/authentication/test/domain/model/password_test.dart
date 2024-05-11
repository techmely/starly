import 'package:flutter_test/flutter_test.dart';

import '../../../domain/model/password.dart';

void main() {
  group('Password', () {
    test('emits PasswordValidationError.empty when value is empty', () {
      final password = Password.dirty('');
      expect(password.validator(''), PasswordValidationError.empty);
    });

    test('does not emit any validation error when value is not empty', () {
      final password = Password.dirty('somePassword123');
      expect(password.validator('somePassword123'), isNull);
    });

    test('does not emit any validation error initially', () {
      final password = Password.pure();
      expect(password.validator(''), isNull);
    });
  });
}
