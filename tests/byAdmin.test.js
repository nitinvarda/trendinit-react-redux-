const request = require('supertest')
const app = require('../app');

test('GET /by/:name', async () => {
    const response = await request(app)
        .get('/by/nitin')
        .expect(200)

    expect(response.body).not.toBeNull()
    expect(response.body).toBeDefined()
})