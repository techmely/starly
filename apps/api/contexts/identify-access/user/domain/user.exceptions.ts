import { ExceptionBase, HTTP_NOT_FOUND, HTTP_UNAUTHORIZED } from "@techmely/http";
import type { Records } from "@techmely/types";

const EMAIL_NOT_FOUND = "USER.EMAIL_NOT_FOUND";
const USERNAME_NOT_FOUND = "USER.USERNAME_NOT_FOUND";
const USERNAME_IS_NOT_ADMIN = "USER.USERNAME_IS_NOT_ADMIN";
const USERNAME_UNAUTHORIZED = "USER.UNAUTHORIZED";

export class UserEmailDoNotExistException extends ExceptionBase {
  constructor(message = "User email not found", metadata?: Records) {
    super(message, HTTP_NOT_FOUND, EMAIL_NOT_FOUND, metadata);
  }
}

export class UserNameDoNotExistException extends ExceptionBase {
  constructor(message = "User name not found", metadata?: Records) {
    super(message, HTTP_NOT_FOUND, USERNAME_NOT_FOUND, metadata);
  }
}

export class UserUnauthorizedException extends ExceptionBase {
  constructor(message = "Unauthorized user", metadata?: Records) {
    super(message, HTTP_UNAUTHORIZED, USERNAME_UNAUTHORIZED, metadata);
  }
}

export class UserIsNotAdminException extends ExceptionBase {
  constructor(message = "You are not an admin", metadata?: Records) {
    super(message, HTTP_UNAUTHORIZED, USERNAME_IS_NOT_ADMIN, metadata);
  }
}
