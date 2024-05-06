import 'package:bloc_test/bloc_test.dart';
import 'package:dartz/dartz.dart';
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
      act: (bloc) =>
          bloc.add(const RegisterFormEvent.emailChanged('test@gmail.com')),
      expect: () => [
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('test@gmail.com'),
          authFailureOrSuccessOption: none(),
        ),
      ],
    );

    blocTest<RegisterFormBloc, RegisterFormState>(
      'emits correct state when usernameChanged is added',
      build: () => registerFormBloc,
      act: (bloc) =>
          bloc.add(const RegisterFormEvent.usernameChanged('testuser')),
      expect: () => [
        RegisterFormState.initial().copyWith(
          username: Username('testuser'),
          authFailureOrSuccessOption: none(),
        ),
      ],
    );

    blocTest<RegisterFormBloc, RegisterFormState>(
      'emits correct state when passwordChanged is added',
      build: () => registerFormBloc,
      act: (bloc) =>
          bloc.add(const RegisterFormEvent.passwordChanged('testpassword')),
      expect: () => [
        RegisterFormState.initial().copyWith(
          password: Password('testpassword'),
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
            )).thenAnswer((_) async => right(unit));

        return registerFormBloc;
      },
      act: (bloc) {
        bloc.add(const RegisterFormEvent.emailChanged('test@gmail.com'));
        bloc.add(const RegisterFormEvent.usernameChanged('testuser'));
        bloc.add(const RegisterFormEvent.passwordChanged('testpassword'));
        bloc.add(const RegisterFormEvent.registerPressed());
      },
      expect: () => [
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('test@gmail.com'),
          authFailureOrSuccessOption: none(),
          isSubmitting: true,
        ),
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('test@gmail.com'),
          username: Username('testuser'),
          password: Password('testpassword'),
          authFailureOrSuccessOption: none(),
          isSubmitting: false,
          showErrorMessages: true,
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
      'emits correct state when registerPressed is added with invalid email',
      build: () => registerFormBloc,
      act: (bloc) {
        bloc.add(const RegisterFormEvent.emailChanged('invalid-email'));
        bloc.add(const RegisterFormEvent.registerPressed());
      },
      expect: () => [
        RegisterFormState.initial().copyWith(
          emailAddress: EmailAddress('invalid-email'),
          isSubmitting: false,
          showErrorMessages: true,
          authFailureOrSuccessOption: none(),
        ),
      ],
    );
  });
}
