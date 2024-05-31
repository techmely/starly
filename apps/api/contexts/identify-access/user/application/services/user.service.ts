import type {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserServicePort,
} from "@techmely/models";
import type { CreateUserInPort } from "../use-cases/port/create-user.port";
import type { LoginEmailPasswordInPort } from "../use-cases/port/login-email-password.port";
import type { UserMapper } from "../../infras/mappers/user.mapper";

export class UserService implements UserServicePort {
  constructor(
    private readonly mapper: UserMapper,
    private readonly createUserUseCase: CreateUserInPort,
    private readonly loginEmailPasswordUseCase: LoginEmailPasswordInPort,
  ) {}
  register(request: CreateUserRequest): Promise<CreateUserResponse> {
    const user = this.createUserUseCase.execute(request);
    return this.mapper.toDomain(user);
  }
  get(request: GetUserRequest): Promise<GetUserResponse> {
    throw new Error("Method not implemented.");
  }
  getAll(request: GetUsersRequest): Promise<GetUsersResponse> {
    throw new Error("Method not implemented.");
  }
  update(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    throw new Error("Method not implemented.");
  }
  delete(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    throw new Error("Method not implemented.");
  }

  loginEmailPassword(body) {
    return this.loginEmailPasswordUseCase.execute(body);
  }
}
