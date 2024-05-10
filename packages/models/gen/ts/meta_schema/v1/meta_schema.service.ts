// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.174.0
//   protoc               unknown
// source: meta_schema/v1/meta_schema.service.proto

/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { GetMetaSchemaRequest, GetMetaSchemaResponse } from "./meta_schema.event";

export const protobufPackage = "gen.go.meta_schema.v1";

export interface MetaSchemaService {
  Get(request: GetMetaSchemaRequest): Promise<GetMetaSchemaResponse>;
}

export const MetaSchemaServiceServiceName = "gen.go.meta_schema.v1.MetaSchemaService";
export class MetaSchemaServiceClientImpl implements MetaSchemaService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MetaSchemaServiceServiceName;
    this.rpc = rpc;
    this.Get = this.Get.bind(this);
  }
  Get(request: GetMetaSchemaRequest): Promise<GetMetaSchemaResponse> {
    const data = GetMetaSchemaRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Get", data);
    return promise.then((data) => GetMetaSchemaResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
