import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";
import "./SavedMovies.css";

function SavedMovies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [savedMoviesSearchQuery, setSavedMoviesSearchQuery] = useState("");
  const [isSaveShortMovChecked, setIsSaveShortMovChecked] = useState(false);

  function filterMovies(savedMoviesSearchQuery, shortMovies) {
    const filteredMovies = savedMoviesList.filter((movie) => {
      const lowerCaseQuery = savedMoviesSearchQuery.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) ||
          nameENLowerCase.includes(lowerCaseQuery)) &&
        (!shortMovies ||
          (shortMovies && movie.duration <= SHORT_MOVIE_DURATION))
      );
    });
    setFilteredMovies(filteredMovies);
    return filteredMovies || [];
  }

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      const savedSearchQuery = localStorage.getItem("searchSavedQuery");
      const savedIsShortMoviesChecked = localStorage.getItem(
        "isSavedShortMoviesChecked"
      );

      const initialSearchQuery = savedSearchQuery || "";
      setSavedMoviesSearchQuery(initialSearchQuery);

      const initialIsShortMoviesChecked = savedIsShortMoviesChecked === "true";
      setIsSaveShortMovChecked(initialIsShortMoviesChecked);

      const filteredMovies = filterMovies(
        initialSearchQuery,
        initialIsShortMoviesChecked
      );
      setIsSearchEmpty(filteredMovies.length === 0);
      localStorage.setItem("isSearchEmpty", filteredMovies.length === 0);
    }
  }, [location, savedMoviesList]);

  function handleSearch(savedMoviesSearchQuery, shortMovies) {
    console.log(savedMoviesSearchQuery, shortMovies);
    const filteredMovies = filterMovies(savedMoviesSearchQuery, shortMovies);
    console.log("filterMovie", filteredMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem("isSearchEmpty", filteredMovies.length === 0);
  }

  function handleShortMoviesChange(query, newShortMovies) {
    console.log(query, newShortMovies);
    const filteredMovies = filterMovies(query, newShortMovies);
    console.log("filterMovie", filteredMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem("isSearchEmpty", filteredMovies.length === 0);
  }

  function handleQueryChange(newQuery) {
    console.log("поиск saved movies", newQuery);
    setSavedMoviesSearchQuery(newQuery);
    localStorage.setItem("searchSavedQuery", newQuery);
  }

  return (
    <main className="saved-movies">
      <SearchForm
        onSearch={handleSearch}
        query={savedMoviesSearchQuery}
        onQueryChange={handleQueryChange}
        isSavedShortMoviesChecked={isSaveShortMovChecked}
        isSaved={true}
        onShortMovieSavChange={handleShortMoviesChange}
      />
      <ul className="saved-movies__container">
        {isSearchEmpty && <p className="movies__notfound">Ничего не найдено</p>}
        {!isSearchEmpty && (
          <MoviesCardList
            movies={movies}
            savedMoviesList={filteredMovies}
            onCardSave={onCardSave}
            onCardDelete={onCardDelete}
            isSaved={true}
          />
        )}
      </ul>
      <Footer />
    </main>
  );
}


export default SavedMovies;