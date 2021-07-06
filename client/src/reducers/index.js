import {GET_VIDEOGAMES,
        SEARCH_VIDEOGAMES, 
        GET_VIDEOGAME_BY_ID,
        GET_GENRES, 
        CREATE_VIDEOGAME} from '../Actions/index';

const initialState = {
  videogames: [],
  genres: [],
  createVideogame: null,
  searchVideogameById: [],
  searchVideogameByName: [],
  
};
  
function rootReducer(state = initialState, action) {
  switch (action.type) {

    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };
  
    case SEARCH_VIDEOGAMES:
      return {
        ...state,
        searchVideogameByName: action.payload,
        
      };
    
    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        searchVideogameById: action.payload,
      };
  
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
  
    case CREATE_VIDEOGAME:
      return {
        ...state,
        createVideogame: action.payload,
      };    
  
    default:
      return state;
  }
};

export default rootReducer;
