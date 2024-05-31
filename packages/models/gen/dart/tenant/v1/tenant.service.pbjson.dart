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

const $core.Map<$core.String, $core.dynamic> TenantServicePortServiceBase$json = {
  '1': 'TenantServicePort',
  '2': [
    {'1': 'create', '2': '.gen.go.tenant.v1.CreateTenantRequest', '3': '.gen.go.tenant.v1.CreateTenantResponse', '4': {}},
    {'1': 'get', '2': '.gen.go.tenant.v1.GetTenantRequest', '3': '.gen.go.tenant.v1.GetTenantResponse', '4': {}},
    {'1': 'getAll', '2': '.gen.go.tenant.v1.GetTenantsRequest', '3': '.gen.go.tenant.v1.GetTenantsResponse', '4': {}},
    {'1': 'getAvailable', '2': '.gen.go.tenant.v1.GetAvailableTenantsRequest', '3': '.gen.go.tenant.v1.GetAvailableTenantsResponse', '4': {}},
    {'1': 'update', '2': '.gen.go.tenant.v1.UpdateTenantRequest', '3': '.gen.go.tenant.v1.UpdateTenantResponse', '4': {}},
    {'1': 'delete', '2': '.gen.go.tenant.v1.DeleteTenantRequest', '3': '.gen.go.tenant.v1.DeleteTenantResponse', '4': {}},
  ],
};

@$core.Deprecated('Use tenantServicePortServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> TenantServicePortServiceBase$messageJson = {
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

/// Descriptor for `TenantServicePort`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List tenantServicePortServiceDescriptor = $convert.base64Decode(
    'ChFUZW5hbnRTZXJ2aWNlUG9ydBJZCgZjcmVhdGUSJS5nZW4uZ28udGVuYW50LnYxLkNyZWF0ZV'
    'RlbmFudFJlcXVlc3QaJi5nZW4uZ28udGVuYW50LnYxLkNyZWF0ZVRlbmFudFJlc3BvbnNlIgAS'
    'UAoDZ2V0EiIuZ2VuLmdvLnRlbmFudC52MS5HZXRUZW5hbnRSZXF1ZXN0GiMuZ2VuLmdvLnRlbm'
    'FudC52MS5HZXRUZW5hbnRSZXNwb25zZSIAElUKBmdldEFsbBIjLmdlbi5nby50ZW5hbnQudjEu'
    'R2V0VGVuYW50c1JlcXVlc3QaJC5nZW4uZ28udGVuYW50LnYxLkdldFRlbmFudHNSZXNwb25zZS'
    'IAEm0KDGdldEF2YWlsYWJsZRIsLmdlbi5nby50ZW5hbnQudjEuR2V0QXZhaWxhYmxlVGVuYW50'
    'c1JlcXVlc3QaLS5nZW4uZ28udGVuYW50LnYxLkdldEF2YWlsYWJsZVRlbmFudHNSZXNwb25zZS'
    'IAElkKBnVwZGF0ZRIlLmdlbi5nby50ZW5hbnQudjEuVXBkYXRlVGVuYW50UmVxdWVzdBomLmdl'
    'bi5nby50ZW5hbnQudjEuVXBkYXRlVGVuYW50UmVzcG9uc2UiABJZCgZkZWxldGUSJS5nZW4uZ2'
    '8udGVuYW50LnYxLkRlbGV0ZVRlbmFudFJlcXVlc3QaJi5nZW4uZ28udGVuYW50LnYxLkRlbGV0'
    'ZVRlbmFudFJlc3BvbnNlIgA=');

