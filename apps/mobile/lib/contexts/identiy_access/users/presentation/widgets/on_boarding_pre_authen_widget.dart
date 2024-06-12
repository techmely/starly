import 'package:flutter/material.dart';

import '../pages/login_screen.dart';

class OnBoardingPreAuthenWidget extends StatefulWidget {
  const OnBoardingPreAuthenWidget({super.key});

  @override
  State<OnBoardingPreAuthenWidget> createState() =>
      _OnBoardingPreAuthenWidgetState();
}

class _OnBoardingPreAuthenWidgetState extends State<OnBoardingPreAuthenWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.blue, // Màu nền tùy chỉnh
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () => (
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => LoginScreen(),
                      ),
                    ),
                  ),
                  child: Text('Login Screen'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
