import axios from 'axios';

//export const KEY = "AIzaSyCqRHdjMPLQUZZWSfckvq-2ck5ZtizaGHQ";
export const KEY = "AIzaSyANlI1fT1IvakNEJ1h8zAMUASQ_Ta-1q9Y";

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});