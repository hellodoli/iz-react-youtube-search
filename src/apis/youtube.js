import axios from "axios";

// List key API
const KEY = process.env.REACT_APP_API_KEY;
export const defaultParams = {
  part: "snippet",
  maxResults: 10,
  key: KEY
};

export default axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT
});
