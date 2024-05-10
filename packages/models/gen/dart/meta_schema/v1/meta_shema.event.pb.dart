//
//  Generated code. Do not modify.
//  source: meta_schema/v1/meta_shema.event.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

class GetMetaSchemaRequest extends $pb.GeneratedMessage {
  factory GetMetaSchemaRequest({
    $core.String? id,
  }) {
    final $result = create();
    if (id != null) {
      $result.id = id;
    }
    return $result;
  }
  GetMetaSchemaRequest._() : super();
  factory GetMetaSchemaRequest.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory GetMetaSchemaRequest.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'GetMetaSchemaRequest', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.meta_schema.v1'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'id')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  GetMetaSchemaRequest clone() => GetMetaSchemaRequest()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  GetMetaSchemaRequest copyWith(void Function(GetMetaSchemaRequest) updates) => super.copyWith((message) => updates(message as GetMetaSchemaRequest)) as GetMetaSchemaRequest;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static GetMetaSchemaRequest create() => GetMetaSchemaRequest._();
  GetMetaSchemaRequest createEmptyInstance() => create();
  static $pb.PbList<GetMetaSchemaRequest> createRepeated() => $pb.PbList<GetMetaSchemaRequest>();
  @$core.pragma('dart2js:noInline')
  static GetMetaSchemaRequest getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<GetMetaSchemaRequest>(create);
  static GetMetaSchemaRequest? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get id => $_getSZ(0);
  @$pb.TagNumber(1)
  set id($core.String v) { $_setString(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasId() => $_has(0);
  @$pb.TagNumber(1)
  void clearId() => clearField(1);
}

class GetMetaSchemaResponse extends $pb.GeneratedMessage {
  factory GetMetaSchemaResponse({
    $core.String? id,
  }) {
    final $result = create();
    if (id != null) {
      $result.id = id;
    }
    return $result;
  }
  GetMetaSchemaResponse._() : super();
  factory GetMetaSchemaResponse.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory GetMetaSchemaResponse.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'GetMetaSchemaResponse', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.meta_schema.v1'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'id')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  GetMetaSchemaResponse clone() => GetMetaSchemaResponse()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  GetMetaSchemaResponse copyWith(void Function(GetMetaSchemaResponse) updates) => super.copyWith((message) => updates(message as GetMetaSchemaResponse)) as GetMetaSchemaResponse;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static GetMetaSchemaResponse create() => GetMetaSchemaResponse._();
  GetMetaSchemaResponse createEmptyInstance() => create();
  static $pb.PbList<GetMetaSchemaResponse> createRepeated() => $pb.PbList<GetMetaSchemaResponse>();
  @$core.pragma('dart2js:noInline')
  static GetMetaSchemaResponse getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<GetMetaSchemaResponse>(create);
  static GetMetaSchemaResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get id => $_getSZ(0);
  @$pb.TagNumber(1)
  set id($core.String v) { $_setString(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasId() => $_has(0);
  @$pb.TagNumber(1)
  void clearId() => clearField(1);
}


const _omitFieldNames = $core.bool.fromEnvironment('protobuf.omit_field_names');
const _omitMessageNames = $core.bool.fromEnvironment('protobuf.omit_message_names');
