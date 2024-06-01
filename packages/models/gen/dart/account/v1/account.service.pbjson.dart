//
//  Generated code. Do not modify.
//  source: account/v1/account.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

import '../../google/protobuf/empty.pbjson.dart' as $1;
import 'account.event.pbjson.dart' as $0;

const $core.Map<$core.String, $core.dynamic> AccountServicePortServiceBase$json = {
  '1': 'AccountServicePort',
  '2': [
    {'1': 'login', '2': '.gen.go.auth.v1.LoginRequest', '3': '.gen.go.auth.v1.LoginResponse', '4': {}},
    {'1': 'loginWithProvider', '2': '.gen.go.auth.v1.LoginWithProviderRequest', '3': '.google.protobuf.Empty', '4': {}},
    {'1': 'register', '2': '.gen.go.auth.v1.RegisterRequest', '3': '.gen.go.auth.v1.RegisterResponse', '4': {}},
    {'1': 'logout', '2': '.gen.go.auth.v1.LogoutRequest', '3': '.gen.go.auth.v1.LogoutResponse', '4': {}},
    {'1': 'resendVerificationCode', '2': '.gen.go.auth.v1.ResendVerificationCodeRequest', '3': '.gen.go.auth.v1.ResendVerificationCodeResponse', '4': {}},
    {'1': 'updatePassword', '2': '.gen.go.auth.v1.UpdatePasswordRequest', '3': '.gen.go.auth.v1.UpdatePasswordResponse', '4': {}},
    {'1': 'updateEmail', '2': '.gen.go.auth.v1.UpdateEmailRequest', '3': '.gen.go.auth.v1.UpdateEmailResponse', '4': {}},
    {'1': 'verifyAccount', '2': '.gen.go.auth.v1.VerifyAccountRequest', '3': '.gen.go.auth.v1.VerifyAccountResponse', '4': {}},
    {'1': 'verifyActivationLink', '2': '.gen.go.auth.v1.VerifyActivationLinkRequest', '3': '.gen.go.auth.v1.VerifyActivationLinkResponse', '4': {}},
    {'1': 'forgotPassword', '2': '.gen.go.auth.v1.ForgotPasswordRequest', '3': '.gen.go.auth.v1.ForgotPasswordResponse', '4': {}},
  ],
};

@$core.Deprecated('Use accountServicePortServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> AccountServicePortServiceBase$messageJson = {
  '.gen.go.auth.v1.LoginRequest': $0.LoginRequest$json,
  '.gen.go.auth.v1.LoginResponse': $0.LoginResponse$json,
  '.gen.go.auth.v1.LoginWithProviderRequest': $0.LoginWithProviderRequest$json,
  '.google.protobuf.Empty': $1.Empty$json,
  '.gen.go.auth.v1.RegisterRequest': $0.RegisterRequest$json,
  '.gen.go.auth.v1.RegisterResponse': $0.RegisterResponse$json,
  '.gen.go.auth.v1.LogoutRequest': $0.LogoutRequest$json,
  '.gen.go.auth.v1.LogoutResponse': $0.LogoutResponse$json,
  '.gen.go.auth.v1.ResendVerificationCodeRequest': $0.ResendVerificationCodeRequest$json,
  '.gen.go.auth.v1.ResendVerificationCodeResponse': $0.ResendVerificationCodeResponse$json,
  '.gen.go.auth.v1.UpdatePasswordRequest': $0.UpdatePasswordRequest$json,
  '.gen.go.auth.v1.UpdatePasswordResponse': $0.UpdatePasswordResponse$json,
  '.gen.go.auth.v1.UpdateEmailRequest': $0.UpdateEmailRequest$json,
  '.gen.go.auth.v1.UpdateEmailResponse': $0.UpdateEmailResponse$json,
  '.gen.go.auth.v1.VerifyAccountRequest': $0.VerifyAccountRequest$json,
  '.gen.go.auth.v1.VerifyAccountResponse': $0.VerifyAccountResponse$json,
  '.gen.go.auth.v1.VerifyActivationLinkRequest': $0.VerifyActivationLinkRequest$json,
  '.gen.go.auth.v1.VerifyActivationLinkResponse': $0.VerifyActivationLinkResponse$json,
  '.gen.go.auth.v1.ForgotPasswordRequest': $0.ForgotPasswordRequest$json,
  '.gen.go.auth.v1.ForgotPasswordResponse': $0.ForgotPasswordResponse$json,
};

