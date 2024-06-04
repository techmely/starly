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

import '../firebase.model.pbjson.dart' as $1;
import 'account.event.pbjson.dart' as $0;

const $core.Map<$core.String, $core.dynamic> AccountServicePortServiceBase$json = {
  '1': 'AccountServicePort',
  '2': [
    {'1': 'SignIn', '2': '.gen.go.account.v1.SignInRequest', '3': '.gen.go.account.AuthGoogleIdentityResponse', '4': {}},
    {'1': 'SignInWithProvider', '2': '.gen.go.account.v1.SignInWithProviderRequest', '3': '.gen.go.account.AuthGoogleIdentityResponse', '4': {}},
    {'1': 'SignUp', '2': '.gen.go.account.v1.SignUpRequest', '3': '.gen.go.account.AuthGoogleIdentityResponse', '4': {}},
    {'1': 'SignOut', '2': '.gen.go.account.v1.SignOutRequest', '3': '.gen.go.account.v1.SignOutResponse', '4': {}},
    {'1': 'ResendVerificationCode', '2': '.gen.go.account.v1.ResendVerificationCodeRequest', '3': '.gen.go.account.v1.ResendVerificationCodeResponse', '4': {}},
    {'1': 'UpdatePassword', '2': '.gen.go.account.v1.UpdatePasswordRequest', '3': '.gen.go.account.v1.UpdatePasswordResponse', '4': {}},
    {'1': 'UpdateEmail', '2': '.gen.go.account.v1.UpdateEmailRequest', '3': '.gen.go.account.v1.UpdateEmailResponse', '4': {}},
    {'1': 'VerifyAccount', '2': '.gen.go.account.v1.VerifyAccountRequest', '3': '.gen.go.account.v1.VerifyAccountResponse', '4': {}},
    {'1': 'VerifyActivationLink', '2': '.gen.go.account.v1.VerifyActivationLinkRequest', '3': '.gen.go.account.v1.VerifyActivationLinkResponse', '4': {}},
    {'1': 'ForgotPassword', '2': '.gen.go.account.v1.ForgotPasswordRequest', '3': '.gen.go.account.v1.ForgotPasswordResponse', '4': {}},
  ],
};

@$core.Deprecated('Use accountServicePortServiceDescriptor instead')
const $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> AccountServicePortServiceBase$messageJson = {
  '.gen.go.account.v1.SignInRequest': $0.SignInRequest$json,
  '.gen.go.account.AuthGoogleIdentityResponse': $1.AuthGoogleIdentityResponse$json,
  '.gen.go.account.v1.SignInWithProviderRequest': $0.SignInWithProviderRequest$json,
  '.gen.go.account.v1.SignUpRequest': $0.SignUpRequest$json,
  '.gen.go.account.v1.SignOutRequest': $0.SignOutRequest$json,
  '.gen.go.account.v1.SignOutResponse': $0.SignOutResponse$json,
  '.gen.go.account.v1.ResendVerificationCodeRequest': $0.ResendVerificationCodeRequest$json,
  '.gen.go.account.v1.ResendVerificationCodeResponse': $0.ResendVerificationCodeResponse$json,
  '.gen.go.account.v1.UpdatePasswordRequest': $0.UpdatePasswordRequest$json,
  '.gen.go.account.v1.UpdatePasswordResponse': $0.UpdatePasswordResponse$json,
  '.gen.go.account.v1.UpdateEmailRequest': $0.UpdateEmailRequest$json,
  '.gen.go.account.v1.UpdateEmailResponse': $0.UpdateEmailResponse$json,
  '.gen.go.account.v1.VerifyAccountRequest': $0.VerifyAccountRequest$json,
  '.gen.go.account.v1.VerifyAccountResponse': $0.VerifyAccountResponse$json,
  '.gen.go.account.v1.VerifyActivationLinkRequest': $0.VerifyActivationLinkRequest$json,
  '.gen.go.account.v1.VerifyActivationLinkResponse': $0.VerifyActivationLinkResponse$json,
  '.gen.go.account.v1.ForgotPasswordRequest': $0.ForgotPasswordRequest$json,
  '.gen.go.account.v1.ForgotPasswordResponse': $0.ForgotPasswordResponse$json,
};

