import 'package:flutter/material.dart';

import '../widgets/waiting_page_widget.dart';

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
    final PageController _pageController = PageController();
    return Scaffold(
      body: PageView(
        controller: _pageController,
        onPageChanged: (int page) {
          setState(() {
            _currentPage = page;
          });
        },
        children: [
          WaitingPageWidget(
            text: 'Chào mừng đến với ứng dụng của chúng tôi!',
            icon: Icons.emoji_emotions,
            showNextButton: true,
            showBackButton: false,
            showFinalButton: false,
            pageController: _pageController,
          ),
          WaitingPageWidget(
            text: 'Khám phá các tính năng tuyệt vời!',
            icon: Icons.explore,
            showNextButton: true,
            showBackButton: true,
            showFinalButton: false,
            pageController: _pageController,
          ),
          WaitingPageWidget(
            text: 'Bắt đầu hành trình của bạn ngay bây giờ!',
            icon: Icons.rocket_launch,
            showNextButton: false,
            showBackButton: true,
            showFinalButton: true,
            pageController: _pageController,
          ),
        ],
      ),
    );
  }
}
