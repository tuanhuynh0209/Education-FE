import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Trỏ tới server của Back-End
});

export default instance;
