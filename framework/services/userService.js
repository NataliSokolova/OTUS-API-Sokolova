const axios = require('axios');
const config = require('../config/apiConfig'); 

class UserService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: config.baseUrl,
      timeout: 8000, 
    });
  }

  async getUserInfo(userId) {
    try {
        const res = await this.apiClient.get(`/users/${userId}`);
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log(`[WARN] Пользователь с ID ${userId} не найден.`);
            return null; 
        }
        
        throw error;
    }
  }

  async createUser(userData) {
    const res = await this.apiClient.post('/users', userData); 
    return res.data;
  }

 async updateUser(userId, updateData) {
  try {
    const res = await this.apiClient.put(`/users/${userId}`, updateData);
    return res.data;
  } catch (error) {
    if (error.response?.status === 500) {
      return {}; 
    }
    throw error;
    }
  }

  async deleteUser(userId) {
    try {
        const res = await this.apiClient.delete(`/users/${userId}`);
        return res.status;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log(`[INFO] Попытка удалить несуществующего пользователя ${userId}.`);
            return 404;
        }
        throw error;
    }
  }
}

module.exports = new UserService();