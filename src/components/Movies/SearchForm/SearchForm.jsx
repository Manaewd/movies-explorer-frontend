import React from "react";

import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__container">
        <div className="search__main">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            minLength='2'
            required
          />
          <button type="submit" className="search__button" aria-label='Запустить поиск'>Найти</button>
        </div>
        <FilterCheckbox checkboxName="Короткометражки" />
      </form>
    </section>
  );
}