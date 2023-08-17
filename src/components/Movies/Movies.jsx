import React from "react";

import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCard from "./MoviesCard/MoviesCard";
import { initialMovies } from "../../utils/Data";
import NavTab from "../Main/NavTab/NavTab";
import SideBar from "../SideBar/SideBar";

export default function Movies({ setMenuOpened, menuOpened, menuClosed }) {
  return (
    <section className="movies">
      <NavTab setIsOpened={setMenuOpened} />
        <SearchForm />
        <ul className="movies__items">
          {initialMovies.map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                title={movie.title}
                duration={movie.duration}
                image={movie.image}
                block="general"
              />
            );
          })}
        </ul>
        <button type="button" className="button__more" aria-label="Еще фильмы">
          Ещё
        </button>
        <SideBar isOpened={menuOpened} menuClosed={menuClosed} />
      <Footer />
    </section>
  );
}