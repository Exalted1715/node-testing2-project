exports.seed = function(knex){
    return knex('jokes').truncate()
        .then(function () {
            return knex('jokes').insert([
                {joke: "what did the tin man say when he got run over by a steamroller?", punchline: "curses, foiled again!"},
                {joke: "how do you make a tissue dance?", punchline: " you put a little boogey in it!"},
                {joke: "whats an astronauts favorite part of a computer?", punchline: "the spacebar"},
                {joke:"what do you get from a pampered cow?", punchline: "spoiled milk"}
            ]);
        });
};