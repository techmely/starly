import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http_client/http_client.dart';

main() {
  group('BaseRequest.copy', () {
    test('Request is copied from BaseRequest', () {
      final BaseRequest baseReq = Request(
          Method.GET.asString, Uri.https("www.example.com", "/test"))
        ..body = jsonEncode(<String, String>{'example_param': 'example_value'});
      final copiedBaseRequest = baseReq.copy();

      final copied = copiedBaseRequest as Request;

      final request = baseReq as Request;
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
}
