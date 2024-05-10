//
//  Generated code. Do not modify.
//  source: meta_schema/v1/meta_schema.service.proto
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

import 'meta_schema.event.pb.dart' as $1;
import 'meta_schema.service.pbjson.dart';

export 'meta_schema.service.pb.dart';

abstract class MetaSchemaServiceBase extends $pb.GeneratedService {
  $async.Future<$1.GetMetaSchemaResponse> get($pb.ServerContext ctx, $1.GetMetaSchemaRequest request);

  $pb.GeneratedMessage createRequest($core.String methodName) {
    switch (methodName) {
      case 'Get': return $1.GetMetaSchemaRequest();
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $async.Future<$pb.GeneratedMessage> handleCall($pb.ServerContext ctx, $core.String methodName, $pb.GeneratedMessage request) {
    switch (methodName) {
      case 'Get': return this.get(ctx, request as $1.GetMetaSchemaRequest);
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $core.Map<$core.String, $core.dynamic> get $json => MetaSchemaServiceBase$json;
  $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> get $messageJson => MetaSchemaServiceBase$messageJson;
}
