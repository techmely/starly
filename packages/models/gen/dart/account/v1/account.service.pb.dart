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

import '../../google/protobuf/empty.pb.dart' as $1;
import 'account.event.pb.dart' as $0;

class AccountServicePortApi {
  $pb.RpcClient _client;
  AccountServicePortApi(this._client);

  $async.Future<$0.LoginResponse> login($pb.ClientContext? ctx, $0.LoginRequest request) =>
    _client.invoke<$0.LoginResponse>(ctx, 'AccountServicePort', 'login', request, $0.LoginResponse())
  ;
  $async.Future<$1.Empty> loginWithProvider($pb.ClientContext? ctx, $0.LoginWithProviderRequest request) =>
    _client.invoke<$1.Empty>(ctx, 'AccountServicePort', 'loginWithProvider', request, $1.Empty())
  ;
  $async.Future<$0.RegisterResponse> register($pb.ClientContext? ctx, $0.RegisterRequest request) =>
    _client.invoke<$0.RegisterResponse>(ctx, 'AccountServicePort', 'register', request, $0.RegisterResponse())
  ;
  $async.Future<$0.LogoutResponse> logout($pb.ClientContext? ctx, $0.LogoutRequest request) =>
    _client.invoke<$0.LogoutResponse>(ctx, 'AccountServicePort', 'logout', request, $0.LogoutResponse())
  ;
  $async.Future<$0.ResendVerificationCodeResponse> resendVerificationCode($pb.ClientContext? ctx, $0.ResendVerificationCodeRequest request) =>
    _client.invoke<$0.ResendVerificationCodeResponse>(ctx, 'AccountServicePort', 'resendVerificationCode', request, $0.ResendVerificationCodeResponse())
  ;
  $async.Future<$0.UpdatePasswordResponse> updatePassword($pb.ClientContext? ctx, $0.UpdatePasswordRequest request) =>
    _client.invoke<$0.UpdatePasswordResponse>(ctx, 'AccountServicePort', 'updatePassword', request, $0.UpdatePasswordResponse())
  ;
  $async.Future<$0.UpdateEmailResponse> updateEmail($pb.ClientContext? ctx, $0.UpdateEmailRequest request) =>
    _client.invoke<$0.UpdateEmailResponse>(ctx, 'AccountServicePort', 'updateEmail', request, $0.UpdateEmailResponse())
  ;
  $async.Future<$0.VerifyAccountResponse> verifyAccount($pb.ClientContext? ctx, $0.VerifyAccountRequest request) =>
    _client.invoke<$0.VerifyAccountResponse>(ctx, 'AccountServicePort', 'verifyAccount', request, $0.VerifyAccountResponse())
  ;
  $async.Future<$0.VerifyActivationLinkResponse> verifyActivationLink($pb.ClientContext? ctx, $0.VerifyActivationLinkRequest request) =>
    _client.invoke<$0.VerifyActivationLinkResponse>(ctx, 'AccountServicePort', 'verifyActivationLink', request, $0.VerifyActivationLinkResponse())
  ;
  $async.Future<$0.ForgotPasswordResponse> forgotPassword($pb.ClientContext? ctx, $0.ForgotPasswordRequest request) =>
    _client.invoke<$0.ForgotPasswordResponse>(ctx, 'AccountServicePort', 'forgotPassword', request, $0.ForgotPasswordResponse())
  ;
}

