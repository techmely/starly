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

import 'account.event.pbjson.dart' as $0;

const $core.Map<$core.String, $core.dynamic> AccountServicePortServiceBase$json = {
  '1': 'AccountServicePort',
  '2': [
    {'1': 'login', '2': '.gen.go.auth.v1.LoginRequest', '3': '.gen.go.auth.v1.LoginResponse', '4': {}},
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
    'Vlc3QaHS5nZW4uZ28uYXV0aC52MS5Mb2dpblJlc3BvbnNlIgASTwoIcmVnaXN0ZXISHy5nZW4u'
    'Z28uYXV0aC52MS5SZWdpc3RlclJlcXVlc3QaIC5nZW4uZ28uYXV0aC52MS5SZWdpc3RlclJlc3'
    'BvbnNlIgASSQoGbG9nb3V0Eh0uZ2VuLmdvLmF1dGgudjEuTG9nb3V0UmVxdWVzdBoeLmdlbi5n'
    'by5hdXRoLnYxLkxvZ291dFJlc3BvbnNlIgASeQoWcmVzZW5kVmVyaWZpY2F0aW9uQ29kZRItLm'
    'dlbi5nby5hdXRoLnYxLlJlc2VuZFZlcmlmaWNhdGlvbkNvZGVSZXF1ZXN0Gi4uZ2VuLmdvLmF1'
    'dGgudjEuUmVzZW5kVmVyaWZpY2F0aW9uQ29kZVJlc3BvbnNlIgASYQoOdXBkYXRlUGFzc3dvcm'
    'QSJS5nZW4uZ28uYXV0aC52MS5VcGRhdGVQYXNzd29yZFJlcXVlc3QaJi5nZW4uZ28uYXV0aC52'
    'MS5VcGRhdGVQYXNzd29yZFJlc3BvbnNlIgASWAoLdXBkYXRlRW1haWwSIi5nZW4uZ28uYXV0aC'
    '52MS5VcGRhdGVFbWFpbFJlcXVlc3QaIy5nZW4uZ28uYXV0aC52MS5VcGRhdGVFbWFpbFJlc3Bv'
    'bnNlIgASXgoNdmVyaWZ5QWNjb3VudBIkLmdlbi5nby5hdXRoLnYxLlZlcmlmeUFjY291bnRSZX'
    'F1ZXN0GiUuZ2VuLmdvLmF1dGgudjEuVmVyaWZ5QWNjb3VudFJlc3BvbnNlIgAScwoUdmVyaWZ5'
    'QWN0aXZhdGlvbkxpbmsSKy5nZW4uZ28uYXV0aC52MS5WZXJpZnlBY3RpdmF0aW9uTGlua1JlcX'
    'Vlc3QaLC5nZW4uZ28uYXV0aC52MS5WZXJpZnlBY3RpdmF0aW9uTGlua1Jlc3BvbnNlIgASYQoO'
    'Zm9yZ290UGFzc3dvcmQSJS5nZW4uZ28uYXV0aC52MS5Gb3Jnb3RQYXNzd29yZFJlcXVlc3QaJi'
    '5nZW4uZ28uYXV0aC52MS5Gb3Jnb3RQYXNzd29yZFJlc3BvbnNlIgA=');

