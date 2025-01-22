/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../../controllers/userCookie.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateUserName } from './../../controllers/updateAndLogout.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeviceInfoController } from './../../controllers/device-info.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GoogleAuthController } from './../../controllers/authGoogle.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CognitoController } from './../../controllers/authEmail.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminController } from './../../controllers/adminOption.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminOptionController } from './../../controllers/adminOption.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Location": {
        "dataType": "refObject",
        "properties": {
            "region": {"dataType":"string","required":true},
            "capital": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeviceInfo": {
        "dataType": "refObject",
        "properties": {
            "my_os": {"dataType":"string","required":true},
            "my_pub_ip": {"dataType":"string","required":true},
            "deviceDetails": {"dataType":"object","required":true},
            "os": {"dataType":"string","required":true},
            "browser": {"dataType":"string","required":true},
            "userAgent": {"dataType":"string","required":true},
            "currentDateTime": {"dataType":"string","required":true},
            "location": {"ref":"Location"},
            "googleMapsLink": {"dataType":"string","required":true},
            "get_network_org": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LocationUser": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "lat": {"dataType":"double","required":true},
            "lng": {"dataType":"double","required":true},
            "googleMapsLink": {"dataType":"string","required":true},
            "dev_info": {"ref":"DeviceInfo","required":true},
            "createdAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignUpRequest": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "profile": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignInRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConfirmSignUpRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "confirmationCode": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_getMe: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/v1/auth/me',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getMe)),

            async function UserController_getMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getMe, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUpdateUserName_updateUsername: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"newUsername":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
        };
        app.put('/v1/auth/updateUsername',
            ...(fetchMiddlewares<RequestHandler>(UpdateUserName)),
            ...(fetchMiddlewares<RequestHandler>(UpdateUserName.prototype.updateUsername)),

            async function UpdateUserName_updateUsername(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUpdateUserName_updateUsername, request, response });

                const controller = new UpdateUserName();

              await templateService.apiHandler({
                methodName: 'updateUsername',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUpdateUserName_unifiedLogout: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.put('/v1/auth/logout',
            ...(fetchMiddlewares<RequestHandler>(UpdateUserName)),
            ...(fetchMiddlewares<RequestHandler>(UpdateUserName.prototype.unifiedLogout)),

            async function UpdateUserName_unifiedLogout(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUpdateUserName_unifiedLogout, request, response });

                const controller = new UpdateUserName();

              await templateService.apiHandler({
                methodName: 'unifiedLogout',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDeviceInfoController_getDeviceInfo: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/v1/auth/device-info',
            ...(fetchMiddlewares<RequestHandler>(DeviceInfoController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceInfoController.prototype.getDeviceInfo)),

            async function DeviceInfoController_getDeviceInfo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDeviceInfoController_getDeviceInfo, request, response });

                const controller = new DeviceInfoController();

              await templateService.apiHandler({
                methodName: 'getDeviceInfo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDeviceInfoController_sendLocation: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true},"lng":{"dataType":"double","required":true},"lat":{"dataType":"double","required":true}}},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.post('/v1/auth/api/send-location',
            ...(fetchMiddlewares<RequestHandler>(DeviceInfoController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceInfoController.prototype.sendLocation)),

            async function DeviceInfoController_sendLocation(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDeviceInfoController_sendLocation, request, response });

                const controller = new DeviceInfoController();

              await templateService.apiHandler({
                methodName: 'sendLocation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDeviceInfoController_getCheckInfo: Record<string, TsoaRoute.ParameterSchema> = {
                email: {"in":"query","name":"email","required":true,"dataType":"string"},
        };
        app.get('/v1/auth/getCheckInfo',
            ...(fetchMiddlewares<RequestHandler>(DeviceInfoController)),
            ...(fetchMiddlewares<RequestHandler>(DeviceInfoController.prototype.getCheckInfo)),

            async function DeviceInfoController_getCheckInfo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDeviceInfoController_getCheckInfo, request, response });

                const controller = new DeviceInfoController();

              await templateService.apiHandler({
                methodName: 'getCheckInfo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGoogleAuthController_initiateGoogleSignIn: Record<string, TsoaRoute.ParameterSchema> = {
                redirect: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"url":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/v1/auth/google',
            ...(fetchMiddlewares<RequestHandler>(GoogleAuthController)),
            ...(fetchMiddlewares<RequestHandler>(GoogleAuthController.prototype.initiateGoogleSignIn)),

            async function GoogleAuthController_initiateGoogleSignIn(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGoogleAuthController_initiateGoogleSignIn, request, response });

                const controller = new GoogleAuthController();

              await templateService.apiHandler({
                methodName: 'initiateGoogleSignIn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGoogleAuthController_googleCallback: Record<string, TsoaRoute.ParameterSchema> = {
                code: {"in":"query","name":"code","required":true,"dataType":"string"},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                errorResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/v1/auth/google/callback',
            ...(fetchMiddlewares<RequestHandler>(GoogleAuthController)),
            ...(fetchMiddlewares<RequestHandler>(GoogleAuthController.prototype.googleCallback)),

            async function GoogleAuthController_googleCallback(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGoogleAuthController_googleCallback, request, response });

                const controller = new GoogleAuthController();

              await templateService.apiHandler({
                methodName: 'googleCallback',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGoogleAuthController_refreshToken: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"refreshToken":{"dataType":"string","required":true}}},
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.post('/v1/auth/refresh-token',
            ...(fetchMiddlewares<RequestHandler>(GoogleAuthController)),
            ...(fetchMiddlewares<RequestHandler>(GoogleAuthController.prototype.refreshToken)),

            async function GoogleAuthController_refreshToken(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGoogleAuthController_refreshToken, request, response });

                const controller = new GoogleAuthController();

              await templateService.apiHandler({
                methodName: 'refreshToken',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCognitoController_signUp: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SignUpRequest"},
        };
        app.post('/v1/auth/signup',
            ...(fetchMiddlewares<RequestHandler>(CognitoController)),
            ...(fetchMiddlewares<RequestHandler>(CognitoController.prototype.signUp)),

            async function CognitoController_signUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCognitoController_signUp, request, response });

                const controller = new CognitoController();

              await templateService.apiHandler({
                methodName: 'signUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCognitoController_signIn: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SignInRequest"},
                successResponse: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"result":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/v1/auth/signin',
            ...(fetchMiddlewares<RequestHandler>(CognitoController)),
            ...(fetchMiddlewares<RequestHandler>(CognitoController.prototype.signIn)),

            async function CognitoController_signIn(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCognitoController_signIn, request, response });

                const controller = new CognitoController();

              await templateService.apiHandler({
                methodName: 'signIn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCognitoController_confirmSignUp: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ConfirmSignUpRequest"},
                successResponse: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"result":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
        };
        app.post('/v1/auth/confirm',
            ...(fetchMiddlewares<RequestHandler>(CognitoController)),
            ...(fetchMiddlewares<RequestHandler>(CognitoController.prototype.confirmSignUp)),

            async function CognitoController_confirmSignUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCognitoController_confirmSignUp, request, response });

                const controller = new CognitoController();

              await templateService.apiHandler({
                methodName: 'confirmSignUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCognitoController_resendCode: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string","required":true}}},
        };
        app.post('/v1/auth/resend-code',
            ...(fetchMiddlewares<RequestHandler>(CognitoController)),
            ...(fetchMiddlewares<RequestHandler>(CognitoController.prototype.resendCode)),

            async function CognitoController_resendCode(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCognitoController_resendCode, request, response });

                const controller = new CognitoController();

              await templateService.apiHandler({
                methodName: 'resendCode',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_createAdmin: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"profile":{"dataType":"string"},"password":{"dataType":"string"},"email":{"dataType":"string","required":true},"username":{"dataType":"string","required":true}}},
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.post('/v1/auth/admin/database/createAdmin',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createAdmin)),

            async function AdminController_createAdmin(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_createAdmin, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'createAdmin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getAllAdmin: Record<string, TsoaRoute.ParameterSchema> = {
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double","required":true},"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/v1/auth/admin/database/getAllAdmins',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getAllAdmin)),

            async function AdminController_getAllAdmin(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getAllAdmin, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getAllAdmin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_deleteAdmin: Record<string, TsoaRoute.ParameterSchema> = {
                adminId: {"in":"path","name":"adminId","required":true,"dataType":"string"},
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
                serverErrorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.delete('/v1/auth/admin/database/deleteAdmin/:adminId',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.deleteAdmin)),

            async function AdminController_deleteAdmin(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_deleteAdmin, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'deleteAdmin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_getAllUsers: Record<string, TsoaRoute.ParameterSchema> = {
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double","required":true},"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/v1/auth/adminOptions/database/getAllUsers',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.getAllUsers)),

            async function AdminOptionController_getAllUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_getAllUsers, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'getAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_getUserById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/v1/auth/adminOptions/database/getUserById/:id',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.getUserById)),

            async function AdminOptionController_getUserById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_getUserById, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'getUserById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"profile":{"dataType":"string"},"password":{"dataType":"string"},"email":{"dataType":"string","required":true},"username":{"dataType":"string","required":true}}},
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.post('/v1/auth/adminOptions/database/createUser',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.createUser)),

            async function AdminOptionController_createUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_createUser, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"profile":{"dataType":"string"},"email":{"dataType":"string"},"username":{"dataType":"string"}}},
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.put('/v1/auth/adminOptions/database/updateUser/:id',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.updateUser)),

            async function AdminOptionController_updateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_updateUser, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.post('/v1/auth/adminOptions/database/delete-user/:id',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.deleteUser)),

            async function AdminOptionController_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_deleteUser, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_deleteAllUsers: Record<string, TsoaRoute.ParameterSchema> = {
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.post('/v1/auth/adminOptions/database/delete-all-users',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.deleteAllUsers)),

            async function AdminOptionController_deleteAllUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_deleteAllUsers, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'deleteAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_listUsersCognito: Record<string, TsoaRoute.ParameterSchema> = {
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"total":{"dataType":"double","required":true},"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/v1/auth/adminOptions/cognito/listUsersCognito',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.listUsersCognito)),

            async function AdminOptionController_listUsersCognito(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_listUsersCognito, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'listUsersCognito',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_getUserCognitoByUserName: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/v1/auth/adminOptions/cognito/getUsersCognito/:id',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.getUserCognitoByUserName)),

            async function AdminOptionController_getUserCognitoByUserName(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_getUserCognitoByUserName, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'getUserCognitoByUserName',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_deleteUserCognito: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.post('/v1/auth/adminOptions/cognito/delete-user/:id',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.deleteUserCognito)),

            async function AdminOptionController_deleteUserCognito(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_deleteUserCognito, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'deleteUserCognito',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_cognitoDeleteUserByEmail: Record<string, TsoaRoute.ParameterSchema> = {
                email: {"in":"path","name":"email","required":true,"dataType":"string"},
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.delete('/v1/auth/adminOptions/cognito/delete-user/:email',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.cognitoDeleteUserByEmail)),

            async function AdminOptionController_cognitoDeleteUserByEmail(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_cognitoDeleteUserByEmail, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'cognitoDeleteUserByEmail',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminOptionController_cognitoDeleteAllUsers: Record<string, TsoaRoute.ParameterSchema> = {
                response: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                errorResponse: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.delete('/v1/auth/adminOptions/cognito/delete-all-users',
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController)),
            ...(fetchMiddlewares<RequestHandler>(AdminOptionController.prototype.cognitoDeleteAllUsers)),

            async function AdminOptionController_cognitoDeleteAllUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminOptionController_cognitoDeleteAllUsers, request, response });

                const controller = new AdminOptionController();

              await templateService.apiHandler({
                methodName: 'cognitoDeleteAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
