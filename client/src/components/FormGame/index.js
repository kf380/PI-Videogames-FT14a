import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getGenresDb, postNewGame } from "../../redux/actions";
import "./styles.css";
import swal from "sweetalert";
// import { useForm } from "react-hook-form";
import {FcUndo} from "react-icons/fc"


const FormGame = () => {
 

  const history = useHistory();
  const handleForm = () => history.goBack();

  const initGame = {
    name: "",
    description: "",
    released: "",
    rating: 0,
    genres: [],
    platforms: "",
  };
  const [game, setGame] = useState(initGame);
  const dispatch = useDispatch();
  const genresRedux = useSelector((state) => state.genresState.genres);

  useEffect(() => {
    dispatch(getGenresDb());
  }, []);

  const gameDb = (e) => {
    e.preventDefault();
    const gameSend = {
      name: game.name,
      description: game.description,
      released: game.released,
      rating: game.rating,
      genres: game.genres,
      platforms: game.platforms,
    };
    dispatch(postNewGame(gameSend));
    e.target.reset();
    swal("Juego creado satisfactoriamente", {
      buttons: false,
      timer: 3000,
    });
  };

  const handleInputChange = (e) => {
    if (e.target.name === "genres") {
      const arr = game[e.target.name];
      setGame({
        ...game,
        [e.target.name]: arr.concat(e.target.value),
      });
    } else {
      setGame({
        ...game,
        [e.target.name]: e.target.value,
      });
    }
  };


  return (
    <div className="background">
      <header className="header_details">
        <button
          className="img"
          onClick={() => {
            history.goBack();
          }}
        >
          <FcUndo className="backhome" />
        </button>
      </header>
      <div className="container_form" >
        <form id="form_game" onSubmit={gameDb}>
          <h3>Crea tu videojuego</h3>
          <fieldset>
          
            <input
              value={game.name}
              onChange={handleInputChange}
              name="name"
              placeholder="Elegi un nombre"
              type="text"
              tabIndex="1"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <textarea
              onChange={handleInputChange}
              value={game.description}
              name="description"
              type="text"
              placeholder="Como es el juego..."
              tabIndex="2"
              autoFocus
              required
            ></textarea>
          </fieldset>
          <fieldset>
            <input
              onChange={handleInputChange}
              value={game.released}
              name="released"
              placeholder="Fecha de creacion"
              type="date"
              tabIndex="3"
              required
            />
          </fieldset>
          <fieldset>
            <input
              onChange={handleInputChange}
              value={game.rating}
              name="rating"
              placeholder="Rating"
              type="number"
              tabIndex="4"
              required
            />
          </fieldset>
          <fieldset>
            <input
              onChange={handleInputChange}
              value={game.platforms}
              name="platforms"
              placeholder="En que plataforma se puede jugar?"
              type="text"
              tabIndex="5"
              required
            ></input>
          </fieldset>
          <fieldset className="select_field">
            <label>Elegi el/los genero/s para tu juego</label>
            <span className="select_genres">
              {genresRedux.map((g) => (
                <div key={g.id}>
                  <label className="container_checkbox">
                    {g.name}
                    <input
                      tabIndex="6"
                      onChange={handleInputChange}
                      type="checkbox"
                      name="genres"
                      value={g.name}
                    ></input>
                    <span className="checkmark"></span>
                  </label>
                </div>
              ))}
            </span>
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
              onClick={handleForm}
            >
              Enviar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default FormGame;