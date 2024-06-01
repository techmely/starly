//
//  Generated code. Do not modify.
//  source: common/common.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use orderDirectionDescriptor instead')
const OrderDirection$json = {
  '1': 'OrderDirection',
  '2': [
    {'1': 'ASC', '2': 0},
    {'1': 'DESC', '2': 1},
  ],
};

/// Descriptor for `OrderDirection`. Decode as a `google.protobuf.EnumDescriptorProto`.
final $typed_data.Uint8List orderDirectionDescriptor = $convert.base64Decode(
    'Cg5PcmRlckRpcmVjdGlvbhIHCgNBU0MQABIICgRERVNDEAE=');

@$core.Deprecated('Use requestFilterDescriptor instead')
const RequestFilter$json = {
  '1': 'RequestFilter',
  '2': [
    {'1': 'page', '3': 1, '4': 1, '5': 4, '10': 'page'},
    {'1': 'limit', '3': 2, '4': 1, '5': 4, '10': 'limit'},
    {'1': 'offset', '3': 3, '4': 1, '5': 4, '10': 'offset'},
    {'1': 'sort_fields', '3': 4, '4': 3, '5': 9, '10': 'sortFields'},
    {'1': 'order_direction', '3': 5, '4': 1, '5': 14, '6': '.gen.go.common.OrderDirection', '10': 'orderDirection'},
  ],
};

/// Descriptor for `RequestFilter`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List requestFilterDescriptor = $convert.base64Decode(
    'Cg1SZXF1ZXN0RmlsdGVyEhIKBHBhZ2UYASABKARSBHBhZ2USFAoFbGltaXQYAiABKARSBWxpbW'
    'l0EhYKBm9mZnNldBgDIAEoBFIGb2Zmc2V0Eh8KC3NvcnRfZmllbGRzGAQgAygJUgpzb3J0Rmll'
    'bGRzEkYKD29yZGVyX2RpcmVjdGlvbhgFIAEoDjIdLmdlbi5nby5jb21tb24uT3JkZXJEaXJlY3'
    'Rpb25SDm9yZGVyRGlyZWN0aW9u');

