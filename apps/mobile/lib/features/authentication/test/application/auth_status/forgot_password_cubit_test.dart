import 'package:bloc_test/bloc_test.dart';
import 'package:dartz/dartz.dart';
import 'package:ddd_core/ddd_core.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

import '../../../application/forgot_password/forgot_password_cubit.dart';
import '../../../domain/use-cases/auth_failure.dart';
import '../../../domain/use-cases/auth_value_objects.dart';
import '../../../domain/use-cases/i_auth_facade.dart';

class MockAuthRepository extends Mock implements IAuthFacade {}

void main() {
  late MockAuthRepository mockAuthRepository;
  late ForgotPasswordCubit forgotPasswordCubit;

  setUp(() {
    mockAuthRepository = MockAuthRepository();
    forgotPasswordCubit = ForgotPasswordCubit(mockAuthRepository);
  });

  group('EmailChanged', () {
    const email = 'yusakithejoker@gmail.com';

    blocTest<ForgotPasswordCubit, ForgotPasswordState>(
      'emits the new [EmailAddress]',
      build: () => forgotPasswordCubit,
      act: (cubit) => cubit.emailChanged(email),
      expect: () => [
        ForgotPasswordState.initial().copyWith(
          emailAddress: EmailAddress(email),
          authFailureOrSuccessOption: none(),
        ),
      ],
    );
  });

  group('SubmitForgotPassword', () {
    const email = 'yusakithejoker@gmail.com';
    test('initial ForgotPasswordState should be ForgotPasswordState.initial()',
        () {
      // assert
      expect(forgotPasswordCubit.state, equals(ForgotPasswordState.initial()));
    });

    blocTest<ForgotPasswordCubit, ForgotPasswordState>(
      'emits [initial] states for successful forgot password request',
      build: () {
        when(
          () => mockAuthRepository.forgotPassword(
            emailAddress: EmailAddress(email),
          ),
        ).thenAnswer(
          (_) => Future.delayed(
            const Duration(milliseconds: 1),
            () => passCase(unit),
          ),
        );
        forgotPasswordCubit.emailChanged(email);
        return forgotPasswordCubit;
      },
      act: (cubit) => cubit.submitForgotPassword(),
      expect: () => [
        ForgotPasswordState.initial().copyWith(
          emailAddress: EmailAddress(email),
          isSubmitting: true,
        ),
        ForgotPasswordState.initial().copyWith(
          emailAddress: EmailAddress(email),
          isSubmitting: false,
          showErrorMessages: true,
          authFailureOrSuccessOption: some(passCase(unit)),
        ),
      ],
      verify: (_) {
        verify(
          () => mockAuthRepository.forgotPassword(
            emailAddress: EmailAddress(email),
          ),
        ).called(1);
      },
    );

    blocTest<ForgotPasswordCubit, ForgotPasswordState>(
      'emits [initial] states for unsuccessful forgot password request',
      build: () {
        when(
          () => mockAuthRepository.forgotPassword(
            emailAddress: EmailAddress(email),
          ),
        ).thenAnswer(
          (_) => Future.delayed(
            const Duration(milliseconds: 1),
            () => failCase(const AuthFailure.serverError()),
          ),
        );
        forgotPasswordCubit.emailChanged(email);
        return forgotPasswordCubit;
      },
      act: (cubit) => cubit.submitForgotPassword(),
      expect: () => [
        ForgotPasswordState.initial().copyWith(
          emailAddress: EmailAddress(email),
          isSubmitting: true,
        ),
        ForgotPasswordState.initial().copyWith(
          emailAddress: EmailAddress(email),
          isSubmitting: false,
          showErrorMessages: true,
          authFailureOrSuccessOption:
              some(failCase(const AuthFailure.serverError())),
        ),
      ],
      verify: (_) {
        verify(
          () => mockAuthRepository.forgotPassword(
            emailAddress: EmailAddress(email),
          ),
        ).called(1);
      },
    );

    blocTest<ForgotPasswordCubit, ForgotPasswordState>(
      'emits [initial] states for invalid email',
      build: () {
        forgotPasswordCubit.emailChanged("");
        return forgotPasswordCubit;
      },
      act: (cubit) => cubit.submitForgotPassword(),
      expect: () => [
        ForgotPasswordState.initial().copyWith(
          emailAddress: EmailAddress(""),
          isSubmitting: false,
          showErrorMessages: true,
          authFailureOrSuccessOption: none(),
        ),
      ],
      verify: (_) {
        verifyNever(
          () => mockAuthRepository.forgotPassword(
            emailAddress: EmailAddress(email),
          ),
        );
      },
    );
  });
}
