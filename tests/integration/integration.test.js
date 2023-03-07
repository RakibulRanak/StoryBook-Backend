
const request = require('supertest');
const app = require('../../app');
const table = require('../../utils/dbActions');
jest.setTimeout(6000)
beforeAll(() => {
    table.clearDB();
});
afterAll(() => {
    table.clearDB();
});

let jwt = "";
const testUser = {
    username: 'testing',
    name: 'Rakibul',
    email: 'testing@gmail.com',
    password: 'testing',
    confirmPassword: "testing"
};
const testUser2 = {
    username: 'testing2',
    name: 'Rakibul2',
    email: 'testing2@gmail.com',
    password: 'testing',
    confirmPassword: "testing"
};

const testStory = {
    title: "d",
    story: "Once upon a time.......",
    hudai: "vudai"
}


test('Should create an user and response 201', async () => {
    const newUser = {
        username: 'testing',
        name: 'Rakibul',
        email: 'testing@gmail.com',
        password: 'testing',
        confirmPassword: "testing"
    };

    const response = await request(app)
        .post('/api/v1/users/')
        .send(newUser)
        .expect(201);
})

test('Should get an user and response 200', async () => {
    const response = await request(app)
        .get('/api/v1/users/testing')
        .set('accept', 'application/json')
        .expect(200);
    console.log(response.body.message)
})

test('Should login an user and response 200', async () => {
    const response = await request(app)
        .post('/api/v1/users/login')
        .send(testUser)
        .expect(200);
    jwt = response.headers['set-cookie'][0];
    jwt = jwt.split('=');
    jwt = jwt[0] + "=" + jwt[1];

})

test('Should not create story without logged in (jwt cookie) and response 401', async () => {
    const response = await request(app)
        .post('/api/v1/stories')
        .send(testStory)
        .expect(401);
})

test('Should create story and response 201', async () => {
    const response = await request(app)
        .post('/api/v1/stories')
        .set('cookie', jwt)
        .send(testStory)
        .expect(201);
})
test('Should create another story and response 201', async () => {
    const response = await request(app)
        .post('/api/v1/stories')
        .set('cookie', jwt)
        .send(testStory)
        .expect(201);
})
test('Should return a story and 200', async () => {
    const response = await request(app)
        .get('/api/v1/stories?page=1&size=4')
        .set('accept', 'application/json')
        .expect(200);
    expect(response.body.data.length).toBe(2)
})

/// create another user and try to perform not allowed method

test('Should not create same user and response 405', async () => {
    const newUser = {
        username: 'testing',
        name: 'Rakibul',
        email: 'testing@gmail.com',
        password: 'testing',
        confirmPassword: "testing"
    };

    const response = await request(app)
        .post('/api/v1/users/')
        .send(newUser)
        .expect(405);
})

test('Should create different user and response 201', async () => {
    const response = await request(app)
        .post('/api/v1/users/')
        .send(testUser2)
        .expect(201);
})


test('Should login an another user and Response 200', async () => {
    const response = await request(app)
        .post('/api/v1/users/login')
        .send(testUser2)
        .expect(200);
    jwt = response.headers['set-cookie'][0];
    jwt = jwt.split('=');
    jwt = jwt[0] + "=" + jwt[1];

})

test('Can not update another users story and response 403', async () => {
    const response = await request(app)
        .put('/api/v1/stories/1')
        .send(testUser2)
        .set('cookie', jwt)
        .send(testStory)
        .expect(403)

})