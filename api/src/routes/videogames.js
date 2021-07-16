const { Router } = require('express');
const { Videogame, Genres} = require('../db');
const axios = require('axios').default;
const { YOUR_API_KEY}  = process.env;
const router = Router();


router.get('/', async (req,res,next)=>{
    try {
        const gamesDbAll = await Videogame.findAll({ include: [Genres] });
        const select = gamesDbAll.map((e) => {
          return {
            id: e.id,
            name: e.name,
            description: e.description,
            image: e.background_image,
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
            .get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`)
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
        const arr= await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}&page=${i}`)
     try {
    const game = arr.data.results.map((x)=>{
            return {
              id: x.id,
              name: x.name,
              image: x.background_image,
              rating: x.rating,
              released: x.released,
              platforms:x.platforms, 
              genres: x.genres.map((g) => g.name).join(", "),
              source: "Api",
                
              }
          })  

          const xgames=createdGames.map((m)=>{
           return{
            id: m.id,
            name: m.name,
            image: m.background_image,
            rating: m.rating,
            released: m.released,
            platforms:m.platforms,
            genres: m.genres.map((g) => g.name).join(", "),
            source: "BD",
           }
          })           
 
           const joinR = xgames.concat(game);
           // console.log(joinR)
      
          if(name)  return res.status(200).send(joinR)
            
          else if (!name){
                 
              const xname= joinR.filter(x=> x.name.toLowerCase().includes(name.toLowerCase()))
    
              return res.status(200).send(xname)
              }
    
  } catch (error) {
    next(error)
  }
 }})










 
module.exports = router;