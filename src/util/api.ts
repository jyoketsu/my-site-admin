import axios from "axios";
const API_URL = "http://106.53.222.64:8099";
let token: string = "fafeafa123456";

const request = {
  get(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "get",
          url: path,
          params: params,
          headers: {
            "Auth-Token": token,
          },
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
const article = {
  getArticles(current: number, pageSize: number) {
    return request.get(API_URL + "/article", {
      current: current,
      pageSize: pageSize,
    });
  },
};

export default {
  request,
  article,
  setToken: (_token: string) => {
    window.localStorage.setItem("TOKEN", _token);
    token = _token;
  },
};
