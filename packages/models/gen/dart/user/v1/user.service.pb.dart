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

  $async.Future<$5.CreateUserResponse> register($pb.ClientContext? ctx, $5.CreateUserRequest request) =>
    _client.invoke<$5.CreateUserResponse>(ctx, 'UserService', 'Register', request, $5.CreateUserResponse())
  ;
  $async.Future<$5.GetUserResponse> get($pb.ClientContext? ctx, $5.GetUserRequest request) =>
    _client.invoke<$5.GetUserResponse>(ctx, 'UserService', 'Get', request, $5.GetUserResponse())
  ;
  $async.Future<$5.GetUsersResponse> getAll($pb.ClientContext? ctx, $5.GetUsersRequest request) =>
    _client.invoke<$5.GetUsersResponse>(ctx, 'UserService', 'GetAll', request, $5.GetUsersResponse())
  ;
  $async.Future<$5.UpdateUserResponse> update($pb.ClientContext? ctx, $5.UpdateUserRequest request) =>
    _client.invoke<$5.UpdateUserResponse>(ctx, 'UserService', 'Update', request, $5.UpdateUserResponse())
  ;
  $async.Future<$5.ChangeUserEmailResponse> changeEmail($pb.ClientContext? ctx, $5.ChangeUserEmailRequest request) =>
    _client.invoke<$5.ChangeUserEmailResponse>(ctx, 'UserService', 'ChangeEmail', request, $5.ChangeUserEmailResponse())
  ;
  $async.Future<$5.DeleteUserResponse> delete($pb.ClientContext? ctx, $5.DeleteUserRequest request) =>
    _client.invoke<$5.DeleteUserResponse>(ctx, 'UserService', 'Delete', request, $5.DeleteUserResponse())
  ;
}

