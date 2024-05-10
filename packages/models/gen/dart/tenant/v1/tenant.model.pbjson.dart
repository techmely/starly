//
//  Generated code. Do not modify.
//  source: tenant/v1/tenant.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use tenantTableDescriptor instead')
const TenantTable$json = {
  '1': 'TenantTable',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
    {'1': 'name', '3': 2, '4': 1, '5': 9, '10': 'name'},
    {'1': 'slug', '3': 3, '4': 1, '5': 9, '10': 'slug'},
    {'1': 'description', '3': 4, '4': 1, '5': 9, '10': 'description'},
    {'1': 'is_verified', '3': 5, '4': 1, '5': 8, '10': 'isVerified'},
    {'1': 'owner_id', '3': 6, '4': 1, '5': 9, '10': 'ownerId'},
    {'1': 'metadata', '3': 7, '4': 1, '5': 11, '6': '.google.protobuf.Any', '10': 'metadata'},
    {'1': 'created_at', '3': 8, '4': 1, '5': 9, '10': 'createdAt'},
    {'1': 'updated_at', '3': 9, '4': 1, '5': 9, '10': 'updatedAt'},
  ],
};

/// Descriptor for `TenantTable`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List tenantTableDescriptor = $convert.base64Decode(
    'CgtUZW5hbnRUYWJsZRIOCgJpZBgBIAEoCVICaWQSEgoEbmFtZRgCIAEoCVIEbmFtZRISCgRzbH'
    'VnGAMgASgJUgRzbHVnEiAKC2Rlc2NyaXB0aW9uGAQgASgJUgtkZXNjcmlwdGlvbhIfCgtpc192'
    'ZXJpZmllZBgFIAEoCFIKaXNWZXJpZmllZBIZCghvd25lcl9pZBgGIAEoCVIHb3duZXJJZBIwCg'
    'htZXRhZGF0YRgHIAEoCzIULmdvb2dsZS5wcm90b2J1Zi5BbnlSCG1ldGFkYXRhEh0KCmNyZWF0'
    'ZWRfYXQYCCABKAlSCWNyZWF0ZWRBdBIdCgp1cGRhdGVkX2F0GAkgASgJUgl1cGRhdGVkQXQ=');

