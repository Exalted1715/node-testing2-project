const request = require("supertest")
const db = require("../data/dbConfig")
const server = require("../server.js")

it("correct env var", () => {
    expect(process.env.DB_ENV).toBe('testing')
})
    
