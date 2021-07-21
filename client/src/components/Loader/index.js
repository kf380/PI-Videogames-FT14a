import React from "react";
import "./styles.css";

const Loader = () => {
  return (
    <div className="loader">
        <div className="loading-text">
            <span> Aguarda un instante... Estamos buscando los mejores juegos para vos</span>
        </div>
        <div className="lds-roller"><div></div><div></div><div></div></div>
    </div>
  );
};

export default Loader;