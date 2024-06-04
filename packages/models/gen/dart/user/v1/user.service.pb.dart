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

import '../../google/protobuf/wrappers.pb.dart' as $10;
import 'user.event.pb.dart' as $9;
import 'user.model.pb.dart' as $8;

class UserServicePortApi {
  $pb.RpcClient _client;
  UserServicePortApi(this._client);

  $async.Future<$8.UserModel> create_($pb.ClientContext? ctx, $9.CreateUserRequest request) =>
    _client.invoke<$8.UserModel>(ctx, 'UserServicePort', 'Create', request, $8.UserModel())
  ;
  $async.Future<$8.UserModel> get($pb.ClientContext? ctx, $9.GetUserRequest request) =>
    _client.invoke<$8.UserModel>(ctx, 'UserServicePort', 'Get', request, $8.UserModel())
  ;
  $async.Future<$8.UserModel> getByAuthId($pb.ClientContext? ctx, $9.GetUserByAuthIdRequest request) =>
    _client.invoke<$8.UserModel>(ctx, 'UserServicePort', 'GetByAuthId', request, $8.UserModel())
  ;
  $async.Future<$9.GetUsersPaginationResponse> getPagination($pb.ClientContext? ctx, $9.GetUsersPaginationRequest request) =>
    _client.invoke<$9.GetUsersPaginationResponse>(ctx, 'UserServicePort', 'GetPagination', request, $9.GetUsersPaginationResponse())
  ;
  $async.Future<$8.UserModel> update($pb.ClientContext? ctx, $9.UpdateUserRequest request) =>
    _client.invoke<$8.UserModel>(ctx, 'UserServicePort', 'Update', request, $8.UserModel())
  ;
  $async.Future<$10.BoolValue> delete($pb.ClientContext? ctx, $9.DeleteUserRequest request) =>
    _client.invoke<$10.BoolValue>(ctx, 'UserServicePort', 'Delete', request, $10.BoolValue())
  ;
}

