import 'dart:convert';

import 'package:ddd_core/ddd_core.dart';
import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';

class MockResponse extends Mock implements Response {}

void main() {
  group('FieldError', () {
    test('can be instantiated', () {
      final error = FieldError(field: 'username', message: 'Cannot be empty');
      expect(error.field, 'username');
      expect(error.message, 'Cannot be empty');
    });

    test('serializes to JSON correctly', () {
      final error = FieldError(field: 'username', message: 'Cannot be empty');
      final json = error.toJson();
      expect(json, {'field': 'username', 'message': 'Cannot be empty'});
    });

    test('deserializes from JSON correctly', () {
      final json = {'field': 'username', 'message': 'Cannot be empty'};
      final error = FieldError.fromJson(json);
      expect(error.field, 'username');
      expect(error.message, 'Cannot be empty');
    });

    group('getErrors', () {
      test('parses field errors from valid response', () {
        final response = MockResponse();
        when(response.toString()).thenReturn(jsonEncode({
          'errors': [
            {'field': 'username', 'message': 'Cannot be empty'},
            {'field': 'password', 'message': 'Too short'}
          ]
        }));

        final errors = FieldError.getErrors(response);
        expect(errors.length, 2);
        expect(errors[0].field, 'username');
        expect(errors[0].message, 'Cannot be empty');
        expect(errors[1].field, 'password');
        expect(errors[1].message, 'Too short');
      });

      test('handles invalid response format gracefully', () {
        final response = MockResponse();
        when(response.toString()).thenReturn('Invalid JSON');
        expect(() => FieldError.getErrors(response),
            throwsA(isA<FormatException>()));
      });
    });

    group('getError', () {
      test('parses a single field error from valid response', () {
        final response = MockResponse();
        when(response.toString()).thenReturn(jsonEncode({
          'error': {'field': 'username', 'message': 'Cannot be empty'}
        }));

        final error = FieldError.getError(response);
        expect(error.field, 'username');
        expect(error.message, 'Cannot be empty');
      });

      test('handles invalid response format gracefully', () {
        final response = MockResponse();
        when(response.toString()).thenReturn('Invalid JSON');
        expect(() => FieldError.getError(response),
            throwsA(isA<FormatException>()));
      });
    });
  });
}
