import axios from "axios";

// List key API
const KEY = "AIzaSyAwtSNiIjUatQWWEWF9_snoC--ZpHFBGg4";
export const defaultParams = {
  part: "snippet",
  maxResults: 10,
  key: KEY
};

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3"
});
