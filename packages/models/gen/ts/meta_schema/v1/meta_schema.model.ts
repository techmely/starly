// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               unknown
// source: meta_schema/v1/meta_schema.model.proto

/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "gen.go.meta_schema.v1";

export enum MetaSchemaType {
  SYSTEM = 0,
  DEFAULT = 1,
  UNRECOGNIZED = -1,
}

export function metaSchemaTypeFromJSON(object: any): MetaSchemaType {
  switch (object) {
    case 0:
    case "SYSTEM":
      return MetaSchemaType.SYSTEM;
    case 1:
    case "DEFAULT":
      return MetaSchemaType.DEFAULT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MetaSchemaType.UNRECOGNIZED;
  }
}

export function metaSchemaTypeToJSON(object: MetaSchemaType): string {
  switch (object) {
    case MetaSchemaType.SYSTEM:
      return "SYSTEM";
    case MetaSchemaType.DEFAULT:
      return "DEFAULT";
    case MetaSchemaType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface MetaSchemaTable {
  id: number;
  name: string;
  version: number;
  target: string;
  isDefault: boolean;
  schema: string;
  type: MetaSchemaType;
  tenantId: number;
  createdAt: string;
  updatedAt: string;
}

function createBaseMetaSchemaTable(): MetaSchemaTable {
  return {
    id: 0,
    name: "",
    version: 0,
    target: "",
    isDefault: false,
    schema: "",
    type: 0,
    tenantId: 0,
    createdAt: "",
    updatedAt: "",
  };
}

export const MetaSchemaTable = {
  encode(message: MetaSchemaTable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.version !== 0) {
      writer.uint32(24).int64(message.version);
    }
    if (message.target !== "") {
      writer.uint32(34).string(message.target);
    }
    if (message.isDefault !== false) {
      writer.uint32(40).bool(message.isDefault);
    }
    if (message.schema !== "") {
      writer.uint32(50).string(message.schema);
    }
    if (message.type !== 0) {
      writer.uint32(56).int32(message.type);
    }
    if (message.tenantId !== 0) {
      writer.uint32(64).int32(message.tenantId);
    }
    if (message.createdAt !== "") {
      writer.uint32(74).string(message.createdAt);
    }
    if (message.updatedAt !== "") {
      writer.uint32(82).string(message.updatedAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetaSchemaTable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetaSchemaTable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.version = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.target = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isDefault = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.schema = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.tenantId = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.createdAt = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.updatedAt = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MetaSchemaTable {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      version: isSet(object.version) ? globalThis.Number(object.version) : 0,
      target: isSet(object.target) ? globalThis.String(object.target) : "",
      isDefault: isSet(object.isDefault) ? globalThis.Boolean(object.isDefault) : false,
      schema: isSet(object.schema) ? globalThis.String(object.schema) : "",
      type: isSet(object.type) ? metaSchemaTypeFromJSON(object.type) : 0,
      tenantId: isSet(object.tenantId) ? globalThis.Number(object.tenantId) : 0,
      createdAt: isSet(object.createdAt) ? globalThis.String(object.createdAt) : "",
      updatedAt: isSet(object.updatedAt) ? globalThis.String(object.updatedAt) : "",
    };
  },

  toJSON(message: MetaSchemaTable): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    if (message.target !== "") {
      obj.target = message.target;
    }
    if (message.isDefault !== false) {
      obj.isDefault = message.isDefault;
    }
    if (message.schema !== "") {
      obj.schema = message.schema;
    }
    if (message.type !== 0) {
      obj.type = metaSchemaTypeToJSON(message.type);
    }
    if (message.tenantId !== 0) {
      obj.tenantId = Math.round(message.tenantId);
    }
    if (message.createdAt !== "") {
      obj.createdAt = message.createdAt;
    }
    if (message.updatedAt !== "") {
      obj.updatedAt = message.updatedAt;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MetaSchemaTable>, I>>(base?: I): MetaSchemaTable {
    return MetaSchemaTable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MetaSchemaTable>, I>>(object: I): MetaSchemaTable {
    const message = createBaseMetaSchemaTable();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.version = object.version ?? 0;
    message.target = object.target ?? "";
    message.isDefault = object.isDefault ?? false;
    message.schema = object.schema ?? "";
    message.type = object.type ?? 0;
    message.tenantId = object.tenantId ?? 0;
    message.createdAt = object.createdAt ?? "";
    message.updatedAt = object.updatedAt ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
