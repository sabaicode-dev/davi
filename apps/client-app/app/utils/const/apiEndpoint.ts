export const API_ENDPOINT = {
  SIGN_UP: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signup`,
  VERIFY: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/confirm`,
  SIGN_IN: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signin`,
  SIGN_OUT: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/logout`,
  SIGN_IN_WITH_GOOGLE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/google`,
  REFRESH_TOKEN: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/refresh-token`,
  USER_PROFILE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/me`,
  UPDATE_USER_NAME: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/updateUsername`,
  RESEND_CODE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/resend-code`,
  CONFIRM_CODE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/confirm`
};





