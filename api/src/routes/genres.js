const { Router } = require('express');
const { Videogame, Genres } = require('../db');
const router = Router();
const axios = require('axios');
const sequelize = require('sequelize');

router.get('/', async function(req, res) {

    try {
        const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=83192c4258a04f328952e2dd57afc040`)
        genresAPI.data.results.forEach(p => {
            Genres.findOrCreate(
                {where: 
                    {name: p.name, id:p.id}
                }
            )
        })
        const genresDB = await Genres.findAll()
        res.json(genresDB)
        
    } catch (error) {
        res.status(404).json({ error: "Genre not found" })
    }
})
module.exports = router;