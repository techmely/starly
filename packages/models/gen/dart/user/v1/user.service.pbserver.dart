//
//  Generated code. Do not modify.
//  source: user/v1/user.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import '../../google/protobuf/wrappers.pb.dart' as $9;
import 'user.event.pb.dart' as $8;
import 'user.model.pb.dart' as $7;
import 'user.service.pbjson.dart';

export 'user.service.pb.dart';

abstract class UserServicePortServiceBase extends $pb.GeneratedService {
  $async.Future<$7.UserModel> create($pb.ServerContext ctx, $8.CreateUserRequest request);
  $async.Future<$7.UserModel> get($pb.ServerContext ctx, $8.GetUserRequest request);
  $async.Future<$7.UserModel> getByAuthId($pb.ServerContext ctx, $8.GetUserByAuthIdRequest request);
  $async.Future<$8.GetUsersPaginationResponse> getPagination($pb.ServerContext ctx, $8.GetUsersPaginationRequest request);
  $async.Future<$7.UserModel> update($pb.ServerContext ctx, $8.UpdateUserRequest request);
  $async.Future<$9.BoolValue> delete($pb.ServerContext ctx, $8.DeleteUserRequest request);

  $pb.GeneratedMessage createRequest($core.String methodName) {
    switch (methodName) {
      case 'Create': return $8.CreateUserRequest();
      case 'Get': return $8.GetUserRequest();
      case 'GetByAuthId': return $8.GetUserByAuthIdRequest();
      case 'GetPagination': return $8.GetUsersPaginationRequest();
      case 'Update': return $8.UpdateUserRequest();
      case 'Delete': return $8.DeleteUserRequest();
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $async.Future<$pb.GeneratedMessage> handleCall($pb.ServerContext ctx, $core.String methodName, $pb.GeneratedMessage request) {
    switch (methodName) {
      case 'Create': return this.create(ctx, request as $8.CreateUserRequest);
      case 'Get': return this.get(ctx, request as $8.GetUserRequest);
      case 'GetByAuthId': return this.getByAuthId(ctx, request as $8.GetUserByAuthIdRequest);
      case 'GetPagination': return this.getPagination(ctx, request as $8.GetUsersPaginationRequest);
      case 'Update': return this.update(ctx, request as $8.UpdateUserRequest);
      case 'Delete': return this.delete(ctx, request as $8.DeleteUserRequest);
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $core.Map<$core.String, $core.dynamic> get $json => UserServicePortServiceBase$json;
  $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> get $messageJson => UserServicePortServiceBase$messageJson;
}

