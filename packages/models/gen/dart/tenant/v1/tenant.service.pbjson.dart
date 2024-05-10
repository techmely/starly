//
//  Generated code. Do not modify.
//  source: tenant/v1/tenant.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

import 'tenant.event.pbjson.dart' as $4;

const $core.Map<$core.String, $core.dynamic> TenantServiceBase$json = {
  '1': 'TenantService',
  '2': [
    {'1': 'Get', '2': '.gen.go.tenant.v1.GetTenantRequest', '3': '.gen.go.tenant.v1.GetTenantResponse', '4': {}},
  ],
};

@$core.Deprecated('Use tenantServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> TenantServiceBase$messageJson = {
  '.gen.go.tenant.v1.GetTenantRequest': $4.GetTenantRequest$json,
  '.gen.go.tenant.v1.GetTenantResponse': $4.GetTenantResponse$json,
};

/// Descriptor for `TenantService`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List tenantServiceDescriptor = $convert.base64Decode(
    'Cg1UZW5hbnRTZXJ2aWNlElAKA0dldBIiLmdlbi5nby50ZW5hbnQudjEuR2V0VGVuYW50UmVxdW'
    'VzdBojLmdlbi5nby50ZW5hbnQudjEuR2V0VGVuYW50UmVzcG9uc2UiAA==');

