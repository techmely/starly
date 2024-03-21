import "dart:convert";

import "package:http/http.dart";
import "package:techmely_app/features/preferences/infra/http/extensions/base_request.dart";
import "package:techmely_app/features/preferences/infra/http/extensions/base_response.dart";
import "package:techmely_app/features/preferences/infra/http/extensions/uri.dart";
import "package:techmely_app/features/preferences/infra/http/interceptor/i_interceptor.dart";

class InterceptedClient extends BaseClient {
  final List<IInterceptor> interceptors;

  late Client _client;

  InterceptedClient._internal({
    required this.interceptors,
    Client? client,
  }) : _client = client ?? Client();

  factory InterceptedClient.build({
    required List<IInterceptor> interceptors,
    Client? client,
  }) =>
      InterceptedClient._internal(
        interceptors: interceptors,
        client: client,
      );

  @override
  Future<Response> get(
    Uri url, {
    Map<String, String>? headers,
    Map<String, dynamic>? params,
  }) async =>
      (await sendUnstreamed(
          url: url,
          method: 'PUT',
          headers: headers,
          params: params)) as Response;

  @override
  Future<Response> post(
    Uri url, {
    Map<String, String>? headers,
    Map<String, dynamic>? params,
    Object? body,
    Encoding? encoding,
  }) async =>
      (await sendUnstreamed(
          url: url,
          method: 'PUT',
          headers: headers,
          encoding: encoding,
          body: body,
          params: params)) as Response;

  @override
  Future<Response> put(
    Uri url, {
    Map<String, String>? headers,
    Map<String, dynamic>? params,
    Object? body,
    Encoding? encoding,
  }) async =>
      (await sendUnstreamed(
          url: url,
          method: 'PUT',
          headers: headers,
          encoding: encoding,
          body: body,
          params: params)) as Response;
  @override
  Future<Response> delete(
    Uri url, {
    Map<String, String>? headers,
    Map<String, dynamic>? params,
    Object? body,
    Encoding? encoding,
  }) async =>
      (await sendUnstreamed(
          url: url,
          method: 'DELETE',
          headers: headers,
          encoding: encoding,
          body: body,
          params: params)) as Response;

  // WARNING: DO NOT USE THIS
  @override
  Future<StreamedResponse> send(BaseRequest request) async {
    final response = await _request(request, isStream: true);
    final interceptedResponse = await interceptResponse(response);
    return interceptedResponse as StreamedResponse;
  }

  Future<BaseResponse> sendUnstreamed({
    required String method,
    required Uri url,
    Map<String, String>? headers,
    Map<String, dynamic>? params,
    Object? body,
    Encoding? encoding,
  }) async {
    url = url.addParameters(params);
    Request request = Request(method, url);
    if (headers != null) request.headers.addAll(headers);
    if (encoding != null) request.encoding = encoding;
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

    var response = await _request(request);
    final interceptedResponse = await interceptResponse(response);
    return interceptedResponse;
  }

  /// This internal function intercepts the request.
  Future<BaseRequest> interceptRequest(BaseRequest request) async {
    BaseRequest interceptedRequest = request.copy();
    for (IInterceptor interceptor in interceptors) {
      interceptedRequest =
          await interceptor.interceptRequest(interceptedRequest as Request);
    }
    return interceptedRequest;
  }

  /// This internal function intercepts the request.
  Future<BaseResponse> interceptResponse(BaseResponse response) async {
    BaseResponse interceptedResponse = response.copy();
    for (IInterceptor interceptor in interceptors) {
      interceptedResponse =
          await interceptor.interceptResponse(interceptedResponse as Response);
    }
    return interceptedResponse;
  }

  Future<BaseResponse> _request(BaseRequest request,
      {bool isStream = false}) async {
    BaseResponse response;
    try {
      final interceptedRequest = await interceptRequest(request);
      final stream = await _client.send(interceptedRequest);
      response = isStream ? stream : await Response.fromStream(stream);
    } on Exception {
      _client.close();
      rethrow;
    }
    return response;
  }

  @override
  void close() {
    _client.close();
  }
}
