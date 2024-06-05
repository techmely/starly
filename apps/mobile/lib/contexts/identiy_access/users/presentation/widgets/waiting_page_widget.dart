import 'package:flutter/material.dart';

class WaitingPageWidget extends StatefulWidget {
  const WaitingPageWidget({super.key});
  @override
  State<WaitingPageWidget> createState() => _WaitingPageWidgetState();
}

class _WaitingPageWidgetState extends State<WaitingPageWidget> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  @override
  Widget _buildSplashPage(String text, IconData icon,
      {bool showNextButton = false, bool showBackButton = false}) {
    return Container(
      color: Colors.blue, // Màu nền tùy chỉnh
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 100, color: Colors.white),
            SizedBox(height: 20),
            Text(
              text,
              style: TextStyle(fontSize: 24, color: Colors.white),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 40),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (showBackButton)
                  ElevatedButton(
                    onPressed: () => _pageController.previousPage(
                      duration: Duration(milliseconds: 500),
                      curve: Curves.ease,
                    ),
                    child: Text('Quay lại'),
                  ),
                if (showNextButton)
                  ElevatedButton(
                    onPressed: () => _pageController.nextPage(
                      duration: Duration(milliseconds: 500),
                      curve: Curves.ease,
                    ),
                    child: Text('Tiếp theo'),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
