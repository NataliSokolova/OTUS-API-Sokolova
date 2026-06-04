const axios = require('axios');
const config = require('../config/apiConfig');

class UserService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: config.baseUrl
    });
  }

  async getUserInfo(userId) {
    const res = await this.apiClient.get(`/users/${userId}`);
    return res.data;
  }

  async deleteUser(userId) {
    const res = await this.apiClient.delete(`/users/${userId}`);
    return res.status;
  }
}

module.exports = new UserService();