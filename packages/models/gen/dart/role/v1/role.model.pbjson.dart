//
//  Generated code. Do not modify.
//  source: role/v1/role.model.proto
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

@$core.Deprecated('Use roleDescriptor instead')
const Role$json = {
  '1': 'Role',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `Role`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List roleDescriptor = $convert.base64Decode(
    'CgRSb2xlEg4KAmlkGAEgASgJUgJpZA==');

