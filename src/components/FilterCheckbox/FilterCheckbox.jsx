import React from "react";

import "./FilterCheckbox.css";

export default function FilterCheckbox({ handleShortFilms, shortMovies }) {
  return (
    <div className="checkbox">
      <label className="checkbox__container">
        <input
          className="checkbox__input"
          type="checkbox"
          onChange={handleShortFilms}
          checked={shortMovies}
        />
        <span className="checkbox__span" />
      </label>
      <p className="checkbox__name">Короткометражки</p>
    </div>
  );
}