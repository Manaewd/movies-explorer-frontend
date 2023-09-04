import React from "react";
import NavTab from "../Main/NavTab/NavTab";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";

import { savedMovies } from "../../utils/Data";

import "./SavedMovies.css";

function SavedMovies({ setMenuOpened, menuOpened, menuClosed }) {
  return (
    <>
      <main className="saved-movies">
        <NavTab setIsOpened={setMenuOpened} />
          <SearchForm />
          <ul className="saved-movies__container">
            {savedMovies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.id}
                  title={movie.title}
                  duration={movie.duration}
                  image={movie.image}
                  block="saved"
                />
              );
            })}
          </ul>
          <SideBar isOpened={menuOpened} menuClosed={menuClosed} />
        <Footer />
      </main>
    </>
  );
}

export default SavedMovies