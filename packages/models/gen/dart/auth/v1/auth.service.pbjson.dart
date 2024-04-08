//
//  Generated code. Do not modify.
//  source: auth/v1/auth.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

import 'auth.event.pbjson.dart' as $0;

const $core.Map<$core.String, $core.dynamic> PreferencesServiceBase$json = {
  '1': 'PreferencesService',
  '2': [
    {'1': 'Get', '2': '.gen.go.auth.v1.LoginRequest', '3': '.gen.go.auth.v1.LoginResponse', '4': {}},
  ],
};

@$core.Deprecated('Use preferencesServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> PreferencesServiceBase$messageJson = {
  '.gen.go.auth.v1.LoginRequest': $0.LoginRequest$json,
  '.gen.go.auth.v1.LoginResponse': $0.LoginResponse$json,
};

/// Descriptor for `PreferencesService`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List preferencesServiceDescriptor = $convert.base64Decode(
    'ChJQcmVmZXJlbmNlc1NlcnZpY2USRAoDR2V0EhwuZ2VuLmdvLmF1dGgudjEuTG9naW5SZXF1ZX'
    'N0Gh0uZ2VuLmdvLmF1dGgudjEuTG9naW5SZXNwb25zZSIA');

