const { Router } = require('express');
const { Videogame, Genres} = require('../db');
const axios = require('axios').default;
const { API_KEY } = process.env;
const router = Router();
const fetch = require('node-fetch');


var arr =[];
router.get('/',async (req, res) => {
    try{
    const getAPI = await axios.get(`https://api.rawg.io/api/games?key=83192c4258a04f328952e2dd57afc040`)
    for(var i=0; i<15; i++){
        arr.push(getAPI.data.results[i])
    }

    res.send(arr.map(el =>{
        return {
            name: el.name,
            image: el.background_image,
            genre: el.genres,
        }
    }))
} catch(error){
    console.log("error")
}
})
       

router.get("/all", async function (req, res) {
    try {
        var search = req.query.name;
        var i = 0;
        const dataAPI = await fetch(`https://api.rawg.io/api/games?search=${search}&key=83192c4258a04f328952e2dd57afc040`)
        .then(data => data.json())
        const dataDB = await Videogame.findAll({
    
        })
        const concates = await dataDB.concat(dataAPI.results)
        var result = await concates.filter(data => {
            if (data.name.indexOf(search.charAt(0).toUpperCase()) > -1 && i < 15) {
                i++;
                return data;
            }
        })
        if (result.length) {
            return res.json(result)
        } else {
            return res.json(["no videogames found..."])
        }
    } catch (error) {
        res.send(error)
    }
})
// router.get("/:id", async (req, res, next) => {
// try {
//     const { id } = req.params;
//     let gameIdDb = await Videogame.findOne({
//       where: { id: id },
//       attributes: ["name", "description", "rating", "released", "platforms"],
//       include: {
//         model: Genres,
//         attributes: {
//           exclude: ["createdAt", "updatedAt", "videogame_genre", "id"],
//         },
//         through: { attributes: [] },
//       },
//     });

//     if (!gameIdDb) {
//       await axios
//         .get(`https://api.rawg.io/api/games=${id}&key=83192c4258a04f328952e2dd57afc040`)
//         .then((index) => {
//           const apiGameRes = index.data;
//           const newGameObj = {
//             id: apiGameRes.id,
//             name: apiGameRes.name,
//             description: apiGameRes.description_raw,
//             image: apiGameRes.background_image,
//             rating: apiGameRes.rating,
//             released: apiGameRes.released,
//             platforms: apiGameRes.platforms
//               .map((p) => p.platform.name)
//               .join(", "),
//             genres: apiGameRes.genres,
//           };
//           res.status(200).json(newGameObj);
//         })
//         .catch((err) => next(err));
//     } else {
//       res.status(200).json(gameIdDb);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

    //     try {
//         var i = 0;
//         const dataAPI = await fetch(`https://api.rawg.io/api/games?key=83192c4258a04f328952e2dd57afc040`)
//             .then(el => el.json())
//         const dataDB = await Videogame.findAll({
//             include: Genres
//         })
//         const concates = await dataDB.concat(dataAPI.results)
//         var result = await concates.filter(el => {
//             if (el.slug.indexOf(el.slug) > -1 && i < 8) {
//                 i++;
//                 return el;
//             }
//         })
//         if (result.length) {
//             return res.json(result)
//         } else {
//             return res.json(["No existe ese genero..."])
//         }
//     } catch (error) {
//         res.send(error)
//     }
// })

// router.get("/search", async function (req, res) {
//     const game = req.query.search || "";

//     await axios
//       .get(`https://api.rawg.io/api/games?key=83192c4258a04f328952e2dd57afc040`)
//       .then(async (query) => {
//         try {
//           if (game) {
//             const gameDb = await Videogame.findAll({
//               where: {
//                 name: {
//                   [Op.iLike]: `%${game}%`,
//                 },
//               },
//             });
//             const queryResultName = query.data.results;
//             const gamesNameApi = queryResultName && queryResultName.map((query) => {
//                 return {
//                   id: query.id,
//                   name: query.name,
//                   image: query.background_image,
//                   rating: query.rating,
//                   released: query.released,
//                   platforms:
//                     query.platforms &&
//                     query.platforms.map((p) => p.platform.name).join(", "),
//                   genres: query.genres.map((g) => g.name).join(", "),
//                   source: "Api",
//                 };
//               });
//             res.status(200).json(gamesNameApi.concat(gameDb));
//           } else {
//             res.json({ message: "We could not found the game :(" });
//           }
//         } catch (err) {
//           console.error(err);
//           res.sendStatus(400).json({ message: "ERROR: GAME NOT FOUNT" });
//         }
//       })
//       .catch((err) => next(err));
//   });

//       let apiCall1 = await axios.get(`https://api.rawg.io/api/games?key=83192c4258a04f328952e2dd57afc040`);
//       let apiCall2 = await axios.get(`https://api.rawg.io/api/games?key=83192c4258a04f328952e2dd57afc040&page=2`);
//       let apiCall3 = await axios.get(`https://api.rawg.io/api/games?key=83192c4258a04f328952e2dd57afc040&page=3`);
//       let apiCall4 = await axios.get(`https://api.rawg.io/api/games?key=83192c4258a04f328952e2dd57afc040&page=4`);
//       let apiCall5 = await axios.get(`https://api.rawg.io/api/games?key=83192c4258a04f328952e2dd57afc040&page=5`);
//       let apiGames = await [...apiCall1.data.results, ...apiCall2.data.results, ...apiCall3.data.results, ...apiCall4.data.results, ...apiCall5.data.results ];
//       apiGames = await apiGames && apiGames.map(game => ({
//         name: game.name,
//         description: game.description,
//         background_image: game.background_image,
//         released: game.released,
//         rating: game.rating,
//         platforms: game.platforms,
//         id: game.id,
//         genres: game.genres
//       }))
//       let dbGames = await Videogame.findAll();
//       let totalGames = await [...apiGames, ...dbGames]
//       if(!name) {
//         return res.json(totalGames);
//         } else {
//           let filtered = await totalGames.filter(g =>g.name.toLowerCase().includes(name.toLowerCase()))
//           return res.json(filtered)
//         }
//   } catch (error) {
//       return res.status(404).json({error: 'Sorry... name not found'})
//   }
// });

module.exports = router;