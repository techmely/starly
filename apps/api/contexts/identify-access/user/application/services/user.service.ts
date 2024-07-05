import type {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  GetUsersPaginationRequest,
  GetUsersPaginationResponse,
  UpdateUserRequest,
  UserModel,
  UserServicePort,
  BoolValue,
  GetUserByAuthIdRequest,
} from "@techmely/starly-models";
import type { CreateUserInPort } from "../use-cases/port/create-user.port";
import type { FindUserByAuthIdInPort } from "../use-cases/port/find-user-by-auth-id.port";
import type { FindUserByKeyInPort } from "../use-cases/port/find-user-by-key";

export class UserService implements UserServicePort {
  constructor(
    private readonly createUserUseCase: CreateUserInPort,
    private readonly findUserByAuthId: FindUserByAuthIdInPort,
    private readonly findUserByKey: FindUserByKeyInPort,
  ) {}
  async Create(request: CreateUserRequest): Promise<UserModel> {
    const model = await this.createUserUseCase.execute(request);
    return model;
  }
  async Get(request: GetUserRequest): Promise<UserModel> {
    const model = await this.findUserByKey.execute(request);
    return model;
  }
  async GetByAuthId(request: GetUserByAuthIdRequest): Promise<UserModel> {
    const model = await this.findUserByAuthId.execute(request);
    return model;
  }
  GetPagination(request: GetUsersPaginationRequest): Promise<GetUsersPaginationResponse> {
    throw new Error("Method not implemented.");
  }
  Update(request: UpdateUserRequest): Promise<UserModel> {
    throw new Error("Method not implemented.");
  }
  Delete(request: DeleteUserRequest): Promise<BoolValue> {
    return Promise.resolve({ value: true });
  }
}
