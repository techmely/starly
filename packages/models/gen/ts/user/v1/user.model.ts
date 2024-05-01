/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "gen.go.user.v1";

export enum UserRoles {
  SUPER_ADMIN = 0,
  MODERATOR = 1,
  ADMIN = 2,
  MEMBER = 3,
  GUEST = 4,
  UNRECOGNIZED = -1,
}

export function userRolesFromJSON(object: any): UserRoles {
  switch (object) {
    case 0:
    case "SUPER_ADMIN":
      return UserRoles.SUPER_ADMIN;
    case 1:
    case "MODERATOR":
      return UserRoles.MODERATOR;
    case 2:
    case "ADMIN":
      return UserRoles.ADMIN;
    case 3:
    case "MEMBER":
      return UserRoles.MEMBER;
    case 4:
    case "GUEST":
      return UserRoles.GUEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserRoles.UNRECOGNIZED;
  }
}

export function userRolesToJSON(object: UserRoles): string {
  switch (object) {
    case UserRoles.SUPER_ADMIN:
      return "SUPER_ADMIN";
    case UserRoles.MODERATOR:
      return "MODERATOR";
    case UserRoles.ADMIN:
      return "ADMIN";
    case UserRoles.MEMBER:
      return "MEMBER";
    case UserRoles.GUEST:
      return "GUEST";
    case UserRoles.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum UserStatus {
  VERIFIED = 0,
  BLACKLIST = 1,
  INACTIVE = 2,
  ACTIVE = 3,
  CLOSED = 4,
  UNRECOGNIZED = -1,
}

export function userStatusFromJSON(object: any): UserStatus {
  switch (object) {
    case 0:
    case "VERIFIED":
      return UserStatus.VERIFIED;
    case 1:
    case "BLACKLIST":
      return UserStatus.BLACKLIST;
    case 2:
    case "INACTIVE":
      return UserStatus.INACTIVE;
    case 3:
    case "ACTIVE":
      return UserStatus.ACTIVE;
    case 4:
    case "CLOSED":
      return UserStatus.CLOSED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserStatus.UNRECOGNIZED;
  }
}

export function userStatusToJSON(object: UserStatus): string {
  switch (object) {
    case UserStatus.VERIFIED:
      return "VERIFIED";
    case UserStatus.BLACKLIST:
      return "BLACKLIST";
    case UserStatus.INACTIVE:
      return "INACTIVE";
    case UserStatus.ACTIVE:
      return "ACTIVE";
    case UserStatus.CLOSED:
      return "CLOSED";
    case UserStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface UserProvider {
  githubId: string;
  googleId: string;
  facebookId: string;
  appleId: string;
}

export interface UserMetadata {
  openPlatform: string;
  utmCampaign: string;
  utmMedium: string;
  utmSource: string;
}

export interface User {
  id: string;
  email: string;
  unverifiedEmail: string;
  isEmailVerified: boolean;
  nickname: string;
  mobile: string;
  birthday: string;
  name: string;
  avatarUrl: string;
  locale: string;
  region: string;
  countryCode: string;
  gender: string;
  salt: string;
  lastLogin: number;
  isBetaUser: boolean;
  metadata: UserMetadata | undefined;
  provider: UserProvider | undefined;
}

function createBaseUserProvider(): UserProvider {
  return { githubId: "", googleId: "", facebookId: "", appleId: "" };
}

export const UserProvider = {
  encode(message: UserProvider, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.githubId !== "") {
      writer.uint32(10).string(message.githubId);
    }
    if (message.googleId !== "") {
      writer.uint32(18).string(message.googleId);
    }
    if (message.facebookId !== "") {
      writer.uint32(26).string(message.facebookId);
    }
    if (message.appleId !== "") {
      writer.uint32(34).string(message.appleId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserProvider {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserProvider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.githubId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.googleId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.facebookId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.appleId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserProvider {
    return {
      githubId: isSet(object.githubId) ? globalThis.String(object.githubId) : "",
      googleId: isSet(object.googleId) ? globalThis.String(object.googleId) : "",
      facebookId: isSet(object.facebookId) ? globalThis.String(object.facebookId) : "",
      appleId: isSet(object.appleId) ? globalThis.String(object.appleId) : "",
    };
  },

  toJSON(message: UserProvider): unknown {
    const obj: any = {};
    if (message.githubId !== "") {
      obj.githubId = message.githubId;
    }
    if (message.googleId !== "") {
      obj.googleId = message.googleId;
    }
    if (message.facebookId !== "") {
      obj.facebookId = message.facebookId;
    }
    if (message.appleId !== "") {
      obj.appleId = message.appleId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserProvider>, I>>(base?: I): UserProvider {
    return UserProvider.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserProvider>, I>>(object: I): UserProvider {
    const message = createBaseUserProvider();
    message.githubId = object.githubId ?? "";
    message.googleId = object.googleId ?? "";
    message.facebookId = object.facebookId ?? "";
    message.appleId = object.appleId ?? "";
    return message;
  },
};

function createBaseUserMetadata(): UserMetadata {
  return { openPlatform: "", utmCampaign: "", utmMedium: "", utmSource: "" };
}

export const UserMetadata = {
  encode(message: UserMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.openPlatform !== "") {
      writer.uint32(10).string(message.openPlatform);
    }
    if (message.utmCampaign !== "") {
      writer.uint32(18).string(message.utmCampaign);
    }
    if (message.utmMedium !== "") {
      writer.uint32(26).string(message.utmMedium);
    }
    if (message.utmSource !== "") {
      writer.uint32(34).string(message.utmSource);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.openPlatform = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.utmCampaign = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.utmMedium = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.utmSource = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserMetadata {
    return {
      openPlatform: isSet(object.openPlatform) ? globalThis.String(object.openPlatform) : "",
      utmCampaign: isSet(object.utmCampaign) ? globalThis.String(object.utmCampaign) : "",
      utmMedium: isSet(object.utmMedium) ? globalThis.String(object.utmMedium) : "",
      utmSource: isSet(object.utmSource) ? globalThis.String(object.utmSource) : "",
    };
  },

  toJSON(message: UserMetadata): unknown {
    const obj: any = {};
    if (message.openPlatform !== "") {
      obj.openPlatform = message.openPlatform;
    }
    if (message.utmCampaign !== "") {
      obj.utmCampaign = message.utmCampaign;
    }
    if (message.utmMedium !== "") {
      obj.utmMedium = message.utmMedium;
    }
    if (message.utmSource !== "") {
      obj.utmSource = message.utmSource;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserMetadata>, I>>(base?: I): UserMetadata {
    return UserMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserMetadata>, I>>(object: I): UserMetadata {
    const message = createBaseUserMetadata();
    message.openPlatform = object.openPlatform ?? "";
    message.utmCampaign = object.utmCampaign ?? "";
    message.utmMedium = object.utmMedium ?? "";
    message.utmSource = object.utmSource ?? "";
    return message;
  },
};

function createBaseUser(): User {
  return {
    id: "",
    email: "",
    unverifiedEmail: "",
    isEmailVerified: false,
    nickname: "",
    mobile: "",
    birthday: "",
    name: "",
    avatarUrl: "",
    locale: "",
    region: "",
    countryCode: "",
    gender: "",
    salt: "",
    lastLogin: 0,
    isBetaUser: false,
    metadata: undefined,
    provider: undefined,
  };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.unverifiedEmail !== "") {
      writer.uint32(26).string(message.unverifiedEmail);
    }
    if (message.isEmailVerified !== false) {
      writer.uint32(32).bool(message.isEmailVerified);
    }
    if (message.nickname !== "") {
      writer.uint32(42).string(message.nickname);
    }
    if (message.mobile !== "") {
      writer.uint32(50).string(message.mobile);
    }
    if (message.birthday !== "") {
      writer.uint32(58).string(message.birthday);
    }
    if (message.name !== "") {
      writer.uint32(66).string(message.name);
    }
    if (message.avatarUrl !== "") {
      writer.uint32(74).string(message.avatarUrl);
    }
    if (message.locale !== "") {
      writer.uint32(82).string(message.locale);
    }
    if (message.region !== "") {
      writer.uint32(90).string(message.region);
    }
    if (message.countryCode !== "") {
      writer.uint32(98).string(message.countryCode);
    }
    if (message.gender !== "") {
      writer.uint32(106).string(message.gender);
    }
    if (message.salt !== "") {
      writer.uint32(114).string(message.salt);
    }
    if (message.lastLogin !== 0) {
      writer.uint32(120).int64(message.lastLogin);
    }
    if (message.isBetaUser !== false) {
      writer.uint32(128).bool(message.isBetaUser);
    }
    if (message.metadata !== undefined) {
      UserMetadata.encode(message.metadata, writer.uint32(138).fork()).ldelim();
    }
    if (message.provider !== undefined) {
      UserProvider.encode(message.provider, writer.uint32(146).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.unverifiedEmail = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.isEmailVerified = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.nickname = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.mobile = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.birthday = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.name = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.avatarUrl = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.locale = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.region = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.countryCode = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.gender = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.salt = reader.string();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.lastLogin = longToNumber(reader.int64() as Long);
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.isBetaUser = reader.bool();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.metadata = UserMetadata.decode(reader, reader.uint32());
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.provider = UserProvider.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      unverifiedEmail: isSet(object.unverifiedEmail) ? globalThis.String(object.unverifiedEmail) : "",
      isEmailVerified: isSet(object.isEmailVerified) ? globalThis.Boolean(object.isEmailVerified) : false,
      nickname: isSet(object.nickname) ? globalThis.String(object.nickname) : "",
      mobile: isSet(object.mobile) ? globalThis.String(object.mobile) : "",
      birthday: isSet(object.birthday) ? globalThis.String(object.birthday) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      avatarUrl: isSet(object.avatarUrl) ? globalThis.String(object.avatarUrl) : "",
      locale: isSet(object.locale) ? globalThis.String(object.locale) : "",
      region: isSet(object.region) ? globalThis.String(object.region) : "",
      countryCode: isSet(object.countryCode) ? globalThis.String(object.countryCode) : "",
      gender: isSet(object.gender) ? globalThis.String(object.gender) : "",
      salt: isSet(object.salt) ? globalThis.String(object.salt) : "",
      lastLogin: isSet(object.lastLogin) ? globalThis.Number(object.lastLogin) : 0,
      isBetaUser: isSet(object.isBetaUser) ? globalThis.Boolean(object.isBetaUser) : false,
      metadata: isSet(object.metadata) ? UserMetadata.fromJSON(object.metadata) : undefined,
      provider: isSet(object.provider) ? UserProvider.fromJSON(object.provider) : undefined,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.unverifiedEmail !== "") {
      obj.unverifiedEmail = message.unverifiedEmail;
    }
    if (message.isEmailVerified !== false) {
      obj.isEmailVerified = message.isEmailVerified;
    }
    if (message.nickname !== "") {
      obj.nickname = message.nickname;
    }
    if (message.mobile !== "") {
      obj.mobile = message.mobile;
    }
    if (message.birthday !== "") {
      obj.birthday = message.birthday;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.avatarUrl !== "") {
      obj.avatarUrl = message.avatarUrl;
    }
    if (message.locale !== "") {
      obj.locale = message.locale;
    }
    if (message.region !== "") {
      obj.region = message.region;
    }
    if (message.countryCode !== "") {
      obj.countryCode = message.countryCode;
    }
    if (message.gender !== "") {
      obj.gender = message.gender;
    }
    if (message.salt !== "") {
      obj.salt = message.salt;
    }
    if (message.lastLogin !== 0) {
      obj.lastLogin = Math.round(message.lastLogin);
    }
    if (message.isBetaUser !== false) {
      obj.isBetaUser = message.isBetaUser;
    }
    if (message.metadata !== undefined) {
      obj.metadata = UserMetadata.toJSON(message.metadata);
    }
    if (message.provider !== undefined) {
      obj.provider = UserProvider.toJSON(message.provider);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? "";
    message.email = object.email ?? "";
    message.unverifiedEmail = object.unverifiedEmail ?? "";
    message.isEmailVerified = object.isEmailVerified ?? false;
    message.nickname = object.nickname ?? "";
    message.mobile = object.mobile ?? "";
    message.birthday = object.birthday ?? "";
    message.name = object.name ?? "";
    message.avatarUrl = object.avatarUrl ?? "";
    message.locale = object.locale ?? "";
    message.region = object.region ?? "";
    message.countryCode = object.countryCode ?? "";
    message.gender = object.gender ?? "";
    message.salt = object.salt ?? "";
    message.lastLogin = object.lastLogin ?? 0;
    message.isBetaUser = object.isBetaUser ?? false;
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? UserMetadata.fromPartial(object.metadata)
      : undefined;
    message.provider = (object.provider !== undefined && object.provider !== null)
      ? UserProvider.fromPartial(object.provider)
      : undefined;
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