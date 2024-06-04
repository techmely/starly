//
//  Generated code. Do not modify.
//  source: user/v1/user.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import '../../google/protobuf/any.pb.dart' as $6;
import 'user.model.pbenum.dart';

export 'user.model.pbenum.dart';

class UserModel extends $pb.GeneratedMessage {
  factory UserModel({
    $core.String? id,
    $core.String? email,
    $core.String? nickname,
    UserStatus? status,
    $core.bool? isEmailVerified,
    $core.String? name,
    $core.String? avatarUrl,
    $core.String? firebaseUserId,
    AuthStrategy? authStrategy,
    $core.String? openPlatform,
    $core.String? utmCampaign,
    $core.String? utmMedium,
    $core.String? utmSource,
    $6.Any? metadata,
    $core.String? createdAt,
    $core.String? updatedAt,
  }) {
    final $result = create();
    if (id != null) {
      $result.id = id;
    }
    if (email != null) {
      $result.email = email;
    }
    if (nickname != null) {
      $result.nickname = nickname;
    }
    if (status != null) {
      $result.status = status;
    }
    if (isEmailVerified != null) {
      $result.isEmailVerified = isEmailVerified;
    }
    if (name != null) {
      $result.name = name;
    }
    if (avatarUrl != null) {
      $result.avatarUrl = avatarUrl;
    }
    if (firebaseUserId != null) {
      $result.firebaseUserId = firebaseUserId;
    }
    if (authStrategy != null) {
      $result.authStrategy = authStrategy;
    }
    if (openPlatform != null) {
      $result.openPlatform = openPlatform;
    }
    if (utmCampaign != null) {
      $result.utmCampaign = utmCampaign;
    }
    if (utmMedium != null) {
      $result.utmMedium = utmMedium;
    }
    if (utmSource != null) {
      $result.utmSource = utmSource;
    }
    if (metadata != null) {
      $result.metadata = metadata;
    }
    if (createdAt != null) {
      $result.createdAt = createdAt;
    }
    if (updatedAt != null) {
      $result.updatedAt = updatedAt;
    }
    return $result;
  }
  UserModel._() : super();
  factory UserModel.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory UserModel.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'UserModel', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.user.v1'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'id')
    ..aOS(2, _omitFieldNames ? '' : 'email')
    ..aOS(3, _omitFieldNames ? '' : 'nickname')
    ..e<UserStatus>(4, _omitFieldNames ? '' : 'status', $pb.PbFieldType.OE, defaultOrMaker: UserStatus.INACTIVE, valueOf: UserStatus.valueOf, enumValues: UserStatus.values)
    ..aOB(5, _omitFieldNames ? '' : 'isEmailVerified')
    ..aOS(6, _omitFieldNames ? '' : 'name')
    ..aOS(7, _omitFieldNames ? '' : 'avatarUrl')
    ..aOS(8, _omitFieldNames ? '' : 'firebaseUserId')
    ..e<AuthStrategy>(9, _omitFieldNames ? '' : 'authStrategy', $pb.PbFieldType.OE, defaultOrMaker: AuthStrategy.BASIC, valueOf: AuthStrategy.valueOf, enumValues: AuthStrategy.values)
    ..aOS(10, _omitFieldNames ? '' : 'openPlatform')
    ..aOS(11, _omitFieldNames ? '' : 'utmCampaign')
    ..aOS(12, _omitFieldNames ? '' : 'utmMedium')
    ..aOS(13, _omitFieldNames ? '' : 'utmSource')
    ..aOM<$6.Any>(14, _omitFieldNames ? '' : 'metadata', subBuilder: $6.Any.create)
    ..aOS(15, _omitFieldNames ? '' : 'createdAt')
    ..aOS(16, _omitFieldNames ? '' : 'updatedAt')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  UserModel clone() => UserModel()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  UserModel copyWith(void Function(UserModel) updates) => super.copyWith((message) => updates(message as UserModel)) as UserModel;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static UserModel create() => UserModel._();
  UserModel createEmptyInstance() => create();
  static $pb.PbList<UserModel> createRepeated() => $pb.PbList<UserModel>();
  @$core.pragma('dart2js:noInline')
  static UserModel getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<UserModel>(create);
  static UserModel? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get id => $_getSZ(0);
  @$pb.TagNumber(1)
  set id($core.String v) { $_setString(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasId() => $_has(0);
  @$pb.TagNumber(1)
  void clearId() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get email => $_getSZ(1);
  @$pb.TagNumber(2)
  set email($core.String v) { $_setString(1, v); }
  @$pb.TagNumber(2)
  $core.bool hasEmail() => $_has(1);
  @$pb.TagNumber(2)
  void clearEmail() => clearField(2);

  @$pb.TagNumber(3)
  $core.String get nickname => $_getSZ(2);
  @$pb.TagNumber(3)
  set nickname($core.String v) { $_setString(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasNickname() => $_has(2);
  @$pb.TagNumber(3)
  void clearNickname() => clearField(3);

  @$pb.TagNumber(4)
  UserStatus get status => $_getN(3);
  @$pb.TagNumber(4)
  set status(UserStatus v) { setField(4, v); }
  @$pb.TagNumber(4)
  $core.bool hasStatus() => $_has(3);
  @$pb.TagNumber(4)
  void clearStatus() => clearField(4);

  @$pb.TagNumber(5)
  $core.bool get isEmailVerified => $_getBF(4);
  @$pb.TagNumber(5)
  set isEmailVerified($core.bool v) { $_setBool(4, v); }
  @$pb.TagNumber(5)
  $core.bool hasIsEmailVerified() => $_has(4);
  @$pb.TagNumber(5)
  void clearIsEmailVerified() => clearField(5);

  @$pb.TagNumber(6)
  $core.String get name => $_getSZ(5);
  @$pb.TagNumber(6)
  set name($core.String v) { $_setString(5, v); }
  @$pb.TagNumber(6)
  $core.bool hasName() => $_has(5);
  @$pb.TagNumber(6)
  void clearName() => clearField(6);

  @$pb.TagNumber(7)
  $core.String get avatarUrl => $_getSZ(6);
  @$pb.TagNumber(7)
  set avatarUrl($core.String v) { $_setString(6, v); }
  @$pb.TagNumber(7)
  $core.bool hasAvatarUrl() => $_has(6);
  @$pb.TagNumber(7)
  void clearAvatarUrl() => clearField(7);

  @$pb.TagNumber(8)
  $core.String get firebaseUserId => $_getSZ(7);
  @$pb.TagNumber(8)
  set firebaseUserId($core.String v) { $_setString(7, v); }
  @$pb.TagNumber(8)
  $core.bool hasFirebaseUserId() => $_has(7);
  @$pb.TagNumber(8)
  void clearFirebaseUserId() => clearField(8);

  @$pb.TagNumber(9)
  AuthStrategy get authStrategy => $_getN(8);
  @$pb.TagNumber(9)
  set authStrategy(AuthStrategy v) { setField(9, v); }
  @$pb.TagNumber(9)
  $core.bool hasAuthStrategy() => $_has(8);
  @$pb.TagNumber(9)
  void clearAuthStrategy() => clearField(9);

  @$pb.TagNumber(10)
  $core.String get openPlatform => $_getSZ(9);
  @$pb.TagNumber(10)
  set openPlatform($core.String v) { $_setString(9, v); }
  @$pb.TagNumber(10)
  $core.bool hasOpenPlatform() => $_has(9);
  @$pb.TagNumber(10)
  void clearOpenPlatform() => clearField(10);

  @$pb.TagNumber(11)
  $core.String get utmCampaign => $_getSZ(10);
  @$pb.TagNumber(11)
  set utmCampaign($core.String v) { $_setString(10, v); }
  @$pb.TagNumber(11)
  $core.bool hasUtmCampaign() => $_has(10);
  @$pb.TagNumber(11)
  void clearUtmCampaign() => clearField(11);

  @$pb.TagNumber(12)
  $core.String get utmMedium => $_getSZ(11);
  @$pb.TagNumber(12)
  set utmMedium($core.String v) { $_setString(11, v); }
  @$pb.TagNumber(12)
  $core.bool hasUtmMedium() => $_has(11);
  @$pb.TagNumber(12)
  void clearUtmMedium() => clearField(12);

  @$pb.TagNumber(13)
  $core.String get utmSource => $_getSZ(12);
  @$pb.TagNumber(13)
  set utmSource($core.String v) { $_setString(12, v); }
  @$pb.TagNumber(13)
  $core.bool hasUtmSource() => $_has(12);
  @$pb.TagNumber(13)
  void clearUtmSource() => clearField(13);

  @$pb.TagNumber(14)
  $6.Any get metadata => $_getN(13);
  @$pb.TagNumber(14)
  set metadata($6.Any v) { setField(14, v); }
  @$pb.TagNumber(14)
  $core.bool hasMetadata() => $_has(13);
  @$pb.TagNumber(14)
  void clearMetadata() => clearField(14);
  @$pb.TagNumber(14)
  $6.Any ensureMetadata() => $_ensure(13);

  @$pb.TagNumber(15)
  $core.String get createdAt => $_getSZ(14);
  @$pb.TagNumber(15)
  set createdAt($core.String v) { $_setString(14, v); }
  @$pb.TagNumber(15)
  $core.bool hasCreatedAt() => $_has(14);
  @$pb.TagNumber(15)
  void clearCreatedAt() => clearField(15);

  @$pb.TagNumber(16)
  $core.String get updatedAt => $_getSZ(15);
  @$pb.TagNumber(16)
  set updatedAt($core.String v) { $_setString(15, v); }
  @$pb.TagNumber(16)
  $core.bool hasUpdatedAt() => $_has(15);
  @$pb.TagNumber(16)
  void clearUpdatedAt() => clearField(16);
}


const _omitFieldNames = $core.bool.fromEnvironment('protobuf.omit_field_names');
const _omitMessageNames = $core.bool.fromEnvironment('protobuf.omit_message_names');
