
import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http_client/http_client.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import 'http_test.mocks.dart';

final base = "http";
@GenerateMocks([InterceptedClient])
void main(){
  var client = MockInterceptedClient();
  setUp(() => {
    client.interceptors = [BaseInterceptor(base)]
  });
  test("testing base client", () async {
    var endpoint = "book";
    final expectedUrl = Uri.parse("$base$endpoint");
    when(client.get(any)).thenAnswer((_) => Future.value(
        Response(jsonEncode({'data': 'Mocked data'}), 200)));
    await client.get(Uri.parse(endpoint));
    // verify(() => client.get(url))

  });
}
