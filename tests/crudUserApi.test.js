const UserService = require('../framework/services');
const Fixtures = require('../framework/fixtures');

describe('User API Tests', () => {
  let dynamicUser;

  beforeAll(async () => {
    dynamicUser = await UserService.createUser(Fixtures.generateDynamicUser());
  });

  describe('Static User Tests (ID=1)', () => {
    test('1. Expected data match', async () => {
      const user = await UserService.getUserInfo(1);
      expect(user).toMatchObject(Fixtures.expectedUserData);
    });

    // Параметризированный тест 
    test.each([1, 2, 3])('2. User %i exists', async (userId) => {
      const user = await UserService.getUserInfo(userId);
      expect(user.id).toBe(userId);
    });
  });

  describe('Dynamic CRUD Operations', () => {
    test('3. Created user has valid fields', () => {
      expect(dynamicUser).toHaveProperty('id');
      expect(dynamicUser.name).toContain('GeneratedUser');
    });

    test.skip('4. Partial update changes only specified field', async () => {
  const oldUser = await UserService.getUserInfo(dynamicUser.id);

  const partialUpdate = { username: 'UpdatedUsername' };
  const updatedUser = await UserService.updateUser(dynamicUser.id, partialUpdate);

  // Сначала проверяем, что сервер вернул хоть что-то
  expect(updatedUser).not.toBe(null);
  expect(updatedUser).toHaveProperty('name');

  // Только потом проверяем данные
  expect(updatedUser.name).toBe(oldUser.name);
  expect(updatedUser.username).toBe(partialUpdate.username);
}, 10000);

    test('5. Missing required fields creates empty record', async () => {
      const response = await UserService.apiClient.post('/users', {});
      expect(response.status).toBe(201);
    });
  });

  describe('Negative Scenarios', () => {
  test('6. Non-existing user gives no data', async () => {
    const response = await UserService.getUserInfo(99999);
    expect(response).toBe(null);
  }, 30000);

    test('7. Deleting non-existing user still returns success', async () => {
    const response = await UserService.deleteUser(99999);
    expect(response).toBe(200);
  }, 30000);
});

  describe('Advanced Checks', () => {
    test('8. Pagination returns limited results', async () => {
      const response = await UserService.apiClient.get('/users?page=2');
      expect(response.data.length).toBeLessThanOrEqual(10);
    });

  
    test.skip('9. Root endpoint returns welcome message', async () => {
      const response = await UserService.apiClient.get('/');
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('jsonplaceholder.typicode.com');
    }, 10000);

    test('10. Deleting our own user succeeds', async () => {
      const response = await UserService.deleteUser(dynamicUser.id);
      expect(response).toBe(200);
    });
  });
});