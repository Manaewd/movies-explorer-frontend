import { Link } from "react-router-dom";
import React from 'react';
import './MoviesCard.css';

function MoviesCard({
  userMovies,
  movie,
  saved,
  isSavedMovies,
  onMovieSave,
  onMovieDelete
}) {
  const image = isSavedMovies ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`;

  function editedDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }
  
  function handleCardClick() {
    if (saved) {
      onMovieDelete(userMovies.filter((m) => m.movieId === movie.id)[0]);
    } else {
      onMovieSave(movie);
    }
  }

  function onDelete() {
      onMovieDelete(movie);
  }

    const cardSaveButtonClassName = `${
    saved
      ? "movie-card__save-button movie-card__save-button_saved"
      : "movie-card__save-button"
  }`;

  return (
    <li className="movie-card">
      <Link
        className="movie-card__link"
        to={`${movie.trailerLink}`}
        target="_blank"
      >
        <img
          src={image}
          alt={`фотокарточка фильма ${movie.nameRU}`}
          className="movie-card__img"
        />
      </Link>
      <div className="movie-card__container">
        <div className="movie-card__info">
          <h2 className="movie-card__title">{movie.nameRU}</h2>
          {isSavedMovies ? (
            <button
              type="button"
              className="movie-card__remove-button"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              className={cardSaveButtonClassName}
              onClick={handleCardClick}
            >
            </button>
          )}
        </div>
        <p className="movie-card__duration">{editedDuration(movie.duration)}</p>
      </div>
    </li>
  );
};

export default MoviesCard;