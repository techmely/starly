import 'package:hive/hive.dart';

import '../ddd_core.dart';

String getCookie() {
  return Hive.box(BoxNames.settingsBox).get(BoxKeys.cookieKey).toString();
}
