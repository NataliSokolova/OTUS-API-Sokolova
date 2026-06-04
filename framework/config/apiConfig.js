require('dotenv').config();

module.exports = {
  baseUrl: process.env.API_BASE_URL,
  credentials: {
    username: process.env.API_USERNAME,
    password: process.env.API_PASSWORD,
  },
};