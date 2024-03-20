import "package:http/http.dart";
import 'package:techmely_app/features/preferences/infra/http/interceptor/tml_interceptor.dart';
import 'dart:core';

class BaseInterceptor implements TMLInterceptors {
  final String baseUrl;
  BaseInterceptor(this.baseUrl);

  @override
  Future<Request> interceptRequest(Request request) async {
    final newUrl = Uri.parse(baseUrl + request.url.toString());
    request = Request(request.method, newUrl);
    return request;
  }

  @override
  Future<Response> interceptResponse(Response response) async {
    return response;
  }
}
