import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

import '../../../domain/use-cases/auth_failure.dart';
import '../../../domain/use-cases/auth_value_objects.dart';
import '../../../domain/use-cases/i_auth_facade.dart';

class MockAuthFacade extends Mock implements IAuthFacade {}

void main() {
  late IAuthFacade authFacade;

  setUp(() {
    authFacade = MockAuthFacade();
  });

  group('IAuthFacade', () {
    test('should return right unit when register successfully', () async {
      final emailAddress = EmailAddress('test@gmail.com');
      final username = Username('testuser');
      final password = Password('password');

      final result = await authFacade.register(
        emailAddress: emailAddress,
        username: username,
        password: password,
      );

      expect(result, right(unit));
    });

    test('should return left AuthFailure when register fails', () async {
      final emailAddress = EmailAddress('test@gmail.com');
      final username = Username('testuser');
      final password = Password('password');

      final result = await authFacade.register(
        emailAddress: emailAddress,
        username: username,
        password: password,
      );

      expect(result, left(const AuthFailure.serverError()));
    });

    // Test các phương thức khác tương tự
  });
}
