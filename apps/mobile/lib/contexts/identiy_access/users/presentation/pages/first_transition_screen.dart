import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:techmely_app/contexts/identiy_access/users/presentation/pages/waiting_screen.dart';

import 'on_boarding_screen.dart';

class FirstTransitionScrene extends StatefulWidget {
  const FirstTransitionScrene({super.key});
  @override
  State<FirstTransitionScrene> createState() => _FirstTransitionScreneState();
}

class _FirstTransitionScreneState extends State<FirstTransitionScrene> {
  bool isFirstTime = true;

  void initState() {
    super.initState();
    checkFirstTime();
  }

  void checkFirstTime() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool isFirstTime = prefs.getBool('isFirstTime') ?? true;

    setState(() {
      this.isFirstTime = isFirstTime;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (isFirstTime) {
      return WaitingScreen();
    } else {
      return OnBoardingScreen();
    }
  }
}
