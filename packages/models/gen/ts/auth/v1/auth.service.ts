/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { LoginRequest, LoginResponse } from "./auth.event";

export const protobufPackage = "gen.go.auth.v1";

export interface PreferencesService {
  Get(request: LoginRequest): Promise<LoginResponse>;
}

export const PreferencesServiceServiceName = "gen.go.auth.v1.PreferencesService";
export class PreferencesServiceClientImpl implements PreferencesService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || PreferencesServiceServiceName;
    this.rpc = rpc;
    this.Get = this.Get.bind(this);
  }
  Get(request: LoginRequest): Promise<LoginResponse> {
    const data = LoginRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Get", data);
    return promise.then((data) => LoginResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
