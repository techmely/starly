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
} from "@techmely/models";
import type { UserMapper } from "../../infras/mappers/user.mapper";
import type { CreateUserInPort } from "../use-cases/port/create-user.port";
import type { FindUserByAuthIdInPort } from "../use-cases/port/find-user-by-auth-id.port";
import type { FindUserByKeyInPort } from "../use-cases/port/find-user-by-key";

export class UserService implements UserServicePort {
  constructor(
    private readonly mapper: UserMapper,
    private readonly createUserUseCase: CreateUserInPort,
    private readonly findUserByAuthId: FindUserByAuthIdInPort,
    private readonly findUserByKey: FindUserByKeyInPort,
  ) {}
  async Create(request: CreateUserRequest): Promise<UserModel> {
    const entity = await this.createUserUseCase.execute(request);
    const model = this.mapper.toPersistence(entity);
    return model;
  }
  async Get(request: GetUserRequest): Promise<UserModel> {
    const entity = await this.findUserByKey.execute(request);
    const model = this.mapper.toPersistence(entity);
    return model;
  }
  async GetByAuthId(request: GetUserByAuthIdRequest): Promise<UserModel> {
    const entity = await this.findUserByAuthId.execute(request);
    const model = this.mapper.toPersistence(entity);
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
