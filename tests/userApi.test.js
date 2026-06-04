const userService = require('../framework/services/userService');
const fixtures = require('../framework/fixtures/userFixtures');
const { testUserId, expectedUserData } = fixtures;

describe('User API Tests', () => {
  test('1. Получение информации o пользователе', async () => {

    const userData = await userService.getUserInfo(testUserId);
    expect(userData).toMatchObject(expectedUserData);
  });

  

  test('2. Получение информации o пользователе: Данные должны соответствовать ожидаемым', async () => {

    const userData = await userService.getUserInfo(testUserId);
    expect(userData).toMatchObject(expectedUserData);
    console.log(`[SUCCESS] Получены данные пользователя: ${userData.name}`);
  });


  test('3. Удаление пользователя: Должен вернуться статус-код успешного удаления', async () => {
    const statusCode = await userService.deleteUser(testUserId);
    expect(statusCode).toBe(200);
    console.log(`[SUCCESS] Пользователь c ID ${testUserId} успешно удален.`);
  });
});