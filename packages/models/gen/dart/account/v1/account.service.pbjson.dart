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

import '../../google/protobuf/empty.pbjson.dart' as $2;
import '../firebase.model.pbjson.dart' as $1;
import 'account.event.pbjson.dart' as $0;

const $core.Map<$core.String, $core.dynamic> AccountServicePortServiceBase$json = {
  '1': 'AccountServicePort',
  '2': [
    {'1': 'SignIn', '2': '.gen.go.account.v1.SignInRequest', '3': '.gen.go.account.AuthGoogleIdentityResponse', '4': {}},
    {'1': 'SignInWithProvider', '2': '.gen.go.account.v1.SignInWithProviderRequest', '3': '.gen.go.account.AuthGoogleIdentityResponse', '4': {}},
    {'1': 'SignUp', '2': '.gen.go.account.v1.SignUpRequest', '3': '.gen.go.account.AuthGoogleIdentityResponse', '4': {}},
    {'1': 'SignOut', '2': '.google.protobuf.Empty', '3': '.google.protobuf.Empty', '4': {}},
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
  '.google.protobuf.Empty': $2.Empty$json,
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
    '5hY2NvdW50LkF1dGhHb29nbGVJZGVudGl0eVJlc3BvbnNlIgASOwoHU2lnbk91dBIWLmdvb2ds'
    'ZS5wcm90b2J1Zi5FbXB0eRoWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eSIAEn8KFlJlc2VuZFZlcm'
    'lmaWNhdGlvbkNvZGUSMC5nZW4uZ28uYWNjb3VudC52MS5SZXNlbmRWZXJpZmljYXRpb25Db2Rl'
    'UmVxdWVzdBoxLmdlbi5nby5hY2NvdW50LnYxLlJlc2VuZFZlcmlmaWNhdGlvbkNvZGVSZXNwb2'
    '5zZSIAEmcKDlVwZGF0ZVBhc3N3b3JkEiguZ2VuLmdvLmFjY291bnQudjEuVXBkYXRlUGFzc3dv'
    'cmRSZXF1ZXN0GikuZ2VuLmdvLmFjY291bnQudjEuVXBkYXRlUGFzc3dvcmRSZXNwb25zZSIAEl'
    '4KC1VwZGF0ZUVtYWlsEiUuZ2VuLmdvLmFjY291bnQudjEuVXBkYXRlRW1haWxSZXF1ZXN0GiYu'
    'Z2VuLmdvLmFjY291bnQudjEuVXBkYXRlRW1haWxSZXNwb25zZSIAEmQKDVZlcmlmeUFjY291bn'
    'QSJy5nZW4uZ28uYWNjb3VudC52MS5WZXJpZnlBY2NvdW50UmVxdWVzdBooLmdlbi5nby5hY2Nv'
    'dW50LnYxLlZlcmlmeUFjY291bnRSZXNwb25zZSIAEnkKFFZlcmlmeUFjdGl2YXRpb25MaW5rEi'
    '4uZ2VuLmdvLmFjY291bnQudjEuVmVyaWZ5QWN0aXZhdGlvbkxpbmtSZXF1ZXN0Gi8uZ2VuLmdv'
    'LmFjY291bnQudjEuVmVyaWZ5QWN0aXZhdGlvbkxpbmtSZXNwb25zZSIAEmcKDkZvcmdvdFBhc3'
    'N3b3JkEiguZ2VuLmdvLmFjY291bnQudjEuRm9yZ290UGFzc3dvcmRSZXF1ZXN0GikuZ2VuLmdv'
    'LmFjY291bnQudjEuRm9yZ290UGFzc3dvcmRSZXNwb25zZSIA');

