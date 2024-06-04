//
//  Generated code. Do not modify.
//  source: tenant/v1/tenant.model.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import '../../google/protobuf/any.pb.dart' as $5;

class TenantTable extends $pb.GeneratedMessage {
  factory TenantTable({
    $core.String? id,
    $core.String? name,
    $core.String? slug,
    $core.String? description,
    $core.bool? isVerified,
    $core.String? ownerId,
    $5.Any? metadata,
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
    if (slug != null) {
      $result.slug = slug;
    }
    if (description != null) {
      $result.description = description;
    }
    if (isVerified != null) {
      $result.isVerified = isVerified;
    }
    if (ownerId != null) {
      $result.ownerId = ownerId;
    }
    if (metadata != null) {
      $result.metadata = metadata;
    }
    if (createdAt != null) {
      $result.createdAt = createdAt;
    }
    if (updatedAt != null) {
      $result.updatedAt = updatedAt;
    }
    return $result;
  }
  TenantTable._() : super();
  factory TenantTable.fromBuffer($core.List<$core.int> i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromBuffer(i, r);
  factory TenantTable.fromJson($core.String i, [$pb.ExtensionRegistry r = $pb.ExtensionRegistry.EMPTY]) => create()..mergeFromJson(i, r);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(_omitMessageNames ? '' : 'TenantTable', package: const $pb.PackageName(_omitMessageNames ? '' : 'gen.go.tenant.v1'), createEmptyInstance: create)
    ..aOS(1, _omitFieldNames ? '' : 'id')
    ..aOS(2, _omitFieldNames ? '' : 'name')
    ..aOS(3, _omitFieldNames ? '' : 'slug')
    ..aOS(4, _omitFieldNames ? '' : 'description')
    ..aOB(5, _omitFieldNames ? '' : 'isVerified')
    ..aOS(6, _omitFieldNames ? '' : 'ownerId')
    ..aOM<$5.Any>(7, _omitFieldNames ? '' : 'metadata', subBuilder: $5.Any.create)
    ..aOS(8, _omitFieldNames ? '' : 'createdAt')
    ..aOS(9, _omitFieldNames ? '' : 'updatedAt')
    ..hasRequiredFields = false
  ;

  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.deepCopy] instead. '
  'Will be removed in next major version')
  TenantTable clone() => TenantTable()..mergeFromMessage(this);
  @$core.Deprecated(
  'Using this can add significant overhead to your binary. '
  'Use [GeneratedMessageGenericExtensions.rebuild] instead. '
  'Will be removed in next major version')
  TenantTable copyWith(void Function(TenantTable) updates) => super.copyWith((message) => updates(message as TenantTable)) as TenantTable;

  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static TenantTable create() => TenantTable._();
  TenantTable createEmptyInstance() => create();
  static $pb.PbList<TenantTable> createRepeated() => $pb.PbList<TenantTable>();
  @$core.pragma('dart2js:noInline')
  static TenantTable getDefault() => _defaultInstance ??= $pb.GeneratedMessage.$_defaultFor<TenantTable>(create);
  static TenantTable? _defaultInstance;

  @$pb.TagNumber(1)
  $core.String get id => $_getSZ(0);
  @$pb.TagNumber(1)
  set id($core.String v) { $_setString(0, v); }
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
  $core.String get slug => $_getSZ(2);
  @$pb.TagNumber(3)
  set slug($core.String v) { $_setString(2, v); }
  @$pb.TagNumber(3)
  $core.bool hasSlug() => $_has(2);
  @$pb.TagNumber(3)
  void clearSlug() => clearField(3);

  @$pb.TagNumber(4)
  $core.String get description => $_getSZ(3);
  @$pb.TagNumber(4)
  set description($core.String v) { $_setString(3, v); }
  @$pb.TagNumber(4)
  $core.bool hasDescription() => $_has(3);
  @$pb.TagNumber(4)
  void clearDescription() => clearField(4);

  @$pb.TagNumber(5)
  $core.bool get isVerified => $_getBF(4);
  @$pb.TagNumber(5)
  set isVerified($core.bool v) { $_setBool(4, v); }
  @$pb.TagNumber(5)
  $core.bool hasIsVerified() => $_has(4);
  @$pb.TagNumber(5)
  void clearIsVerified() => clearField(5);

  @$pb.TagNumber(6)
  $core.String get ownerId => $_getSZ(5);
  @$pb.TagNumber(6)
  set ownerId($core.String v) { $_setString(5, v); }
  @$pb.TagNumber(6)
  $core.bool hasOwnerId() => $_has(5);
  @$pb.TagNumber(6)
  void clearOwnerId() => clearField(6);

  @$pb.TagNumber(7)
  $5.Any get metadata => $_getN(6);
  @$pb.TagNumber(7)
  set metadata($5.Any v) { setField(7, v); }
  @$pb.TagNumber(7)
  $core.bool hasMetadata() => $_has(6);
  @$pb.TagNumber(7)
  void clearMetadata() => clearField(7);
  @$pb.TagNumber(7)
  $5.Any ensureMetadata() => $_ensure(6);

  @$pb.TagNumber(8)
  $core.String get createdAt => $_getSZ(7);
  @$pb.TagNumber(8)
  set createdAt($core.String v) { $_setString(7, v); }
  @$pb.TagNumber(8)
  $core.bool hasCreatedAt() => $_has(7);
  @$pb.TagNumber(8)
  void clearCreatedAt() => clearField(8);

  @$pb.TagNumber(9)
  $core.String get updatedAt => $_getSZ(8);
  @$pb.TagNumber(9)
  set updatedAt($core.String v) { $_setString(8, v); }
  @$pb.TagNumber(9)
  $core.bool hasUpdatedAt() => $_has(8);
  @$pb.TagNumber(9)
  void clearUpdatedAt() => clearField(9);
}


const _omitFieldNames = $core.bool.fromEnvironment('protobuf.omit_field_names');
const _omitMessageNames = $core.bool.fromEnvironment('protobuf.omit_message_names');
