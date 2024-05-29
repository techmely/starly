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

const $core.Map<$core.String, $core.dynamic> UserServiceBase$json = {
  '1': 'UserService',
  '2': [
    {'1': 'Register', '2': '.gen.go.user.v1.CreateUserRequest', '3': '.gen.go.user.v1.CreateUserResponse', '4': {}},
    {'1': 'Get', '2': '.gen.go.user.v1.GetUserRequest', '3': '.gen.go.user.v1.GetUserResponse', '4': {}},
    {'1': 'GetAll', '2': '.gen.go.user.v1.GetUsersRequest', '3': '.gen.go.user.v1.GetUsersResponse', '4': {}},
    {'1': 'Update', '2': '.gen.go.user.v1.UpdateUserRequest', '3': '.gen.go.user.v1.UpdateUserResponse', '4': {}},
    {'1': 'ChangeEmail', '2': '.gen.go.user.v1.ChangeUserEmailRequest', '3': '.gen.go.user.v1.ChangeUserEmailResponse', '4': {}},
    {'1': 'Delete', '2': '.gen.go.user.v1.DeleteUserRequest', '3': '.gen.go.user.v1.DeleteUserResponse', '4': {}},
  ],
};

@$core.Deprecated('Use userServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> UserServiceBase$messageJson = {
  '.gen.go.user.v1.CreateUserRequest': $5.CreateUserRequest$json,
  '.gen.go.user.v1.CreateUserResponse': $5.CreateUserResponse$json,
  '.gen.go.user.v1.GetUserRequest': $5.GetUserRequest$json,
  '.gen.go.user.v1.GetUserResponse': $5.GetUserResponse$json,
  '.gen.go.user.v1.GetUsersRequest': $5.GetUsersRequest$json,
  '.gen.go.user.v1.GetUsersResponse': $5.GetUsersResponse$json,
  '.gen.go.user.v1.UpdateUserRequest': $5.UpdateUserRequest$json,
  '.gen.go.user.v1.UpdateUserResponse': $5.UpdateUserResponse$json,
  '.gen.go.user.v1.ChangeUserEmailRequest': $5.ChangeUserEmailRequest$json,
  '.gen.go.user.v1.ChangeUserEmailResponse': $5.ChangeUserEmailResponse$json,
  '.gen.go.user.v1.DeleteUserRequest': $5.DeleteUserRequest$json,
  '.gen.go.user.v1.DeleteUserResponse': $5.DeleteUserResponse$json,
};

/// Descriptor for `UserService`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List userServiceDescriptor = $convert.base64Decode(
    'CgtVc2VyU2VydmljZRJTCghSZWdpc3RlchIhLmdlbi5nby51c2VyLnYxLkNyZWF0ZVVzZXJSZX'
    'F1ZXN0GiIuZ2VuLmdvLnVzZXIudjEuQ3JlYXRlVXNlclJlc3BvbnNlIgASSAoDR2V0Eh4uZ2Vu'
    'LmdvLnVzZXIudjEuR2V0VXNlclJlcXVlc3QaHy5nZW4uZ28udXNlci52MS5HZXRVc2VyUmVzcG'
    '9uc2UiABJNCgZHZXRBbGwSHy5nZW4uZ28udXNlci52MS5HZXRVc2Vyc1JlcXVlc3QaIC5nZW4u'
    'Z28udXNlci52MS5HZXRVc2Vyc1Jlc3BvbnNlIgASUQoGVXBkYXRlEiEuZ2VuLmdvLnVzZXIudj'
    'EuVXBkYXRlVXNlclJlcXVlc3QaIi5nZW4uZ28udXNlci52MS5VcGRhdGVVc2VyUmVzcG9uc2Ui'
    'ABJgCgtDaGFuZ2VFbWFpbBImLmdlbi5nby51c2VyLnYxLkNoYW5nZVVzZXJFbWFpbFJlcXVlc3'
    'QaJy5nZW4uZ28udXNlci52MS5DaGFuZ2VVc2VyRW1haWxSZXNwb25zZSIAElEKBkRlbGV0ZRIh'
    'Lmdlbi5nby51c2VyLnYxLkRlbGV0ZVVzZXJSZXF1ZXN0GiIuZ2VuLmdvLnVzZXIudjEuRGVsZX'
    'RlVXNlclJlc3BvbnNlIgA=');

