import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:techmely_app/features/authentication/presentation/auth/register/register_form.dart';
import 'package:ui/ultis/colors.dart';

import '../../../../../constant/colors.dart';
import '../../../domain/use-cases/register_form/register_form_bloc.dart';

class RegisterScreen extends StatelessWidget {
  static const routeName = '/register';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: ThemeColors.appBackground,
      ),
      body: BlocProvider(
        create: (context) => getIt<RegisterFormBloc>(),
        child: RegisterForm(),
      ),
    );
  }
}
