//
//  Generated code. Do not modify.
//  source: meta_schema/v1/meta_schema.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use metaSchemaTypeDescriptor instead')
const MetaSchemaType$json = {
  '1': 'MetaSchemaType',
  '2': [
    {'1': 'SYSTEM', '2': 0},
    {'1': 'DEFAULT', '2': 1},
  ],
};

/// Descriptor for `MetaSchemaType`. Decode as a `google.protobuf.EnumDescriptorProto`.
final $typed_data.Uint8List metaSchemaTypeDescriptor = $convert.base64Decode(
    'Cg5NZXRhU2NoZW1hVHlwZRIKCgZTWVNURU0QABILCgdERUZBVUxUEAE=');

@$core.Deprecated('Use metaSchemaTableDescriptor instead')
const MetaSchemaTable$json = {
  '1': 'MetaSchemaTable',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 3, '10': 'id'},
    {'1': 'name', '3': 2, '4': 1, '5': 9, '10': 'name'},
    {'1': 'version', '3': 3, '4': 1, '5': 3, '10': 'version'},
    {'1': 'target', '3': 4, '4': 1, '5': 9, '10': 'target'},
    {'1': 'is_default', '3': 5, '4': 1, '5': 8, '10': 'isDefault'},
    {'1': 'schema', '3': 6, '4': 1, '5': 9, '10': 'schema'},
    {'1': 'type', '3': 7, '4': 1, '5': 14, '6': '.gen.go.meta_schema.v1.MetaSchemaType', '10': 'type'},
    {'1': 'tenant_id', '3': 8, '4': 1, '5': 5, '10': 'tenantId'},
    {'1': 'created_at', '3': 9, '4': 1, '5': 9, '10': 'createdAt'},
    {'1': 'updated_at', '3': 10, '4': 1, '5': 9, '10': 'updatedAt'},
  ],
};

/// Descriptor for `MetaSchemaTable`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List metaSchemaTableDescriptor = $convert.base64Decode(
    'Cg9NZXRhU2NoZW1hVGFibGUSDgoCaWQYASABKANSAmlkEhIKBG5hbWUYAiABKAlSBG5hbWUSGA'
    'oHdmVyc2lvbhgDIAEoA1IHdmVyc2lvbhIWCgZ0YXJnZXQYBCABKAlSBnRhcmdldBIdCgppc19k'
    'ZWZhdWx0GAUgASgIUglpc0RlZmF1bHQSFgoGc2NoZW1hGAYgASgJUgZzY2hlbWESOQoEdHlwZR'
    'gHIAEoDjIlLmdlbi5nby5tZXRhX3NjaGVtYS52MS5NZXRhU2NoZW1hVHlwZVIEdHlwZRIbCgl0'
    'ZW5hbnRfaWQYCCABKAVSCHRlbmFudElkEh0KCmNyZWF0ZWRfYXQYCSABKAlSCWNyZWF0ZWRBdB'
    'IdCgp1cGRhdGVkX2F0GAogASgJUgl1cGRhdGVkQXQ=');

