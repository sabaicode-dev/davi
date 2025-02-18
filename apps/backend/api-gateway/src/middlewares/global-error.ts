import { gatewayLogger } from "@/src/server";
import {
  APP_ERROR_MESSAGE,
  ApplicationError,
  HTTP_STATUS_CODE,
  prettyObject,
} from "@/src/utils/contants/index";
import { NextFunction, Request, Response } from "express";

export function globalErrorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Handle Error
  if (error instanceof ApplicationError) {
    const status = error.status;
    const message = error.message;
    const errors = error.errors;

    gatewayLogger.error(
      `$API Gateway - globalErrorHandler() method error: ${prettyObject(error)}`
    );
    return res.status(status).json({ message, error: errors });
  }

  // Unhandle Error
  gatewayLogger.error(
    `$API Gateway - globalErrorHandler() unexpected method error: ${prettyObject(
      error as {}
    )}`
  );
  res
    .status(HTTP_STATUS_CODE.SERVER_ERROR)
    .json({ message: APP_ERROR_MESSAGE.serverError });
}
