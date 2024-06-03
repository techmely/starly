//
//  Generated code. Do not modify.
//  source: auth/firebase.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

class AuthGoogleIdentityResponse extends $pb.GeneratedMessage {
  factory AuthGoogleIdentityResponse({
    $core.String? idToken,
    $core.String? email,
    $core.String? refreshToken,
    $core.String? expiresIn,
    $core.String? localId,
    $core.bool? registered,
  }) {
    final $result = create();
    if (idToken != null) {
      $result.idToken = idToken;
    }
    if (email != null) {
      $result.email = email;
    }
    if (refreshToken != null) {
      $result.refreshToken = refreshToken;
    }
    if (expiresIn != null) {
      $result.expiresIn = expiresIn;
    }
    if (localId != null) {
      $result.localId = localId;
    }
    if (registered != null) {
      $result.registered = registered;
    }
    return $result;
  }
  AuthGoogleIdentityResponse._() : super();
  factory AuthGoogleIdentityResponse.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory AuthGoogleIdentityResponse.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'AuthGoogleIdentityResponse', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.auth'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'idToken', protoName: 'idToken')
    ..aOS(2, _omitFieldNames ? '' : 'email')
    ..aOS(3, _omitFieldNames ? '' : 'refreshToken', protoName: 'refreshToken')
    ..aOS(4, _omitFieldNames ? '' : 'expiresIn', protoName: 'expiresIn')
    ..aOS(5, _omitFieldNames ? '' : 'localId', protoName: 'localId')
    ..aOB(6, _omitFieldNames ? '' : 'registered')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  AuthGoogleIdentityResponse clone() => AuthGoogleIdentityResponse()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  AuthGoogleIdentityResponse copyWith(void Function(AuthGoogleIdentityResponse) updates) => super.copyWith((message) => updates(message as AuthGoogleIdentityResponse)) as AuthGoogleIdentityResponse;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static AuthGoogleIdentityResponse create() => AuthGoogleIdentityResponse._();
  AuthGoogleIdentityResponse createEmptyInstance() => create();
  static $pb.PbList<AuthGoogleIdentityResponse> createRepeated() => $pb.PbList<AuthGoogleIdentityResponse>();
  @$core.pragma('dart2js:noInline')
  static AuthGoogleIdentityResponse getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<AuthGoogleIdentityResponse>(create);
  static AuthGoogleIdentityResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get idToken => $_getSZ(0);
  @$pb.TagNumber(1)
  set idToken($core.String v) { $_setString(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasIdToken() => $_has(0);
  @$pb.TagNumber(1)
  void clearIdToken() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get email => $_getSZ(1);
  @$pb.TagNumber(2)
  set email($core.String v) { $_setString(1, v); }
  @$pb.TagNumber(2)
  $core.bool hasEmail() => $_has(1);
  @$pb.TagNumber(2)
  void clearEmail() => clearField(2);

  @$pb.TagNumber(3)
  $core.String get refreshToken => $_getSZ(2);
  @$pb.TagNumber(3)
  set refreshToken($core.String v) { $_setString(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasRefreshToken() => $_has(2);
  @$pb.TagNumber(3)
  void clearRefreshToken() => clearField(3);

  @$pb.TagNumber(4)
  $core.String get expiresIn => $_getSZ(3);
  @$pb.TagNumber(4)
  set expiresIn($core.String v) { $_setString(3, v); }
  @$pb.TagNumber(4)
  $core.bool hasExpiresIn() => $_has(3);
  @$pb.TagNumber(4)
  void clearExpiresIn() => clearField(4);

  @$pb.TagNumber(5)
  $core.String get localId => $_getSZ(4);
  @$pb.TagNumber(5)
  set localId($core.String v) { $_setString(4, v); }
  @$pb.TagNumber(5)
  $core.bool hasLocalId() => $_has(4);
  @$pb.TagNumber(5)
  void clearLocalId() => clearField(5);

  @$pb.TagNumber(6)
  $core.bool get registered => $_getBF(5);
  @$pb.TagNumber(6)
  set registered($core.bool v) { $_setBool(5, v); }
  @$pb.TagNumber(6)
  $core.bool hasRegistered() => $_has(5);
  @$pb.TagNumber(6)
  void clearRegistered() => clearField(6);
}

class FirebaseAuthConfig extends $pb.GeneratedMessage {
  factory FirebaseAuthConfig({
    $core.String? apiKey,
    $core.String? projectId,
  }) {
    final $result = create();
    if (apiKey != null) {
      $result.apiKey = apiKey;
    }
    if (projectId != null) {
      $result.projectId = projectId;
    }
    return $result;
  }
  FirebaseAuthConfig._() : super();
  factory FirebaseAuthConfig.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory FirebaseAuthConfig.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'FirebaseAuthConfig', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.auth'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'apiKey', protoName: 'apiKey')
    ..aOS(2, _omitFieldNames ? '' : 'projectId', protoName: 'projectId')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  FirebaseAuthConfig clone() => FirebaseAuthConfig()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  FirebaseAuthConfig copyWith(void Function(FirebaseAuthConfig) updates) => super.copyWith((message) => updates(message as FirebaseAuthConfig)) as FirebaseAuthConfig;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static FirebaseAuthConfig create() => FirebaseAuthConfig._();
  FirebaseAuthConfig createEmptyInstance() => create();
  static $pb.PbList<FirebaseAuthConfig> createRepeated() => $pb.PbList<FirebaseAuthConfig>();
  @$core.pragma('dart2js:noInline')
  static FirebaseAuthConfig getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<FirebaseAuthConfig>(create);
  static FirebaseAuthConfig? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get apiKey => $_getSZ(0);
  @$pb.TagNumber(1)
  set apiKey($core.String v) { $_setString(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasApiKey() => $_has(0);
  @$pb.TagNumber(1)
  void clearApiKey() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get projectId => $_getSZ(1);
  @$pb.TagNumber(2)
  set projectId($core.String v) { $_setString(1, v); }
  @$pb.TagNumber(2)
  $core.bool hasProjectId() => $_has(1);
  @$pb.TagNumber(2)
  void clearProjectId() => clearField(2);
}

class AuthGoogleIdentityRequestOptions extends $pb.GeneratedMessage {
  factory AuthGoogleIdentityRequestOptions({
    $core.bool? returnSecureToken,
  }) {
    final $result = create();
    if (returnSecureToken != null) {
      $result.returnSecureToken = returnSecureToken;
    }
    return $result;
  }
  AuthGoogleIdentityRequestOptions._() : super();
  factory AuthGoogleIdentityRequestOptions.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory AuthGoogleIdentityRequestOptions.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'AuthGoogleIdentityRequestOptions', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.auth'), createEmptyInstance: create)
    ..aOB(1, _omitFieldNames ? '' : 'returnSecureToken', protoName: 'returnSecureToken')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  AuthGoogleIdentityRequestOptions clone() => AuthGoogleIdentityRequestOptions()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  AuthGoogleIdentityRequestOptions copyWith(void Function(AuthGoogleIdentityRequestOptions) updates) => super.copyWith((message) => updates(message as AuthGoogleIdentityRequestOptions)) as AuthGoogleIdentityRequestOptions;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static AuthGoogleIdentityRequestOptions create() => AuthGoogleIdentityRequestOptions._();
  AuthGoogleIdentityRequestOptions createEmptyInstance() => create();
  static $pb.PbList<AuthGoogleIdentityRequestOptions> createRepeated() => $pb.PbList<AuthGoogleIdentityRequestOptions>();
  @$core.pragma('dart2js:noInline')
  static AuthGoogleIdentityRequestOptions getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<AuthGoogleIdentityRequestOptions>(create);
  static AuthGoogleIdentityRequestOptions? _defaultInstance;

  /// *
  ///  @default true
  @$pb.TagNumber(1)
  $core.bool get returnSecureToken => $_getBF(0);
  @$pb.TagNumber(1)
  set returnSecureToken($core.bool v) { $_setBool(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasReturnSecureToken() => $_has(0);
  @$pb.TagNumber(1)
  void clearReturnSecureToken() => clearField(1);
}

class AuthGoogleIdentityRequest extends $pb.GeneratedMessage {
  factory AuthGoogleIdentityRequest({
    FirebaseAuthConfig? config,
    AuthGoogleIdentityRequestOptions? options,
  }) {
    final $result = create();
    if (config != null) {
      $result.config = config;
    }
    if (options != null) {
      $result.options = options;
    }
    return $result;
  }
  AuthGoogleIdentityRequest._() : super();
  factory AuthGoogleIdentityRequest.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory AuthGoogleIdentityRequest.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'AuthGoogleIdentityRequest', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.auth'), createEmptyInstance: create)
    ..aOM<FirebaseAuthConfig>(1, _omitFieldNames ? '' : 'config', subBuilder: FirebaseAuthConfig.create)
    ..aOM<AuthGoogleIdentityRequestOptions>(2, _omitFieldNames ? '' : 'options', subBuilder: AuthGoogleIdentityRequestOptions.create)
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  AuthGoogleIdentityRequest clone() => AuthGoogleIdentityRequest()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  AuthGoogleIdentityRequest copyWith(void Function(AuthGoogleIdentityRequest) updates) => super.copyWith((message) => updates(message as AuthGoogleIdentityRequest)) as AuthGoogleIdentityRequest;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static AuthGoogleIdentityRequest create() => AuthGoogleIdentityRequest._();
  AuthGoogleIdentityRequest createEmptyInstance() => create();
  static $pb.PbList<AuthGoogleIdentityRequest> createRepeated() => $pb.PbList<AuthGoogleIdentityRequest>();
  @$core.pragma('dart2js:noInline')
  static AuthGoogleIdentityRequest getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<AuthGoogleIdentityRequest>(create);
  static AuthGoogleIdentityRequest? _defaultInstance;

  @$pb.TagNumber(1)
  FirebaseAuthConfig get config => $_getN(0);
  @$pb.TagNumber(1)
  set config(FirebaseAuthConfig v) { setField(1, v); }
  @$pb.TagNumber(1)
  $core.bool hasConfig() => $_has(0);
  @$pb.TagNumber(1)
  void clearConfig() => clearField(1);
  @$pb.TagNumber(1)
  FirebaseAuthConfig ensureConfig() => $_ensure(0);

  @$pb.TagNumber(2)
  AuthGoogleIdentityRequestOptions get options => $_getN(1);
  @$pb.TagNumber(2)
  set options(AuthGoogleIdentityRequestOptions v) { setField(2, v); }
  @$pb.TagNumber(2)
  $core.bool hasOptions() => $_has(1);
  @$pb.TagNumber(2)
  void clearOptions() => clearField(2);
  @$pb.TagNumber(2)
  AuthGoogleIdentityRequestOptions ensureOptions() => $_ensure(1);
}


const _omitFieldNames = $core.bool.fromEnvironment('protobuf.omit_field_names');
const _omitMessageNames = $core.bool.fromEnvironment('protobuf.omit_message_names');
