import 'package:flutter_test/flutter_test.dart';

import '../../../../domain/use-cases/login/login_bloc.dart';

void main() {
  group('LoginEvent', () {
    test('LoginUsernameChanged props', () {
      final event1 = LoginUsernameChanged('username');
      final event2 = LoginUsernameChanged('username');

      expect(event1, event2);
      expect(event1.props, [event1.username]);
    });

    test('LoginPasswordChanged props', () {
      final event1 = LoginPasswordChanged('password');
      final event2 = LoginPasswordChanged('password');

      expect(event1, event2);
      expect(event1.props, [event1.password]);
    });

    test('LoginSubmitted props', () {
      final event1 = LoginSubmitted();
      final event2 = LoginSubmitted();

      expect(event1, event2);
      expect(event1.props, []);
    });
  });
}
