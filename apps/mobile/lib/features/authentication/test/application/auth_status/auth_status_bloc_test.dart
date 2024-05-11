import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

import '../../../application/auth_status/auth_status_bloc.dart';
import '../../../domain/use-cases/i_auth_facade.dart';

// Mocking the IAuthFacade
class MockAuthFacade extends Mock implements IAuthFacade {}

void main() {
  group('AuthStatusBloc', () {
    late IAuthFacade authFacade;
    late AuthStatusBloc authStatusBloc;

    setUp(() {
      authFacade = MockAuthFacade();
      authStatusBloc = AuthStatusBloc(authFacade);
    });

    blocTest<AuthStatusBloc, AuthStatusState>(
      'emits [Authenticated] when authCheckRequested and user is authenticated',
      build: () {
        when(authFacade.checkAuthenticated()).thenAnswer((_) async => true);
        return authStatusBloc;
      },
      act: (bloc) => bloc.add(const AuthStatusEvent.authCheckRequested()),
      expect: () => [const AuthStatusState.authenticated()],
    );

    blocTest<AuthStatusBloc, AuthStatusState>(
      'emits [Unauthenticated] when authCheckRequested and user is not authenticated',
      build: () {
        when(authFacade.checkAuthenticated()).thenAnswer((_) async => false);
        return authStatusBloc;
      },
      act: (bloc) => bloc.add(const AuthStatusEvent.authCheckRequested()),
      expect: () => [const AuthStatusState.unauthenticated()],
    );

    blocTest<AuthStatusBloc, AuthStatusState>(
      'emits [Unauthenticated] when signedOut is called',
      build: () {
        when(authFacade.logout()).thenAnswer((_) async {});
        return authStatusBloc;
      },
      act: (bloc) => bloc.add(const AuthStatusEvent.signedOut()),
      expect: () => [const AuthStatusState.unauthenticated()],
    );

    tearDown(() {
      authStatusBloc.close();
    });
  });
}
