// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')




beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db("users").truncate();
})

afterAll(async () => {
  await db.destroy();
})


test('sanity', () => {
  expect(true).toBe(true)
})

test("correct testing environment", () => {
  expect(process.env.NODE_ENV).toBe("testing")
})


describe('[POST / register', () => {
  const user1 = {username: "Vanessa", password: "abc123"}
  

  test('Successful registration responds with 201 code and ', async () => {
    const res = await request(server).post('/api/auth/register').send(user1)
    console.log(res.body)
    expect(res.status).toBe(201)
    expect(res.body.username).toMatch('Vanessa')
  })
})

describe('[GET / returns correct response', () => {
  const user2 = {username: "Karen", password: "berry123"}

  test('get returns all jokes for user', async () => {
    const register = await request(server).post('/api/auth/register').send(user2)
    const login = await request(server).post('/api/auth/login').send(user2)
    let token = await login.body.token
    const jokes = await request(server).get('/api/jokes').set('Authorization', token)
    expect(jokes.status).toBe(200)
    expect(jokes.body).toHaveLength(3)
  })
})
