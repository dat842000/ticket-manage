import axios from "axios";

const globalPrefix = "api";
const port = 4200;
const timeout = 10000;
const baseURL = `http://localhost:${port}/${globalPrefix}`;

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout,
});
