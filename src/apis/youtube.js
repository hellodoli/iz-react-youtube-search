import axios from "axios";

// List key API
const KEY = "AIzaSyAi4g7JzxB7F8o-o5SYwULYd0fHGdHEa4A";
export const defaultParams = {
  part: "snippet",
  maxResults: 10,
  key: KEY
};

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
