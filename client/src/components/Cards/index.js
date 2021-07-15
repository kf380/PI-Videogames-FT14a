import React from "react";
// import { useHistory } from "react-router";
import Card from "../../components/Card";
import Loader from "./../Loader";
import "./styles.css";

const Cards = ({ games, loading, error }) => {
  // const history = useHistory()
  const refreshPage = () => {
    // window.location.href="/home";
    window.location.reload();
  }

  //if (error) return <h1 className="main-title">{error}</h1>;
  if (!loading && !games.length) {
    return (
      <>
        <h1 className="main-title">Disculpa, no hemos encontrado el juego</h1>
        <div>
          <button className="button"  onClick={refreshPage}>Volver al Inicio</button>
        </div>
      </>
    );
  }

  return (
    <div className="cards-container">
      <div className="cards">
        {loading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          games.map((data, id) => <Card data={data} key={id} />)
        )}
      </div>
    </div>
  );
};

export default Cards;