const { Router } = require('express');
const { Videogame, Genres} = require('../db');
const axios = require('axios').default;
const { API_KEY } = process.env;
const router = Router();
const fetch = require('node-fetch');
const{Op}=require('sequelize')


router.get('/', async (req,res,next)=>{
    try {
        const gamesDbAll = await Videogame.findAll({ include: [Genres] });
        const select = gamesDbAll.map((e) => {
          return {
            id: e.id,
            name: e.name,
            description: e.description,
            rating: e.rating,
            platforms: e.platforms,
            released: e.released,
            genres: e.genres.map((g) => g.name).join(", "),
            source: "Created",
          };
        });
        let gamesApi;
        let pagesApi = [];
        for (let i = 1; i <= 5; i++) {
          await axios
            .get(`https://api.rawg.io/api/games?key=83192c4258a04f328952e2dd57afc040&page=${i}`)
            .then((g) => {
              
              gamesApi = g.data.results.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    image: game.background_image,
                    rating: game.rating,
                    released: game.released,
                    platforms: game.platforms.map((p) => p.platform.name).join(", "),
                    genres: game.genres.map((g) => g.name).join(", "),
                    source: "Api",
                };
              });
              pagesApi = pagesApi.concat(gamesApi);
            })
            .catch((err) => next(err));
        }
        res.status(200).send([...pagesApi, ...select]);
      } catch (err) {
        next(err);
      }
    });

router.get('/search', async (req,res,next)=>{
    const { name } = req.query;
    const createdGames = await Videogame.findAll({include: {model: Genres}})
    for (let i = 1; i <= 5; i++) {
        const arr= await axios.get(`https://api.rawg.io/api/games?search=${name}&key=83192c4258a04f328952e2dd57afc040&page=${i}`)
     try {
    const game = arr.data.results.map((x)=>{
            return {
                id: x.id,
                name: x.name,
                image: x.background_image,
                rating: x.rating,
                released: x.released,
                
                
              }
          })  

          const xgames=createdGames.map((m)=>{
           return{
            id: m.id,
            name: m.name,
            image: m.background_image,
            rating: m.rating,
            released: m.released,
           }
          })           
 
           const joinR = xgames.concat(game);
           // console.log(joinR)
      
          if(name === undefined)  return res.status(200).send(joinR)
            
          else if (name && name.length>0 ){
                 
              const xname= joinR.filter(x=> x.name.toLowerCase().includes(name.toLowerCase()))
    
              return res.status(200).send(xname)
              }
    
  } catch (error) {
    next(error)
  }
 }})
module.exports = router;