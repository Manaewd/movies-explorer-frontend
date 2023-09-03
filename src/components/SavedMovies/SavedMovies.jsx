import { useState } from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
// import NavTab from "../Main/NavTab/NavTab";
import SearchForm from "../Movies/SearchForm/SearchForm";
// import SideBar from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

import "./SavedMovies.css";

function SavedMovies({ movies,savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  const onSearch = (filteredMovies) => {
    setFilteredMovies(filteredMovies);
  };

  return (
    <>
      <main className="saved-movies">
        {/* <NavTab setIsOpened={setMenuOpened} /> */}
          <SearchForm
            savedMoviesList={savedMoviesList}
            onSearch={onSearch}
          />
          <ul className="saved-movies__container">
          <MoviesCardList
            movies={filteredMovies.length > 0 ? filteredMovies : movies}
            savedMoviesList={filteredMovies.length > 0 ? filteredMovies : savedMoviesList}
            onCardSave={onCardSave}
            onCardDelete={onCardDelete}
            isSaved={true}
          />
          </ul>
          {/* <SideBar isOpened={menuOpened} menuClosed={menuClosed} /> */}
        <Footer />
      </main>
    </>
  );
}

export default SavedMovies