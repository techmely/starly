import { invariant } from "@techmely/utils/invariant";

export function getNicknameFromEmail(email: string | null) {
  invariant(email, "Must provider email");
  return email.split("@")[0];
}
