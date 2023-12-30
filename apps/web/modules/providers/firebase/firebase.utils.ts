const DEFAULT_ERROR_MSG = "An error occurred, please try again later";

const firebaseErrorMap: Record<string, string> = {
  "auth/wrong-password": "Wrong password",
  "auth/too-many-requests":
    "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later",
  "auth/email-already-in-use": "Email already in use",
};

export function mapFirebaseErrMsg(errorCode: string) {
  const errorMessage = firebaseErrorMap[errorCode];
  return errorMessage || DEFAULT_ERROR_MSG;
}
