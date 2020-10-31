const request = require('supertest')
const app = require('../app');
const { token } = require('./fixtures/db');



test('trying to login', async () => {
    const response = await request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': 'mike',
            'password': '12345678'
        })
        .expect(200)


    expect(response.body.token).not.toBeNull()


})

