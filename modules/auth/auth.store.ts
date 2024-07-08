import { UserStatus } from "@techmely/starly-models";
import { authUtmParams } from "./auth.const";
import type { AuthState, SignInOptions, SignInOutput } from "./auth.types";
import { signInWithFacebook, signInWithGithub, signInWithGoogle } from "./auth.utils";

const initialAuthStore: AuthState = {
  accessToken: undefined,
  providerErrorMsg: undefined,
  user: undefined,
  isLoading: false,
};

async function signInWithProvider(options: SignInOptions) {
  const parser = await getAgentParser();
  const agentBrowser = parser?.getBrowser();

  // set({
  //   providerErrorMsg: undefined,
  //   isLoading: true,
  // });
  let output: SignInOutput;

  switch (options.provider) {
    case "google":
      output = await signInWithGoogle(options);
      break;
    case "github":
      output = await signInWithGithub(options);
      break;
    case "facebook":
      output = await signInWithFacebook(options);
      break;
    default:
      throw new Error("Not match provider");
  }

  if (typeof output === "string") {
    // set({ providerErrorMsg: output, isLoading: false });
  } else {
    const user = output.user;
    const newUser = {
      avatarUrl: user?.photoURL || "",
      email: user?.email || "",
      gender: "UNKNOWN",
      locale: options.locale,
      status: UserStatus.ACTIVE,
      name: user?.displayName || "",
      isEmailVerified: user?.emailVerified,
      nickname: user?.email,
      openPlatform: `${parser?.getOS().name} ${agentBrowser?.name} ${agentBrowser?.version}`,
      firebaseUserId: user?.uid,
      googleId: user.providerData[0]?.providerId.includes("google")
        ? user.providerData[0]?.uid
        : undefined,
      facebookId: user.providerData[0]?.providerId.includes("facebook")
        ? user.providerData[0]?.uid
        : undefined,
      appleId: user.providerData[0]?.providerId.includes("apple")
        ? user.providerData[0]?.uid
        : undefined,
      githubId: user.providerData[0]?.providerId.includes("github")
        ? user.providerData[0]?.uid
        : undefined,
      ...authUtmParams[options.provider],
    };
    try {
      const res = await fetch("/api/v1/auth", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
