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

@$core.Deprecated('Use userRolesDescriptor instead')
const UserRoles$json = {
  '1': 'UserRoles',
  '2': [
    {'1': 'SUPER_ADMIN', '2': 0},
    {'1': 'MODERATOR', '2': 1},
    {'1': 'ADMIN', '2': 2},
    {'1': 'MEMBER', '2': 3},
    {'1': 'GUEST', '2': 4},
  ],
};

/// Descriptor for `UserRoles`. Decode as a `google.protobuf.EnumDescriptorProto`.
final $typed_data.Uint8List userRolesDescriptor = $convert.base64Decode(
    'CglVc2VyUm9sZXMSDwoLU1VQRVJfQURNSU4QABINCglNT0RFUkFUT1IQARIJCgVBRE1JThACEg'
    'oKBk1FTUJFUhADEgkKBUdVRVNUEAQ=');

@$core.Deprecated('Use userStatusDescriptor instead')
const UserStatus$json = {
  '1': 'UserStatus',
  '2': [
    {'1': 'VERIFIED', '2': 0},
    {'1': 'BLACKLIST', '2': 1},
    {'1': 'INACTIVE', '2': 2},
    {'1': 'ACTIVE', '2': 3},
    {'1': 'CLOSED', '2': 4},
  ],
};

/// Descriptor for `UserStatus`. Decode as a `google.protobuf.EnumDescriptorProto`.
final $typed_data.Uint8List userStatusDescriptor = $convert.base64Decode(
    'CgpVc2VyU3RhdHVzEgwKCFZFUklGSUVEEAASDQoJQkxBQ0tMSVNUEAESDAoISU5BQ1RJVkUQAh'
    'IKCgZBQ1RJVkUQAxIKCgZDTE9TRUQQBA==');

@$core.Deprecated('Use userProviderDescriptor instead')
const UserProvider$json = {
  '1': 'UserProvider',
  '2': [
    {'1': 'githubId', '3': 1, '4': 1, '5': 9, '10': 'githubId'},
    {'1': 'googleId', '3': 2, '4': 1, '5': 9, '10': 'googleId'},
    {'1': 'facebookId', '3': 3, '4': 1, '5': 9, '10': 'facebookId'},
    {'1': 'appleId', '3': 4, '4': 1, '5': 9, '10': 'appleId'},
  ],
};

/// Descriptor for `UserProvider`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List userProviderDescriptor = $convert.base64Decode(
    'CgxVc2VyUHJvdmlkZXISGgoIZ2l0aHViSWQYASABKAlSCGdpdGh1YklkEhoKCGdvb2dsZUlkGA'
    'IgASgJUghnb29nbGVJZBIeCgpmYWNlYm9va0lkGAMgASgJUgpmYWNlYm9va0lkEhgKB2FwcGxl'
    'SWQYBCABKAlSB2FwcGxlSWQ=');

@$core.Deprecated('Use userMetadataDescriptor instead')
const UserMetadata$json = {
  '1': 'UserMetadata',
  '2': [
    {'1': 'openPlatform', '3': 1, '4': 1, '5': 9, '10': 'openPlatform'},
    {'1': 'utmCampaign', '3': 2, '4': 1, '5': 9, '10': 'utmCampaign'},
    {'1': 'utmMedium', '3': 3, '4': 1, '5': 9, '10': 'utmMedium'},
    {'1': 'utmSource', '3': 4, '4': 1, '5': 9, '10': 'utmSource'},
  ],
};

/// Descriptor for `UserMetadata`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List userMetadataDescriptor = $convert.base64Decode(
    'CgxVc2VyTWV0YWRhdGESIgoMb3BlblBsYXRmb3JtGAEgASgJUgxvcGVuUGxhdGZvcm0SIAoLdX'
    'RtQ2FtcGFpZ24YAiABKAlSC3V0bUNhbXBhaWduEhwKCXV0bU1lZGl1bRgDIAEoCVIJdXRtTWVk'
    'aXVtEhwKCXV0bVNvdXJjZRgEIAEoCVIJdXRtU291cmNl');

