import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_ID'
export const GET_GENRES = 'GET_GENRES'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'




export function getVideogames() {
    return (dispatch) => {
        axios.get('http://localhost:3001/videogames')
            .then(res => {
                dispatch({type: GET_VIDEOGAMES, payload: res.data});
            })
    }
}

export function searchVideogames(name) {
    return(dispatch) => {
        axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(res => {
                dispatch({type: SEARCH_VIDEOGAMES, payload: res.data})
            })
    }
}

export function getVideogameById(id) {
    return(dispatch) => {
        axios.get(`http://localhost:3001/videogame/${id}`)
            .then(res => {
                dispatch({type: GET_VIDEOGAME_BY_ID, payload: res.data}) 
            })
    }
}

export function getGenres() {
    return (dispatch) => {
        axios.get('http://localhost:3001/genres')
            .then(res => {
                dispatch({type: GET_GENRES, payload: res.data})
            })
    }
}

export function createVideogame(obj) {
    return (dispatch) =>
        axios.post('http://localhost:3001/videogame', obj)
        .then((res) => {
          dispatch({type: CREATE_VIDEOGAME, payload: res.data});
        });
}
