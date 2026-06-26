import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const blockchainService = {
  getStats: async () => { const res = await axios.get(API_URL+'/api/blockchain/stats'); return res.data; }
};
