const environment = import.meta.env.VITE_APP_ENVIRONMENT;
// export const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const allEnvApiUrls = {
  production: {
    baseUrl: import.meta.env.VITE_APP_REACT_APP_BASE_URL,
  },
  stagging: {
    baseUrl: import.meta.env.VITE_APP_REACT_APP_PROD_URL,
  },
  development: {
    baseUrl: import.meta.env.VITE_APP_REACT_APP_DEV_URL,
  },
};
// console.log("envUrlenvironment", environment, allEnvApiUrls);

const envUrl = `${allEnvApiUrls[environment]?.baseUrl}/v1`;
// const envUrl = `/v1`;

// export const apiUrls = {
//   login: `${envUrl}/auth/login`,
//   register: `${envUrl}/auth/register`,
//   forgotPassword: `${envUrl}/auth/forgot-password`,
//   resetPassword: `${envUrl}/auth/reset-password`,
// };


export const apiUrls = {
  login: `${envUrl}/auth/login`,
  logout: `${envUrl}/auth/logout`,
  register: `${envUrl}/auth/register`,
  googleLogin: `${envUrl}/auth/google-login`,
  getAllUserProducts: `${envUrl}/products/getAllUserProducts`,
  updateProfile: `${envUrl}/profile/updateProfile`,
  getUserProfile: `${envUrl}/profile/getProfile`,
  createAddress: `${envUrl}/address/createAddress`,
  getAddress: `${envUrl}/address/getAddress`, 
  updateAddress: `${envUrl}/address/updateAddress`,
  deleteAddress: `${envUrl}/address/deleteAddress`,
};