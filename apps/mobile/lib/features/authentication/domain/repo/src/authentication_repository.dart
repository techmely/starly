import '../../../../preferences/domain/model/user.dart';
import 'authentication_logic.dart';

class AuthenticationRepository {
  final AuthenticationLogic _logic = AuthenticationLogic();

  Future<void> login(String username, String password) async =>
      _logic.logIn(username: username, password: password);

  Future<void> logout() async => _logic.logOut();
}
