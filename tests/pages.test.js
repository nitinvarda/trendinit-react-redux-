const request = require('supertest')
const app = require('../app');
const User = require('../models/userSchema');
const { userOneId,
    userOne,
    setupDatabase } = require('./fixtures/db')



beforeEach(setupDatabase)

test('GET /home', async () => {
    const response = await request(app)
        .get('/home')
        .expect(200)

    expect(response.body.articles).not.toBeNull()


})


test('GET /cat/:type', async () => {
    const response = await request(app)
        .get('/cat/Sports')
        .expect(200)

    expect(response.body).not.toBeNull()
    expect(response.body).toBeDefined()
})