@$core.Deprecated('Use userDescriptor instead')
const User$json = {
  '1': 'User',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
    {'1': 'email', '3': 2, '4': 1, '5': 9, '10': 'email'},
    {'1': 'unverified_email', '3': 3, '4': 1, '5': 9, '10': 'unverifiedEmail'},
    {'1': 'is_email_verified', '3': 4, '4': 1, '5': 8, '10': 'isEmailVerified'},
    {'1': 'nickname', '3': 5, '4': 1, '5': 9, '10': 'nickname'},
    {'1': 'mobile', '3': 6, '4': 1, '5': 9, '10': 'mobile'},
    {'1': 'birthday', '3': 7, '4': 1, '5': 9, '10': 'birthday'},
    {'1': 'name', '3': 8, '4': 1, '5': 9, '10': 'name'},
    {'1': 'avatar_url', '3': 9, '4': 1, '5': 9, '10': 'avatarUrl'},
    {'1': 'locale', '3': 10, '4': 1, '5': 9, '10': 'locale'},
    {'1': 'region', '3': 11, '4': 1, '5': 9, '10': 'region'},
    {'1': 'country_code', '3': 12, '4': 1, '5': 9, '10': 'countryCode'},
    {'1': 'gender', '3': 13, '4': 1, '5': 9, '10': 'gender'},
    {'1': 'salt', '3': 14, '4': 1, '5': 9, '10': 'salt'},
    {'1': 'last_login', '3': 15, '4': 1, '5': 3, '10': 'lastLogin'},
    {'1': 'is_beta_user', '3': 16, '4': 1, '5': 8, '10': 'isBetaUser'},
    {'1': 'metadata', '3': 17, '4': 1, '5': 11, '6': '.gen.go.user.v1.UserMetadata', '10': 'metadata'},
    {'1': 'provider', '3': 18, '4': 1, '5': 11, '6': '.gen.go.user.v1.UserProvider', '10': 'provider'},
  ],
};

/// Descriptor for `User`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List userDescriptor = $convert.base64Decode(
    'CgRVc2VyEg4KAmlkGAEgASgJUgJpZBIUCgVlbWFpbBgCIAEoCVIFZW1haWwSKQoQdW52ZXJpZm'
    'llZF9lbWFpbBgDIAEoCVIPdW52ZXJpZmllZEVtYWlsEioKEWlzX2VtYWlsX3ZlcmlmaWVkGAQg'
    'ASgIUg9pc0VtYWlsVmVyaWZpZWQSGgoIbmlja25hbWUYBSABKAlSCG5pY2tuYW1lEhYKBm1vYm'
    'lsZRgGIAEoCVIGbW9iaWxlEhoKCGJpcnRoZGF5GAcgASgJUghiaXJ0aGRheRISCgRuYW1lGAgg'
    'ASgJUgRuYW1lEh0KCmF2YXRhcl91cmwYCSABKAlSCWF2YXRhclVybBIWCgZsb2NhbGUYCiABKA'
    'lSBmxvY2FsZRIWCgZyZWdpb24YCyABKAlSBnJlZ2lvbhIhCgxjb3VudHJ5X2NvZGUYDCABKAlS'
    'C2NvdW50cnlDb2RlEhYKBmdlbmRlchgNIAEoCVIGZ2VuZGVyEhIKBHNhbHQYDiABKAlSBHNhbH'
    'QSHQoKbGFzdF9sb2dpbhgPIAEoA1IJbGFzdExvZ2luEiAKDGlzX2JldGFfdXNlchgQIAEoCFIK'
    'aXNCZXRhVXNlchI4CghtZXRhZGF0YRgRIAEoCzIcLmdlbi5nby51c2VyLnYxLlVzZXJNZXRhZG'
    'F0YVIIbWV0YWRhdGESOAoIcHJvdmlkZXIYEiABKAsyHC5nZW4uZ28udXNlci52MS5Vc2VyUHJv'
    'dmlkZXJSCHByb3ZpZGVy');

