import axios from "axios";

const apiURLs = {
  development: "http://localhost:3001",
  production: "http://tuntsrockchallenge.netlify.app",
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

export { api };
