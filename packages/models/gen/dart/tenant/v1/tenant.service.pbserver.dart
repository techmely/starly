//
//  Generated code. Do not modify.
//  source: tenant/v1/tenant.service.proto
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

import 'tenant.event.pb.dart' as $7;
import 'tenant.service.pbjson.dart';

export 'tenant.service.pb.dart';

abstract class TenantServicePortServiceBase extends $pb.GeneratedService {
  $async.Future<$7.CreateTenantResponse> create($pb.ServerContext ctx, $7.CreateTenantRequest request);
  $async.Future<$7.GetTenantResponse> get($pb.ServerContext ctx, $7.GetTenantRequest request);
  $async.Future<$7.GetTenantsResponse> getAll($pb.ServerContext ctx, $7.GetTenantsRequest request);
  $async.Future<$7.GetAvailableTenantsResponse> getAvailable($pb.ServerContext ctx, $7.GetAvailableTenantsRequest request);
  $async.Future<$7.UpdateTenantResponse> update($pb.ServerContext ctx, $7.UpdateTenantRequest request);
  $async.Future<$7.DeleteTenantResponse> delete($pb.ServerContext ctx, $7.DeleteTenantRequest request);

  $pb.GeneratedMessage createRequest($core.String methodName) {
    switch (methodName) {
      case 'create': return $7.CreateTenantRequest();
      case 'get': return $7.GetTenantRequest();
      case 'getAll': return $7.GetTenantsRequest();
      case 'getAvailable': return $7.GetAvailableTenantsRequest();
      case 'update': return $7.UpdateTenantRequest();
      case 'delete': return $7.DeleteTenantRequest();
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $async.Future<$pb.GeneratedMessage> handleCall($pb.ServerContext ctx, $core.String methodName, $pb.GeneratedMessage request) {
    switch (methodName) {
      case 'create': return this.create(ctx, request as $7.CreateTenantRequest);
      case 'get': return this.get(ctx, request as $7.GetTenantRequest);
      case 'getAll': return this.getAll(ctx, request as $7.GetTenantsRequest);
      case 'getAvailable': return this.getAvailable(ctx, request as $7.GetAvailableTenantsRequest);
      case 'update': return this.update(ctx, request as $7.UpdateTenantRequest);
      case 'delete': return this.delete(ctx, request as $7.DeleteTenantRequest);
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $core.Map<$core.String, $core.dynamic> get $json => TenantServicePortServiceBase$json;
  $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> get $messageJson => TenantServicePortServiceBase$messageJson;
}

