import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL

console.log("url ")
console.log(baseURL)
export default axios.create({
    
    baseURL: baseURL,
});

