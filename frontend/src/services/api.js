import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  health: async () => {
    try {
      const response = await axios.get(API_URL + '/api/health');
      return response.data;
    } catch (error) {
      return { status: 'offline' };
    }
  },

  getBlockchainStats: async () => {
    try {
      const response = await axios.get(API_URL + '/api/blockchain/stats');
      return response.data;
    } catch (error) {
      return { totalPolicies: 0, activePolicies: 0, totalIncidents: 0, totalThreats: 0 };
    }
  },

  getPolicies: async () => {
    try {
      const response = await axios.get(API_URL + '/api/blockchain/active-policies');
      return response.data;
    } catch (error) {
      return [];
    }
  },

  getIncidents: async () => {
    try {
      const response = await axios.get(API_URL + '/api/blockchain/incidents');
      return response.data;
    } catch (error) {
      return [];
    }
  },

  createPolicy: async (data) => {
    try {
      const response = await axios.post(API_URL + '/api/blockchain/create-policy', data);
      return response.data;
    } catch (error) {
      throw new Error('Erreur création politique');
    }
  },

  reportIncident: async (data) => {
    try {
      const response = await axios.post(API_URL + '/api/blockchain/report-incident', data);
      return response.data;
    } catch (error) {
      throw new Error('Erreur signalement incident');
    }
  }
};
