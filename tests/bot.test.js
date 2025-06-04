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

    it('POST /api/bots - should create a new bot with default rivescript', async () => {
        const botData = { name: 'TestBot', status: 'online' };
        const res = await request(app).post('/api/bots').send(botData);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(botData.name);
        expect(res.body.status).toBe(botData.status);
        expect(res.body.rivescript).toBe('backend/rivescript/brain/english.rive');

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

    it('PATCH /api/bots/:id/status - should update the bot status', async () => {
        const res = await request(app)
            .patch(`/api/bots/${createdBotId}/status`)
            .send({ status: 'offline' });
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('offline');
    });

    it('PATCH /api/bots/:id/rivescript - should update the bot rivescript path', async () => {
        const newPath = 'backend/rivescript/brain/french.rive';
        const res = await request(app)
            .patch(`/api/bots/${createdBotId}/rivescript`)
            .send({ rivescript: newPath });
        expect(res.statusCode).toBe(200);
        expect(res.body.rivescript).toBe(newPath);
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
