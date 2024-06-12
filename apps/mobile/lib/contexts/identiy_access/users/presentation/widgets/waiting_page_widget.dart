import 'package:flutter/material.dart';

import 'on_boarding_pre_authen_widget.dart';

class WaitingPageWidget extends StatefulWidget {
  final String text;
  final IconData icon;
  final bool showNextButton;
  final bool showBackButton;
  final bool showFinalButton;
  final PageController pageController;

  const WaitingPageWidget({
    Key? key,
    this.text = '',
    required this.icon,
    this.showNextButton = false,
    this.showBackButton = false,
    this.showFinalButton = false,
    required this.pageController,
  }) : super(key: key);

  @override
  State<WaitingPageWidget> createState() => _WaitingPageWidgetState();
}

class _WaitingPageWidgetState extends State<WaitingPageWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.blue, // Màu nền tùy chỉnh
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(widget.icon, size: 100, color: Colors.white),
            SizedBox(height: 20),
            Text(
              widget.text,
              style: TextStyle(fontSize: 24, color: Colors.white),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 40),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (widget.showBackButton)
                  ElevatedButton(
                    onPressed: () => widget.pageController.previousPage(
                      duration: Duration(milliseconds: 500),
                      curve: Curves.ease,
                    ),
                    child: Text('Quay lại'),
                  ),
                if (widget.showNextButton)
                  ElevatedButton(
                    onPressed: () => widget.pageController.nextPage(
                      duration: Duration(milliseconds: 500),
                      curve: Curves.ease,
                    ),
                    child: Text('Tiếp theo'),
                  ),
                if (widget.showFinalButton)
                  ElevatedButton(
                    onPressed: () => (Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => OnBoardingPreAuthenWidget(),
                      ),
                    )),
                    child: Text('Skip'),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
