//
//  Generated code. Do not modify.
//  source: user/v1/user.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use userStatusDescriptor instead')
const UserStatus$json = {
  '1': 'UserStatus',
  '2': [
    {'1': 'INACTIVE', '2': 0},
    {'1': 'ACTIVE', '2': 1},
    {'1': 'CLOSED', '2': 2},
  ],
};

/// Descriptor for `UserStatus`. Decode as a `google.protobuf.EnumDescriptorProto`.
final $typed_data.Uint8List userStatusDescriptor = $convert.base64Decode(
    'CgpVc2VyU3RhdHVzEgwKCElOQUNUSVZFEAASCgoGQUNUSVZFEAESCgoGQ0xPU0VEEAI=');

@$core.Deprecated('Use authStrategyDescriptor instead')
const AuthStrategy$json = {
  '1': 'AuthStrategy',
  '2': [
    {'1': 'BASIC', '2': 0},
    {'1': 'GOOGLE', '2': 1},
    {'1': 'GITHUB', '2': 2},
    {'1': 'FACEBOOK', '2': 3},
    {'1': 'X', '2': 4},
    {'1': 'APPLE', '2': 5},
    {'1': 'LINKEDIN', '2': 6},
  ],
};

/// Descriptor for `AuthStrategy`. Decode as a `google.protobuf.EnumDescriptorProto`.
final $typed_data.Uint8List authStrategyDescriptor = $convert.base64Decode(
    'CgxBdXRoU3RyYXRlZ3kSCQoFQkFTSUMQABIKCgZHT09HTEUQARIKCgZHSVRIVUIQAhIMCghGQU'
    'NFQk9PSxADEgUKAVgQBBIJCgVBUFBMRRAFEgwKCExJTktFRElOEAY=');

@$core.Deprecated('Use userModelDescriptor instead')
const UserModel$json = {
  '1': 'UserModel',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
    {'1': 'email', '3': 2, '4': 1, '5': 9, '10': 'email'},
    {'1': 'nickname', '3': 3, '4': 1, '5': 9, '10': 'nickname'},
    {'1': 'status', '3': 4, '4': 1, '5': 14, '6': '.gen.go.user.v1.UserStatus', '10': 'status'},
    {'1': 'is_email_verified', '3': 5, '4': 1, '5': 8, '10': 'isEmailVerified'},
    {'1': 'name', '3': 6, '4': 1, '5': 9, '10': 'name'},
    {'1': 'avatar_url', '3': 7, '4': 1, '5': 9, '10': 'avatarUrl'},
    {'1': 'firebase_user_id', '3': 8, '4': 1, '5': 9, '10': 'firebaseUserId'},
    {'1': 'auth_strategy', '3': 9, '4': 1, '5': 14, '6': '.gen.go.user.v1.AuthStrategy', '10': 'authStrategy'},
    {'1': 'open_platform', '3': 10, '4': 1, '5': 9, '10': 'openPlatform'},
    {'1': 'utm_campaign', '3': 11, '4': 1, '5': 9, '10': 'utmCampaign'},
    {'1': 'utm_medium', '3': 12, '4': 1, '5': 9, '10': 'utmMedium'},
    {'1': 'utm_source', '3': 13, '4': 1, '5': 9, '10': 'utmSource'},
    {'1': 'metadata', '3': 14, '4': 1, '5': 11, '6': '.google.protobuf.Any', '10': 'metadata'},
    {'1': 'created_at', '3': 15, '4': 1, '5': 9, '10': 'createdAt'},
    {'1': 'updated_at', '3': 16, '4': 1, '5': 9, '10': 'updatedAt'},
  ],
};

/// Descriptor for `UserModel`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List userModelDescriptor = $convert.base64Decode(
    'CglVc2VyTW9kZWwSDgoCaWQYASABKAlSAmlkEhQKBWVtYWlsGAIgASgJUgVlbWFpbBIaCghuaW'
    'NrbmFtZRgDIAEoCVIIbmlja25hbWUSMgoGc3RhdHVzGAQgASgOMhouZ2VuLmdvLnVzZXIudjEu'
    'VXNlclN0YXR1c1IGc3RhdHVzEioKEWlzX2VtYWlsX3ZlcmlmaWVkGAUgASgIUg9pc0VtYWlsVm'
    'VyaWZpZWQSEgoEbmFtZRgGIAEoCVIEbmFtZRIdCgphdmF0YXJfdXJsGAcgASgJUglhdmF0YXJV'
    'cmwSKAoQZmlyZWJhc2VfdXNlcl9pZBgIIAEoCVIOZmlyZWJhc2VVc2VySWQSQQoNYXV0aF9zdH'
    'JhdGVneRgJIAEoDjIcLmdlbi5nby51c2VyLnYxLkF1dGhTdHJhdGVneVIMYXV0aFN0cmF0ZWd5'
    'EiMKDW9wZW5fcGxhdGZvcm0YCiABKAlSDG9wZW5QbGF0Zm9ybRIhCgx1dG1fY2FtcGFpZ24YCy'
    'ABKAlSC3V0bUNhbXBhaWduEh0KCnV0bV9tZWRpdW0YDCABKAlSCXV0bU1lZGl1bRIdCgp1dG1f'
    'c291cmNlGA0gASgJUgl1dG1Tb3VyY2USMAoIbWV0YWRhdGEYDiABKAsyFC5nb29nbGUucHJvdG'
    '9idWYuQW55UghtZXRhZGF0YRIdCgpjcmVhdGVkX2F0GA8gASgJUgljcmVhdGVkQXQSHQoKdXBk'
    'YXRlZF9hdBgQIAEoCVIJdXBkYXRlZEF0');

