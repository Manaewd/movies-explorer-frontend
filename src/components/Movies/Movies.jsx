import React, { useState } from "react";

import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";

export default function Movies({
  movies,
  savedMoviesList,
  onCardSave,
  onCardDelete,
}) {
  const [checkMovies, setCheckMovies] = useState([]);

  const searchMovies = (checkMovies) => {
    setCheckMovies(checkMovies);
  };

  return (
    <>
      <main className="movies">
        <SearchForm
          onSearch={searchMovies}
          movies={movies}
          savedMoviesList={savedMoviesList}
        />
        <MoviesCardList
          movies={checkMovies.length > 0 ? checkMovies : movies}
          savedMoviesList={
            checkMovies.length > 0 ? checkMovies : savedMoviesList
          }
          onCardSave={onCardSave}
          isSaved={false}
          onCardDelete={onCardDelete}
        />
      </main>
      <Footer />
    </>
  );
}