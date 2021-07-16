const { Router } = require('express');
const { Videogame, Genres } = require('../db');
const axios = require('axios').default;
const router = Router();
const {Sequelize, Op} = require('sequelize');
const { v4: uuidv4 } = require('uuid'); 
const { YOUR_API_KEY}  = process.env;

router.get("/:id", async (req, res, next) => {
    const pk = req.params.id;
    let detail;

    if(pk.includes("-")){
        detail = await Videogame.findOne({
            where:{
                id: pk,
            },
            attributes:["name", "description", "rating", "released", "platforms"],
            include: { 
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
    }else{
        const r = await axios.get(`https://api.rawg.io/api/games/${pk}?key=${YOUR_API_KEY}`)
        const elem = r.data;

        detail={
            id: elem.id,
            name: elem.name,
            description: elem.description_raw,
            image: elem.background_image,
            rating: elem.rating,
            released: elem.released,    
            genres:elem.genres,
            platforms: elem.platforms
            .map((p) => p.platform.name)
            .join(", "),


        };
    };
    if(detail){
        res.send(detail);
    }else{
        res.status(404).send()
    };

    
});


router.post("/", async function (req, res) {
  try {
      const { name, description, released, rating, genres, platforms } = req.body;
      const juego = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
      })
      const generos = await Genres.findAll({
          where: { name: { [Op.or]: genres } }
      })
      await juego.addGenres(generos);
      return res.json(juego)
  } catch (error) {
    res.status(500).send("No funca")
  }
})

  

  


        //     const { name, description, released, rating, platforms, genres } = req.body;
        //     try {
        //         let game = await Videogame.create({
        //             name,
        //             description,
        //             released,
        //             rating,
        //             platforms,
        //         });
        //         genres.forEach(async genres => {
        //             await game.addGenres(genres); // relaciono paises y actividades , queda en mi tabla intermedia
        //         });
               
        //         return res.send('Activy successfully created')
        //     }catch (error){
        //         next({status:404, message:'Something went wrong'})
        //     }
        // })

  module.exports = router;