/// Descriptor for `AccountServicePort`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List accountServicePortServiceDescriptor = $convert.base64Decode(
    'ChJBY2NvdW50U2VydmljZVBvcnQSRgoFbG9naW4SHC5nZW4uZ28uYXV0aC52MS5Mb2dpblJlcX'
    'Vlc3QaHS5nZW4uZ28uYXV0aC52MS5Mb2dpblJlc3BvbnNlIgASVwoRbG9naW5XaXRoUHJvdmlk'
    'ZXISKC5nZW4uZ28uYXV0aC52MS5Mb2dpbldpdGhQcm92aWRlclJlcXVlc3QaFi5nb29nbGUucH'
    'JvdG9idWYuRW1wdHkiABJPCghyZWdpc3RlchIfLmdlbi5nby5hdXRoLnYxLlJlZ2lzdGVyUmVx'
    'dWVzdBogLmdlbi5nby5hdXRoLnYxLlJlZ2lzdGVyUmVzcG9uc2UiABJJCgZsb2dvdXQSHS5nZW'
    '4uZ28uYXV0aC52MS5Mb2dvdXRSZXF1ZXN0Gh4uZ2VuLmdvLmF1dGgudjEuTG9nb3V0UmVzcG9u'
    'c2UiABJ5ChZyZXNlbmRWZXJpZmljYXRpb25Db2RlEi0uZ2VuLmdvLmF1dGgudjEuUmVzZW5kVm'
    'VyaWZpY2F0aW9uQ29kZVJlcXVlc3QaLi5nZW4uZ28uYXV0aC52MS5SZXNlbmRWZXJpZmljYXRp'
    'b25Db2RlUmVzcG9uc2UiABJhCg51cGRhdGVQYXNzd29yZBIlLmdlbi5nby5hdXRoLnYxLlVwZG'
    'F0ZVBhc3N3b3JkUmVxdWVzdBomLmdlbi5nby5hdXRoLnYxLlVwZGF0ZVBhc3N3b3JkUmVzcG9u'
    'c2UiABJYCgt1cGRhdGVFbWFpbBIiLmdlbi5nby5hdXRoLnYxLlVwZGF0ZUVtYWlsUmVxdWVzdB'
    'ojLmdlbi5nby5hdXRoLnYxLlVwZGF0ZUVtYWlsUmVzcG9uc2UiABJeCg12ZXJpZnlBY2NvdW50'
    'EiQuZ2VuLmdvLmF1dGgudjEuVmVyaWZ5QWNjb3VudFJlcXVlc3QaJS5nZW4uZ28uYXV0aC52MS'
    '5WZXJpZnlBY2NvdW50UmVzcG9uc2UiABJzChR2ZXJpZnlBY3RpdmF0aW9uTGluaxIrLmdlbi5n'
    'by5hdXRoLnYxLlZlcmlmeUFjdGl2YXRpb25MaW5rUmVxdWVzdBosLmdlbi5nby5hdXRoLnYxLl'
    'ZlcmlmeUFjdGl2YXRpb25MaW5rUmVzcG9uc2UiABJhCg5mb3Jnb3RQYXNzd29yZBIlLmdlbi5n'
    'by5hdXRoLnYxLkZvcmdvdFBhc3N3b3JkUmVxdWVzdBomLmdlbi5nby5hdXRoLnYxLkZvcmdvdF'
    'Bhc3N3b3JkUmVzcG9uc2UiAA==');

