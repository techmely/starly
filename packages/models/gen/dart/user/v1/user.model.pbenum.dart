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

class UserStatus extends $pb.ProtobufEnum {
  static const UserStatus INACTIVE = UserStatus._(0, _omitEnumNames ? '' : 'INACTIVE');
  static const UserStatus ACTIVE = UserStatus._(1, _omitEnumNames ? '' : 'ACTIVE');
  static const UserStatus CLOSED = UserStatus._(2, _omitEnumNames ? '' : 'CLOSED');

  static const $core.List<UserStatus> values = <UserStatus> [
    INACTIVE,
    ACTIVE,
    CLOSED,
  ];

  static final $core.Map<$core.int, UserStatus> _byValue = $pb.ProtobufEnum.initByValue(values);
  static UserStatus? valueOf($core.int value) => _byValue[value];

  const UserStatus._($core.int v, $core.String n) : super(v, n);
}

class AuthStrategy extends $pb.ProtobufEnum {
  static const AuthStrategy BASIC = AuthStrategy._(0, _omitEnumNames ? '' : 'BASIC');
  static const AuthStrategy GOOGLE = AuthStrategy._(1, _omitEnumNames ? '' : 'GOOGLE');
  static const AuthStrategy GITHUB = AuthStrategy._(2, _omitEnumNames ? '' : 'GITHUB');
  static const AuthStrategy FACEBOOK = AuthStrategy._(3, _omitEnumNames ? '' : 'FACEBOOK');
  static const AuthStrategy X = AuthStrategy._(4, _omitEnumNames ? '' : 'X');
  static const AuthStrategy APPLE = AuthStrategy._(5, _omitEnumNames ? '' : 'APPLE');
  static const AuthStrategy LINKEDIN = AuthStrategy._(6, _omitEnumNames ? '' : 'LINKEDIN');

  static const $core.List<AuthStrategy> values = <AuthStrategy> [
    BASIC,
    GOOGLE,
    GITHUB,
    FACEBOOK,
    X,
    APPLE,
    LINKEDIN,
  ];

  static final $core.Map<$core.int, AuthStrategy> _byValue = $pb.ProtobufEnum.initByValue(values);
  static AuthStrategy? valueOf($core.int value) => _byValue[value];

  const AuthStrategy._($core.int v, $core.String n) : super(v, n);
}


const _omitEnumNames = $core.bool.fromEnvironment('protobuf.omit_enum_names');
