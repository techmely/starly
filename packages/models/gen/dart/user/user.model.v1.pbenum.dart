//
//  Generated code. Do not modify.
//  source: user/user.model.v1.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

class UserRoles extends $pb.ProtobufEnum {
  static const UserRoles SUPER_ADMIN = UserRoles._(0, _omitEnumNames ? '' : 'SUPER_ADMIN');
  static const UserRoles MODERATOR = UserRoles._(1, _omitEnumNames ? '' : 'MODERATOR');
  static const UserRoles ADMIN = UserRoles._(2, _omitEnumNames ? '' : 'ADMIN');
  static const UserRoles MEMBER = UserRoles._(3, _omitEnumNames ? '' : 'MEMBER');
  static const UserRoles GUEST = UserRoles._(4, _omitEnumNames ? '' : 'GUEST');

  static const $core.List<UserRoles> values = <UserRoles> [
    SUPER_ADMIN,
    MODERATOR,
    ADMIN,
    MEMBER,
    GUEST,
  ];

  static final $core.Map<$core.int, UserRoles> _byValue = $pb.ProtobufEnum.initByValue(values);
  static UserRoles? valueOf($core.int value) => _byValue[value];

  const UserRoles._($core.int v, $core.String n) : super(v, n);
}

class UserStatus extends $pb.ProtobufEnum {
  static const UserStatus VERIFIED = UserStatus._(0, _omitEnumNames ? '' : 'VERIFIED');
  static const UserStatus BLACKLIST = UserStatus._(1, _omitEnumNames ? '' : 'BLACKLIST');
  static const UserStatus INACTIVE = UserStatus._(2, _omitEnumNames ? '' : 'INACTIVE');
  static const UserStatus ACTIVE = UserStatus._(3, _omitEnumNames ? '' : 'ACTIVE');
  static const UserStatus CLOSED = UserStatus._(4, _omitEnumNames ? '' : 'CLOSED');

  static const $core.List<UserStatus> values = <UserStatus> [
    VERIFIED,
    BLACKLIST,
    INACTIVE,
    ACTIVE,
    CLOSED,
  ];

  static final $core.Map<$core.int, UserStatus> _byValue = $pb.ProtobufEnum.initByValue(values);
  static UserStatus? valueOf($core.int value) => _byValue[value];

  const UserStatus._($core.int v, $core.String n) : super(v, n);
}


const _omitEnumNames = $core.bool.fromEnvironment('protobuf.omit_enum_names');
