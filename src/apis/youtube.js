import axios from 'axios';

export const KEY = "AIzaSyCqRHdjMPLQUZZWSfckvq-2ck5ZtizaGHQ"; //2206
//export const KEY = "AIzaSyCmLXFXYCGCu-uOjtYWEK8rOtJgSFwIKdo"; //0720
//export const KEY = "AIzaSyBl3F-Y0ITHZ2DXFZxNVEpdNdEkX99JOUo"; //0721

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3'
});