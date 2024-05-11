import 'package:flutter_test/flutter_test.dart';

import '../../../domain/model/username.dart';

void main() {
  group('Username', () {
    test('emits UsernameValidationError.empty when value is empty', () {
      final username = Username.dirty('');
      expect(username.validator(''), UsernameValidationError.empty);
    });

    test('does not emit any validation error when value is not empty', () {
      final username = Username.dirty('someUsername');
      expect(username.validator('someUsername'), isNull);
    });

    test('does not emit any validation error initially', () {
      final username = Username.pure();
      expect(username.validator(''), isNull);
    });
  });
}
