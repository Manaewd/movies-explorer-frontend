import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from '../Movies/Preloader/Preloader';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import "./Movies.css";
import {
  SHORT_MOVIE_DURATION,
  ERROR_SEARCH_TEXT
} from '../../utils/constants'

export default function Movies({
  movies,
  savedMoviesList,
  onCardSave,
  onCardDelete,
  isLoader
}) {
  
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [query, setQuery] = useState('');
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);

  
  function filteredMovie(query, shortMovies) {
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!shortMovies || (shortMovies && movie.duration <= SHORT_MOVIE_DURATION))
      );
    });
    setFilteredMovies(filteredMovies);
    return filteredMovies || [];
  }

  useEffect(() => {
    if (location.pathname === '/movies') {
      const saveSearchQuery = localStorage.getItem('searchQuery');
      const saveIsShortMovChecked = localStorage.getItem('isShortMoviesChecked');

      const initialSearchQuery = saveSearchQuery || '';
      setQuery(initialSearchQuery);

      const initialIsShortMoviesChecked = saveIsShortMovChecked === 'true';
      setIsShortMoviesChecked(initialIsShortMoviesChecked);

      filteredMovie(initialSearchQuery, initialIsShortMoviesChecked);
    }
  }, [location, movies]);

  function handleSearch(query, shortMovies) {
    const filteredMovies = filteredMovie(query, shortMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
  }

  function handleShortMoviesChange(query, newShortMovies) {
    const filteredMovies = filteredMovie(query, newShortMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
  }

  function handleQueryChange(newQuery) {
    setQuery(newQuery);
    localStorage.setItem('searchQuery', newQuery);
  }

  return (
    <>
      <main className="movies">
        <Preloader isLoader={isLoader} />
        <SearchForm
          onSearch={handleSearch}
          query={query}
          onQueryChange={handleQueryChange}
          isShortMoviesChecked={isShortMoviesChecked}
          isSaved={false}
          onShortMoviesChange={handleShortMoviesChange}
        />
        {isSearchEmpty && (
        <p className="movies__notfound">{ERROR_SEARCH_TEXT}</p>
        )}
        {!isSearchEmpty && (
        <MoviesCardList
          movies={filteredMovies}
          savedMoviesList={savedMoviesList}
          onCardSave={onCardSave}
          isSaved={false}
          onCardDelete={onCardDelete}
        />
        )}
      </main>
      <Footer />
    </>
  );
}