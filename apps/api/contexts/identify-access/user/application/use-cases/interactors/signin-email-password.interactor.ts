import type {
  AuthGoogleIdentifyOutPort,
  SignInEmailPasswordCommand,
  SignInEmailPasswordInPort,
} from "../port/signin-email-password.port";

export class SignInEmailPasswordInteractor implements SignInEmailPasswordInPort {
  constructor(private readonly authGoogleIdentify: AuthGoogleIdentifyOutPort) {}

  async execute({ config, email, password, options }: SignInEmailPasswordCommand) {
    const signInEmailPassword = await this.authGoogleIdentify.signInEmailPassword({
      config,
      options,
    });
    const response = await signInEmailPassword({ email, password });
    return response;
  }
}
