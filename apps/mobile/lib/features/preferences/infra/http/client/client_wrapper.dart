import "dart:convert";

import "package:http/http.dart";
import "package:techmely_app/features/preferences/infra/http/interceptor/tml_interceptor.dart";

// TODO: replace later with custom Client extends BaseClient
class ClientWrapper {
  final Client _client;
  final List<TMLInterceptors> interceptors;
  ClientWrapper(this._client, this.interceptors);

  Future<Response> get(Uri url,
      {Map<String, String> headers = const <String, String>{}}) async {
    final request = Request('GET', url);
    final streamedResponse = await _client.send(request);
    final response = await Response.fromStream(streamedResponse);
    return response;
  }

  Future<Response> post(Uri url,
      {Map<String, String>? headers, Object? body, Encoding? encoding}) async {
    final request = Request('POST', url);
    if (encoding != null) {
      request.encoding = encoding;
    }
    if (body != null) {
      if (body is String) {
        request.body = body;
      } else if (body is List) {
        request.bodyBytes = body.cast<int>();
      } else if (body is Map) {
        request.bodyFields = body.cast<String, String>();
      } else {
        throw ArgumentError('Invalid request body "$body".');
      }
    }
    final streamedResponse = await _client.send(request);
    final response = await Response.fromStream(streamedResponse);
    return response;
  }

  Future<Response> put(Uri url,
      {Map<String, String>? headers, Object? body, Encoding? encoding}) async {
    final request = Request('PUT', url);
    if (encoding != null) {
      request.encoding = encoding;
    }
    if (body != null) {
      if (body is String) {
        request.body = body;
      } else if (body is List) {
        request.bodyBytes = body.cast<int>();
      } else if (body is Map) {
        request.bodyFields = body.cast<String, String>();
      } else {
        throw ArgumentError('Invalid request body "$body".');
      }
    }
    final streamedResponse = await _client.send(request);
    final response = await Response.fromStream(streamedResponse);
    return response;
  }
}
