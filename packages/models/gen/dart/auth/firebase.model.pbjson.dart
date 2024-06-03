//
//  Generated code. Do not modify.
//  source: auth/firebase.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use authGoogleIdentityResponseDescriptor instead')
const AuthGoogleIdentityResponse$json = {
  '1': 'AuthGoogleIdentityResponse',
  '2': [
    {'1': 'idToken', '3': 1, '4': 1, '5': 9, '10': 'idToken'},
    {'1': 'email', '3': 2, '4': 1, '5': 9, '10': 'email'},
    {'1': 'refreshToken', '3': 3, '4': 1, '5': 9, '10': 'refreshToken'},
    {'1': 'expiresIn', '3': 4, '4': 1, '5': 9, '10': 'expiresIn'},
    {'1': 'localId', '3': 5, '4': 1, '5': 9, '10': 'localId'},
    {'1': 'registered', '3': 6, '4': 1, '5': 8, '10': 'registered'},
  ],
};

/// Descriptor for `AuthGoogleIdentityResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List authGoogleIdentityResponseDescriptor = $convert.base64Decode(
    'ChpBdXRoR29vZ2xlSWRlbnRpdHlSZXNwb25zZRIYCgdpZFRva2VuGAEgASgJUgdpZFRva2VuEh'
    'QKBWVtYWlsGAIgASgJUgVlbWFpbBIiCgxyZWZyZXNoVG9rZW4YAyABKAlSDHJlZnJlc2hUb2tl'
    'bhIcCglleHBpcmVzSW4YBCABKAlSCWV4cGlyZXNJbhIYCgdsb2NhbElkGAUgASgJUgdsb2NhbE'
    'lkEh4KCnJlZ2lzdGVyZWQYBiABKAhSCnJlZ2lzdGVyZWQ=');

@$core.Deprecated('Use firebaseAuthConfigDescriptor instead')
const FirebaseAuthConfig$json = {
  '1': 'FirebaseAuthConfig',
  '2': [
    {'1': 'apiKey', '3': 1, '4': 1, '5': 9, '10': 'apiKey'},
    {'1': 'projectId', '3': 2, '4': 1, '5': 9, '10': 'projectId'},
  ],
};

/// Descriptor for `FirebaseAuthConfig`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List firebaseAuthConfigDescriptor = $convert.base64Decode(
    'ChJGaXJlYmFzZUF1dGhDb25maWcSFgoGYXBpS2V5GAEgASgJUgZhcGlLZXkSHAoJcHJvamVjdE'
    'lkGAIgASgJUglwcm9qZWN0SWQ=');

@$core.Deprecated('Use authGoogleIdentityRequestOptionsDescriptor instead')
const AuthGoogleIdentityRequestOptions$json = {
  '1': 'AuthGoogleIdentityRequestOptions',
  '2': [
    {'1': 'returnSecureToken', '3': 1, '4': 1, '5': 8, '10': 'returnSecureToken'},
  ],
};

/// Descriptor for `AuthGoogleIdentityRequestOptions`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List authGoogleIdentityRequestOptionsDescriptor = $convert.base64Decode(
    'CiBBdXRoR29vZ2xlSWRlbnRpdHlSZXF1ZXN0T3B0aW9ucxIsChFyZXR1cm5TZWN1cmVUb2tlbh'
    'gBIAEoCFIRcmV0dXJuU2VjdXJlVG9rZW4=');

@$core.Deprecated('Use authGoogleIdentityRequestDescriptor instead')
const AuthGoogleIdentityRequest$json = {
  '1': 'AuthGoogleIdentityRequest',
  '2': [
    {'1': 'config', '3': 1, '4': 1, '5': 11, '6': '.gen.go.auth.FirebaseAuthConfig', '10': 'config'},
    {'1': 'options', '3': 2, '4': 1, '5': 11, '6': '.gen.go.auth.AuthGoogleIdentityRequestOptions', '9': 0, '10': 'options', '17': true},
  ],
  '8': [
    {'1': '_options'},
  ],
};

/// Descriptor for `AuthGoogleIdentityRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List authGoogleIdentityRequestDescriptor = $convert.base64Decode(
    'ChlBdXRoR29vZ2xlSWRlbnRpdHlSZXF1ZXN0EjcKBmNvbmZpZxgBIAEoCzIfLmdlbi5nby5hdX'
    'RoLkZpcmViYXNlQXV0aENvbmZpZ1IGY29uZmlnEkwKB29wdGlvbnMYAiABKAsyLS5nZW4uZ28u'
    'YXV0aC5BdXRoR29vZ2xlSWRlbnRpdHlSZXF1ZXN0T3B0aW9uc0gAUgdvcHRpb25ziAEBQgoKCF'
    '9vcHRpb25z');

