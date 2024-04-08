//
//  Generated code. Do not modify.
//  source: user/user.event.v1.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use getUserRequestDescriptor instead')
const GetUserRequest$json = {
  '1': 'GetUserRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `GetUserRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getUserRequestDescriptor = $convert.base64Decode(
    'Cg5HZXRVc2VyUmVxdWVzdBIOCgJpZBgBIAEoCVICaWQ=');

@$core.Deprecated('Use getUserResponseDescriptor instead')
const GetUserResponse$json = {
  '1': 'GetUserResponse',
};

/// Descriptor for `GetUserResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getUserResponseDescriptor = $convert.base64Decode(
    'Cg9HZXRVc2VyUmVzcG9uc2U=');

@$core.Deprecated('Use updateUserRequestDescriptor instead')
const UpdateUserRequest$json = {
  '1': 'UpdateUserRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `UpdateUserRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List updateUserRequestDescriptor = $convert.base64Decode(
    'ChFVcGRhdGVVc2VyUmVxdWVzdBIOCgJpZBgBIAEoCVICaWQ=');

@$core.Deprecated('Use updateUserResponseDescriptor instead')
const UpdateUserResponse$json = {
  '1': 'UpdateUserResponse',
};

/// Descriptor for `UpdateUserResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List updateUserResponseDescriptor = $convert.base64Decode(
    'ChJVcGRhdGVVc2VyUmVzcG9uc2U=');

@$core.Deprecated('Use userChangePasswordRequestDescriptor instead')
const UserChangePasswordRequest$json = {
  '1': 'UserChangePasswordRequest',
  '2': [
    {'1': 'email', '3': 1, '4': 1, '5': 9, '10': 'email'},
  ],
};

/// Descriptor for `UserChangePasswordRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List userChangePasswordRequestDescriptor = $convert.base64Decode(
    'ChlVc2VyQ2hhbmdlUGFzc3dvcmRSZXF1ZXN0EhQKBWVtYWlsGAEgASgJUgVlbWFpbA==');

@$core.Deprecated('Use userChangePasswordResponseDescriptor instead')
const UserChangePasswordResponse$json = {
  '1': 'UserChangePasswordResponse',
  '2': [
    {'1': 'email', '3': 1, '4': 1, '5': 9, '10': 'email'},
  ],
};

/// Descriptor for `UserChangePasswordResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List userChangePasswordResponseDescriptor = $convert.base64Decode(
    'ChpVc2VyQ2hhbmdlUGFzc3dvcmRSZXNwb25zZRIUCgVlbWFpbBgBIAEoCVIFZW1haWw=');

@$core.Deprecated('Use changeUserEmailRequestDescriptor instead')
const ChangeUserEmailRequest$json = {
  '1': 'ChangeUserEmailRequest',
  '2': [
    {'1': 'email', '3': 1, '4': 1, '5': 9, '10': 'email'},
  ],
};

/// Descriptor for `ChangeUserEmailRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List changeUserEmailRequestDescriptor = $convert.base64Decode(
    'ChZDaGFuZ2VVc2VyRW1haWxSZXF1ZXN0EhQKBWVtYWlsGAEgASgJUgVlbWFpbA==');

@$core.Deprecated('Use changeUserEmailResponseDescriptor instead')
const ChangeUserEmailResponse$json = {
  '1': 'ChangeUserEmailResponse',
  '2': [
    {'1': 'email', '3': 1, '4': 1, '5': 9, '10': 'email'},
  ],
};

/// Descriptor for `ChangeUserEmailResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List changeUserEmailResponseDescriptor = $convert.base64Decode(
    'ChdDaGFuZ2VVc2VyRW1haWxSZXNwb25zZRIUCgVlbWFpbBgBIAEoCVIFZW1haWw=');

