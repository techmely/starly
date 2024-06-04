//
//  Generated code. Do not modify.
//  source: account/v1/account.event.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use signInRequestDescriptor instead')
const SignInRequest$json = {
  '1': 'SignInRequest',
  '2': [
    {'1': 'email', '3': 1, '4': 1, '5': 9, '10': 'email'},
    {'1': 'password', '3': 2, '4': 1, '5': 9, '10': 'password'},
  ],
};

/// Descriptor for `SignInRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List signInRequestDescriptor = $convert.base64Decode(
    'Cg1TaWduSW5SZXF1ZXN0EhQKBWVtYWlsGAEgASgJUgVlbWFpbBIaCghwYXNzd29yZBgCIAEoCV'
    'IIcGFzc3dvcmQ=');

@$core.Deprecated('Use signInWithProviderRequestDescriptor instead')
const SignInWithProviderRequest$json = {
  '1': 'SignInWithProviderRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `SignInWithProviderRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List signInWithProviderRequestDescriptor = $convert.base64Decode(
    'ChlTaWduSW5XaXRoUHJvdmlkZXJSZXF1ZXN0Eg4KAmlkGAEgASgJUgJpZA==');

@$core.Deprecated('Use signUpRequestDescriptor instead')
const SignUpRequest$json = {
  '1': 'SignUpRequest',
  '2': [
    {'1': 'email', '3': 1, '4': 1, '5': 9, '10': 'email'},
    {'1': 'password', '3': 2, '4': 1, '5': 9, '10': 'password'},
  ],
};

/// Descriptor for `SignUpRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List signUpRequestDescriptor = $convert.base64Decode(
    'Cg1TaWduVXBSZXF1ZXN0EhQKBWVtYWlsGAEgASgJUgVlbWFpbBIaCghwYXNzd29yZBgCIAEoCV'
    'IIcGFzc3dvcmQ=');

@$core.Deprecated('Use signOutRequestDescriptor instead')
const SignOutRequest$json = {
  '1': 'SignOutRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `SignOutRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List signOutRequestDescriptor = $convert.base64Decode(
    'Cg5TaWduT3V0UmVxdWVzdBIOCgJpZBgBIAEoCVICaWQ=');

@$core.Deprecated('Use signOutResponseDescriptor instead')
const SignOutResponse$json = {
  '1': 'SignOutResponse',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `SignOutResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List signOutResponseDescriptor = $convert.base64Decode(
    'Cg9TaWduT3V0UmVzcG9uc2USDgoCaWQYASABKAlSAmlk');

@$core.Deprecated('Use resendVerificationCodeRequestDescriptor instead')
const ResendVerificationCodeRequest$json = {
  '1': 'ResendVerificationCodeRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `ResendVerificationCodeRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List resendVerificationCodeRequestDescriptor = $convert.base64Decode(
    'Ch1SZXNlbmRWZXJpZmljYXRpb25Db2RlUmVxdWVzdBIOCgJpZBgBIAEoCVICaWQ=');

@$core.Deprecated('Use resendVerificationCodeResponseDescriptor instead')
const ResendVerificationCodeResponse$json = {
  '1': 'ResendVerificationCodeResponse',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `ResendVerificationCodeResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List resendVerificationCodeResponseDescriptor = $convert.base64Decode(
    'Ch5SZXNlbmRWZXJpZmljYXRpb25Db2RlUmVzcG9uc2USDgoCaWQYASABKAlSAmlk');

@$core.Deprecated('Use updatePasswordRequestDescriptor instead')
const UpdatePasswordRequest$json = {
  '1': 'UpdatePasswordRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `UpdatePasswordRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List updatePasswordRequestDescriptor = $convert.base64Decode(
    'ChVVcGRhdGVQYXNzd29yZFJlcXVlc3QSDgoCaWQYASABKAlSAmlk');

@$core.Deprecated('Use updatePasswordResponseDescriptor instead')
const UpdatePasswordResponse$json = {
  '1': 'UpdatePasswordResponse',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `UpdatePasswordResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List updatePasswordResponseDescriptor = $convert.base64Decode(
    'ChZVcGRhdGVQYXNzd29yZFJlc3BvbnNlEg4KAmlkGAEgASgJUgJpZA==');

@$core.Deprecated('Use updateEmailRequestDescriptor instead')
const UpdateEmailRequest$json = {
  '1': 'UpdateEmailRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `UpdateEmailRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List updateEmailRequestDescriptor = $convert.base64Decode(
    'ChJVcGRhdGVFbWFpbFJlcXVlc3QSDgoCaWQYASABKAlSAmlk');

@$core.Deprecated('Use updateEmailResponseDescriptor instead')
const UpdateEmailResponse$json = {
  '1': 'UpdateEmailResponse',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `UpdateEmailResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List updateEmailResponseDescriptor = $convert.base64Decode(
    'ChNVcGRhdGVFbWFpbFJlc3BvbnNlEg4KAmlkGAEgASgJUgJpZA==');

@$core.Deprecated('Use verifyAccountRequestDescriptor instead')
const VerifyAccountRequest$json = {
  '1': 'VerifyAccountRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `VerifyAccountRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List verifyAccountRequestDescriptor = $convert.base64Decode(
    'ChRWZXJpZnlBY2NvdW50UmVxdWVzdBIOCgJpZBgBIAEoCVICaWQ=');

@$core.Deprecated('Use verifyAccountResponseDescriptor instead')
const VerifyAccountResponse$json = {
  '1': 'VerifyAccountResponse',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `VerifyAccountResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List verifyAccountResponseDescriptor = $convert.base64Decode(
    'ChVWZXJpZnlBY2NvdW50UmVzcG9uc2USDgoCaWQYASABKAlSAmlk');

@$core.Deprecated('Use verifyActivationLinkRequestDescriptor instead')
const VerifyActivationLinkRequest$json = {
  '1': 'VerifyActivationLinkRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `VerifyActivationLinkRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List verifyActivationLinkRequestDescriptor = $convert.base64Decode(
    'ChtWZXJpZnlBY3RpdmF0aW9uTGlua1JlcXVlc3QSDgoCaWQYASABKAlSAmlk');

@$core.Deprecated('Use verifyActivationLinkResponseDescriptor instead')
const VerifyActivationLinkResponse$json = {
  '1': 'VerifyActivationLinkResponse',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `VerifyActivationLinkResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List verifyActivationLinkResponseDescriptor = $convert.base64Decode(
    'ChxWZXJpZnlBY3RpdmF0aW9uTGlua1Jlc3BvbnNlEg4KAmlkGAEgASgJUgJpZA==');

@$core.Deprecated('Use forgotPasswordRequestDescriptor instead')
const ForgotPasswordRequest$json = {
  '1': 'ForgotPasswordRequest',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `ForgotPasswordRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List forgotPasswordRequestDescriptor = $convert.base64Decode(
    'ChVGb3Jnb3RQYXNzd29yZFJlcXVlc3QSDgoCaWQYASABKAlSAmlk');

@$core.Deprecated('Use forgotPasswordResponseDescriptor instead')
const ForgotPasswordResponse$json = {
  '1': 'ForgotPasswordResponse',
  '2': [
    {'1': 'id', '3': 1, '4': 1, '5': 9, '10': 'id'},
  ],
};

/// Descriptor for `ForgotPasswordResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List forgotPasswordResponseDescriptor = $convert.base64Decode(
    'ChZGb3Jnb3RQYXNzd29yZFJlc3BvbnNlEg4KAmlkGAEgASgJUgJpZA==');

