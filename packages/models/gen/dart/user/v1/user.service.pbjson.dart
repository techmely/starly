//
//  Generated code. Do not modify.
//  source: user/v1/user.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

import 'user.event.pbjson.dart' as $5;

const $core.Map<$core.String, $core.dynamic> UserServicePortServiceBase$json = {
  '1': 'UserServicePort',
  '2': [
    {'1': 'register', '2': '.gen.go.user.v1.CreateUserRequest', '3': '.gen.go.user.v1.CreateUserResponse', '4': {}},
    {'1': 'get', '2': '.gen.go.user.v1.GetUserRequest', '3': '.gen.go.user.v1.GetUserResponse', '4': {}},
    {'1': 'getAll', '2': '.gen.go.user.v1.GetUsersRequest', '3': '.gen.go.user.v1.GetUsersResponse', '4': {}},
    {'1': 'update', '2': '.gen.go.user.v1.UpdateUserRequest', '3': '.gen.go.user.v1.UpdateUserResponse', '4': {}},
    {'1': 'delete', '2': '.gen.go.user.v1.DeleteUserRequest', '3': '.gen.go.user.v1.DeleteUserResponse', '4': {}},
  ],
};

@$core.Deprecated('Use userServicePortServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> UserServicePortServiceBase$messageJson = {
  '.gen.go.user.v1.CreateUserRequest': $5.CreateUserRequest$json,
  '.gen.go.user.v1.CreateUserResponse': $5.CreateUserResponse$json,
  '.gen.go.user.v1.GetUserRequest': $5.GetUserRequest$json,
  '.gen.go.user.v1.GetUserResponse': $5.GetUserResponse$json,
  '.gen.go.user.v1.GetUsersRequest': $5.GetUsersRequest$json,
  '.gen.go.user.v1.GetUsersResponse': $5.GetUsersResponse$json,
  '.gen.go.user.v1.UpdateUserRequest': $5.UpdateUserRequest$json,
  '.gen.go.user.v1.UpdateUserResponse': $5.UpdateUserResponse$json,
  '.gen.go.user.v1.DeleteUserRequest': $5.DeleteUserRequest$json,
  '.gen.go.user.v1.DeleteUserResponse': $5.DeleteUserResponse$json,
};

/// Descriptor for `UserServicePort`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List userServicePortServiceDescriptor = $convert.base64Decode(
    'Cg9Vc2VyU2VydmljZVBvcnQSUwoIcmVnaXN0ZXISIS5nZW4uZ28udXNlci52MS5DcmVhdGVVc2'
    'VyUmVxdWVzdBoiLmdlbi5nby51c2VyLnYxLkNyZWF0ZVVzZXJSZXNwb25zZSIAEkgKA2dldBIe'
    'Lmdlbi5nby51c2VyLnYxLkdldFVzZXJSZXF1ZXN0Gh8uZ2VuLmdvLnVzZXIudjEuR2V0VXNlcl'
    'Jlc3BvbnNlIgASTQoGZ2V0QWxsEh8uZ2VuLmdvLnVzZXIudjEuR2V0VXNlcnNSZXF1ZXN0GiAu'
    'Z2VuLmdvLnVzZXIudjEuR2V0VXNlcnNSZXNwb25zZSIAElEKBnVwZGF0ZRIhLmdlbi5nby51c2'
    'VyLnYxLlVwZGF0ZVVzZXJSZXF1ZXN0GiIuZ2VuLmdvLnVzZXIudjEuVXBkYXRlVXNlclJlc3Bv'
    'bnNlIgASUQoGZGVsZXRlEiEuZ2VuLmdvLnVzZXIudjEuRGVsZXRlVXNlclJlcXVlc3QaIi5nZW'
    '4uZ28udXNlci52MS5EZWxldGVVc2VyUmVzcG9uc2UiAA==');

