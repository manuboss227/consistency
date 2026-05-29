import axios from "axios";

const API = axios.create({

  baseURL: "https://consistency-4.onrender.com/"
});


// ADD TOKEN AUTOMATICALLY
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        token;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

export default API;