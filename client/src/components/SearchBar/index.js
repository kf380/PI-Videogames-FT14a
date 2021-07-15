import React, { useState } from "react";
import { searchGamesQuery } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./styles.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const limitPerPage = 15;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch("");
    dispatch(searchGamesQuery(search, { limit: limitPerPage }));
  };
  return (
    <form className="wrap" onSubmit={handleSubmit}>
      <div className="search">
        <input
          className="searchTerm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca el juego que mas te gusta..."
          type="text"
        ></input>
        <button className="searchButton" name="name" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;