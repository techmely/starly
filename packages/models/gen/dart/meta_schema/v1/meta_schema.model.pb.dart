//
//  Generated code. Do not modify.
//  source: meta_schema/v1/meta_schema.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:core' as $core;

import 'package:fixnum/fixnum.dart' as $fixnum;
import 'package:protobuf/protobuf.dart' as $pb;

import 'meta_schema.model.pbenum.dart';

export 'meta_schema.model.pbenum.dart';

class MetaSchemaTable extends $pb.GeneratedMessage {
  factory MetaSchemaTable({
    $fixnum.Int64? id,
    $core.String? name,
    $fixnum.Int64? version,
    $core.String? target,
    $core.bool? isDefault,
    $core.String? schema,
    MetaSchemaType? type,
    $core.int? tenantId,
    $core.String? createdAt,
    $core.String? updatedAt,
  }) {
    final $result = create();
    if (id != null) {
      $result.id = id;
    }
    if (name != null) {
      $result.name = name;
    }
    if (version != null) {
      $result.version = version;
    }
    if (target != null) {
      $result.target = target;
    }
    if (isDefault != null) {
      $result.isDefault = isDefault;
    }
    if (schema != null) {
      $result.schema = schema;
    }
    if (type != null) {
      $result.type = type;
    }
    if (tenantId != null) {
      $result.tenantId = tenantId;
    }
    if (createdAt != null) {
      $result.createdAt = createdAt;
    }
    if (updatedAt != null) {
      $result.updatedAt = updatedAt;
    }
    return $result;
  }
  MetaSchemaTable._() : super();
  factory MetaSchemaTable.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory MetaSchemaTable.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'MetaSchemaTable', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.meta_schema.v1'), createEmptyInstance: create)
    ..aInt64(1, _omitFieldNames ? '' : 'id')
    ..aOS(2, _omitFieldNames ? '' : 'name')
    ..aInt64(3, _omitFieldNames ? '' : 'version')
    ..aOS(4, _omitFieldNames ? '' : 'target')
    ..aOB(5, _omitFieldNames ? '' : 'isDefault')
    ..aOS(6, _omitFieldNames ? '' : 'schema')
    ..e<MetaSchemaType>(7, _omitFieldNames ? '' : 'type', $pb.PbFieldType.OE, defaultOrMaker: MetaSchemaType.SYSTEM, valueOf: MetaSchemaType.valueOf, enumValues: MetaSchemaType.values)
    ..a<$core.int>(8, _omitFieldNames ? '' : 'tenantId', $pb.PbFieldType.O3)
    ..aOS(9, _omitFieldNames ? '' : 'createdAt')
    ..aOS(10, _omitFieldNames ? '' : 'updatedAt')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  MetaSchemaTable clone() => MetaSchemaTable()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  MetaSchemaTable copyWith(void Function(MetaSchemaTable) updates) => super.copyWith((message) => updates(message as MetaSchemaTable)) as MetaSchemaTable;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static MetaSchemaTable create() => MetaSchemaTable._();
  MetaSchemaTable createEmptyInstance() => create();
  static $pb.PbList<MetaSchemaTable> createRepeated() => $pb.PbList<MetaSchemaTable>();
  @$core.pragma('dart2js:noInline')
  static MetaSchemaTable getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<MetaSchemaTable>(create);
  static MetaSchemaTable? _defaultInstance;

  @$pb.TagNumber(1)
  $fixnum.Int64 get id => $_getI64(0);
  @$pb.TagNumber(1)
  set id($fixnum.Int64 v) { $_setInt64(0, v); }
  @$pb.TagNumber(1)
  $core.bool hasId() => $_has(0);
  @$pb.TagNumber(1)
  void clearId() => clearField(1);

  @$pb.TagNumber(2)
  $core.String get name => $_getSZ(1);
  @$pb.TagNumber(2)
  set name($core.String v) { $_setString(1, v); }
  @$pb.TagNumber(2)
  $core.bool hasName() => $_has(1);
  @$pb.TagNumber(2)
  void clearName() => clearField(2);

  @$pb.TagNumber(3)
  $fixnum.Int64 get version => $_getI64(2);
  @$pb.TagNumber(3)
  set version($fixnum.Int64 v) { $_setInt64(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasVersion() => $_has(2);
  @$pb.TagNumber(3)
  void clearVersion() => clearField(3);

  @$pb.TagNumber(4)
  $core.String get target => $_getSZ(3);
  @$pb.TagNumber(4)
  set target($core.String v) { $_setString(3, v); }
  @$pb.TagNumber(4)
  $core.bool hasTarget() => $_has(3);
  @$pb.TagNumber(4)
  void clearTarget() => clearField(4);

  @$pb.TagNumber(5)
  $core.bool get isDefault => $_getBF(4);
  @$pb.TagNumber(5)
  set isDefault($core.bool v) { $_setBool(4, v); }
  @$pb.TagNumber(5)
  $core.bool hasIsDefault() => $_has(4);
  @$pb.TagNumber(5)
  void clearIsDefault() => clearField(5);

  @$pb.TagNumber(6)
  $core.String get schema => $_getSZ(5);
  @$pb.TagNumber(6)
  set schema($core.String v) { $_setString(5, v); }
  @$pb.TagNumber(6)
  $core.bool hasSchema() => $_has(5);
  @$pb.TagNumber(6)
  void clearSchema() => clearField(6);

  @$pb.TagNumber(7)
  MetaSchemaType get type => $_getN(6);
  @$pb.TagNumber(7)
  set type(MetaSchemaType v) { setField(7, v); }
  @$pb.TagNumber(7)
  $core.bool hasType() => $_has(6);
  @$pb.TagNumber(7)
  void clearType() => clearField(7);

  @$pb.TagNumber(8)
  $core.int get tenantId => $_getIZ(7);
  @$pb.TagNumber(8)
  set tenantId($core.int v) { $_setSignedInt32(7, v); }
  @$pb.TagNumber(8)
  $core.bool hasTenantId() => $_has(7);
  @$pb.TagNumber(8)
  void clearTenantId() => clearField(8);

  @$pb.TagNumber(9)
  $core.String get createdAt => $_getSZ(8);
  @$pb.TagNumber(9)
  set createdAt($core.String v) { $_setString(8, v); }
  @$pb.TagNumber(9)
  $core.bool hasCreatedAt() => $_has(8);
  @$pb.TagNumber(9)
  void clearCreatedAt() => clearField(9);

  @$pb.TagNumber(10)
  $core.String get updatedAt => $_getSZ(9);
  @$pb.TagNumber(10)
  set updatedAt($core.String v) { $_setString(9, v); }
  @$pb.TagNumber(10)
  $core.bool hasUpdatedAt() => $_has(9);
  @$pb.TagNumber(10)
  void clearUpdatedAt() => clearField(10);
}


const _omitFieldNames = $core.bool.fromEnvironment('protobuf.omit_field_names');
const _omitMessageNames = $core.bool.fromEnvironment('protobuf.omit_message_names');
