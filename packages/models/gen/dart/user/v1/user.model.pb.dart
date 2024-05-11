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

import 'package:fixnum/fixnum.dart' as $fixnum;
import 'package:protobuf/protobuf.dart' as $pb;

import '../../google/protobuf/any.pb.dart' as $3;
import 'user.model.pbenum.dart';

export 'user.model.pbenum.dart';

class UserProvider extends $pb.GeneratedMessage {
  factory UserProvider({
    $core.String? githubId,
    $core.String? googleId,
    $core.String? facebookId,
    $core.String? appleId,
  }) {
    final $result = create();
    if (githubId != null) {
      $result.githubId = githubId;
    }
    if (googleId != null) {
      $result.googleId = googleId;
    }
    if (facebookId != null) {
      $result.facebookId = facebookId;
    }
    if (appleId != null) {
      $result.appleId = appleId;
    }
    return $result;
  }
  UserProvider._() : super();
  factory UserProvider.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory UserProvider.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'UserProvider', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.user.v1'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'githubId', protoName: 'githubId')
    ..aOS(2, _omitFieldNames ? '' : 'googleId', protoName: 'googleId')
    ..aOS(3, _omitFieldNames ? '' : 'facebookId', protoName: 'facebookId')
    ..aOS(4, _omitFieldNames ? '' : 'appleId', protoName: 'appleId')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  UserProvider clone() => UserProvider()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  UserProvider copyWith(void Function(UserProvider) updates) => super.copyWith((message) => updates(message as UserProvider)) as UserProvider;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static UserProvider create() => UserProvider._();
  UserProvider createEmptyInstance() => create();
  static $pb.PbList<UserProvider> createRepeated() => $pb.PbList<UserProvider>();
  @$core.pragma('dart2js:noInline')
  static UserProvider getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<UserProvider>(create);
  static UserProvider? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get githubId => $_getSZ(0);
  @$pb.TagNumber(1)
  set githubId($core.String v) { $_setString(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasGithubId() => $_has(0);
  @$pb.TagNumber(1)
  void clearGithubId() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get googleId => $_getSZ(1);
  @$pb.TagNumber(2)
  set googleId($core.String v) { $_setString(1, v); }
  @$pb.TagNumber(2)
  $core.bool hasGoogleId() => $_has(1);
  @$pb.TagNumber(2)
  void clearGoogleId() => clearField(2);

  @$pb.TagNumber(3)
  $core.String get facebookId => $_getSZ(2);
  @$pb.TagNumber(3)
  set facebookId($core.String v) { $_setString(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasFacebookId() => $_has(2);
  @$pb.TagNumber(3)
  void clearFacebookId() => clearField(3);

  @$pb.TagNumber(4)
  $core.String get appleId => $_getSZ(3);
  @$pb.TagNumber(4)
  set appleId($core.String v) { $_setString(3, v); }
  @$pb.TagNumber(4)
  $core.bool hasAppleId() => $_has(3);
  @$pb.TagNumber(4)
  void clearAppleId() => clearField(4);
}

class UserMetadata extends $pb.GeneratedMessage {
  factory UserMetadata({
    $core.String? openPlatform,
    $core.String? utmCampaign,
    $core.String? utmMedium,
    $core.String? utmSource,
  }) {
    final $result = create();
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
    return $result;
  }
  UserMetadata._() : super();
  factory UserMetadata.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory UserMetadata.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'UserMetadata', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.user.v1'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'openPlatform', protoName: 'openPlatform')
    ..aOS(2, _omitFieldNames ? '' : 'utmCampaign', protoName: 'utmCampaign')
    ..aOS(3, _omitFieldNames ? '' : 'utmMedium', protoName: 'utmMedium')
    ..aOS(4, _omitFieldNames ? '' : 'utmSource', protoName: 'utmSource')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  UserMetadata clone() => UserMetadata()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  UserMetadata copyWith(void Function(UserMetadata) updates) => super.copyWith((message) => updates(message as UserMetadata)) as UserMetadata;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static UserMetadata create() => UserMetadata._();
  UserMetadata createEmptyInstance() => create();
  static $pb.PbList<UserMetadata> createRepeated() => $pb.PbList<UserMetadata>();
  @$core.pragma('dart2js:noInline')
  static UserMetadata getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<UserMetadata>(create);
  static UserMetadata? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get openPlatform => $_getSZ(0);
  @$pb.TagNumber(1)
  set openPlatform($core.String v) { $_setString(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasOpenPlatform() => $_has(0);
  @$pb.TagNumber(1)
  void clearOpenPlatform() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get utmCampaign => $_getSZ(1);
  @$pb.TagNumber(2)
  set utmCampaign($core.String v) { $_setString(1, v); }
  @$pb.TagNumber(2)
  $core.bool hasUtmCampaign() => $_has(1);
  @$pb.TagNumber(2)
  void clearUtmCampaign() => clearField(2);

  @$pb.TagNumber(3)
  $core.String get utmMedium => $_getSZ(2);
  @$pb.TagNumber(3)
  set utmMedium($core.String v) { $_setString(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasUtmMedium() => $_has(2);
  @$pb.TagNumber(3)
  void clearUtmMedium() => clearField(3);

  @$pb.TagNumber(4)
  $core.String get utmSource => $_getSZ(3);
  @$pb.TagNumber(4)
  set utmSource($core.String v) { $_setString(3, v); }
  @$pb.TagNumber(4)
  $core.bool hasUtmSource() => $_has(3);
  @$pb.TagNumber(4)
  void clearUtmSource() => clearField(4);
}

class User extends $pb.GeneratedMessage {
  factory User({
    $core.String? id,
    $core.String? email,
    $core.String? unverifiedEmail,
    $core.bool? isEmailVerified,
    $core.String? nickname,
    $core.String? mobile,
    $core.String? birthday,
    $core.String? name,
    $core.String? avatarUrl,
    $core.String? locale,
    $core.String? region,
    $core.String? countryCode,
    $core.String? gender,
    $core.String? salt,
    $fixnum.Int64? lastLogin,
    $core.bool? isBetaUser,
    UserMetadata? metadata,
    UserProvider? provider,
  }) {
    final $result = create();
    if (id != null) {
      $result.id = id;
    }
    if (email != null) {
      $result.email = email;
    }
    if (unverifiedEmail != null) {
      $result.unverifiedEmail = unverifiedEmail;
    }
    if (isEmailVerified != null) {
      $result.isEmailVerified = isEmailVerified;
    }
    if (nickname != null) {
      $result.nickname = nickname;
    }
    if (mobile != null) {
      $result.mobile = mobile;
    }
    if (birthday != null) {
      $result.birthday = birthday;
    }
    if (name != null) {
      $result.name = name;
    }
    if (avatarUrl != null) {
      $result.avatarUrl = avatarUrl;
    }
    if (locale != null) {
      $result.locale = locale;
    }
    if (region != null) {
      $result.region = region;
    }
    if (countryCode != null) {
      $result.countryCode = countryCode;
    }
    if (gender != null) {
      $result.gender = gender;
    }
    if (salt != null) {
      $result.salt = salt;
    }
    if (lastLogin != null) {
      $result.lastLogin = lastLogin;
    }
    if (isBetaUser != null) {
      $result.isBetaUser = isBetaUser;
    }
    if (metadata != null) {
      $result.metadata = metadata;
    }
    if (provider != null) {
      $result.provider = provider;
    }
    return $result;
  }
  User._() : super();
  factory User.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory User.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'User', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.user.v1'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'id')
    ..aOS(2, _omitFieldNames ? '' : 'email')
    ..aOS(3, _omitFieldNames ? '' : 'unverifiedEmail')
    ..aOB(4, _omitFieldNames ? '' : 'isEmailVerified')
    ..aOS(5, _omitFieldNames ? '' : 'nickname')
    ..aOS(6, _omitFieldNames ? '' : 'mobile')
    ..aOS(7, _omitFieldNames ? '' : 'birthday')
    ..aOS(8, _omitFieldNames ? '' : 'name')
    ..aOS(9, _omitFieldNames ? '' : 'avatarUrl')
    ..aOS(10, _omitFieldNames ? '' : 'locale')
    ..aOS(11, _omitFieldNames ? '' : 'region')
    ..aOS(12, _omitFieldNames ? '' : 'countryCode')
    ..aOS(13, _omitFieldNames ? '' : 'gender')
    ..aOS(14, _omitFieldNames ? '' : 'salt')
    ..aInt64(15, _omitFieldNames ? '' : 'lastLogin')
    ..aOB(16, _omitFieldNames ? '' : 'isBetaUser')
    ..aOM<UserMetadata>(17, _omitFieldNames ? '' : 'metadata', subBuilder: UserMetadata.create)
    ..aOM<UserProvider>(18, _omitFieldNames ? '' : 'provider', subBuilder: UserProvider.create)
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  User clone() => User()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  User copyWith(void Function(User) updates) => super.copyWith((message) => updates(message as User)) as User;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static User create() => User._();
  User createEmptyInstance() => create();
  static $pb.PbList<User> createRepeated() => $pb.PbList<User>();
  @$core.pragma('dart2js:noInline')
  static User getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<User>(create);
  static User? _defaultInstance;

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
  $core.String get unverifiedEmail => $_getSZ(2);
  @$pb.TagNumber(3)
  set unverifiedEmail($core.String v) { $_setString(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasUnverifiedEmail() => $_has(2);
  @$pb.TagNumber(3)
  void clearUnverifiedEmail() => clearField(3);

  @$pb.TagNumber(4)
  $core.bool get isEmailVerified => $_getBF(3);
  @$pb.TagNumber(4)
  set isEmailVerified($core.bool v) { $_setBool(3, v); }
  @$pb.TagNumber(4)
  $core.bool hasIsEmailVerified() => $_has(3);
  @$pb.TagNumber(4)
  void clearIsEmailVerified() => clearField(4);

  @$pb.TagNumber(5)
  $core.String get nickname => $_getSZ(4);
  @$pb.TagNumber(5)
  set nickname($core.String v) { $_setString(4, v); }
  @$pb.TagNumber(5)
  $core.bool hasNickname() => $_has(4);
  @$pb.TagNumber(5)
  void clearNickname() => clearField(5);

  @$pb.TagNumber(6)
  $core.String get mobile => $_getSZ(5);
  @$pb.TagNumber(6)
  set mobile($core.String v) { $_setString(5, v); }
  @$pb.TagNumber(6)
  $core.bool hasMobile() => $_has(5);
  @$pb.TagNumber(6)
  void clearMobile() => clearField(6);

  @$pb.TagNumber(7)
  $core.String get birthday => $_getSZ(6);
  @$pb.TagNumber(7)
  set birthday($core.String v) { $_setString(6, v); }
  @$pb.TagNumber(7)
  $core.bool hasBirthday() => $_has(6);
  @$pb.TagNumber(7)
  void clearBirthday() => clearField(7);

  @$pb.TagNumber(8)
  $core.String get name => $_getSZ(7);
  @$pb.TagNumber(8)
  set name($core.String v) { $_setString(7, v); }
  @$pb.TagNumber(8)
  $core.bool hasName() => $_has(7);
  @$pb.TagNumber(8)
  void clearName() => clearField(8);

  @$pb.TagNumber(9)
  $core.String get avatarUrl => $_getSZ(8);
  @$pb.TagNumber(9)
  set avatarUrl($core.String v) { $_setString(8, v); }
  @$pb.TagNumber(9)
  $core.bool hasAvatarUrl() => $_has(8);
  @$pb.TagNumber(9)
  void clearAvatarUrl() => clearField(9);

  @$pb.TagNumber(10)
  $core.String get locale => $_getSZ(9);
  @$pb.TagNumber(10)
  set locale($core.String v) { $_setString(9, v); }
  @$pb.TagNumber(10)
  $core.bool hasLocale() => $_has(9);
  @$pb.TagNumber(10)
  void clearLocale() => clearField(10);

  @$pb.TagNumber(11)
  $core.String get region => $_getSZ(10);
  @$pb.TagNumber(11)
  set region($core.String v) { $_setString(10, v); }
  @$pb.TagNumber(11)
  $core.bool hasRegion() => $_has(10);
  @$pb.TagNumber(11)
  void clearRegion() => clearField(11);

  @$pb.TagNumber(12)
  $core.String get countryCode => $_getSZ(11);
  @$pb.TagNumber(12)
  set countryCode($core.String v) { $_setString(11, v); }
  @$pb.TagNumber(12)
  $core.bool hasCountryCode() => $_has(11);
  @$pb.TagNumber(12)
  void clearCountryCode() => clearField(12);

  @$pb.TagNumber(13)
  $core.String get gender => $_getSZ(12);
  @$pb.TagNumber(13)
  set gender($core.String v) { $_setString(12, v); }
  @$pb.TagNumber(13)
  $core.bool hasGender() => $_has(12);
  @$pb.TagNumber(13)
  void clearGender() => clearField(13);

  @$pb.TagNumber(14)
  $core.String get salt => $_getSZ(13);
  @$pb.TagNumber(14)
  set salt($core.String v) { $_setString(13, v); }
  @$pb.TagNumber(14)
  $core.bool hasSalt() => $_has(13);
  @$pb.TagNumber(14)
  void clearSalt() => clearField(14);

  @$pb.TagNumber(15)
  $fixnum.Int64 get lastLogin => $_getI64(14);
  @$pb.TagNumber(15)
  set lastLogin($fixnum.Int64 v) { $_setInt64(14, v); }
  @$pb.TagNumber(15)
  $core.bool hasLastLogin() => $_has(14);
  @$pb.TagNumber(15)
  void clearLastLogin() => clearField(15);

  @$pb.TagNumber(16)
  $core.bool get isBetaUser => $_getBF(15);
  @$pb.TagNumber(16)
  set isBetaUser($core.bool v) { $_setBool(15, v); }
  @$pb.TagNumber(16)
  $core.bool hasIsBetaUser() => $_has(15);
  @$pb.TagNumber(16)
  void clearIsBetaUser() => clearField(16);

  @$pb.TagNumber(17)
  UserMetadata get metadata => $_getN(16);
  @$pb.TagNumber(17)
  set metadata(UserMetadata v) { setField(17, v); }
  @$pb.TagNumber(17)
  $core.bool hasMetadata() => $_has(16);
  @$pb.TagNumber(17)
  void clearMetadata() => clearField(17);
  @$pb.TagNumber(17)
  UserMetadata ensureMetadata() => $_ensure(16);

  @$pb.TagNumber(18)
  UserProvider get provider => $_getN(17);
  @$pb.TagNumber(18)
  set provider(UserProvider v) { setField(18, v); }
  @$pb.TagNumber(18)
  $core.bool hasProvider() => $_has(17);
  @$pb.TagNumber(18)
  void clearProvider() => clearField(18);
  @$pb.TagNumber(18)
  UserProvider ensureProvider() => $_ensure(17);
}

class UserTable extends $pb.GeneratedMessage {
  factory UserTable({
    $core.String? id,
    $core.String? email,
    $core.String? unverifiedEmail,
    $core.String? nickname,
    UserStatus? status,
    $core.bool? isEmailVerified,
    $core.String? name,
    $core.String? avatarUrl,
    $core.String? firebaseUserId,
    $3.Any? metadata,
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
    if (unverifiedEmail != null) {
      $result.unverifiedEmail = unverifiedEmail;
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
  UserTable._() : super();
  factory UserTable.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory UserTable.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'UserTable', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.user.v1'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'id')
    ..aOS(2, _omitFieldNames ? '' : 'email')
    ..aOS(3, _omitFieldNames ? '' : 'unverifiedEmail')
    ..aOS(4, _omitFieldNames ? '' : 'nickname')
    ..e<UserStatus>(5, _omitFieldNames ? '' : 'status', $pb.PbFieldType.OE, defaultOrMaker: UserStatus.VERIFIED, valueOf: UserStatus.valueOf, enumValues: UserStatus.values)
    ..aOB(6, _omitFieldNames ? '' : 'isEmailVerified')
    ..aOS(7, _omitFieldNames ? '' : 'name')
    ..aOS(8, _omitFieldNames ? '' : 'avatarUrl')
    ..aOS(9, _omitFieldNames ? '' : 'firebaseUserId')
    ..aOM<$3.Any>(10, _omitFieldNames ? '' : 'metadata', subBuilder: $3.Any.create)
    ..aOS(11, _omitFieldNames ? '' : 'createdAt')
    ..aOS(12, _omitFieldNames ? '' : 'updatedAt')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  UserTable clone() => UserTable()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  UserTable copyWith(void Function(UserTable) updates) => super.copyWith((message) => updates(message as UserTable)) as UserTable;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static UserTable create() => UserTable._();
  UserTable createEmptyInstance() => create();
  static $pb.PbList<UserTable> createRepeated() => $pb.PbList<UserTable>();
  @$core.pragma('dart2js:noInline')
  static UserTable getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<UserTable>(create);
  static UserTable? _defaultInstance;

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
  $core.String get unverifiedEmail => $_getSZ(2);
  @$pb.TagNumber(3)
  set unverifiedEmail($core.String v) { $_setString(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasUnverifiedEmail() => $_has(2);
  @$pb.TagNumber(3)
  void clearUnverifiedEmail() => clearField(3);

  @$pb.TagNumber(4)
  $core.String get nickname => $_getSZ(3);
  @$pb.TagNumber(4)
  set nickname($core.String v) { $_setString(3, v); }
  @$pb.TagNumber(4)
  $core.bool hasNickname() => $_has(3);
  @$pb.TagNumber(4)
  void clearNickname() => clearField(4);

  @$pb.TagNumber(5)
  UserStatus get status => $_getN(4);
  @$pb.TagNumber(5)
  set status(UserStatus v) { setField(5, v); }
  @$pb.TagNumber(5)
  $core.bool hasStatus() => $_has(4);
  @$pb.TagNumber(5)
  void clearStatus() => clearField(5);

  @$pb.TagNumber(6)
  $core.bool get isEmailVerified => $_getBF(5);
  @$pb.TagNumber(6)
  set isEmailVerified($core.bool v) { $_setBool(5, v); }
  @$pb.TagNumber(6)
  $core.bool hasIsEmailVerified() => $_has(5);
  @$pb.TagNumber(6)
  void clearIsEmailVerified() => clearField(6);

  @$pb.TagNumber(7)
  $core.String get name => $_getSZ(6);
  @$pb.TagNumber(7)
  set name($core.String v) { $_setString(6, v); }
  @$pb.TagNumber(7)
  $core.bool hasName() => $_has(6);
  @$pb.TagNumber(7)
  void clearName() => clearField(7);

  @$pb.TagNumber(8)
  $core.String get avatarUrl => $_getSZ(7);
  @$pb.TagNumber(8)
  set avatarUrl($core.String v) { $_setString(7, v); }
  @$pb.TagNumber(8)
  $core.bool hasAvatarUrl() => $_has(7);
  @$pb.TagNumber(8)
  void clearAvatarUrl() => clearField(8);

  @$pb.TagNumber(9)
  $core.String get firebaseUserId => $_getSZ(8);
  @$pb.TagNumber(9)
  set firebaseUserId($core.String v) { $_setString(8, v); }
  @$pb.TagNumber(9)
  $core.bool hasFirebaseUserId() => $_has(8);
  @$pb.TagNumber(9)
  void clearFirebaseUserId() => clearField(9);

  @$pb.TagNumber(10)
  $3.Any get metadata => $_getN(9);
  @$pb.TagNumber(10)
  set metadata($3.Any v) { setField(10, v); }
  @$pb.TagNumber(10)
  $core.bool hasMetadata() => $_has(9);
  @$pb.TagNumber(10)
  void clearMetadata() => clearField(10);
  @$pb.TagNumber(10)
  $3.Any ensureMetadata() => $_ensure(9);

  @$pb.TagNumber(11)
  $core.String get createdAt => $_getSZ(10);
  @$pb.TagNumber(11)
  set createdAt($core.String v) { $_setString(10, v); }
  @$pb.TagNumber(11)
  $core.bool hasCreatedAt() => $_has(10);
  @$pb.TagNumber(11)
  void clearCreatedAt() => clearField(11);

  @$pb.TagNumber(12)
  $core.String get updatedAt => $_getSZ(11);
  @$pb.TagNumber(12)
  set updatedAt($core.String v) { $_setString(11, v); }
  @$pb.TagNumber(12)
  $core.bool hasUpdatedAt() => $_has(11);
  @$pb.TagNumber(12)
  void clearUpdatedAt() => clearField(12);
}


const _omitFieldNames = $core.bool.fromEnvironment('protobuf.omit_field_names');
const _omitMessageNames = $core.bool.fromEnvironment('protobuf.omit_message_names');
