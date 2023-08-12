import React from "react";
import "./SearchForm.css";

function SearchForm() {
    return (
        <div className="search">
        <form className="searchform">
            <input
              className=""
              name="film"
              type="text"
              placeholder="Фильм"
              required
            />
            <button className="searchform__button" type="submit">Найти</button>
        </form>
        <div className="searchfilter">
          <input
          className="searchfilter__checkbox"
          type="checkbox"
          />
          <span className="searchfilter__title">Короткометражки</span>
        </div>
        </div>
    )
}

export default SearchForm;