import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:http_client/http_client.dart';

main() {
  late BaseRequest baseReq;
  late Request request;

  setUpAll(() {
    baseReq =
        Request(Method.GET.asString, Uri.https("www.example.com", "/test"))
          ..body =
              jsonEncode(<String, String>{'example_param': 'example_value'})
          ..headers.addAll({
            HttpHeaders.contentTypeHeader: 'application/json; charset=utf-8',
          });
    request = baseReq as Request;
  });
  group('BaseRequest.copy: ', () {
    test('Request is copied from BaseRequest', () {
      final copiedBaseReq = baseReq.copy();

      final copied = copiedBaseReq as Request;

      expect(copied.hashCode, isNot(equals(request.hashCode)));
      expect(copied.url, equals(request.url));
      expect(copied.method, equals(request.method));
      expect(copied.headers, equals(request.headers));
      expect(copied.body, equals(request.body));
      expect(copied.encoding, equals(request.encoding));
      expect(copied.followRedirects, equals(request.followRedirects));
      expect(copied.maxRedirects, equals(request.maxRedirects));
      expect(copied.persistentConnection, equals(request.persistentConnection));
    });
  });
  group('Request.copy: ', () {
    test('Request is copied without differences', () {
      Request copied = request.copy();

      expect(copied.hashCode, isNot(equals(request.hashCode)));
      expect(copied.url, equals(request.url));
      expect(copied.method, equals(request.method));
      expect(copied.headers, equals(request.headers));
      expect(copied.body, equals(request.body));
      expect(copied.encoding, equals(request.encoding));
      expect(copied.followRedirects, equals(request.followRedirects));
      expect(copied.maxRedirects, equals(request.maxRedirects));
      expect(copied.persistentConnection, equals(request.persistentConnection));
    });
    test('Request is copied difference url', () {
      Uri newUrl = Uri.https("www.example.com", "/test2");
      Request copied = request.copy(url: newUrl);

      expect(
          copied.url,
          allOf([
            equals(newUrl),
            isNot(equals(request.url)),
          ]));
      expect(copied.hashCode, isNot(equals(request.hashCode)));
      expect(copied.method, equals(request.method));
      expect(copied.headers, equals(request.headers));
      expect(copied.body, equals(request.body));
      expect(copied.encoding, equals(request.encoding));
      expect(copied.followRedirects, equals(request.followRedirects));
      expect(copied.maxRedirects, equals(request.maxRedirects));
      expect(copied.persistentConnection, equals(request.persistentConnection));
    });
    test('Request is copied difference method', () {
      String newMethod = Method.DELETE.asString;
      Request copied = request.copy(method: newMethod);
      expect(
          copied.method,
          allOf([
            equals(newMethod),
            isNot(equals(request.method)),
          ]));
      expect(copied.url, equals(request.url));
      expect(copied.hashCode, isNot(equals(request.hashCode)));
      expect(copied.headers, equals(request.headers));
      expect(copied.body, equals(request.body));
      expect(copied.encoding, equals(request.encoding));
      expect(copied.followRedirects, equals(request.followRedirects));
      expect(copied.maxRedirects, equals(request.maxRedirects));
      expect(copied.persistentConnection, equals(request.persistentConnection));
    });
    test('Request is copied difference headers', () {
      final newHeaders = Map<String,String>.from(request.headers);
      newHeaders['Authorization'] = 'Bearer token';
      Request copied = request.copy(headers: newHeaders);
      expect(
          copied.headers,
          allOf([
            equals(newHeaders),
            isNot(equals(request.headers)),
          ]));
      expect(copied.method, equals(request.method));
      expect(copied.url, equals(request.url));
      expect(copied.hashCode, isNot(equals(request.hashCode)));
      expect(copied.body, equals(request.body));
      expect(copied.encoding, equals(request.encoding));
      expect(copied.followRedirects, equals(request.followRedirects));
      expect(copied.maxRedirects, equals(request.maxRedirects));
      expect(copied.persistentConnection, equals(request.persistentConnection));
    });
    test('Request is copied difference headers', () {
      final newHeaders = Map<String,String>.from(request.headers);
      Request copied = request.copy(headers: newHeaders);
      expect(copied.method, equals(request.method));
      expect(copied.url, equals(request.url));
      expect(copied.hashCode, isNot(equals(request.hashCode)));
      expect(copied.headers, equals(request.headers));
      expect(copied.body, equals(request.body));
      expect(copied.encoding, equals(request.encoding));
      expect(copied.followRedirects, equals(request.followRedirects));
      expect(copied.maxRedirects, equals(request.maxRedirects));
      expect(copied.persistentConnection, equals(request.persistentConnection));
    });
  });
}
