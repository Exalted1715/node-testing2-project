const request = require("supertest")
const db = require("../data/dbConfig")
const server = require("../server.js")
const Joke = require('../api/jokesModel.js')

const joke1= {joke: "why did the chicken cross the road?", punchline: " it was free range"}
const joke2 = {joke: "why did the chicken cross the road?", punchline: "to avoid this lame joke"}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('jokes').truncate()
})

afterAll(async () => {
    await db.destroy()
})

it("correct env var", () => {
    expect(process.env.DB_ENV).toBe('testing')
})
  
describe('jokes model functions', () =>{
    describe("[Create Joke]", () =>{
        it("add joke to the db", async () =>{
            let jokes
            await Joke.createJoke(joke1)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(1)

            await Joke.createJoke(joke2)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(2)
            
        })
        it("inserted joke and punchline", async () =>{
            const joke = await Joke.createJoke(joke1)
            expect(joke).toMatchObject({joke_id:1,...joke})
        })
    })
    describe("[DELETE] / - delete joke", () => {
        it('removes joke from db', async () => {
            const [joke_id] = await db("jokes").insert(joke1)
            let joke = await db("jokes").where({joke_id}).first()
            expect(joke).toBeTruthy()
            await request(server).delete("/jokes/"+ joke_id)
            joke = await db("jokes").where({joke_id}).first()
            expect(joke).toBeFalsy()
        })
        it("respond with the deleted joke", async () =>{
            await db("jokes").insert(joke1)
            let joke = await request(server).delete("/jokes/1")
            expect(joke.body).toMatchObject(joke1)
        })
    })
    describe("[POST] / - create joke", () => {
        it('adds a new joke to the database', async () => {
            const response = await request(server).post("/jokes").send(joke1);
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(joke1);
        });
    });

    describe("[PUT] /:id - update joke", () => {
        it('updates an existing joke', async () => {
            const [joke_id] = await db("jokes").insert(joke1);
            const updatedJoke = { joke: "Updated joke", punchline: "Updated punchline" };
            const response = await request(server).put("/jokes/" + joke_id).send(updatedJoke);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(updatedJoke);
        });
    });

    describe("[GET] /:id - get joke by id", () => {
        it('returns a specific joke by id', async () => {
            const [joke_id] = await db("jokes").insert(joke1);
            const response = await request(server).get("/jokes/" + joke_id);
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(joke1);
        });
    });
    describe("[GET] /:id - get joke by id", () => {
        it('returns 404 if joke with invalid ID is requested', async () => {
            const invalidId = 999; // Assuming 999 is an invalid ID
            const response = await request(server).get("/jokes/" + invalidId);
            expect(response.status).toBe(404);
        });
    });
    describe("[GET] / - get all jokes", () => {
        it('returns all jokes', async () => {
            await db("jokes").insert(joke1);
            await db("jokes").insert(joke2);
            const response = await request(server).get("/jokes");
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });
    });
    

})
