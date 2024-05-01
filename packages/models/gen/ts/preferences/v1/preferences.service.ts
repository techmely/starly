/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { GetPreferencesRequest, GetPreferencesResponse } from "./preferences.event";

export const protobufPackage = "gen.go.preferences.v1";

export interface PreferencesService {
  Get(request: GetPreferencesRequest): Promise<GetPreferencesResponse>;
}

export const PreferencesServiceServiceName = "gen.go.preferences.v1.PreferencesService";
export class PreferencesServiceClientImpl implements PreferencesService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || PreferencesServiceServiceName;
    this.rpc = rpc;
    this.Get = this.Get.bind(this);
  }
  Get(request: GetPreferencesRequest): Promise<GetPreferencesResponse> {
    const data = GetPreferencesRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Get", data);
    return promise.then((data) => GetPreferencesResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
