import 'package:bloc_test/bloc_test.dart';
import 'package:dartz/dartz.dart';
import 'package:ddd_core/ddd_core.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

import '../../../../domain/use-cases/auth_value_objects.dart';
import '../../../../domain/use-cases/i_auth_facade.dart';
import '../../../../domain/use-cases/register_form/register_form_bloc.dart';

class MockAuthFacade extends Mock implements IAuthFacade {}

void main() {
  group('RegisterFormBloc', () {
    late RegisterFormBloc registerFormBloc;
    late IAuthFacade authFacade;

    setUp(() {
      authFacade = MockAuthFacade();
      registerFormBloc = RegisterFormBloc(authFacade);
    });

    tearDown(() {
      registerFormBloc.close();
    });

    test('initial state is RegisterFormState.initial()', () {
      expect(registerFormBloc.state, RegisterFormState.initial());
    });

    blocTest<RegisterFormBloc, RegisterFormState>(
      'emits correct state when emailChanged is added',
      build: () => registerFormBloc,
      act: (bloc) => bloc.add(
          const RegisterFormEvent.emailChanged('yusakithejoker@gmail.com')),
      expect: () => [
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('yusakithejoker@gmail.com'),
          authFailureOrSuccessOption: none(),
        ),
      ],
    );

    blocTest<RegisterFormBloc, RegisterFormState>(
      'emits correct state when usernameChanged is added',
      build: () => registerFormBloc,
      act: (bloc) =>
          bloc.add(const RegisterFormEvent.usernameChanged('yusaki')),
      expect: () => [
        RegisterFormState.initial().copyWith(
          username: Username('yusaki'),
          authFailureOrSuccessOption: none(),
        ),
      ],
    );

    blocTest<RegisterFormBloc, RegisterFormState>(
      'emits correct state when passwordChanged is added',
      build: () => registerFormBloc,
      act: (bloc) =>
          bloc.add(const RegisterFormEvent.passwordChanged('12345678')),
      expect: () => [
        RegisterFormState.initial().copyWith(
          password: Password('12345678'),
          authFailureOrSuccessOption: none(),
        ),
      ],
    );

    blocTest<RegisterFormBloc, RegisterFormState>(
      'emits correct state when registerPressed is added with valid data',
      build: () {
        when(() => authFacade.register(
              emailAddress: any(named: 'emailAddress'),
              username: any(named: 'username'),
              password: any(named: 'password'),
            )).thenAnswer((_) async => passCase(unit));

        return registerFormBloc;
      },
      act: (bloc) {
        bloc.add(
            const RegisterFormEvent.emailChanged('yusakithejoker@gmail.com'));
        bloc.add(const RegisterFormEvent.usernameChanged('yusaki'));
        bloc.add(const RegisterFormEvent.passwordChanged('12345678'));
        bloc.add(const RegisterFormEvent.registerPressed());
      },
      expect: () => [
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('yusakithejoker@gmail.com'),
          username: Username('yusaki'),
          password: Password('12345678'),
          isSubmitting: true,
          authFailureOrSuccessOption: none(),
        ),
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('yusakithejoker@gmail.com'),
          username: Username('yusaki'),
          password: Password('12345678'),
          authFailureOrSuccessOption: none(),
          isSubmitting: false,
          showErrorMessages: false,
        ),
      ],
    );

    blocTest<RegisterFormBloc, RegisterFormState>(
      'emits correct state when registerPressed is added with invalid data',
      build: () => registerFormBloc,
      act: (bloc) {
        bloc.add(const RegisterFormEvent.registerPressed());
      },
      expect: () => [
        RegisterFormState.initial().copyWith(
          isSubmitting: false,
          showErrorMessages: true,
          authFailureOrSuccessOption: none(),
        ),
      ],
    );

    blocTest<RegisterFormBloc, RegisterFormState>(
      'does not emit submitting state when email is invalid',
      build: () => registerFormBloc,
      act: (bloc) {
        bloc.add(
            const RegisterFormEvent.emailChanged('kjhqwerhfqkjwfb@gmail.com'));
        bloc.add(const RegisterFormEvent.passwordChanged('123456'));
        bloc.add(const RegisterFormEvent.usernameChanged('username'));
        bloc.add(const RegisterFormEvent.registerPressed());
      },
      expect: () => [
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('kjhqwerhfqkjwfb@gmail.com'),
          authFailureOrSuccessOption: none(),
        ),
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('kjhqwerhfqkjwfb@gmail.com'),
          password: Password('123456'),
          authFailureOrSuccessOption: none(),
        ),
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('kjhqwerhfqkjwfb@gmail.com'),
          password: Password('123456'),
          username: Username('username'),
          authFailureOrSuccessOption: none(),
        ),
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('kjhqwerhfqkjwfb@gmail.com'),
          password: Password('123456'),
          username: Username('username'),
          isSubmitting: false,
          showErrorMessages: true,
          authFailureOrSuccessOption: none(),
        ),
      ],
    );
  });
}
