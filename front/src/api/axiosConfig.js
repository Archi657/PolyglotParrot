import axios from 'axios';

const baseURL = process.env.BACKEND_URL

export default axios.create({
    baseURL: baseURL,
});

