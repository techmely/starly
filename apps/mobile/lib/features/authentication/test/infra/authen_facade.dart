import 'dart:convert';
import 'dart:io';

import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

import '../../domain/use-cases/auth_failure.dart';
import '../../domain/use-cases/auth_value_objects.dart';
import '../../infra/authen_facade.dart';

class MockDio extends Mock implements Dio {}

void main() {
  late AuthFacade authFacade;
  late Dio mockDio;

  setUp(() {
    mockDio = MockDio();
    authFacade = AuthFacade(mockDio);
  });

  group('login', () {
    test('should login successfully', () async {
      final emailAddress = EmailAddress('test@gmail.com');
      final password = Password('password');
      final requestOptions = RequestOptions(path: '/account/login');

      when(() => mockDio.post(any(), data: any(named: 'data')))
          .thenAnswer((_) async => Response(
                statusCode: 200,
                data: jsonEncode({'token': 'testtoken'}),
                headers: Headers.fromMap({
                  'set-cookie': ['testcookie']
                }),
                requestOptions: requestOptions,
              ));

      final result = await authFacade.login(
          emailAddress: emailAddress, password: password);

      expect(result, right(unit));
    });

    test('should return invalid credentials failure', () async {
      final emailAddress = EmailAddress('test@gmail.com');
      final password = Password('password');
      final requestOptions = RequestOptions(path: '/account/login');

      when(() => mockDio.post(any(), data: any(named: 'data')))
          .thenThrow(DioError(
        response: Response(
          statusCode: 401,
          requestOptions: requestOptions,
        ),
        requestOptions: requestOptions,
      ));

      final result = await authFacade.login(
          emailAddress: emailAddress, password: password);

      expect(result, left(const AuthFailure.invalidCredentials()));
    });

    test('should return server error failure', () async {
      final emailAddress = EmailAddress('test@gmail.com');
      final password = Password('password');

      when(() => mockDio.post(any(), data: any(named: 'data')))
          .thenThrow(SocketException('No internet connection'));

      final result = await authFacade.login(
          emailAddress: emailAddress, password: password);

      expect(result, left(const AuthFailure.serverError()));
    });
  });

  // Test other methods similarly
}
