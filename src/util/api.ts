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
  post(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "post",
          url: path,
          data: params,
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
  patch(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "patch",
          url: path,
          data: params,
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
  delete(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "delete",
          url: path,
          data: params,
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

const category = {
  getCategories() {
    return request.get(API_URL + "/category", {});
  },
  createCategory(name: string) {
    return request.post(API_URL + "/category/create", {
      name: name,
    });
  },
  editCategory(_id: string, name: string) {
    return request.post(API_URL + "/category/update", {
      _id: _id,
      updater: { name: name },
    });
  },
  deleteCategory(_id: string) {
    return request.delete(API_URL + "/category/delete", {
      _id: _id,
    });
  },
};

const tag = {
  getTags() {
    return request.get(API_URL + "/tag", {});
  },
  createTag(name: string, color: string) {
    return request.post(API_URL + "/tag/create", {
      name: name,
      color: color,
    });
  },
  editTag(_id: string, name: string, color: string) {
    return request.post(API_URL + "/tag/update", {
      _id: _id,
      updater: { name: name, color: color },
    });
  },
  deleteTag(_id: string) {
    return request.delete(API_URL + "/tag/delete", {
      _id: _id,
    });
  },
};

export default {
  request,
  article,
  category,
  tag,
  setToken: (_token: string) => {
    window.localStorage.setItem("TOKEN", _token);
    token = _token;
  },
};
