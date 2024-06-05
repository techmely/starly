import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:techmely_app/contexts/identiy_access/users/presentation/pages/waiting_screen.dart';

class OnBoardingScreen extends StatefulWidget {
  const OnBoardingScreen({super.key});
  @override
  State<OnBoardingScreen> createState() => _OnBoardingScreenState();
}

class _OnBoardingScreenState extends State<OnBoardingScreen> {
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
