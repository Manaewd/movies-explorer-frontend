import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies() {
    return(
        <>
            <Header loggedIn="true" />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </>
    )
}

export default SavedMovies