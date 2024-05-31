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

import 'account.event.pb.dart' as $0;
import 'account.service.pbjson.dart';

export 'account.service.pb.dart';

abstract class AccountServicePortServiceBase extends $pb.GeneratedService {
  $async.Future<$0.LoginResponse> login($pb.ServerContext ctx, $0.LoginRequest request);
  $async.Future<$0.RegisterResponse> register($pb.ServerContext ctx, $0.RegisterRequest request);
  $async.Future<$0.LogoutResponse> logout($pb.ServerContext ctx, $0.LogoutRequest request);
  $async.Future<$0.ResendVerificationCodeResponse> resendVerificationCode($pb.ServerContext ctx, $0.ResendVerificationCodeRequest request);
  $async.Future<$0.UpdatePasswordResponse> updatePassword($pb.ServerContext ctx, $0.UpdatePasswordRequest request);
  $async.Future<$0.UpdateEmailResponse> updateEmail($pb.ServerContext ctx, $0.UpdateEmailRequest request);
  $async.Future<$0.VerifyAccountResponse> verifyAccount($pb.ServerContext ctx, $0.VerifyAccountRequest request);
  $async.Future<$0.VerifyActivationLinkResponse> verifyActivationLink($pb.ServerContext ctx, $0.VerifyActivationLinkRequest request);
  $async.Future<$0.ForgotPasswordResponse> forgotPassword($pb.ServerContext ctx, $0.ForgotPasswordRequest request);

  $pb.GeneratedMessage createRequest($core.String methodName) {
    switch (methodName) {
      case 'login': return $0.LoginRequest();
      case 'register': return $0.RegisterRequest();
      case 'logout': return $0.LogoutRequest();
      case 'resendVerificationCode': return $0.ResendVerificationCodeRequest();
      case 'updatePassword': return $0.UpdatePasswordRequest();
      case 'updateEmail': return $0.UpdateEmailRequest();
      case 'verifyAccount': return $0.VerifyAccountRequest();
      case 'verifyActivationLink': return $0.VerifyActivationLinkRequest();
      case 'forgotPassword': return $0.ForgotPasswordRequest();
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $async.Future<$pb.GeneratedMessage> handleCall($pb.ServerContext ctx, $core.String methodName, $pb.GeneratedMessage request) {
    switch (methodName) {
      case 'login': return this.login(ctx, request as $0.LoginRequest);
      case 'register': return this.register(ctx, request as $0.RegisterRequest);
      case 'logout': return this.logout(ctx, request as $0.LogoutRequest);
      case 'resendVerificationCode': return this.resendVerificationCode(ctx, request as $0.ResendVerificationCodeRequest);
      case 'updatePassword': return this.updatePassword(ctx, request as $0.UpdatePasswordRequest);
      case 'updateEmail': return this.updateEmail(ctx, request as $0.UpdateEmailRequest);
      case 'verifyAccount': return this.verifyAccount(ctx, request as $0.VerifyAccountRequest);
      case 'verifyActivationLink': return this.verifyActivationLink(ctx, request as $0.VerifyActivationLinkRequest);
      case 'forgotPassword': return this.forgotPassword(ctx, request as $0.ForgotPasswordRequest);
      default: throw $core.ArgumentError('Unknown method: $methodName');
    }
  }

  $core.Map<$core.String, $core.dynamic> get $json => AccountServicePortServiceBase$json;
  $core.Map<$core.String, $core.Map<$core.String, $core.dynamic>> get $messageJson => AccountServicePortServiceBase$messageJson;
}