/// Descriptor for `AccountServicePort`. Decode as a `google.protobuf.ServiceDescriptorProto`.
final $typed_data.Uint8List accountServicePortServiceDescriptor = $convert.base64Decode(
    'ChJBY2NvdW50U2VydmljZVBvcnQSWAoGU2lnbkluEiAuZ2VuLmdvLmFjY291bnQudjEuU2lnbk'
    'luUmVxdWVzdBoqLmdlbi5nby5hY2NvdW50LkF1dGhHb29nbGVJZGVudGl0eVJlc3BvbnNlIgAS'
    'cAoSU2lnbkluV2l0aFByb3ZpZGVyEiwuZ2VuLmdvLmFjY291bnQudjEuU2lnbkluV2l0aFByb3'
    'ZpZGVyUmVxdWVzdBoqLmdlbi5nby5hY2NvdW50LkF1dGhHb29nbGVJZGVudGl0eVJlc3BvbnNl'
    'IgASWAoGU2lnblVwEiAuZ2VuLmdvLmFjY291bnQudjEuU2lnblVwUmVxdWVzdBoqLmdlbi5nby'
    '5hY2NvdW50LkF1dGhHb29nbGVJZGVudGl0eVJlc3BvbnNlIgASUgoHU2lnbk91dBIhLmdlbi5n'
    'by5hY2NvdW50LnYxLlNpZ25PdXRSZXF1ZXN0GiIuZ2VuLmdvLmFjY291bnQudjEuU2lnbk91dF'
    'Jlc3BvbnNlIgASfwoWUmVzZW5kVmVyaWZpY2F0aW9uQ29kZRIwLmdlbi5nby5hY2NvdW50LnYx'
    'LlJlc2VuZFZlcmlmaWNhdGlvbkNvZGVSZXF1ZXN0GjEuZ2VuLmdvLmFjY291bnQudjEuUmVzZW'
    '5kVmVyaWZpY2F0aW9uQ29kZVJlc3BvbnNlIgASZwoOVXBkYXRlUGFzc3dvcmQSKC5nZW4uZ28u'
    'YWNjb3VudC52MS5VcGRhdGVQYXNzd29yZFJlcXVlc3QaKS5nZW4uZ28uYWNjb3VudC52MS5VcG'
    'RhdGVQYXNzd29yZFJlc3BvbnNlIgASXgoLVXBkYXRlRW1haWwSJS5nZW4uZ28uYWNjb3VudC52'
    'MS5VcGRhdGVFbWFpbFJlcXVlc3QaJi5nZW4uZ28uYWNjb3VudC52MS5VcGRhdGVFbWFpbFJlc3'
    'BvbnNlIgASZAoNVmVyaWZ5QWNjb3VudBInLmdlbi5nby5hY2NvdW50LnYxLlZlcmlmeUFjY291'
    'bnRSZXF1ZXN0GiguZ2VuLmdvLmFjY291bnQudjEuVmVyaWZ5QWNjb3VudFJlc3BvbnNlIgASeQ'
    'oUVmVyaWZ5QWN0aXZhdGlvbkxpbmsSLi5nZW4uZ28uYWNjb3VudC52MS5WZXJpZnlBY3RpdmF0'
    'aW9uTGlua1JlcXVlc3QaLy5nZW4uZ28uYWNjb3VudC52MS5WZXJpZnlBY3RpdmF0aW9uTGlua1'
    'Jlc3BvbnNlIgASZwoORm9yZ290UGFzc3dvcmQSKC5nZW4uZ28uYWNjb3VudC52MS5Gb3Jnb3RQ'
    'YXNzd29yZFJlcXVlc3QaKS5nZW4uZ28uYWNjb3VudC52MS5Gb3Jnb3RQYXNzd29yZFJlc3Bvbn'
    'NlIgA=');

