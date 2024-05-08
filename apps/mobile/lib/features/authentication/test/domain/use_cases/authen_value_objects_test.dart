import 'package:dartz/dartz.dart';
import 'package:ddd_core/d%C4%91_core.dart';
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

    test('logout() should complete successfully', () async {
      await expectLater(authFacade.logout(), completes);
    });

    test('changePassword() should change password successfully', () async {
      final oldPassword = Password('old_password');
      final newPassword = Password('new_password');
      final confirmNewPassword = Password('new_password');

      final result = await authFacade.changePassword(
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      );

      expect(result, isA<Right<AuthFailure, Unit>>());
    });

    test(
        'changePassword() should fail with AuthFailure for password dont match',
        () async {
      final oldPassword = Password('wrong_old_password');
      final newPassword = Password('new_password');
      final confirmNewPassword = Password('new_password');

      final result = await authFacade.changePassword(
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      );

      expect(result, isA<Left<AuthFailure, Unit>>());
      expect(result.leftMap((l) => l is PasswordsDontMatch), Left(true));
    });

    test('forgotPassword() should reset password successfully', () async {
      final emailAddress = EmailAddress('test@example.com');

      final result = await authFacade.forgotPassword(
        emailAddress: emailAddress,
      );

      expect(result, isA<Right<AuthFailure, Unit>>());
    });

    test(
        'forgotPassword() should fail with AuthFailure for invalid email address',
        () async {
      final emailAddress = EmailAddress('invalid_email');

      final result = await authFacade.forgotPassword(
        emailAddress: emailAddress,
      );

      expect(result, isA<Left<AuthFailure, Unit>>());
      expect(result.leftMap((l) => l is InvalidEmail), Left(true));
    });
  });
}
