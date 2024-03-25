import "package:http/http.dart";
import 'package:techmely_app/features/preferences/infra/http/interceptor/i_interceptor.dart';
import 'dart:core';

import 'package:techmely_app/features/preferences/infra/utils/log.dart';

class LoggerInterceptor implements IInterceptor {
  @override
  Future<Request> interceptRequest(Request request) async {
    logI("----*** start of request ***----");
    logI("request: ${request.url}");
    return request;
  }

  @override
  Future<Response> interceptResponse(Response response) async {
    logI("----*** start of response ***----");
    logI("response: ${response.body}");
    return response;
  }
}
