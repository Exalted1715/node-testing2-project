const request = require("supertest")
const db = require("../data/dbConfig")
const server = require("../server.js")

const joke1= {joke: "why did the chicken cross the road?", punchline: " it was free range"}
const joke2 = {joke: "why did the chicken cross the road?", punchline: "to avoid this lame joke"}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

it("correct env var", () => {
    expect(process.env.DB_ENV).toBe('testing')
})
    
