//
//  Generated code. Do not modify.
//  source: common/response.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import '../google/protobuf/struct.pb.dart' as $2;

class BaseErrorResponse extends $pb.GeneratedMessage {
  factory BaseErrorResponse({
    $core.String? code,
    $core.String? message,
    $core.String? requestId,
    $core.String? docs,
  }) {
    final $result = create();
    if (code != null) {
      $result.code = code;
    }
    if (message != null) {
      $result.message = message;
    }
    if (requestId != null) {
      $result.requestId = requestId;
    }
    if (docs != null) {
      $result.docs = docs;
    }
    return $result;
  }
  BaseErrorResponse._() : super();
  factory BaseErrorResponse.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory BaseErrorResponse.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'BaseErrorResponse', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.common'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'code')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aOS(3, _omitFieldNames ? '' : 'requestId', protoName: 'requestId')
    ..aOS(4, _omitFieldNames ? '' : 'docs')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  BaseErrorResponse clone() => BaseErrorResponse()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  BaseErrorResponse copyWith(void Function(BaseErrorResponse) updates) => super.copyWith((message) => updates(message as BaseErrorResponse)) as BaseErrorResponse;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static BaseErrorResponse create() => BaseErrorResponse._();
  BaseErrorResponse createEmptyInstance() => create();
  static $pb.PbList<BaseErrorResponse> createRepeated() => $pb.PbList<BaseErrorResponse>();
  @$core.pragma('dart2js:noInline')
  static BaseErrorResponse getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<BaseErrorResponse>(create);
  static BaseErrorResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get code => $_getSZ(0);
  @$pb.TagNumber(1)
  set code($core.String v) { $_setString(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasCode() => $_has(0);
  @$pb.TagNumber(1)
  void clearCode() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String v) { $_setString(1, v); }
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => clearField(2);

  @$pb.TagNumber(3)
  $core.String get requestId => $_getSZ(2);
  @$pb.TagNumber(3)
  set requestId($core.String v) { $_setString(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasRequestId() => $_has(2);
  @$pb.TagNumber(3)
  void clearRequestId() => clearField(3);

  @$pb.TagNumber(4)
  $core.String get docs => $_getSZ(3);
  @$pb.TagNumber(4)
  set docs($core.String v) { $_setString(3, v); }
  @$pb.TagNumber(4)
  $core.bool hasDocs() => $_has(3);
  @$pb.TagNumber(4)
  void clearDocs() => clearField(4);
}

class BaseResponse extends $pb.GeneratedMessage {
  factory BaseResponse({
    $2.Value? data,
    $core.String? code,
    $core.String? message,
    $2.Value? metadata,
  }) {
    final $result = create();
    if (data != null) {
      $result.data = data;
    }
    if (code != null) {
      $result.code = code;
    }
    if (message != null) {
      $result.message = message;
    }
    if (metadata != null) {
      $result.metadata = metadata;
    }
    return $result;
  }
  BaseResponse._() : super();
  factory BaseResponse.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory BaseResponse.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'BaseResponse', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.common'), createEmptyInstance: create)
    ..aOM<$2.Value>(1, _omitFieldNames ? '' : 'data', subBuilder: $2.Value.create)
    ..aOS(2, _omitFieldNames ? '' : 'code')
    ..aOS(3, _omitFieldNames ? '' : 'message')
    ..aOM<$2.Value>(4, _omitFieldNames ? '' : 'metadata', subBuilder: $2.Value.create)
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  BaseResponse clone() => BaseResponse()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  BaseResponse copyWith(void Function(BaseResponse) updates) => super.copyWith((message) => updates(message as BaseResponse)) as BaseResponse;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static BaseResponse create() => BaseResponse._();
  BaseResponse createEmptyInstance() => create();
  static $pb.PbList<BaseResponse> createRepeated() => $pb.PbList<BaseResponse>();
  @$core.pragma('dart2js:noInline')
  static BaseResponse getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<BaseResponse>(create);
  static BaseResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $2.Value get data => $_getN(0);
  @$pb.TagNumber(1)
  set data($2.Value v) { setField(1, v); }
  @$pb.TagNumber(1)
  $core.bool hasData() => $_has(0);
  @$pb.TagNumber(1)
  void clearData() => clearField(1);
  @$pb.TagNumber(1)
  $2.Value ensureData() => $_ensure(0);

  @$pb.TagNumber(2)
  $core.String get code => $_getSZ(1);
  @$pb.TagNumber(2)
  set code($core.String v) { $_setString(1, v); }
  @$pb.TagNumber(2)
  $core.bool hasCode() => $_has(1);
  @$pb.TagNumber(2)
  void clearCode() => clearField(2);

  @$pb.TagNumber(3)
  $core.String get message => $_getSZ(2);
  @$pb.TagNumber(3)
  set message($core.String v) { $_setString(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasMessage() => $_has(2);
  @$pb.TagNumber(3)
  void clearMessage() => clearField(3);

  @$pb.TagNumber(4)
  $2.Value get metadata => $_getN(3);
  @$pb.TagNumber(4)
  set metadata($2.Value v) { setField(4, v); }
  @$pb.TagNumber(4)
  $core.bool hasMetadata() => $_has(3);
  @$pb.TagNumber(4)
  void clearMetadata() => clearField(4);
  @$pb.TagNumber(4)
  $2.Value ensureMetadata() => $_ensure(3);
}


const _omitFieldNames = $core.bool.fromEnvironment('protobuf.omit_field_names');
const _omitMessageNames = $core.bool.fromEnvironment('protobuf.omit_message_names');
