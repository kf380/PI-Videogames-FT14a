import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import pes from "../../image/pes.jpg";
import games from "../../image/games.png";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import { getGamesById } from "./../../redux/actions";
import "./styles.css";

const CardDetails = ({ id }) => {
  let history = useHistory();

  const dispatch = useDispatch();
  const { gamesId, loading, error } = useSelector((state) => state.gamesById);
  console.log(error);

  useEffect(() => {
    dispatch(getGamesById(id));
  }, []);

  return (
    <>
    {loading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
     
        <>
          <header className="header_details">
            <button
              className="img"
              onClick={() => {
                history.goBack();
              }}
            >
              <img src={games} alt="logo" />
            </button>
          </header>
          <div className="full">
            <h1>{gamesId.name}</h1>
            <div className="">
              <figure className="image_div">
                <img
                  src={gamesId.image ? gamesId.image : pes}
                  alt="no found"
                />
              </figure>
              <div className="">
                <h2>Descripcion</h2>
                <p>{gamesId.description}</p>
              </div>
              <div className="">
                <h2>Fecha de creacion</h2>
                <p>{gamesId.released}</p>
              </div>
              <div className="">
                <div className="">
                  <h2>Generos</h2>
                  {gamesId.genres &&
                    gamesId.genres.map((g) => {
                      return <p>{g.name}</p>;
                    })}
                </div>
              </div>
              <div className="">
                <div className="">
                  <h2>Plataformas</h2>
                  <p>{gamesId.platforms}</p>
                </div>
                <div className="">
                  <div className="">
                    <h2>Rating</h2>
                    <p>{gamesId.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CardDetails;