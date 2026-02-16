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

// const envUrl = `${allEnvApiUrls[environment]?.baseUrl}/v1/`;
const envUrl = `/v1`;

export const apiUrls = {
  login: `${envUrl}/auth/login`,
  register: `${envUrl}/auth/register`,
  getAllUserProducts: `${envUrl}/products/getAllUserProducts`,
  forgotPassword: `${envUrl}/auth/forgot-password`,
  resetPassword: `${envUrl}/auth/reset-password`,
};


