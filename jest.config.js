module.exports = {
  // Транслируем все файлы через Babel
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { presets: ['@babel/preset-env'] }]
  },

  // Разрешили Babel заходить в node_modules
  transformIgnorePatterns: [
    '/node_modules/(?!@babel|.*\\.mjs$)', // Для Babel
    '/node_modules/(?!dotenv)' // Для dotenv
  ],

  // Указываем, где искать тесты
  testMatch: ['**/tests/**/*.test.js'],
};