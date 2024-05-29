// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: user/v1/user.service.proto

package userv1connect

import (
	connect "connectrpc.com/connect"
	context "context"
	errors "errors"
	v1 "github.com/techmely/models/user/v1"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect.IsAtLeastVersion1_13_0

const (
	// UserServiceName is the fully-qualified name of the UserService service.
	UserServiceName = "gen.go.user.v1.UserService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// UserServiceRegisterProcedure is the fully-qualified name of the UserService's Register RPC.
	UserServiceRegisterProcedure = "/gen.go.user.v1.UserService/Register"
	// UserServiceGetProcedure is the fully-qualified name of the UserService's Get RPC.
	UserServiceGetProcedure = "/gen.go.user.v1.UserService/Get"
	// UserServiceGetAllProcedure is the fully-qualified name of the UserService's GetAll RPC.
	UserServiceGetAllProcedure = "/gen.go.user.v1.UserService/GetAll"
	// UserServiceUpdateProcedure is the fully-qualified name of the UserService's Update RPC.
	UserServiceUpdateProcedure = "/gen.go.user.v1.UserService/Update"
	// UserServiceChangeEmailProcedure is the fully-qualified name of the UserService's ChangeEmail RPC.
	UserServiceChangeEmailProcedure = "/gen.go.user.v1.UserService/ChangeEmail"
	// UserServiceDeleteProcedure is the fully-qualified name of the UserService's Delete RPC.
	UserServiceDeleteProcedure = "/gen.go.user.v1.UserService/Delete"
)

// These variables are the protoreflect.Descriptor objects for the RPCs defined in this package.
var (
	userServiceServiceDescriptor           = v1.File_user_v1_user_service_proto.Services().ByName("UserService")
	userServiceRegisterMethodDescriptor    = userServiceServiceDescriptor.Methods().ByName("Register")
	userServiceGetMethodDescriptor         = userServiceServiceDescriptor.Methods().ByName("Get")
	userServiceGetAllMethodDescriptor      = userServiceServiceDescriptor.Methods().ByName("GetAll")
	userServiceUpdateMethodDescriptor      = userServiceServiceDescriptor.Methods().ByName("Update")
	userServiceChangeEmailMethodDescriptor = userServiceServiceDescriptor.Methods().ByName("ChangeEmail")
	userServiceDeleteMethodDescriptor      = userServiceServiceDescriptor.Methods().ByName("Delete")
)

// UserServiceClient is a client for the gen.go.user.v1.UserService service.
type UserServiceClient interface {
	Register(context.Context, *connect.Request[v1.CreateUserRequest]) (*connect.Response[v1.CreateUserResponse], error)
	Get(context.Context, *connect.Request[v1.GetUserRequest]) (*connect.Response[v1.GetUserResponse], error)
	GetAll(context.Context, *connect.Request[v1.GetUsersRequest]) (*connect.Response[v1.GetUsersResponse], error)
	Update(context.Context, *connect.Request[v1.UpdateUserRequest]) (*connect.Response[v1.UpdateUserResponse], error)
	ChangeEmail(context.Context, *connect.Request[v1.ChangeUserEmailRequest]) (*connect.Response[v1.ChangeUserEmailResponse], error)
	Delete(context.Context, *connect.Request[v1.DeleteUserRequest]) (*connect.Response[v1.DeleteUserResponse], error)
}

// NewUserServiceClient constructs a client for the gen.go.user.v1.UserService service. By default,
// it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses, and
// sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the connect.WithGRPC()
// or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewUserServiceClient(httpClient connect.HTTPClient, baseURL string, opts ...connect.ClientOption) UserServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &userServiceClient{
		register: connect.NewClient[v1.CreateUserRequest, v1.CreateUserResponse](
			httpClient,
			baseURL+UserServiceRegisterProcedure,
			connect.WithSchema(userServiceRegisterMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		get: connect.NewClient[v1.GetUserRequest, v1.GetUserResponse](
			httpClient,
			baseURL+UserServiceGetProcedure,
			connect.WithSchema(userServiceGetMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		getAll: connect.NewClient[v1.GetUsersRequest, v1.GetUsersResponse](
			httpClient,
			baseURL+UserServiceGetAllProcedure,
			connect.WithSchema(userServiceGetAllMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		update: connect.NewClient[v1.UpdateUserRequest, v1.UpdateUserResponse](
			httpClient,
			baseURL+UserServiceUpdateProcedure,
			connect.WithSchema(userServiceUpdateMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		changeEmail: connect.NewClient[v1.ChangeUserEmailRequest, v1.ChangeUserEmailResponse](
			httpClient,
			baseURL+UserServiceChangeEmailProcedure,
			connect.WithSchema(userServiceChangeEmailMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
		delete: connect.NewClient[v1.DeleteUserRequest, v1.DeleteUserResponse](
			httpClient,
			baseURL+UserServiceDeleteProcedure,
			connect.WithSchema(userServiceDeleteMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
	}
}

// userServiceClient implements UserServiceClient.
type userServiceClient struct {
	register    *connect.Client[v1.CreateUserRequest, v1.CreateUserResponse]
	get         *connect.Client[v1.GetUserRequest, v1.GetUserResponse]
	getAll      *connect.Client[v1.GetUsersRequest, v1.GetUsersResponse]
	update      *connect.Client[v1.UpdateUserRequest, v1.UpdateUserResponse]
	changeEmail *connect.Client[v1.ChangeUserEmailRequest, v1.ChangeUserEmailResponse]
	delete      *connect.Client[v1.DeleteUserRequest, v1.DeleteUserResponse]
}

// Register calls gen.go.user.v1.UserService.Register.
func (c *userServiceClient) Register(ctx context.Context, req *connect.Request[v1.CreateUserRequest]) (*connect.Response[v1.CreateUserResponse], error) {
	return c.register.CallUnary(ctx, req)
}

// Get calls gen.go.user.v1.UserService.Get.
func (c *userServiceClient) Get(ctx context.Context, req *connect.Request[v1.GetUserRequest]) (*connect.Response[v1.GetUserResponse], error) {
	return c.get.CallUnary(ctx, req)
}

// GetAll calls gen.go.user.v1.UserService.GetAll.
func (c *userServiceClient) GetAll(ctx context.Context, req *connect.Request[v1.GetUsersRequest]) (*connect.Response[v1.GetUsersResponse], error) {
	return c.getAll.CallUnary(ctx, req)
}

// Update calls gen.go.user.v1.UserService.Update.
func (c *userServiceClient) Update(ctx context.Context, req *connect.Request[v1.UpdateUserRequest]) (*connect.Response[v1.UpdateUserResponse], error) {
	return c.update.CallUnary(ctx, req)
}

// ChangeEmail calls gen.go.user.v1.UserService.ChangeEmail.
func (c *userServiceClient) ChangeEmail(ctx context.Context, req *connect.Request[v1.ChangeUserEmailRequest]) (*connect.Response[v1.ChangeUserEmailResponse], error) {
	return c.changeEmail.CallUnary(ctx, req)
}

// Delete calls gen.go.user.v1.UserService.Delete.
func (c *userServiceClient) Delete(ctx context.Context, req *connect.Request[v1.DeleteUserRequest]) (*connect.Response[v1.DeleteUserResponse], error) {
	return c.delete.CallUnary(ctx, req)
}

// UserServiceHandler is an implementation of the gen.go.user.v1.UserService service.
type UserServiceHandler interface {
	Register(context.Context, *connect.Request[v1.CreateUserRequest]) (*connect.Response[v1.CreateUserResponse], error)
	Get(context.Context, *connect.Request[v1.GetUserRequest]) (*connect.Response[v1.GetUserResponse], error)
	GetAll(context.Context, *connect.Request[v1.GetUsersRequest]) (*connect.Response[v1.GetUsersResponse], error)
	Update(context.Context, *connect.Request[v1.UpdateUserRequest]) (*connect.Response[v1.UpdateUserResponse], error)
	ChangeEmail(context.Context, *connect.Request[v1.ChangeUserEmailRequest]) (*connect.Response[v1.ChangeUserEmailResponse], error)
	Delete(context.Context, *connect.Request[v1.DeleteUserRequest]) (*connect.Response[v1.DeleteUserResponse], error)
}

// NewUserServiceHandler builds an HTTP handler from the service implementation. It returns the path
// on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewUserServiceHandler(svc UserServiceHandler, opts ...connect.HandlerOption) (string, http.Handler) {
	userServiceRegisterHandler := connect.NewUnaryHandler(
		UserServiceRegisterProcedure,
		svc.Register,
		connect.WithSchema(userServiceRegisterMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	userServiceGetHandler := connect.NewUnaryHandler(
		UserServiceGetProcedure,
		svc.Get,
		connect.WithSchema(userServiceGetMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	userServiceGetAllHandler := connect.NewUnaryHandler(
		UserServiceGetAllProcedure,
		svc.GetAll,
		connect.WithSchema(userServiceGetAllMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	userServiceUpdateHandler := connect.NewUnaryHandler(
		UserServiceUpdateProcedure,
		svc.Update,
		connect.WithSchema(userServiceUpdateMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	userServiceChangeEmailHandler := connect.NewUnaryHandler(
		UserServiceChangeEmailProcedure,
		svc.ChangeEmail,
		connect.WithSchema(userServiceChangeEmailMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	userServiceDeleteHandler := connect.NewUnaryHandler(
		UserServiceDeleteProcedure,
		svc.Delete,
		connect.WithSchema(userServiceDeleteMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	return "/gen.go.user.v1.UserService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case UserServiceRegisterProcedure:
			userServiceRegisterHandler.ServeHTTP(w, r)
		case UserServiceGetProcedure:
			userServiceGetHandler.ServeHTTP(w, r)
		case UserServiceGetAllProcedure:
			userServiceGetAllHandler.ServeHTTP(w, r)
		case UserServiceUpdateProcedure:
			userServiceUpdateHandler.ServeHTTP(w, r)
		case UserServiceChangeEmailProcedure:
			userServiceChangeEmailHandler.ServeHTTP(w, r)
		case UserServiceDeleteProcedure:
			userServiceDeleteHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedUserServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedUserServiceHandler struct{}

func (UnimplementedUserServiceHandler) Register(context.Context, *connect.Request[v1.CreateUserRequest]) (*connect.Response[v1.CreateUserResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("gen.go.user.v1.UserService.Register is not implemented"))
}

func (UnimplementedUserServiceHandler) Get(context.Context, *connect.Request[v1.GetUserRequest]) (*connect.Response[v1.GetUserResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("gen.go.user.v1.UserService.Get is not implemented"))
}

func (UnimplementedUserServiceHandler) GetAll(context.Context, *connect.Request[v1.GetUsersRequest]) (*connect.Response[v1.GetUsersResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("gen.go.user.v1.UserService.GetAll is not implemented"))
}

func (UnimplementedUserServiceHandler) Update(context.Context, *connect.Request[v1.UpdateUserRequest]) (*connect.Response[v1.UpdateUserResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("gen.go.user.v1.UserService.Update is not implemented"))
}

func (UnimplementedUserServiceHandler) ChangeEmail(context.Context, *connect.Request[v1.ChangeUserEmailRequest]) (*connect.Response[v1.ChangeUserEmailResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("gen.go.user.v1.UserService.ChangeEmail is not implemented"))
}

func (UnimplementedUserServiceHandler) Delete(context.Context, *connect.Request[v1.DeleteUserRequest]) (*connect.Response[v1.DeleteUserResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("gen.go.user.v1.UserService.Delete is not implemented"))
}
