module.exports = {
  testUserId: 1,
  expectedUserData: {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz'
  },

  generateDynamicUser() {
    const now = Date.now();
    return {
      name: `GeneratedUser_${now}`,
      username: `User_${now}`,
      email: `user+${now}@example.com`
    };
  }
};