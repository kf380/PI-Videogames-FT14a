import React from "react";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loader">
        <div className="loading-text">
            <span> Espera... Estamos buscando el mejor juego para vos</span>
        </div>
        <div className="lds-roller"><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loader;