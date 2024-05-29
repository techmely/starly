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
    {'1': 'Create', '2': '.gen.go.tenant.v1.CreateTenantRequest', '3': '.gen.go.tenant.v1.CreateTenantResponse', '4': {}},
    {'1': 'Get', '2': '.gen.go.tenant.v1.GetTenantRequest', '3': '.gen.go.tenant.v1.GetTenantResponse', '4': {}},
    {'1': 'GetAll', '2': '.gen.go.tenant.v1.GetTenantsRequest', '3': '.gen.go.tenant.v1.GetTenantsResponse', '4': {}},
    {'1': 'GetAvailable', '2': '.gen.go.tenant.v1.GetAvailableTenantsRequest', '3': '.gen.go.tenant.v1.GetAvailableTenantsResponse', '4': {}},
    {'1': 'Update', '2': '.gen.go.tenant.v1.UpdateTenantRequest', '3': '.gen.go.tenant.v1.UpdateTenantResponse', '4': {}},
    {'1': 'Delete', '2': '.gen.go.tenant.v1.DeleteTenantRequest', '3': '.gen.go.tenant.v1.DeleteTenantResponse', '4': {}},
  ],
};

@$core.Deprecated('Use tenantServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> TenantServiceBase$messageJson = {
  '.gen.go.tenant.v1.CreateTenantRequest': $4.CreateTenantRequest$json,
  '.gen.go.tenant.v1.CreateTenantResponse': $4.CreateTenantResponse$json,
  '.gen.go.tenant.v1.GetTenantRequest': $4.GetTenantRequest$json,
  '.gen.go.tenant.v1.GetTenantResponse': $4.GetTenantResponse$json,
  '.gen.go.tenant.v1.GetTenantsRequest': $4.GetTenantsRequest$json,
  '.gen.go.tenant.v1.GetTenantsResponse': $4.GetTenantsResponse$json,
  '.gen.go.tenant.v1.GetAvailableTenantsRequest': $4.GetAvailableTenantsRequest$json,
  '.gen.go.tenant.v1.GetAvailableTenantsResponse': $4.GetAvailableTenantsResponse$json,
  '.gen.go.tenant.v1.UpdateTenantRequest': $4.UpdateTenantRequest$json,
  '.gen.go.tenant.v1.UpdateTenantResponse': $4.UpdateTenantResponse$json,
  '.gen.go.tenant.v1.DeleteTenantRequest': $4.DeleteTenantRequest$json,
  '.gen.go.tenant.v1.DeleteTenantResponse': $4.DeleteTenantResponse$json,
};

/// Descriptor for `TenantService`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List tenantServiceDescriptor = $convert.base64Decode(
    'Cg1UZW5hbnRTZXJ2aWNlElkKBkNyZWF0ZRIlLmdlbi5nby50ZW5hbnQudjEuQ3JlYXRlVGVuYW'
    '50UmVxdWVzdBomLmdlbi5nby50ZW5hbnQudjEuQ3JlYXRlVGVuYW50UmVzcG9uc2UiABJQCgNH'
    'ZXQSIi5nZW4uZ28udGVuYW50LnYxLkdldFRlbmFudFJlcXVlc3QaIy5nZW4uZ28udGVuYW50Ln'
    'YxLkdldFRlbmFudFJlc3BvbnNlIgASVQoGR2V0QWxsEiMuZ2VuLmdvLnRlbmFudC52MS5HZXRU'
    'ZW5hbnRzUmVxdWVzdBokLmdlbi5nby50ZW5hbnQudjEuR2V0VGVuYW50c1Jlc3BvbnNlIgASbQ'
    'oMR2V0QXZhaWxhYmxlEiwuZ2VuLmdvLnRlbmFudC52MS5HZXRBdmFpbGFibGVUZW5hbnRzUmVx'
    'dWVzdBotLmdlbi5nby50ZW5hbnQudjEuR2V0QXZhaWxhYmxlVGVuYW50c1Jlc3BvbnNlIgASWQ'
    'oGVXBkYXRlEiUuZ2VuLmdvLnRlbmFudC52MS5VcGRhdGVUZW5hbnRSZXF1ZXN0GiYuZ2VuLmdv'
    'LnRlbmFudC52MS5VcGRhdGVUZW5hbnRSZXNwb25zZSIAElkKBkRlbGV0ZRIlLmdlbi5nby50ZW'
    '5hbnQudjEuRGVsZXRlVGVuYW50UmVxdWVzdBomLmdlbi5nby50ZW5hbnQudjEuRGVsZXRlVGVu'
    'YW50UmVzcG9uc2UiAA==');

