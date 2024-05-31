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

import 'user.event.pb.dart' as $5;
import 'user.service.pbjson.dart';

export 'user.service.pb.dart';

abstract class UserServicePortServiceBase extends $pb.GeneratedService {
  $async.Future<$5.CreateUserResponse> register($pb.ServerContext ctx, $5.CreateUserRequest request);
  $async.Future<$5.GetUserResponse> get($pb.ServerContext ctx, $5.GetUserRequest request);
  $async.Future<$5.GetUsersResponse> getAll($pb.ServerContext ctx, $5.GetUsersRequest request);
  $async.Future<$5.UpdateUserResponse> update($pb.ServerContext ctx, $5.UpdateUserRequest request);
  $async.Future<$5.DeleteUserResponse> delete($pb.ServerContext ctx, $5.DeleteUserRequest request);

  $pb.GeneratedMessage createRequest($core.String methodName) {
    switch (methodName) {
      case 'register': return $5.CreateUserRequest();
      case 'get': return $5.GetUserRequest();
      case 'getAll': return $5.GetUsersRequest();
      case 'update': return $5.UpdateUserRequest();
      case 'delete': return $5.DeleteUserRequest();
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $async.Future<$pb.GeneratedMessage> handleCall($pb.ServerContext ctx, $core.String methodName, $pb.GeneratedMessage request) {
    switch (methodName) {
      case 'register': return this.register(ctx, request as $5.CreateUserRequest);
      case 'get': return this.get(ctx, request as $5.GetUserRequest);
      case 'getAll': return this.getAll(ctx, request as $5.GetUsersRequest);
      case 'update': return this.update(ctx, request as $5.UpdateUserRequest);
      case 'delete': return this.delete(ctx, request as $5.DeleteUserRequest);
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $core.Map<$core.String, $core.dynamic> get $json => UserServicePortServiceBase$json;
  $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> get $messageJson => UserServicePortServiceBase$messageJson;
}

