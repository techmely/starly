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

import 'tenant.event.pb.dart' as $4;

class TenantServicePortApi {
  $pb.RpcClient _client;
  TenantServicePortApi(this._client);

  $async.Future<$4.CreateTenantResponse> create_($pb.ClientContext? ctx, $4.CreateTenantRequest request) =>
    _client.invoke<$4.CreateTenantResponse>(ctx, 'TenantServicePort', 'create', request, $4.CreateTenantResponse())
  ;
  $async.Future<$4.GetTenantResponse> get($pb.ClientContext? ctx, $4.GetTenantRequest request) =>
    _client.invoke<$4.GetTenantResponse>(ctx, 'TenantServicePort', 'get', request, $4.GetTenantResponse())
  ;
  $async.Future<$4.GetTenantsResponse> getAll($pb.ClientContext? ctx, $4.GetTenantsRequest request) =>
    _client.invoke<$4.GetTenantsResponse>(ctx, 'TenantServicePort', 'getAll', request, $4.GetTenantsResponse())
  ;
  $async.Future<$4.GetAvailableTenantsResponse> getAvailable($pb.ClientContext? ctx, $4.GetAvailableTenantsRequest request) =>
    _client.invoke<$4.GetAvailableTenantsResponse>(ctx, 'TenantServicePort', 'getAvailable', request, $4.GetAvailableTenantsResponse())
  ;
  $async.Future<$4.UpdateTenantResponse> update($pb.ClientContext? ctx, $4.UpdateTenantRequest request) =>
    _client.invoke<$4.UpdateTenantResponse>(ctx, 'TenantServicePort', 'update', request, $4.UpdateTenantResponse())
  ;
  $async.Future<$4.DeleteTenantResponse> delete($pb.ClientContext? ctx, $4.DeleteTenantRequest request) =>
    _client.invoke<$4.DeleteTenantResponse>(ctx, 'TenantServicePort', 'delete', request, $4.DeleteTenantResponse())
  ;
}

