const express = require('express')
const router = express.Router()
const Joke= require('./jokesModel.js')

// GET /api/jokes
router.get('/', async (req, res) => {
    try {
        const jokes = await Joke.getAllJokes();
        res.status(200).json(jokes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/jokes
router.post('/', async (req, res) => {
    try {
        const newJoke = await Joke.createJoke(req.body);
        res.status(201).json(newJoke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/jokes/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedJoke = await Joke.updateJoke(id, req.body);
        res.status(200).json(updatedJoke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/jokes/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const joke = await Joke.getJokeById(id);
        if (!joke) {
            return res.status(404).json({ message: 'Joke not found' });
        }
        res.status(200).json(joke);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete("/:id", async(req, res) => {
    const id = req.params.id
    const delJoke = await Joke.deleteJoke(id)
    res.status(200).json(delJoke)
})





module.exports = router