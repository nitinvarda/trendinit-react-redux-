const request = require('supertest')
const app = require('../app');
const { token, setupDatabase, userOneId } = require('./fixtures/db');

beforeEach(setupDatabase)

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

    const auth = await request(app)
        .get('/checkAuth')
        .set('x-auth-token', response.body.token)
        .expect(200)

    expect(auth.body).toMatchObject({ name: 'mike' })


})
