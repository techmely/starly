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
} from "@techmely/models";
import type { UserMapper } from "../../infras/mappers/user.mapper";
import type { CreateUserInPort } from "../use-cases/port/create-user.port";

export class UserService implements UserServicePort {
  constructor(
    private readonly mapper: UserMapper,
    private readonly createUserUseCase: CreateUserInPort,
  ) {}
  async Create(request: CreateUserRequest): Promise<UserModel> {
    const entity = await this.createUserUseCase.execute(request);
    const model = this.mapper.toPersistence(entity);
    return model;
  }
  Get(request: GetUserRequest): Promise<UserModel> {
    throw new Error("Method not implemented.");
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
