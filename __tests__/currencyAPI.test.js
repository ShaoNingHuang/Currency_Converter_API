const request = require('supertest');
const app = require('../app');

describe('GET /api/currency/convert', () => {
    it ('should return 400 if source, target or amount is not provided', async () => {
        const response = await request(app).get('/api/currency/convert');
        expect(response.statusCode).toBe(400);
    })

    it ('should return 400 if amount is invalid', async () => {
        const response = await request(app).get('/api/currency/convert?source=TWD&target=USD&amount=$100a');
        expect(response.statusCode).toBe(400);
    })
    it ('should return 200 if source, target and amount are provided and valid', async () => {
        const response = await request(app).get('/api/currency/convert?source=TWD&target=USD&amount=$100');
        expect(response.statusCode).toBe(200);
    })

    it ('should return 400 if target is invalid', async () => {
        const response = await request(app).get('/api/currency/convert?source=USD&target=AAA&amount=$100');
        expect(response.statusCode).toBe(400);
    })

})