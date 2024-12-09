import { rateLimit } from "express-rate-limit";
import { APP_ERROR_MESSAGE, HTTP_STATUS_CODE } from "../utils/contants/index";

export const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  limit: 50,
  message: {
    status: HTTP_STATUS_CODE.MANY_REQUEST,
    error: APP_ERROR_MESSAGE.tooManyRequest,
  }, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
