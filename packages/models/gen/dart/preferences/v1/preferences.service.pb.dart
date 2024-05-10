//
//  Generated code. Do not modify.
//  source: preferences/v1/preferences.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import 'preferences.event.pb.dart' as $2;

class PreferencesServiceApi {
  $pb.RpcClient _client;
  PreferencesServiceApi(this._client);

  $async.Future<$2.GetPreferencesResponse> get($pb.ClientContext? ctx, $2.GetPreferencesRequest request) =>
    _client.invoke<$2.GetPreferencesResponse>(ctx, 'PreferencesService', 'Get', request, $2.GetPreferencesResponse())
  ;
}

