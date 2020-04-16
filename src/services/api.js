import axios from "axios";

const api = axios.create({
  baseURL: "https://api.covid19api.com/live/country/Brazil/status",
});

export default api;
