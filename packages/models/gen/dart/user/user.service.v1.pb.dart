//
//  Generated code. Do not modify.
//  source: user/user.service.v1.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import 'user.event.v1.pb.dart' as $2;

class UserServiceApi {
  $pb.RpcClient _client;
  UserServiceApi(this._client);

  $async.Future<$2.GetUserResponse> get($pb.ClientContext? ctx, $2.GetUserRequest request) =>
    _client.invoke<$2.GetUserResponse>(ctx, 'UserService', 'Get', request, $2.GetUserResponse())
  ;
  $async.Future<$2.UpdateUserResponse> put($pb.ClientContext? ctx, $2.UpdateUserRequest request) =>
    _client.invoke<$2.UpdateUserResponse>(ctx, 'UserService', 'Put', request, $2.UpdateUserResponse())
  ;
  $async.Future<$2.ChangeUserEmailResponse> changeEmail($pb.ClientContext? ctx, $2.ChangeUserEmailRequest request) =>
    _client.invoke<$2.ChangeUserEmailResponse>(ctx, 'UserService', 'ChangeEmail', request, $2.ChangeUserEmailResponse())
  ;
}

