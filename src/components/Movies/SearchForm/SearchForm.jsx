import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

export default function SearchForm({ movies, savedMoviesList, onSearch }) {

  const [querry, setQuerry] = useState('');
  const { pathname } = useLocation();
  const [shortMovies, setShortMovies] = useState(false);

  function handleInputChange(e) {
    setQuerry(e.target.value);
  }

  function handleChangeCheckboxState(e) {
    e.preventDefault();
    const moviesToCheck = pathname === '/movies' ? movies : savedMoviesList;
    const checkMovies = moviesToCheck.filter((movie) => {
      const lowerCaseQuery = querry.toLowerCase();
      const RuLowerCase = movie.nameRU.toLowerCase();
      const EnLowerCase = movie.nameEN.toLowerCase();
      return (
        ((RuLowerCase.includes(lowerCaseQuery) ||
          EnLowerCase.includes(lowerCaseQuery))) || (shortMovies && movie.duration <= 40)
      );
    });
    onSearch(checkMovies);
  }

  return (
    <section className="search">
      <form
        className="search__container"
        noValidate
        name='search'
        onSubmit={handleChangeCheckboxState}
      >
        <div className="search__main">
          <input
            className="search__input"
            placeholder="Фильм"
            name='search'
            type="text"
            onChange={handleInputChange}
            minLength='2'
            value={querry || ''}
            required
          />
          <button type="submit" className="search__button" aria-label='Запустить поиск'>Найти</button>
        </div>
        <FilterCheckbox
          handleShortFilms={() => setShortMovies(!shortMovies)}
          checkboxName="Короткометражки"
          shortMovies={shortMovies}
        />
      </form>
    </section>
  );
}