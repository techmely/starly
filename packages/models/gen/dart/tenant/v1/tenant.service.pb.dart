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

import 'tenant.event.pb.dart' as $6;

class TenantServicePortApi {
  $pb.RpcClient _client;
  TenantServicePortApi(this._client);

  $async.Future<$6.CreateTenantResponse> create_($pb.ClientContext? ctx, $6.CreateTenantRequest request) =>
    _client.invoke<$6.CreateTenantResponse>(ctx, 'TenantServicePort', 'create', request, $6.CreateTenantResponse())
  ;
  $async.Future<$6.GetTenantResponse> get($pb.ClientContext? ctx, $6.GetTenantRequest request) =>
    _client.invoke<$6.GetTenantResponse>(ctx, 'TenantServicePort', 'get', request, $6.GetTenantResponse())
  ;
  $async.Future<$6.GetTenantsResponse> getAll($pb.ClientContext? ctx, $6.GetTenantsRequest request) =>
    _client.invoke<$6.GetTenantsResponse>(ctx, 'TenantServicePort', 'getAll', request, $6.GetTenantsResponse())
  ;
  $async.Future<$6.GetAvailableTenantsResponse> getAvailable($pb.ClientContext? ctx, $6.GetAvailableTenantsRequest request) =>
    _client.invoke<$6.GetAvailableTenantsResponse>(ctx, 'TenantServicePort', 'getAvailable', request, $6.GetAvailableTenantsResponse())
  ;
  $async.Future<$6.UpdateTenantResponse> update($pb.ClientContext? ctx, $6.UpdateTenantRequest request) =>
    _client.invoke<$6.UpdateTenantResponse>(ctx, 'TenantServicePort', 'update', request, $6.UpdateTenantResponse())
  ;
  $async.Future<$6.DeleteTenantResponse> delete($pb.ClientContext? ctx, $6.DeleteTenantRequest request) =>
    _client.invoke<$6.DeleteTenantResponse>(ctx, 'TenantServicePort', 'delete', request, $6.DeleteTenantResponse())
  ;
}

