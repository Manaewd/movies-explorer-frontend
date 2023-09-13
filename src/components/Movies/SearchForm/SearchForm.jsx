import { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  onSearch,
  isSaved,
  isShortMoviesChecked,
  isSaveShortMovChecked,
  onShortMoviesChange,
  onShortMovieSavChange,
}) {
  const [query, setQuery] = useState("");
  const [shortMovies, setShortMovies] = useState(isShortMoviesChecked);

  useEffect(() => {
    if (isSaved) {
      const saveQuerySavMovies = localStorage.getItem("searchSavedQuery");
      if (saveQuerySavMovies) {
        setQuery(saveQuerySavMovies);
      }

      const saveShortSaveMovie = localStorage.getItem(
        "isSavedShortMoviesChecked"
      );
      if (saveShortSaveMovie) {
        setShortMovies(saveShortSaveMovie === "true");
      }
    } else {
      const saveQuery = localStorage.getItem("searchQuery");
      if (saveQuery) {
        setQuery(saveQuery);
      }

      const savedShortMovie = localStorage.getItem("isShortMoviesChecked");
      if (savedShortMovie) {
        setShortMovies(savedShortMovie === "true");
      }
    }
  }, []);

  useEffect(() => {
    setShortMovies(isShortMoviesChecked);
  }, [isShortMoviesChecked]);

  useEffect(() => {
    setShortMovies(isSaveShortMovChecked);
  }, [isSaveShortMovChecked]);

  function handleChangeSearch(e) {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (isSaved) {
      localStorage.setItem("searchSavedQuery", newQuery);
    } else {
      localStorage.setItem("searchQuery", newQuery);
    }
  }

  function checkboxChange() {
    const newShortMovie = !shortMovies;
    setShortMovies(newShortMovie);
    if (isSaved) {
      localStorage.setItem("isSavedShortMoviesChecked", newShortMovie);
      if (onShortMovieSavChange) {
        onShortMovieSavChange(query, newShortMovie);
      }
    } else {
      localStorage.setItem("isShortMoviesChecked", newShortMovie);
      if (onShortMoviesChange) {
        onShortMoviesChange(query, newShortMovie);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query, shortMovies);
  }

  return (
    <section className="search">
      <form
        className="search__container"
        noValidate
        name="search"
        onSubmit={handleSubmit}
      >
        <div className="search__main">
          <input
            className="search__input"
            placeholder="Фильм"
            name="search"
            type="text"
            onChange={handleChangeSearch}
            minLength="2"
            value={query || ""}
            required
          />
          <button
            type="submit"
            className="search__button"
            aria-label="Запустить поиск"
          >
            Найти
          </button>
        </div>
        <FilterCheckbox
          checkboxName="Короткометражки"
          onChange={checkboxChange}
          checked={shortMovies}
        />
      </form>
    </section>
  );
}