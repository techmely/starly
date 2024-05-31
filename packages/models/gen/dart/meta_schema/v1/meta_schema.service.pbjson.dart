//
//  Generated code. Do not modify.
//  source: meta_schema/v1/meta_schema.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

import 'meta_schema.event.pbjson.dart' as $1;

const $core.Map<$core.String, $core.dynamic> MetaSchemaServicePortServiceBase$json = {
  '1': 'MetaSchemaServicePort',
  '2': [
    {'1': 'get', '2': '.gen.go.meta_schema.v1.GetMetaSchemaRequest', '3': '.gen.go.meta_schema.v1.GetMetaSchemaResponse', '4': {}},
  ],
};

@$core.Deprecated('Use metaSchemaServicePortServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> MetaSchemaServicePortServiceBase$messageJson = {
  '.gen.go.meta_schema.v1.GetMetaSchemaRequest': $1.GetMetaSchemaRequest$json,
  '.gen.go.meta_schema.v1.GetMetaSchemaResponse': $1.GetMetaSchemaResponse$json,
};

/// Descriptor for `MetaSchemaServicePort`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List metaSchemaServicePortServiceDescriptor = $convert.base64Decode(
    'ChVNZXRhU2NoZW1hU2VydmljZVBvcnQSYgoDZ2V0EisuZ2VuLmdvLm1ldGFfc2NoZW1hLnYxLk'
    'dldE1ldGFTY2hlbWFSZXF1ZXN0GiwuZ2VuLmdvLm1ldGFfc2NoZW1hLnYxLkdldE1ldGFTY2hl'
    'bWFSZXNwb25zZSIA');

