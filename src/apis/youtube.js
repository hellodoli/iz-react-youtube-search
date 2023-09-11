import axios from 'axios'

// List key API
const KEY = process.env.REACT_APP_API_KEY
//const KEY = 'AIzaSyC65hD851A_Z3yXvakKYivQxqMUSVwiYjU'
export const defaultParams = {
  part: 'snippet',
  maxResults: 10,
  key: KEY,
}

const baseURL = process.env.REACT_APP_API_ENDPOINT
//const baseURL = 'https://www.googleapis.com/youtube/v3'
export default axios.create({
  baseURL,
})
