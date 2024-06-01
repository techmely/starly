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

import '../../google/protobuf/any.pbjson.dart' as $4;
import '../../google/protobuf/wrappers.pbjson.dart' as $8;
import 'user.event.pbjson.dart' as $7;
import 'user.model.pbjson.dart' as $6;

const $core.Map<$core.String, $core.dynamic> UserServicePortServiceBase$json = {
  '1': 'UserServicePort',
  '2': [
    {'1': 'Create', '2': '.gen.go.user.v1.CreateUserRequest', '3': '.gen.go.user.v1.UserModel', '4': {}},
    {'1': 'Get', '2': '.gen.go.user.v1.GetUserRequest', '3': '.gen.go.user.v1.UserModel', '4': {}},
    {'1': 'GetPagination', '2': '.gen.go.user.v1.GetUsersPaginationRequest', '3': '.gen.go.user.v1.GetUsersPaginationResponse', '4': {}},
    {'1': 'Update', '2': '.gen.go.user.v1.UpdateUserRequest', '3': '.gen.go.user.v1.UserModel', '4': {}},
    {'1': 'Delete', '2': '.gen.go.user.v1.DeleteUserRequest', '3': '.google.protobuf.BoolValue', '4': {}},
  ],
};

@$core.Deprecated('Use userServicePortServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> UserServicePortServiceBase$messageJson = {
  '.gen.go.user.v1.CreateUserRequest': $7.CreateUserRequest$json,
  '.google.protobuf.Any': $4.Any$json,
  '.gen.go.user.v1.UserModel': $6.UserModel$json,
  '.gen.go.user.v1.GetUserRequest': $7.GetUserRequest$json,
  '.gen.go.user.v1.GetUsersPaginationRequest': $7.GetUsersPaginationRequest$json,
  '.gen.go.user.v1.GetUsersPaginationResponse': $7.GetUsersPaginationResponse$json,
  '.gen.go.user.v1.UpdateUserRequest': $7.UpdateUserRequest$json,
  '.gen.go.user.v1.DeleteUserRequest': $7.DeleteUserRequest$json,
  '.google.protobuf.BoolValue': $8.BoolValue$json,
};

/// Descriptor for `UserServicePort`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List userServicePortServiceDescriptor = $convert.base64Decode(
    'Cg9Vc2VyU2VydmljZVBvcnQSSAoGQ3JlYXRlEiEuZ2VuLmdvLnVzZXIudjEuQ3JlYXRlVXNlcl'
    'JlcXVlc3QaGS5nZW4uZ28udXNlci52MS5Vc2VyTW9kZWwiABJCCgNHZXQSHi5nZW4uZ28udXNl'
    'ci52MS5HZXRVc2VyUmVxdWVzdBoZLmdlbi5nby51c2VyLnYxLlVzZXJNb2RlbCIAEmgKDUdldF'
    'BhZ2luYXRpb24SKS5nZW4uZ28udXNlci52MS5HZXRVc2Vyc1BhZ2luYXRpb25SZXF1ZXN0Giou'
    'Z2VuLmdvLnVzZXIudjEuR2V0VXNlcnNQYWdpbmF0aW9uUmVzcG9uc2UiABJICgZVcGRhdGUSIS'
    '5nZW4uZ28udXNlci52MS5VcGRhdGVVc2VyUmVxdWVzdBoZLmdlbi5nby51c2VyLnYxLlVzZXJN'
    'b2RlbCIAEkkKBkRlbGV0ZRIhLmdlbi5nby51c2VyLnYxLkRlbGV0ZVVzZXJSZXF1ZXN0GhouZ2'
    '9vZ2xlLnByb3RvYnVmLkJvb2xWYWx1ZSIA');

