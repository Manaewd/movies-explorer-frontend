import React from "react";

import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__main">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            minLength='2'
            required
          />
          <button type="submit" className="search__button" aria-label='Запустить поиск'>Найти</button>
        </form>
      </div>
      <FilterCheckbox checkboxName="Короткометражки" />
    </section>
  );
}