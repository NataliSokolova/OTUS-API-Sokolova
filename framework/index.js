// Подключаем настройки
const config = require('./config');

// Подключаем сервис
const UserService = require('./services/userService');

// Подключаем фикстуры
const fixtures = require('./fixtures/userFixtures');

// Собираем всё в один объект и отдаём наружу
module.exports = {
  config,
  UserService,
  fixtures,
};