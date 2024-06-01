//
//  Generated code. Do not modify.
//  source: common/common.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:core' as $core;

import 'package:fixnum/fixnum.dart' as $fixnum;
import 'package:protobuf/protobuf.dart' as $pb;

import 'common.model.pbenum.dart';

export 'common.model.pbenum.dart';

class RequestFilter extends $pb.GeneratedMessage {
  factory RequestFilter({
    $fixnum.Int64? page,
    $fixnum.Int64? limit,
    $fixnum.Int64? offset,
    $core.Iterable<$core.String>? sortFields,
    OrderDirection? orderDirection,
  }) {
    final $result = create();
    if (page != null) {
      $result.page = page;
    }
    if (limit != null) {
      $result.limit = limit;
    }
    if (offset != null) {
      $result.offset = offset;
    }
    if (sortFields != null) {
      $result.sortFields.addAll(sortFields);
    }
    if (orderDirection != null) {
      $result.orderDirection = orderDirection;
    }
    return $result;
  }
  RequestFilter._() : super();
  factory RequestFilter.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory RequestFilter.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'RequestFilter', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.common'), createEmptyInstance: create)
    ..a<$fixnum.Int64>(1, _omitFieldNames ? '' : 'page', $pb.PbFieldType.OU6, defaultOrMaker: $fixnum.Int64.ZERO)
    ..a<$fixnum.Int64>(2, _omitFieldNames ? '' : 'limit', $pb.PbFieldType.OU6, defaultOrMaker: $fixnum.Int64.ZERO)
    ..a<$fixnum.Int64>(3, _omitFieldNames ? '' : 'offset', $pb.PbFieldType.OU6, defaultOrMaker: $fixnum.Int64.ZERO)
    ..pPS(4, _omitFieldNames ? '' : 'sortFields')
    ..e<OrderDirection>(5, _omitFieldNames ? '' : 'orderDirection', $pb.PbFieldType.OE, defaultOrMaker: OrderDirection.ASC, valueOf: OrderDirection.valueOf, enumValues: OrderDirection.values)
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  RequestFilter clone() => RequestFilter()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  RequestFilter copyWith(void Function(RequestFilter) updates) => super.copyWith((message) => updates(message as RequestFilter)) as RequestFilter;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static RequestFilter create() => RequestFilter._();
  RequestFilter createEmptyInstance() => create();
  static $pb.PbList<RequestFilter> createRepeated() => $pb.PbList<RequestFilter>();
  @$core.pragma('dart2js:noInline')
  static RequestFilter getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<RequestFilter>(create);
  static RequestFilter? _defaultInstance;

  @$pb.TagNumber(1)
  $fixnum.Int64 get page => $_getI64(0);
  @$pb.TagNumber(1)
  set page($fixnum.Int64 v) { $_setInt64(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasPage() => $_has(0);
  @$pb.TagNumber(1)
  void clearPage() => clearField(1);

  @$pb.TagNumber(2)
  $fixnum.Int64 get limit => $_getI64(1);
  @$pb.TagNumber(2)
  set limit($fixnum.Int64 v) { $_setInt64(1, v); }
  @$pb.TagNumber(2)
  $core.bool hasLimit() => $_has(1);
  @$pb.TagNumber(2)
  void clearLimit() => clearField(2);

  @$pb.TagNumber(3)
  $fixnum.Int64 get offset => $_getI64(2);
  @$pb.TagNumber(3)
  set offset($fixnum.Int64 v) { $_setInt64(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasOffset() => $_has(2);
  @$pb.TagNumber(3)
  void clearOffset() => clearField(3);

  @$pb.TagNumber(4)
  $core.List<$core.String> get sortFields => $_getList(3);

  @$pb.TagNumber(5)
  OrderDirection get orderDirection => $_getN(4);
  @$pb.TagNumber(5)
  set orderDirection(OrderDirection v) { setField(5, v); }
  @$pb.TagNumber(5)
  $core.bool hasOrderDirection() => $_has(4);
  @$pb.TagNumber(5)
  void clearOrderDirection() => clearField(5);
}


const _omitFieldNames = $core.bool.fromEnvironment('protobuf.omit_field_names');
const _omitMessageNames = $core.bool.fromEnvironment('protobuf.omit_message_names');
