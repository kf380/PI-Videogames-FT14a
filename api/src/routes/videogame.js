const { Router } = require('express');
const { Videogame, Genres } = require('../db');
const axios = require('axios').default;
const router = Router();


router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    const dbGame = await Videogame.findOne({
        include: {
            model: Genres,
        },
    })
    if (dbGame) {
        res.send(dbGame)
    } else {
        const apiGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=83192c4258a04f328952e2dd57afc040`)
        apiGame.data.id = id
        res.send(apiGame.data)
    }
})

    router.post("/", async function (req, res) {
        try{
            const {name, description, rating, platforms,released,genres } = req.body;
            const game = await Videogame.create({ 
                name,
                description,
                rating,
                platforms,
                released,
                genres
            })
            const genero = await Genres.findAll({
                where: { id: genres }
            })
            await game.addGenres(genero);
            return res.json(game)
        } catch (error) {
            res.status(500).send("El juego no pudo ser creado:(")
        }
    }
    )

  module.exports = router;