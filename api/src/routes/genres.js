const { Router } = require('express');
const { Videogame, Genres } = require('../db');
const router = Router();
const axios = require('axios');
const sequelize = require('sequelize');
const { YOUR_API_KEY}  = process.env;

router.get('/', async function(req, res) {

    try {
        const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
        genresAPI.data.results.forEach(p => {
            Genres.findOrCreate(
                {where: 
                    {id:p.id, name: p.name }
                }
            )
        })
        const genresDB = await Genres.findAll();
        res.json(genresDB)
        
    } catch (error) {
        res.status(404).json({ error: "Genre not found" })
    }
})
module.exports = router;