//
//  Generated code. Do not modify.
//  source: preferences/v1/preferences.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

import 'preferences.event.pbjson.dart' as $1;

const $core.Map<$core.String, $core.dynamic> PreferencesServiceBase$json = {
  '1': 'PreferencesService',
  '2': [
    {'1': 'Get', '2': '.gen.go.preferences.v1.GetPreferencesRequest', '3': '.gen.go.preferences.v1.GetPreferencesResponse', '4': {}},
  ],
};

@$core.Deprecated('Use preferencesServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> PreferencesServiceBase$messageJson = {
  '.gen.go.preferences.v1.GetPreferencesRequest': $1.GetPreferencesRequest$json,
  '.gen.go.preferences.v1.GetPreferencesResponse': $1.GetPreferencesResponse$json,
};

/// Descriptor for `PreferencesService`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List preferencesServiceDescriptor = $convert.base64Decode(
    'ChJQcmVmZXJlbmNlc1NlcnZpY2USZAoDR2V0EiwuZ2VuLmdvLnByZWZlcmVuY2VzLnYxLkdldF'
    'ByZWZlcmVuY2VzUmVxdWVzdBotLmdlbi5nby5wcmVmZXJlbmNlcy52MS5HZXRQcmVmZXJlbmNl'
    'c1Jlc3BvbnNlIgA=');

