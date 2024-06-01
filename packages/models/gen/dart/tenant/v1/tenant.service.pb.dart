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

import 'tenant.event.pb.dart' as $5;

class TenantServicePortApi {
  $pb.RpcClient _client;
  TenantServicePortApi(this._client);

  $async.Future<$5.CreateTenantResponse> create_($pb.ClientContext? ctx, $5.CreateTenantRequest request) =>
    _client.invoke<$5.CreateTenantResponse>(ctx, 'TenantServicePort', 'create', request, $5.CreateTenantResponse())
  ;
  $async.Future<$5.GetTenantResponse> get($pb.ClientContext? ctx, $5.GetTenantRequest request) =>
    _client.invoke<$5.GetTenantResponse>(ctx, 'TenantServicePort', 'get', request, $5.GetTenantResponse())
  ;
  $async.Future<$5.GetTenantsResponse> getAll($pb.ClientContext? ctx, $5.GetTenantsRequest request) =>
    _client.invoke<$5.GetTenantsResponse>(ctx, 'TenantServicePort', 'getAll', request, $5.GetTenantsResponse())
  ;
  $async.Future<$5.GetAvailableTenantsResponse> getAvailable($pb.ClientContext? ctx, $5.GetAvailableTenantsRequest request) =>
    _client.invoke<$5.GetAvailableTenantsResponse>(ctx, 'TenantServicePort', 'getAvailable', request, $5.GetAvailableTenantsResponse())
  ;
  $async.Future<$5.UpdateTenantResponse> update($pb.ClientContext? ctx, $5.UpdateTenantRequest request) =>
    _client.invoke<$5.UpdateTenantResponse>(ctx, 'TenantServicePort', 'update', request, $5.UpdateTenantResponse())
  ;
  $async.Future<$5.DeleteTenantResponse> delete($pb.ClientContext? ctx, $5.DeleteTenantRequest request) =>
    _client.invoke<$5.DeleteTenantResponse>(ctx, 'TenantServicePort', 'delete', request, $5.DeleteTenantResponse())
  ;
}

