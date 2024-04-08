//
//  Generated code. Do not modify.
//  source: auth/v1/auth.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import 'auth.event.pb.dart' as $0;

class PreferencesServiceApi {
  $pb.RpcClient _client;
  PreferencesServiceApi(this._client);

  $async.Future<$0.LoginResponse> get($pb.ClientContext? ctx, $0.LoginRequest request) =>
    _client.invoke<$0.LoginResponse>(ctx, 'PreferencesService', 'Get', request, $0.LoginResponse())
  ;
}

