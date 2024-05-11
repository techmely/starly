//
//  Generated code. Do not modify.
//  source: user/v1/user.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import 'user.event.pb.dart' as $5;

class UserServiceApi {
  $pb.RpcClient _client;
  UserServiceApi(this._client);

  $async.Future<$5.GetUserResponse> get($pb.ClientContext? ctx, $5.GetUserRequest request) =>
    _client.invoke<$5.GetUserResponse>(ctx, 'UserService', 'Get', request, $5.GetUserResponse())
  ;
  $async.Future<$5.UpdateUserResponse> put($pb.ClientContext? ctx, $5.UpdateUserRequest request) =>
    _client.invoke<$5.UpdateUserResponse>(ctx, 'UserService', 'Put', request, $5.UpdateUserResponse())
  ;
  $async.Future<$5.ChangeUserEmailResponse> changeEmail($pb.ClientContext? ctx, $5.ChangeUserEmailRequest request) =>
    _client.invoke<$5.ChangeUserEmailResponse>(ctx, 'UserService', 'ChangeEmail', request, $5.ChangeUserEmailResponse())
  ;
}

