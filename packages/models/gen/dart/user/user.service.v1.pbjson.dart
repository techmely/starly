//
//  Generated code. Do not modify.
//  source: user/user.service.v1.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

import 'user.event.v1.pbjson.dart' as $2;

const $core.Map<$core.String, $core.dynamic> UserServiceBase$json = {
  '1': 'UserService',
  '2': [
    {'1': 'Get', '2': '.techmely.user.event.v1.GetUserRequest', '3': '.techmely.user.event.v1.GetUserResponse', '4': {}},
    {'1': 'Put', '2': '.techmely.user.event.v1.UpdateUserRequest', '3': '.techmely.user.event.v1.UpdateUserResponse', '4': {}},
    {'1': 'ChangeEmail', '2': '.techmely.user.event.v1.ChangeUserEmailRequest', '3': '.techmely.user.event.v1.ChangeUserEmailResponse', '4': {}},
  ],
};

@$core.Deprecated('Use userServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> UserServiceBase$messageJson = {
  '.techmely.user.event.v1.GetUserRequest': $2.GetUserRequest$json,
  '.techmely.user.event.v1.GetUserResponse': $2.GetUserResponse$json,
  '.techmely.user.event.v1.UpdateUserRequest': $2.UpdateUserRequest$json,
  '.techmely.user.event.v1.UpdateUserResponse': $2.UpdateUserResponse$json,
  '.techmely.user.event.v1.ChangeUserEmailRequest': $2.ChangeUserEmailRequest$json,
  '.techmely.user.event.v1.ChangeUserEmailResponse': $2.ChangeUserEmailResponse$json,
};

/// Descriptor for `UserService`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List userServiceDescriptor = $convert.base64Decode(
    'CgtVc2VyU2VydmljZRJYCgNHZXQSJi50ZWNobWVseS51c2VyLmV2ZW50LnYxLkdldFVzZXJSZX'
    'F1ZXN0GicudGVjaG1lbHkudXNlci5ldmVudC52MS5HZXRVc2VyUmVzcG9uc2UiABJeCgNQdXQS'
    'KS50ZWNobWVseS51c2VyLmV2ZW50LnYxLlVwZGF0ZVVzZXJSZXF1ZXN0GioudGVjaG1lbHkudX'
    'Nlci5ldmVudC52MS5VcGRhdGVVc2VyUmVzcG9uc2UiABJwCgtDaGFuZ2VFbWFpbBIuLnRlY2ht'
    'ZWx5LnVzZXIuZXZlbnQudjEuQ2hhbmdlVXNlckVtYWlsUmVxdWVzdBovLnRlY2htZWx5LnVzZX'
    'IuZXZlbnQudjEuQ2hhbmdlVXNlckVtYWlsUmVzcG9uc2UiAA==');

