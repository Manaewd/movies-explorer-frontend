import React, { useState } from "react";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader';

function MoviesCardList( {cards, buttonMore} ) {
  const [isLoading, setLoading] = useState(false);

  function handlePreloader() {
    setLoading(true);
  };

    return (
        <section className="cards">
        <ul>
          {cards.map((card) => (
            <MoviesCard
            card={card}
            key={card._id}
            />
          ))}
          </ul>

          {isLoading ? (
        <Preloader />
      ) : (
        buttonMore && (
          <div className="cards__button-container">
            <button className="cards__button" type="button" name="more" onClick={handlePreloader}>Ещё</button>
          </div>
        )
      )}
        </section>
    );
  }

export default MoviesCardList;