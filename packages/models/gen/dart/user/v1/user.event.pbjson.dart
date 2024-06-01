//
//  Generated code. Do not modify.
//  source: user/v1/user.event.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use createUserRequestDescriptor instead')
const CreateUserRequest$json = {
  '1': 'CreateUserRequest',
  '2': [
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
  ],
};

/// Descriptor for `CreateUserRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List createUserRequestDescriptor = $convert.base64Decode(
    'ChFDcmVhdGVVc2VyUmVxdWVzdBIUCgVlbWFpbBgCIAEoCVIFZW1haWwSGgoIbmlja25hbWUYAy'
    'ABKAlSCG5pY2tuYW1lEjIKBnN0YXR1cxgEIAEoDjIaLmdlbi5nby51c2VyLnYxLlVzZXJTdGF0'
    'dXNSBnN0YXR1cxIqChFpc19lbWFpbF92ZXJpZmllZBgFIAEoCFIPaXNFbWFpbFZlcmlmaWVkEh'
    'IKBG5hbWUYBiABKAlSBG5hbWUSHQoKYXZhdGFyX3VybBgHIAEoCVIJYXZhdGFyVXJsEigKEGZp'
    'cmViYXNlX3VzZXJfaWQYCCABKAlSDmZpcmViYXNlVXNlcklkEkEKDWF1dGhfc3RyYXRlZ3kYCS'
    'ABKA4yHC5nZW4uZ28udXNlci52MS5BdXRoU3RyYXRlZ3lSDGF1dGhTdHJhdGVneRIjCg1vcGVu'
    'X3BsYXRmb3JtGAogASgJUgxvcGVuUGxhdGZvcm0SIQoMdXRtX2NhbXBhaWduGAsgASgJUgt1dG'
    '1DYW1wYWlnbhIdCgp1dG1fbWVkaXVtGAwgASgJUgl1dG1NZWRpdW0SHQoKdXRtX3NvdXJjZRgN'
    'IAEoCVIJdXRtU291cmNlEjAKCG1ldGFkYXRhGA4gASgLMhQuZ29vZ2xlLnByb3RvYnVmLkFueV'
    'IIbWV0YWRhdGE=');

@$core.Deprecated('Use getUserRequestDescriptor instead')
const GetUserRequest$json = {
  '1': 'GetUserRequest',
  '2': [
    {'1': 'key', '3': 1, '4': 1, '5': 9, '10': 'key'},
  ],
};

/// Descriptor for `GetUserRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getUserRequestDescriptor = $convert.base64Decode(
    'Cg5HZXRVc2VyUmVxdWVzdBIQCgNrZXkYASABKAlSA2tleQ==');

@$core.Deprecated('Use getUserByAuthIdRequestDescriptor instead')
const GetUserByAuthIdRequest$json = {
  '1': 'GetUserByAuthIdRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `GetUserByAuthIdRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getUserByAuthIdRequestDescriptor = $convert.base64Decode(
    'ChZHZXRVc2VyQnlBdXRoSWRSZXF1ZXN0Eg4KAmlkGAEgASgJUgJpZA==');

@$core.Deprecated('Use getUsersPaginationRequestDescriptor instead')
const GetUsersPaginationRequest$json = {
  '1': 'GetUsersPaginationRequest',
  '2': [
    {'1': 'tenantId', '3': 1, '4': 1, '5': 9, '10': 'tenantId'},
    {'1': 'limit', '3': 2, '4': 1, '5': 4, '10': 'limit'},
    {'1': 'page', '3': 3, '4': 1, '5': 4, '10': 'page'},
  ],
};

/// Descriptor for `GetUsersPaginationRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getUsersPaginationRequestDescriptor = $convert.base64Decode(
    'ChlHZXRVc2Vyc1BhZ2luYXRpb25SZXF1ZXN0EhoKCHRlbmFudElkGAEgASgJUgh0ZW5hbnRJZB'
    'IUCgVsaW1pdBgCIAEoBFIFbGltaXQSEgoEcGFnZRgDIAEoBFIEcGFnZQ==');

@$core.Deprecated('Use getUsersPaginationResponseDescriptor instead')
const GetUsersPaginationResponse$json = {
  '1': 'GetUsersPaginationResponse',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `GetUsersPaginationResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List getUsersPaginationResponseDescriptor = $convert.base64Decode(
    'ChpHZXRVc2Vyc1BhZ2luYXRpb25SZXNwb25zZRIOCgJpZBgBIAEoCVICaWQ=');

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

@$core.Deprecated('Use deleteUserRequestDescriptor instead')
const DeleteUserRequest$json = {
  '1': 'DeleteUserRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `DeleteUserRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List deleteUserRequestDescriptor = $convert.base64Decode(
    'ChFEZWxldGVVc2VyUmVxdWVzdBIOCgJpZBgBIAEoCVICaWQ=');

@$core.Deprecated('Use deleteUserResponseDescriptor instead')
const DeleteUserResponse$json = {
  '1': 'DeleteUserResponse',
  '2': [
    {'1': 'email', '3': 1, '4': 1, '5': 9, '10': 'email'},
  ],
};

/// Descriptor for `DeleteUserResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List deleteUserResponseDescriptor = $convert.base64Decode(
    'ChJEZWxldGVVc2VyUmVzcG9uc2USFAoFZW1haWwYASABKAlSBWVtYWls');

