import 'dart:convert';
import 'package:ddd_core/ddd_core.dart';
import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('FieldError', () {
    test('getErrors returns list of FieldError objects', () {
      // Tạo response giả định
      final response = Response(
        data: jsonEncode({
          'errors': [
            {'field': 'username', 'message': 'Username is required'},
            {'field': 'email', 'message': 'Invalid email format'},
          ],
        }),
        statusCode: 400,
        requestOptions: RequestOptions(path: ''),
      );

      // Gọi phương thức getErrors
      final errors = FieldError.getErrors(response);

      // Kiểm tra số lượng đối tượng FieldError
      expect(errors.length, 2);

      // Kiểm tra dữ liệu của từng đối tượng FieldError
      expect(errors[0].field, 'username');
      expect(errors[0].message, 'Username is required');
      expect(errors[1].field, 'email');
      expect(errors[1].message, 'Invalid email format');
    });

    test('getError returns single FieldError object', () {
      // Tạo response giả định
      final response = Response(
        data: jsonEncode({
          'error': {'field': 'password', 'message': 'Password is too long'},
        }),
        statusCode: 400,
        requestOptions: RequestOptions(path: ''),
      );

      // Gọi phương thức getError
      final error = FieldError.getError(response);

      // Kiểm tra dữ liệu của đối tượng FieldError
      expect(error.field, 'password');
      expect(error.message, 'Password is too short');
    });
  });
}
