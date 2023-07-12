const URL = "https://api-test.innoloft.com";
const APP_ID = import.meta.env.VITE_APP_ID as string;

const appBaseConfig = {
  appID: APP_ID,
  baseURL: URL,
  endpoints: {
    getProduct: `${URL}/product/6781/`,
    editProduct: `${URL}/product/6781/`,
    getTrlList: `${URL}/trl/`,
    getConfiguration: `${URL}/configuration/${APP_ID}/`,
  },
};

export default appBaseConfig;
