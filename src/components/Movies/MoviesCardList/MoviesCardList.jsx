import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import {
  SCREEN_LARGE,
  SCREEN_MIDDLE,
  DESKTOP_MOVIES,
  TAB_MOVIES,
  MOBILE_MOVIES,
  DESKTOP_ADDITIONAL_MOVIES,
  TAB_ADDITIONAL_MOVIES,
  MOBILE_ADDITIONAL_MOVIES,
} from "../../../utils/constants";

export default function MoviesCardList({
  movies,
  savedMoviesList,
  onCardSave,
  onCardDelete,
  isSaved,
}) {
  const { pathname } = useLocation();
  const [cardsToShow, setCardsToShow] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      let newCardsToShow;

      if (window.innerWidth >= SCREEN_LARGE) {
        newCardsToShow = DESKTOP_MOVIES;
      } else if (window.innerWidth >= SCREEN_MIDDLE) {
        newCardsToShow = TAB_MOVIES;
      } else {
        newCardsToShow = MOBILE_MOVIES;
      }

      setCardsToShow(newCardsToShow);
    };

    const throttledResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 250);
    };

    let resizeTimer;
    window.addEventListener("resize", throttledResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);

  const loadMovies = () => {
    if (window.innerWidth >= SCREEN_LARGE) {
      setCardsToShow((prevCards) => prevCards + DESKTOP_ADDITIONAL_MOVIES);
    } else if (window.innerWidth >= SCREEN_MIDDLE) {
      setCardsToShow((prevCards) => prevCards + TAB_ADDITIONAL_MOVIES);
    } else {
      setCardsToShow((prevCards) => prevCards + MOBILE_ADDITIONAL_MOVIES);
    }
  };

  function getSavedMovies(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  }

  return (
    <section className="movies-card-list">
      {pathname === "/movies" ? (
        <ul className="movies-card-list__container">
          {movies.slice(0, cardsToShow).map((movie) => (
            <MoviesCard
              key={isSaved ? movie._id : movie.id}
              movie={movie}
              saved={getSavedMovies(savedMoviesList, movie)}
              savedMoviesList={savedMoviesList}
              isSaved={isSaved}
              onCardSave={onCardSave}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      ) : (
        <ul className="movies-card-list__container">
          {savedMoviesList.slice(0, cardsToShow).map((movie) => (
            <MoviesCard
              key={isSaved ? movie._id : movie.id}
              movie={movie}
              onCardDelete={onCardDelete}
              saved={getSavedMovies(savedMoviesList, movie)}
              isSaved={isSaved}
              savedMoviesList={savedMoviesList}
              onCardSave={onCardSave}
            />
          ))}
        </ul>
      )}
      {pathname === "/movies" && cardsToShow < movies.length ? (
        <button className="movies__button" onClick={loadMovies}>
          Ещё
        </button>
      ) : null}
    </section>
  );
}
