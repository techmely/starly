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

import '../../google/protobuf/wrappers.pb.dart' as $8;
import 'user.event.pb.dart' as $7;
import 'user.model.pb.dart' as $6;

class UserServicePortApi {
  $pb.RpcClient _client;
  UserServicePortApi(this._client);

  $async.Future<$6.UserModel> create_($pb.ClientContext? ctx, $7.CreateUserRequest request) =>
    _client.invoke<$6.UserModel>(ctx, 'UserServicePort', 'Create', request, $6.UserModel())
  ;
  $async.Future<$6.UserModel> get($pb.ClientContext? ctx, $7.GetUserRequest request) =>
    _client.invoke<$6.UserModel>(ctx, 'UserServicePort', 'Get', request, $6.UserModel())
  ;
  $async.Future<$7.GetUsersPaginationResponse> getPagination($pb.ClientContext? ctx, $7.GetUsersPaginationRequest request) =>
    _client.invoke<$7.GetUsersPaginationResponse>(ctx, 'UserServicePort', 'GetPagination', request, $7.GetUsersPaginationResponse())
  ;
  $async.Future<$6.UserModel> update($pb.ClientContext? ctx, $7.UpdateUserRequest request) =>
    _client.invoke<$6.UserModel>(ctx, 'UserServicePort', 'Update', request, $6.UserModel())
  ;
  $async.Future<$8.BoolValue> delete($pb.ClientContext? ctx, $7.DeleteUserRequest request) =>
    _client.invoke<$8.BoolValue>(ctx, 'UserServicePort', 'Delete', request, $8.BoolValue())
  ;
}

