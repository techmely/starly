import 'package:flutter/material.dart';

import '../widgets/on_boarding_pre_authen_widget.dart';

class OnBoardingPreAuthenScreen extends StatefulWidget {
  const OnBoardingPreAuthenScreen({super.key});
  @override
  State<OnBoardingPreAuthenScreen> createState() =>
      _OnBoardingPreAuthenScreenState();
}

class _OnBoardingPreAuthenScreenState extends State<OnBoardingPreAuthenScreen> {
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return OnBoardingPreAuthenWidget();
  }
}
