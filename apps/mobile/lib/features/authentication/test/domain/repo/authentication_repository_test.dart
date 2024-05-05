import 'package:flutter_test/flutter_test.dart';

import '../../../../authorization/domain/repo/src/authentication_repository.dart';

void main() {
  group('AuthenticationRepository', () {
    late AuthenticationRepository authenticationRepository;

    setUp(() {
      authenticationRepository = AuthenticationRepository();
    });

    tearDown(() {
      authenticationRepository.dispose();
    });

    test('logIn should change status to authenticated', () async {
      final username = 'yusaki';
      final password = '123456';

      await authenticationRepository.logIn(
          username: username, password: password);

      expect(await authenticationRepository.status.first,
          AuthenticationStatus.authenticated);
    });

    test('logOut should change status to unauthenticated', () async {
      authenticationRepository.logOut();

      expect(await authenticationRepository.status.first,
          AuthenticationStatus.unauthenticated);
    });
  });
}
