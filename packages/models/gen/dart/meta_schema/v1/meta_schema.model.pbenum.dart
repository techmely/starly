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

import 'package:protobuf/protobuf.dart' as $pb;

class MetaSchemaType extends $pb.ProtobufEnum {
  static const MetaSchemaType SYSTEM = MetaSchemaType._(0, _omitEnumNames ? '' : 'SYSTEM');
  static const MetaSchemaType DEFAULT = MetaSchemaType._(1, _omitEnumNames ? '' : 'DEFAULT');

  static const $core.List<MetaSchemaType> values = <MetaSchemaType> [
    SYSTEM,
    DEFAULT,
  ];

  static final $core.Map<$core.int, MetaSchemaType> _byValue = $pb.ProtobufEnum.initByValue(values);
  static MetaSchemaType? valueOf($core.int value) => _byValue[value];

  const MetaSchemaType._($core.int v, $core.String n) : super(v, n);
}


const _omitEnumNames = $core.bool.fromEnvironment('protobuf.omit_enum_names');