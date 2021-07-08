import axios from 'axios';

export default axios.create({
    baseURL: 'https://vending-machine-test.vercel.app/api'
});