import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import landing from './../../image/landing.png'

export default function Landing() {
    return (
      <div className="container">
      <img src={landing} alt="portada"/>
      <h2 className="init_title">Bienvenidos al mejor sitio de videojuegos!</h2>
      <Link to="/home">
        <button className="button" type="submit"> 
        Ingresa </button>
      </Link>
  </div>
      
    );
  }