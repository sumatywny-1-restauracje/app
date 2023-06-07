import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
  timeout: 5000,
});

api.defaults.headers.common["Authorization"] = `Bearer ${global.TOKEN}`;
