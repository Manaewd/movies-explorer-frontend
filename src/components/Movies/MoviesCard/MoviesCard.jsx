import { BASE_URL } from '../../../utils/constants'
import "./MoviesCard.css";

export default function MoviesCard({
  movie,
  isSaved,
  onCardSave,
  onCardDelete,
  saved,
  savedMoviesList
}) {

  const editedDuration = (minutes) => {
    if (isNaN(minutes) || minutes < 0) {
      return 'Некорректное значение';
    }

    const hoursDuration = Math.floor(minutes / 60);
    const minuteDuration = minutes % 60;

    return `${hoursDuration}ч ${minuteDuration}м`;
  };


  function handleCardClick() {
    if (saved) {
      onCardDelete(savedMoviesList.filter((m) => m._id === movie.movieId)[0]);
    } else {
      onCardSave(movie);
    }
  }

  const cardSaveButtonClassName = `${saved ? 'movie-card__save-button movie-card__save-button_saved' : 'movie-card__save-button'
    }`;

return (
  <li className='movie-card'>
    <img
      src={isSaved ? movie.image : `${BASE_URL}${movie.image.url}`}
      alt={`фотокарточка фильма ${movie.nameRU}`}
      className='movie-card__img'
    />
      <div className='movie-card__container'>
        <div className="movie-card__info">
        <h2 className='movie-card__title'>{movie.nameRU}</h2>
      
      {isSaved ? (
        <button type="button" className="movie-card__remove-button" onClick={handleCardClick}></button>
      ) : (
        <button type="button" className={cardSaveButtonClassName} onClick={handleCardClick}>{saved ? null : ''}</button>
      )}
      </div>
      <p className='movie-card__duration'>{editedDuration(movie.duration)}</p>
      </div>
  </li>
);



}