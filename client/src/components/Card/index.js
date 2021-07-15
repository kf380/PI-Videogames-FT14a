import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";
import pes from "../../image/pes.jpg";

const Card = ({ data }) => {
  let history = useHistory();
  const handleGetId = () => history.push(`/details/${data.id}`);

  return (
    <div className="card">
      <div className="image">
        <img src={data.image ? data.image : pes} alt="no found" />
      </div>
      <div className="detail">
        <h3>{data.name}</h3>
        <p>{data.genres && data.genres}</p>
        <div>
          <button onClick={handleGetId} type="submit">
            Mas información
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;