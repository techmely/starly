import 'package:flutter/material.dart';

class WaitingScreen extends StatefulWidget {
  const WaitingScreen({super.key});
  @override
  State<WaitingScreen> createState() => _WaitingScreenState();
}

class _WaitingScreenState extends State<WaitingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _pageController,
        onPageChanged: (int page) {
          setState(() {
            _currentPage = page;
          });
        },
        children: [
          _buildSplashPage(
            'Chào mừng đến với ứng dụng của chúng tôi!',
            Icons.emoji_emotions,
            showNextButton: true,
          ),
          _buildSplashPage(
            'Khám phá các tính năng tuyệt vời!',
            Icons.explore,
            showNextButton: true,
            showBackButton: true,
          ),
          _buildSplashPage(
            'Bắt đầu hành trình của bạn ngay bây giờ!',
            Icons.rocket_launch,
            showBackButton: true,
          ),
        ],
      ),
    );
  }

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
