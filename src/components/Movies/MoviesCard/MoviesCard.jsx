import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";
import "./MoviesCard.css";

export default function MoviesCard({
  movie,
  isSaved,
  onCardSave,
  onCardDelete,
  saved,
  savedMoviesList,
}) {
  const editedDuration = (minutes) => {
    if (isNaN(minutes) || minutes < 0) {
      return "Некорректное значение";
    }

    const hoursDuration = Math.floor(minutes / 60);
    const minuteDuration = minutes % 60;

    return `${hoursDuration}ч ${minuteDuration}м`;
  };

  function handleCardClick() {
    if (saved) {
      const movieDelete = savedMoviesList.find((m) => m.movieId === movie.id);
      if (movieDelete) {
        onCardDelete(movieDelete);
      }
    } else {
      onCardSave(movie);
    }
  }

  function onDelete() {
    onCardDelete(movie);
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
          src={isSaved ? movie.image : `${BASE_URL}${movie.image.url}`}
          alt={`фотокарточка фильма ${movie.nameRU}`}
          className="movie-card__img"
        />
      </Link>
      <div className="movie-card__container">
        <div className="movie-card__info">
          <h2 className="movie-card__title">{movie.nameRU}</h2>

          {isSaved ? (
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
              {saved ? null : ""}
            </button>
          )}
        </div>
        <p className="movie-card__duration">{editedDuration(movie.duration)}</p>
      </div>
    </li>
  );
}