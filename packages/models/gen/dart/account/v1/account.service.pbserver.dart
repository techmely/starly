//
//  Generated code. Do not modify.
//  source: account/v1/account.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import '../firebase.model.pb.dart' as $1;
import 'account.event.pb.dart' as $0;
import 'account.service.pbjson.dart';

export 'account.service.pb.dart';

abstract class AccountServicePortServiceBase extends $pb.GeneratedService {
  $async.Future<$1.AuthGoogleIdentityResponse> signIn($pb.ServerContext ctx, $0.SignInRequest request);
  $async.Future<$1.AuthGoogleIdentityResponse> signInWithProvider($pb.ServerContext ctx, $0.SignInWithProviderRequest request);
  $async.Future<$1.AuthGoogleIdentityResponse> signUp($pb.ServerContext ctx, $0.SignUpRequest request);
  $async.Future<$0.SignOutResponse> signOut($pb.ServerContext ctx, $0.SignOutRequest request);
  $async.Future<$0.ResendVerificationCodeResponse> resendVerificationCode($pb.ServerContext ctx, $0.ResendVerificationCodeRequest request);
  $async.Future<$0.UpdatePasswordResponse> updatePassword($pb.ServerContext ctx, $0.UpdatePasswordRequest request);
  $async.Future<$0.UpdateEmailResponse> updateEmail($pb.ServerContext ctx, $0.UpdateEmailRequest request);
  $async.Future<$0.VerifyAccountResponse> verifyAccount($pb.ServerContext ctx, $0.VerifyAccountRequest request);
  $async.Future<$0.VerifyActivationLinkResponse> verifyActivationLink($pb.ServerContext ctx, $0.VerifyActivationLinkRequest request);
  $async.Future<$0.ForgotPasswordResponse> forgotPassword($pb.ServerContext ctx, $0.ForgotPasswordRequest request);

  $pb.GeneratedMessage createRequest($core.String methodName) {
    switch (methodName) {
      case 'SignIn': return $0.SignInRequest();
      case 'SignInWithProvider': return $0.SignInWithProviderRequest();
      case 'SignUp': return $0.SignUpRequest();
      case 'SignOut': return $0.SignOutRequest();
      case 'ResendVerificationCode': return $0.ResendVerificationCodeRequest();
      case 'UpdatePassword': return $0.UpdatePasswordRequest();
      case 'UpdateEmail': return $0.UpdateEmailRequest();
      case 'VerifyAccount': return $0.VerifyAccountRequest();
      case 'VerifyActivationLink': return $0.VerifyActivationLinkRequest();
      case 'ForgotPassword': return $0.ForgotPasswordRequest();
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $async.Future<$pb.GeneratedMessage> handleCall($pb.ServerContext ctx, $core.String methodName, $pb.GeneratedMessage request) {
    switch (methodName) {
      case 'SignIn': return this.signIn(ctx, request as $0.SignInRequest);
      case 'SignInWithProvider': return this.signInWithProvider(ctx, request as $0.SignInWithProviderRequest);
      case 'SignUp': return this.signUp(ctx, request as $0.SignUpRequest);
      case 'SignOut': return this.signOut(ctx, request as $0.SignOutRequest);
      case 'ResendVerificationCode': return this.resendVerificationCode(ctx, request as $0.ResendVerificationCodeRequest);
      case 'UpdatePassword': return this.updatePassword(ctx, request as $0.UpdatePasswordRequest);
      case 'UpdateEmail': return this.updateEmail(ctx, request as $0.UpdateEmailRequest);
      case 'VerifyAccount': return this.verifyAccount(ctx, request as $0.VerifyAccountRequest);
      case 'VerifyActivationLink': return this.verifyActivationLink(ctx, request as $0.VerifyActivationLinkRequest);
      case 'ForgotPassword': return this.forgotPassword(ctx, request as $0.ForgotPasswordRequest);
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $core.Map<$core.String, $core.dynamic> get $json => AccountServicePortServiceBase$json;
  $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> get $messageJson => AccountServicePortServiceBase$messageJson;
}

