module.exports = {
  // Разрешили Babel заходить в node_modules
  transformIgnorePatterns: [
    '/node_modules/(?!@babel|.*\\.mjs$)', // Для Babel
    '/node_modules/(?!dotenv)' // Для dotenv
  ],

  // Указываем, где искать тесты
  testMatch: ['**/tests/**/*.test.js'],

  // Транслируем все файлы через Babel
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { presets: ['@babel/preset-env'] }]
  },

  // Добавляем reporters для генерации HTML-отчета
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/html-report',
        filename: 'index.html',
        openReport: true //!process.env.CI
      }
    ]
  ],
};