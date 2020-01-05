import axios from 'axios';

// List key API
// const KEY = "AIzaSyCqRHdjMPLQUZZWSfckvq-2ck5ZtizaGHQ"; //2206
// const KEY = "AIzaSyCmLXFXYCGCu-uOjtYWEK8rOtJgSFwIKdo"; // 0720
// const KEY = "AIzaSyBl3F-Y0ITHZ2DXFZxNVEpdNdEkX99JOUo"; //0721
// const KEY = "AIzaSyAWSHpbtvoZDoLxfxQ5mf0du9Kk9w4e0zA"; // streamy
const KEY = 'AIzaSyBko-FN35OvmTbUh8q9abctNw-DRQFE69o';
export const defaultParams = {
  part: 'snippet',
  maxResults: 10,
  key: KEY
};

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
});