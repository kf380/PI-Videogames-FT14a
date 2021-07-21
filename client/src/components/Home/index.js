import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getAllGames } from "../../redux/actions";

import "./styles.css";
import games1 from "../../image/games1.png";

import {FcUndo} from "react-icons/fc"


import SearchBar from "../SearchBar";
import Cards from "../Cards";
import { Pagination } from "../Pagination";
import Order from "../Order";
import Filter from "../Filter";

const Home = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const handleClick = () => history.push("/");
  const handleGame = () => history.push("/form");

  // Redux States
  const { games, loading, error } = useSelector((state) => state.gamesState);

  const filterBy = useSelector((state) => state.filterBy);
  const orderBy = useSelector((state) => state.orderBy);
  const filterGames = useSelector((state) => state.filterGames);
  let allGames;

  useEffect( () => {
    dispatch(getAllGames());
  }, []);

  filterBy === "Filter By" && orderBy === "Order By"
    ? (allGames = games.slice())
    : (allGames = filterGames.slice());

  const pagination = (e, nro) => {
    e.preventDefault();
    setCurrentPage(nro);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage] = useState(15);
  const indexLastPage = currentPage * cardPerPage;
  const indexFirtsPage = indexLastPage - cardPerPage;
  let page = allGames.slice(indexFirtsPage, indexLastPage);
  

  return (

    <div value="fondo" className="fondo">
      <header className="header">
        <button className="img" onClick={handleClick} >
      <FcUndo className="backhome" />
        </button>
        <img className="image1" src={games1} alt="logo"/>
        <img className="image2" src={games1} alt="logo"/>
        <div className="searchbar">
          <SearchBar />
        </div>
        <div className="navbar">
          <div className="contenido">
            <div className="addGame">
              <button className="button_game" onClick={handleGame}>
                Crear un juego nuevo
              </button>
            </div>
            <div className="filter">
              <Filter />
            </div>
            <div className="order">
              <Order />
            </div>
          </div>
        </div>
      </header>
      <h1 className="main-title">Mira los mejores videosjuegos que tenemos para vos</h1>
      <Cards games={page} loading={loading} error={error} />
      <Pagination
        cardPerPage={cardPerPage}
        totalVideogames={allGames.length}
        pagination={pagination}
        key={"#"}
      />

    </div>
  
    
 
  )
};
export default Home;