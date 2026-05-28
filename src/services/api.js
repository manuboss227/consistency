import axios from "axios";

const API =
  axios.create({

    baseURL:
      "https://consistency-app.great-site.net/api"
  });

export default API;