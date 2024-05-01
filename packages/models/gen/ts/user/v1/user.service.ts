/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {
  ChangeUserEmailRequest,
  ChangeUserEmailResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "./user.event";

export const protobufPackage = "gen.go.user.v1";

export interface UserService {
  Get(request: GetUserRequest): Promise<GetUserResponse>;
  Put(request: UpdateUserRequest): Promise<UpdateUserResponse>;
  ChangeEmail(request: ChangeUserEmailRequest): Promise<ChangeUserEmailResponse>;
}

export const UserServiceServiceName = "gen.go.user.v1.UserService";
export class UserServiceClientImpl implements UserService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || UserServiceServiceName;
    this.rpc = rpc;
    this.Get = this.Get.bind(this);
    this.Put = this.Put.bind(this);
    this.ChangeEmail = this.ChangeEmail.bind(this);
  }
  Get(request: GetUserRequest): Promise<GetUserResponse> {
    const data = GetUserRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Get", data);
    return promise.then((data) => GetUserResponse.decode(_m0.Reader.create(data)));
  }

  Put(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const data = UpdateUserRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Put", data);
    return promise.then((data) => UpdateUserResponse.decode(_m0.Reader.create(data)));
  }

  ChangeEmail(request: ChangeUserEmailRequest): Promise<ChangeUserEmailResponse> {
    const data = ChangeUserEmailRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChangeEmail", data);
    return promise.then((data) => ChangeUserEmailResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}