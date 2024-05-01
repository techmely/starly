/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "gen.go.user.v1";

export interface GetUserRequest {
  id: string;
}

export interface GetUserResponse {
}

export interface UpdateUserRequest {
  id: string;
}

export interface UpdateUserResponse {
}

export interface UserChangePasswordRequest {
  email: string;
}

export interface UserChangePasswordResponse {
  email: string;
}

export interface ChangeUserEmailRequest {
  email: string;
}

export interface ChangeUserEmailResponse {
  email: string;
}

function createBaseGetUserRequest(): GetUserRequest {
  return { id: "" };
}

export const GetUserRequest = {
  encode(message: GetUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetUserRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserRequest>, I>>(base?: I): GetUserRequest {
    return GetUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserRequest>, I>>(object: I): GetUserRequest {
    const message = createBaseGetUserRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetUserResponse(): GetUserResponse {
  return {};
}

export const GetUserResponse = {
  encode(_: GetUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): GetUserResponse {
    return {};
  },

  toJSON(_: GetUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserResponse>, I>>(base?: I): GetUserResponse {
    return GetUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserResponse>, I>>(_: I): GetUserResponse {
    const message = createBaseGetUserResponse();
    return message;
  },
};

function createBaseUpdateUserRequest(): UpdateUserRequest {
  return { id: "" };
}

export const UpdateUserRequest = {
  encode(message: UpdateUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateUserRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: UpdateUserRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserRequest>, I>>(base?: I): UpdateUserRequest {
    return UpdateUserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserRequest>, I>>(object: I): UpdateUserRequest {
    const message = createBaseUpdateUserRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseUpdateUserResponse(): UpdateUserResponse {
  return {};
}

export const UpdateUserResponse = {
  encode(_: UpdateUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UpdateUserResponse {
    return {};
  },

  toJSON(_: UpdateUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateUserResponse>, I>>(base?: I): UpdateUserResponse {
    return UpdateUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateUserResponse>, I>>(_: I): UpdateUserResponse {
    const message = createBaseUpdateUserResponse();
    return message;
  },
};

function createBaseUserChangePasswordRequest(): UserChangePasswordRequest {
  return { email: "" };
}

export const UserChangePasswordRequest = {
  encode(message: UserChangePasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserChangePasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserChangePasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserChangePasswordRequest {
    return { email: isSet(object.email) ? globalThis.String(object.email) : "" };
  },

  toJSON(message: UserChangePasswordRequest): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserChangePasswordRequest>, I>>(base?: I): UserChangePasswordRequest {
    return UserChangePasswordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserChangePasswordRequest>, I>>(object: I): UserChangePasswordRequest {
    const message = createBaseUserChangePasswordRequest();
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseUserChangePasswordResponse(): UserChangePasswordResponse {
  return { email: "" };
}

export const UserChangePasswordResponse = {
  encode(message: UserChangePasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserChangePasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserChangePasswordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserChangePasswordResponse {
    return { email: isSet(object.email) ? globalThis.String(object.email) : "" };
  },

  toJSON(message: UserChangePasswordResponse): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserChangePasswordResponse>, I>>(base?: I): UserChangePasswordResponse {
    return UserChangePasswordResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserChangePasswordResponse>, I>>(object: I): UserChangePasswordResponse {
    const message = createBaseUserChangePasswordResponse();
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseChangeUserEmailRequest(): ChangeUserEmailRequest {
  return { email: "" };
}

export const ChangeUserEmailRequest = {
  encode(message: ChangeUserEmailRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeUserEmailRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeUserEmailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangeUserEmailRequest {
    return { email: isSet(object.email) ? globalThis.String(object.email) : "" };
  },

  toJSON(message: ChangeUserEmailRequest): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangeUserEmailRequest>, I>>(base?: I): ChangeUserEmailRequest {
    return ChangeUserEmailRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangeUserEmailRequest>, I>>(object: I): ChangeUserEmailRequest {
    const message = createBaseChangeUserEmailRequest();
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseChangeUserEmailResponse(): ChangeUserEmailResponse {
  return { email: "" };
}

export const ChangeUserEmailResponse = {
  encode(message: ChangeUserEmailResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeUserEmailResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeUserEmailResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangeUserEmailResponse {
    return { email: isSet(object.email) ? globalThis.String(object.email) : "" };
  },

  toJSON(message: ChangeUserEmailResponse): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangeUserEmailResponse>, I>>(base?: I): ChangeUserEmailResponse {
    return ChangeUserEmailResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangeUserEmailResponse>, I>>(object: I): ChangeUserEmailResponse {
    const message = createBaseChangeUserEmailResponse();
    message.email = object.email ?? "";
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}