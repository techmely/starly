import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:formz/formz.dart';
import 'package:mocktail/mocktail.dart';

import '../../../../../authorization/domain/repo/src/authentication_repository.dart';
import '../../../../domain/model/password.dart';
import '../../../../domain/model/username.dart';
import '../../../../domain/use-cases/login/login_bloc.dart';

class MockAuthenticationRepository extends Mock
    implements AuthenticationRepository {}

void main() {
  group('LoginBloc', () {
    late LoginBloc loginBloc;
    late AuthenticationRepository authenticationRepository;

    setUp(() {
      authenticationRepository = MockAuthenticationRepository();
      loginBloc = LoginBloc(authenticationRepository: authenticationRepository);
    });

    tearDown(() {
      loginBloc.close();
    });

    test('initial state is LoginState', () {
      expect(loginBloc.state, const LoginState());
    });

    blocTest<LoginBloc, LoginState>(
      'emits username validation state when LoginUsernameChanged is added',
      build: () => loginBloc,
      act: (bloc) =>
          bloc.add(const LoginUsernameChanged('yusakithejoker@gmail.com')),
      expect: () => const [
        LoginState(
            username: Username.dirty('yusakithejoker@gmail.com'),
            isValid: false),
      ],
    );

    blocTest<LoginBloc, LoginState>(
      'emits password validation state when LoginPasswordChanged is added',
      build: () => loginBloc,
      act: (bloc) => bloc.add(const LoginPasswordChanged('12345678')),
      expect: () => const [
        LoginState(password: Password.dirty('12345678'), isValid: false),
      ],
    );

    blocTest<LoginBloc, LoginState>(
      'emits inProgress and success when LoginSubmitted is added with valid data',
      build: () {
        when(() => authenticationRepository.logIn(
                username: any(named: 'yusakithejoker@gmail.com'),
                password: any(named: '12345678')))
            .thenAnswer((_) => Future.value());

        return loginBloc;
      },
      act: (bloc) {
        bloc.add(const LoginUsernameChanged('yusakithejoker@gmail.com'));
        bloc.add(const LoginPasswordChanged('12345678'));
        bloc.add(const LoginSubmitted());
      },
      expect: () => [
        const LoginState(
          username: Username.dirty('yusakithejoker@gmail.com'),
          password: Password.dirty('12345678'),
          isValid: true,
          status: FormzSubmissionStatus.inProgress,
        ),
        const LoginState(
          username: Username.dirty('yusakithejoker@gmail.com'),
          password: Password.dirty('12345678'),
          isValid: true,
          status: FormzSubmissionStatus.success,
        ),
      ],
    );

    blocTest<LoginBloc, LoginState>(
      'emits inProgress and failure when LoginSubmitted is added with invalid data',
      build: () {
        when(() => authenticationRepository.logIn(
                username: any(named: 'username'),
                password: any(named: 'password')))
            .thenThrow(Exception("Login failed due to invalid credentials"));
        return loginBloc;
      },
      act: (bloc) {
        bloc.add(const LoginUsernameChanged('invalid_email@gmail.com'));
        bloc.add(const LoginPasswordChanged('wrongpassword'));
        bloc.add(const LoginSubmitted());
      },
      expect: () => [
        const LoginState(
          username: Username.dirty('invalid_email@gmail.com'),
          password: Password.dirty('wrongpassword'),
          isValid: false,
          status: FormzSubmissionStatus.inProgress,
        ),
        const LoginState(
          username: Username.dirty('invalid_email@gmail.com'),
          password: Password.dirty('wrongpassword'),
          isValid: false,
          status: FormzSubmissionStatus.failure,
        ),
      ],
    );
  });
}
