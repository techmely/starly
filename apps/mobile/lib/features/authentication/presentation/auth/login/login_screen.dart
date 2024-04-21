import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:ui/ultis/colors.dart';

import '../../../application/login_form/login_form_bloc.dart';
import 'login_form.dart';

class LoginScreen extends StatelessWidget {
  static const routeName = '/login';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: ThemeColors.appBackground,
      ),
      body: BlocProvider(
        create: (context) => getIt<LoginFormBloc>(),
        child: LoginForm(),
      ),
    );
  }
}
