import "package:http/http.dart";

abstract class TMLInterceptors {
  Future<Request> interceptRequest(Request request);

  Future<Response> interceptResponse(Response response);
}
