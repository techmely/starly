//
//  Generated code. Do not modify.
//  source: auth/auth.service.v1.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

import 'auth.event.v1.pbjson.dart' as $0;

const $core.Map<$core.String, $core.dynamic> PreferencesServiceBase$json = {
  '1': 'PreferencesService',
  '2': [
    {'1': 'Get', '2': '.techmely.auth.event.v1.LoginRequest', '3': '.techmely.auth.event.v1.LoginResponse', '4': {}},
  ],
};

@$core.Deprecated('Use preferencesServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> PreferencesServiceBase$messageJson = {
  '.techmely.auth.event.v1.LoginRequest': $0.LoginRequest$json,
  '.techmely.auth.event.v1.LoginResponse': $0.LoginResponse$json,
};

/// Descriptor for `PreferencesService`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List preferencesServiceDescriptor = $convert.base64Decode(
    'ChJQcmVmZXJlbmNlc1NlcnZpY2USVAoDR2V0EiQudGVjaG1lbHkuYXV0aC5ldmVudC52MS5Mb2'
    'dpblJlcXVlc3QaJS50ZWNobWVseS5hdXRoLmV2ZW50LnYxLkxvZ2luUmVzcG9uc2UiAA==');

