import 'package:hive/hive.dart';

import '../dđ_core.dart';

String getCookie() {
  return Hive.box(BoxNames.settingsBox).get(BoxKeys.cookieKey).toString();
}
