//For Development
export const API_ENDPOINTS = {
  SIGN_UP: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/signup`,
  VERIFY: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/confirm`,
  SIGN_IN: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/signin`,
  SIGN_OUT: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/logout`,
  SIGN_IN_WITH_GOOGLE: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/google`,
  REFRESH_TOKEN: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/refresh-token`,
  USER_PROFILE: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/me`,
  UPDATE_USER_NAME: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/updateUsername`,
  // http://3.24.110.41:8000/api/v1
  // http://127.0.0.1:8000/api/v1
  API_URL: `http://127.0.0.1:8000/api/v1`,
};

console.log(API_ENDPOINTS);

//For Development

export const API_URL_AUTH = {
  SIGN_UP: `${process.env.REACT_APP_URL_DAVI}/signup`,
  SIGN_IN: `${process.env.REACT_APP_URL_DAVI}/login`,
};
