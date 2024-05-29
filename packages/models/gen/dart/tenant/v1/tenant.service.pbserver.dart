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

import 'tenant.event.pb.dart' as $4;
import 'tenant.service.pbjson.dart';

export 'tenant.service.pb.dart';

abstract class TenantServiceBase extends $pb.GeneratedService {
  $async.Future<$4.CreateTenantResponse> create($pb.ServerContext ctx, $4.CreateTenantRequest request);
  $async.Future<$4.GetTenantResponse> get($pb.ServerContext ctx, $4.GetTenantRequest request);
  $async.Future<$4.GetTenantsResponse> getAll($pb.ServerContext ctx, $4.GetTenantsRequest request);
  $async.Future<$4.GetAvailableTenantsResponse> getAvailable($pb.ServerContext ctx, $4.GetAvailableTenantsRequest request);
  $async.Future<$4.UpdateTenantResponse> update($pb.ServerContext ctx, $4.UpdateTenantRequest request);
  $async.Future<$4.DeleteTenantResponse> delete($pb.ServerContext ctx, $4.DeleteTenantRequest request);

  $pb.GeneratedMessage createRequest($core.String methodName) {
    switch (methodName) {
      case 'Create': return $4.CreateTenantRequest();
      case 'Get': return $4.GetTenantRequest();
      case 'GetAll': return $4.GetTenantsRequest();
      case 'GetAvailable': return $4.GetAvailableTenantsRequest();
      case 'Update': return $4.UpdateTenantRequest();
      case 'Delete': return $4.DeleteTenantRequest();
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $async.Future<$pb.GeneratedMessage> handleCall($pb.ServerContext ctx, $core.String methodName, $pb.GeneratedMessage request) {
    switch (methodName) {
      case 'Create': return this.create(ctx, request as $4.CreateTenantRequest);
      case 'Get': return this.get(ctx, request as $4.GetTenantRequest);
      case 'GetAll': return this.getAll(ctx, request as $4.GetTenantsRequest);
      case 'GetAvailable': return this.getAvailable(ctx, request as $4.GetAvailableTenantsRequest);
      case 'Update': return this.update(ctx, request as $4.UpdateTenantRequest);
      case 'Delete': return this.delete(ctx, request as $4.DeleteTenantRequest);
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $core.Map<$core.String, $core.dynamic> get $json => TenantServiceBase$json;
  $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> get $messageJson => TenantServiceBase$messageJson;
}

