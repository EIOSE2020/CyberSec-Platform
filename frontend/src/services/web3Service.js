import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const web3Service = {
  getBalance: async (address) => {
    const response = await axios.get(${API_URL}/api/web3/balance/);
    return response.data;
  },

  sendTransaction: async (to, amount) => {
    const response = await axios.post(${API_URL}/api/web3/send, { to, amount });
    return response.data;
  },

  getTransactionHistory: async (address) => {
    const response = await axios.get(${API_URL}/api/web3/history/);
    return response.data;
  }
};
