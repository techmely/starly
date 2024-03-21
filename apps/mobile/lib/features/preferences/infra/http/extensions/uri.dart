import 'package:techmely_app/features/preferences/infra/utils/query_parameter.dart';

extension AddParameters on Uri {
  /// Returns a new `Uri` instance based on `this` and adds [parameters].
  Uri addParameters(Map<String, dynamic>? parameters) {
    if (parameters == null) return this;

    String paramUrl = origin + path;

    Map<String, dynamic> newParameters = {};

    queryParametersAll.forEach((key, values) {
      newParameters[key] = values;
    });

    parameters.forEach((key, value) {
      newParameters[key] = value;
    });

    return Uri.parse(buildUrlString(paramUrl, newParameters));
  }
}
