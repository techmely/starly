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

import 'user.event.pbjson.dart' as $2;

const $core.Map<$core.String, $core.dynamic> UserServiceBase$json = {
  '1': 'UserService',
  '2': [
    {'1': 'Get', '2': '.gen.go.user.v1.GetUserRequest', '3': '.gen.go.user.v1.GetUserResponse', '4': {}},
    {'1': 'Put', '2': '.gen.go.user.v1.UpdateUserRequest', '3': '.gen.go.user.v1.UpdateUserResponse', '4': {}},
    {'1': 'ChangeEmail', '2': '.gen.go.user.v1.ChangeUserEmailRequest', '3': '.gen.go.user.v1.ChangeUserEmailResponse', '4': {}},
  ],
};

@$core.Deprecated('Use userServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> UserServiceBase$messageJson = {
  '.gen.go.user.v1.GetUserRequest': $2.GetUserRequest$json,
  '.gen.go.user.v1.GetUserResponse': $2.GetUserResponse$json,
  '.gen.go.user.v1.UpdateUserRequest': $2.UpdateUserRequest$json,
  '.gen.go.user.v1.UpdateUserResponse': $2.UpdateUserResponse$json,
  '.gen.go.user.v1.ChangeUserEmailRequest': $2.ChangeUserEmailRequest$json,
  '.gen.go.user.v1.ChangeUserEmailResponse': $2.ChangeUserEmailResponse$json,
};

/// Descriptor for `UserService`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List userServiceDescriptor = $convert.base64Decode(
    'CgtVc2VyU2VydmljZRJICgNHZXQSHi5nZW4uZ28udXNlci52MS5HZXRVc2VyUmVxdWVzdBofLm'
    'dlbi5nby51c2VyLnYxLkdldFVzZXJSZXNwb25zZSIAEk4KA1B1dBIhLmdlbi5nby51c2VyLnYx'
    'LlVwZGF0ZVVzZXJSZXF1ZXN0GiIuZ2VuLmdvLnVzZXIudjEuVXBkYXRlVXNlclJlc3BvbnNlIg'
    'ASYAoLQ2hhbmdlRW1haWwSJi5nZW4uZ28udXNlci52MS5DaGFuZ2VVc2VyRW1haWxSZXF1ZXN0'
    'GicuZ2VuLmdvLnVzZXIudjEuQ2hhbmdlVXNlckVtYWlsUmVzcG9uc2UiAA==');

