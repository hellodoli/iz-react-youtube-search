import axios from 'axios';

export const KEY = "AIzaSyCqRHdjMPLQUZZWSfckvq-2ck5ZtizaGHQ";

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});