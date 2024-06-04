//
//  Generated code. Do not modify.
//  source: common/response.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use baseErrorResponseDescriptor instead')
const BaseErrorResponse$json = {
  '1': 'BaseErrorResponse',
  '2': [
    {'1': 'code', '3': 1, '4': 1, '5': 9, '10': 'code'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {'1': 'requestId', '3': 3, '4': 1, '5': 9, '10': 'requestId'},
    {'1': 'docs', '3': 4, '4': 1, '5': 9, '9': 0, '10': 'docs', '17': true},
  ],
  '8': [
    {'1': '_docs'},
  ],
};

/// Descriptor for `BaseErrorResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List baseErrorResponseDescriptor = $convert.base64Decode(
    'ChFCYXNlRXJyb3JSZXNwb25zZRISCgRjb2RlGAEgASgJUgRjb2RlEhgKB21lc3NhZ2UYAiABKA'
    'lSB21lc3NhZ2USHAoJcmVxdWVzdElkGAMgASgJUglyZXF1ZXN0SWQSFwoEZG9jcxgEIAEoCUgA'
    'UgRkb2NziAEBQgcKBV9kb2Nz');

@$core.Deprecated('Use baseResponseDescriptor instead')
const BaseResponse$json = {
  '1': 'BaseResponse',
  '2': [
    {'1': 'data', '3': 1, '4': 1, '5': 11, '6': '.google.protobuf.Value', '10': 'data'},
    {'1': 'code', '3': 2, '4': 1, '5': 9, '10': 'code'},
    {'1': 'message', '3': 3, '4': 1, '5': 9, '10': 'message'},
    {'1': 'metadata', '3': 4, '4': 1, '5': 11, '6': '.google.protobuf.Value', '10': 'metadata'},
  ],
};

/// Descriptor for `BaseResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List baseResponseDescriptor = $convert.base64Decode(
    'CgxCYXNlUmVzcG9uc2USKgoEZGF0YRgBIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZVIEZG'
    'F0YRISCgRjb2RlGAIgASgJUgRjb2RlEhgKB21lc3NhZ2UYAyABKAlSB21lc3NhZ2USMgoIbWV0'
    'YWRhdGEYBCABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWVSCG1ldGFkYXRh');

