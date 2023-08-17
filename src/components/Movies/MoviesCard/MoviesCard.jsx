import React, { useState } from "react";

import "./MoviesCard.css";

export default function MoviesCard({
  isMovieSaved,
  title,
  duration,
  image,
  block,
}) {
  const [isSaved, setIsSaved] = useState(isMovieSaved);

  const handleSaveMovie = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="movie-card">
      <img className="movie-card__img" src={image} alt="Кадр из фильма" />
      <div className="movies-card__container">
        <div className="movie-card__info">
          <h2 className="movie-card__title">{title}</h2>
          {block === "general" ? (
          <button
            className={`movie-card__save-button ${
              isSaved ? "movie-card__save-button_saved" : ""
            }`}
            type="button"
            onClick={handleSaveMovie}
          />
        ) : (
          <button className={"movie-card__remove-button"} type="button" />
        )}
        </div>
        <p className="movie-card__duration">{duration}</p>
      </div>
    </div>
  );
}