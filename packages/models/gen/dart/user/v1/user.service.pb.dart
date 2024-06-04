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

import '../../google/protobuf/wrappers.pb.dart' as $9;
import 'user.event.pb.dart' as $8;
import 'user.model.pb.dart' as $7;

class UserServicePortApi {
  $pb.RpcClient _client;
  UserServicePortApi(this._client);

  $async.Future<$7.UserModel> create_($pb.ClientContext? ctx, $8.CreateUserRequest request) =>
    _client.invoke<$7.UserModel>(ctx, 'UserServicePort', 'Create', request, $7.UserModel())
  ;
  $async.Future<$7.UserModel> get($pb.ClientContext? ctx, $8.GetUserRequest request) =>
    _client.invoke<$7.UserModel>(ctx, 'UserServicePort', 'Get', request, $7.UserModel())
  ;
  $async.Future<$7.UserModel> getByAuthId($pb.ClientContext? ctx, $8.GetUserByAuthIdRequest request) =>
    _client.invoke<$7.UserModel>(ctx, 'UserServicePort', 'GetByAuthId', request, $7.UserModel())
  ;
  $async.Future<$8.GetUsersPaginationResponse> getPagination($pb.ClientContext? ctx, $8.GetUsersPaginationRequest request) =>
    _client.invoke<$8.GetUsersPaginationResponse>(ctx, 'UserServicePort', 'GetPagination', request, $8.GetUsersPaginationResponse())
  ;
  $async.Future<$7.UserModel> update($pb.ClientContext? ctx, $8.UpdateUserRequest request) =>
    _client.invoke<$7.UserModel>(ctx, 'UserServicePort', 'Update', request, $7.UserModel())
  ;
  $async.Future<$9.BoolValue> delete($pb.ClientContext? ctx, $8.DeleteUserRequest request) =>
    _client.invoke<$9.BoolValue>(ctx, 'UserServicePort', 'Delete', request, $9.BoolValue())
  ;
}

