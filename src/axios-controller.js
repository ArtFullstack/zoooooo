import axios from "axios";

const instance = axios.create({
  baseURL: "http://109.73.206.80:3000/api",
});

export default instance;
