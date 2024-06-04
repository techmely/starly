//
//  Generated code. Do not modify.
//  source: tenant/v1/tenant.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import 'tenant.event.pb.dart' as $7;

class TenantServicePortApi {
  $pb.RpcClient _client;
  TenantServicePortApi(this._client);

  $async.Future<$7.CreateTenantResponse> create_($pb.ClientContext? ctx, $7.CreateTenantRequest request) =>
    _client.invoke<$7.CreateTenantResponse>(ctx, 'TenantServicePort', 'create', request, $7.CreateTenantResponse())
  ;
  $async.Future<$7.GetTenantResponse> get($pb.ClientContext? ctx, $7.GetTenantRequest request) =>
    _client.invoke<$7.GetTenantResponse>(ctx, 'TenantServicePort', 'get', request, $7.GetTenantResponse())
  ;
  $async.Future<$7.GetTenantsResponse> getAll($pb.ClientContext? ctx, $7.GetTenantsRequest request) =>
    _client.invoke<$7.GetTenantsResponse>(ctx, 'TenantServicePort', 'getAll', request, $7.GetTenantsResponse())
  ;
  $async.Future<$7.GetAvailableTenantsResponse> getAvailable($pb.ClientContext? ctx, $7.GetAvailableTenantsRequest request) =>
    _client.invoke<$7.GetAvailableTenantsResponse>(ctx, 'TenantServicePort', 'getAvailable', request, $7.GetAvailableTenantsResponse())
  ;
  $async.Future<$7.UpdateTenantResponse> update($pb.ClientContext? ctx, $7.UpdateTenantRequest request) =>
    _client.invoke<$7.UpdateTenantResponse>(ctx, 'TenantServicePort', 'update', request, $7.UpdateTenantResponse())
  ;
  $async.Future<$7.DeleteTenantResponse> delete($pb.ClientContext? ctx, $7.DeleteTenantRequest request) =>
    _client.invoke<$7.DeleteTenantResponse>(ctx, 'TenantServicePort', 'delete', request, $7.DeleteTenantResponse())
  ;
}

