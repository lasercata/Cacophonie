// test/bot.test.js
const request = require('supertest');
const app = require('../backend/main');

describe('Bots API', () => {
  let createdBotId;

  it('GET /api/bots - should return empty array initially', async () => {
    const res = await request(app).get('/api/bots');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/bots - should create a new bot', async () => {
    const botData = { name: 'TestBot', status: 'online' };
    const res = await request(app).post('/api/bots').send(botData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(botData.name);
    createdBotId = res.body.id;
  });

  it('GET /api/bots/:id - should get the created bot', async () => {
    const res = await request(app).get(`/api/bots/${createdBotId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', createdBotId);
  });

  it('PATCH /api/bots/:id - should update the bot', async () => {
    const res = await request(app)
      .patch(`/api/bots/${createdBotId}`)
      .send({ name: 'UpdatedBot' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('UpdatedBot');
  });

  it('DELETE /api/bots/:id - should delete the bot', async () => {
    const res = await request(app).delete(`/api/bots/${createdBotId}`);
    expect(res.statusCode).toBe(204);
  });

  it('GET /api/bots/:id - should return 404 after deletion', async () => {
    const res = await request(app).get(`/api/bots/${createdBotId}`);
    expect(res.statusCode).toBe(404);
  });
});
