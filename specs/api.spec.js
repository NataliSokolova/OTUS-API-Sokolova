const request = require('supertest');
const baseUrl = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API Tests', () => {

 
  it('GET /posts — должен вернуть массив из 100 постов', async () => {
    const response = await request(baseUrl).get('/posts');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(100); 
    expect(response.body[0]).toHaveProperty('title');
  });

  
  it('GET /posts/1 — должен вернуть пост id=1', async () => {
    const response = await request(baseUrl).get('/posts/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('userId');
    expect(response.body.title).toContain('sunt'); 
  });

 
  it('GET /posts/9999 — должен вернуть ошибку 404', async () => {
    const response = await request(baseUrl).get('/posts/9999');

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({}); 
  });

  
  it('POST /posts — должен создать новый пост и вернуть id=101', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    const response = await request(baseUrl)
      .post('/posts')
      .send(newPost);

    expect(response.statusCode).toBe(201); 
    expect(response.body).toMatchObject(newPost); 
    expect(response.body).toHaveProperty('id', 101);
  });

  
  it('DELETE /posts/1 — должен успешно удалить пост', async () => {
    const response = await request(baseUrl).delete('/posts/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });
});
