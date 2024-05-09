const db = require('../data/dbConfig');

async function createJoke(joke) {
    const [id] = await db("jokes").insert(joke);
    return db("jokes").where("joke_id", id).first();
}

async function deleteJoke(id) {
    const joke = await db('jokes').where("joke_id", id).first();
    await db("jokes").where('joke_id', id).del();
    return joke;
}

async function getJokeById(id) {
    return db("jokes").where("joke_id", id).first();
}

async function getAllJokes() {
    return db("jokes");
}

async function updateJoke(id, updatedJokeData) {
    await db("jokes").where('joke_id', id).update(updatedJokeData);
    return db("jokes").where('joke_id', id).first();
}

module.exports = {
    createJoke,
    deleteJoke,
    getJokeById,
    getAllJokes,
    updateJoke
};
