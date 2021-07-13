const { Router } = require('express');
const { Videogame, Genres } = require('../db');
const axios = require('axios').default;
const router = Router();
const {Sequelize, Op} = require('sequelize');


router.get("/:id", async (req, res, next) => {
    const pk = req.params.id;
    let detail;

    if(pk.includes("-")){
        detail = await Videogame.findOne({
            where:{
                id: pk,
            },
            include: { 
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
    }else{
        const r = await axios.get(`https://api.rawg.io/api/games/${pk}?key=83192c4258a04f328952e2dd57afc040`)
        const elem = r.data;

        detail={
            name:elem.name,
            genre:elem.genres

        };
    };
    if(detail){
        res.send(detail);
    }else{
        res.status(404).send()
    };

    
});


    router.post("/", async function (req, res) {
            const { name, description, released, rating, platforms, genres, image } = req.body;
            const game = await Videogame.create({
                name,
                description,
                released: released,
                rating: rating ,
                platforms,
                image:'data:image/jpeg;base64,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',
                genres,
                
            })    
            let generos
            if(Array.isArray(genres)){  // con este metodo verifico si el valor pasado es un array
                generos = await Promise.all(genres.map(g => Genres.findByPk(g)))   //el promise.all() devuelve una promesa al final, cuando se cumplio lo de adentro
            }                                                                        // el findByPk es un metodo de sequelize 
            else{
                generos = await Genres.findByPk(genres)
            }
            await game.setGenres(generos)
            return res.json(game)
        })
  module.exports = router;