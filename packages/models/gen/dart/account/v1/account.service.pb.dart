//
//  Generated code. Do not modify.
//  source: account/v1/account.service.proto
//
// @dart = 2.12

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_final_fields
// ignore_for_file: unnecessary_import, unnecessary_this, unused_import

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

import '../firebase.model.pb.dart' as $1;
import 'account.event.pb.dart' as $0;

class AccountServicePortApi {
  $pb.RpcClient _client;
  AccountServicePortApi(this._client);

  $async.Future<$1.AuthGoogleIdentityResponse> signIn($pb.ClientContext? ctx, $0.SignInRequest request) =>
    _client.invoke<$1.AuthGoogleIdentityResponse>(ctx, 'AccountServicePort', 'SignIn', request, $1.AuthGoogleIdentityResponse())
  ;
  $async.Future<$1.AuthGoogleIdentityResponse> signInWithProvider($pb.ClientContext? ctx, $0.SignInWithProviderRequest request) =>
    _client.invoke<$1.AuthGoogleIdentityResponse>(ctx, 'AccountServicePort', 'SignInWithProvider', request, $1.AuthGoogleIdentityResponse())
  ;
  $async.Future<$1.AuthGoogleIdentityResponse> signUp($pb.ClientContext? ctx, $0.SignUpRequest request) =>
    _client.invoke<$1.AuthGoogleIdentityResponse>(ctx, 'AccountServicePort', 'SignUp', request, $1.AuthGoogleIdentityResponse())
  ;
  $async.Future<$0.SignOutResponse> signOut($pb.ClientContext? ctx, $0.SignOutRequest request) =>
    _client.invoke<$0.SignOutResponse>(ctx, 'AccountServicePort', 'SignOut', request, $0.SignOutResponse())
  ;
  $async.Future<$0.ResendVerificationCodeResponse> resendVerificationCode($pb.ClientContext? ctx, $0.ResendVerificationCodeRequest request) =>
    _client.invoke<$0.ResendVerificationCodeResponse>(ctx, 'AccountServicePort', 'ResendVerificationCode', request, $0.ResendVerificationCodeResponse())
  ;
  $async.Future<$0.UpdatePasswordResponse> updatePassword($pb.ClientContext? ctx, $0.UpdatePasswordRequest request) =>
    _client.invoke<$0.UpdatePasswordResponse>(ctx, 'AccountServicePort', 'UpdatePassword', request, $0.UpdatePasswordResponse())
  ;
  $async.Future<$0.UpdateEmailResponse> updateEmail($pb.ClientContext? ctx, $0.UpdateEmailRequest request) =>
    _client.invoke<$0.UpdateEmailResponse>(ctx, 'AccountServicePort', 'UpdateEmail', request, $0.UpdateEmailResponse())
  ;
  $async.Future<$0.VerifyAccountResponse> verifyAccount($pb.ClientContext? ctx, $0.VerifyAccountRequest request) =>
    _client.invoke<$0.VerifyAccountResponse>(ctx, 'AccountServicePort', 'VerifyAccount', request, $0.VerifyAccountResponse())
  ;
  $async.Future<$0.VerifyActivationLinkResponse> verifyActivationLink($pb.ClientContext? ctx, $0.VerifyActivationLinkRequest request) =>
    _client.invoke<$0.VerifyActivationLinkResponse>(ctx, 'AccountServicePort', 'VerifyActivationLink', request, $0.VerifyActivationLinkResponse())
  ;
  $async.Future<$0.ForgotPasswordResponse> forgotPassword($pb.ClientContext? ctx, $0.ForgotPasswordRequest request) =>
    _client.invoke<$0.ForgotPasswordResponse>(ctx, 'AccountServicePort', 'ForgotPassword', request, $0.ForgotPasswordResponse())
  ;
}

