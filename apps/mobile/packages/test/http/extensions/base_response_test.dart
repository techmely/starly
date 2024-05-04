import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http_client/http_client.dart';

main() {
  group('BaseResponse.copy', () {
    test('Response is copied from BaseResponse', () {
      final BaseResponse baseResponse = Response("{'foo': 'bar'}", 200);
      final copiedBaseResponse = baseResponse.copy();

      final copied = copiedBaseResponse as Response;

      final response = baseResponse as Response;
      expect(copied.hashCode, isNot(equals(response.hashCode)));
      expect(copied.statusCode, equals(response.statusCode));
      expect(copied.body,equals(response.body));
      expect(copied.headers,equals(response.headers));
      expect(copied.isRedirect,equals(response.isRedirect));
      expect(copied.persistentConnection,equals(response.persistentConnection));
    });
  });
}
