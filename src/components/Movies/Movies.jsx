import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import { moviesApi } from "../../utils/MoviesApi";
import Preloader from "../Movies/Preloader/Preloader";
import { filterMovies, filterDuration } from '../../utils/utils';
import {
    ERROR_REQUEST_TEXT
} from '../../utils/constants';

function Movies({ isSavedMovies, userMovies, onMovieSave, onMovieDelete, onError, errorMessage }) {
    const [isLoading, setIsLoading] = useState(false);
    const [initialMovies, setInitialMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isShorts, setIsShorts] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    function handleFilterMovies(movies, query, short) {
        const moviesList = filterMovies(movies, query, short);
        setInitialMovies(moviesList);
        setFilteredMovies(short ? filterDuration(moviesList) : moviesList);
        localStorage.setItem("movies", JSON.stringify(moviesList));
        localStorage.setItem("allMovies", JSON.stringify(movies));
    }

    function handleFilterShorts() {
        setIsShorts(!isShorts);
        if (!isShorts) {
        if (filterDuration(initialMovies).length === 0) {
            setFilteredMovies(filterDuration(initialMovies));
        } else {
            setFilteredMovies(filterDuration(initialMovies));
        }
        } else {
        setFilteredMovies(initialMovies);
        }
        localStorage.setItem("shortMovies", !isShorts);
    }

    function handleSearch(query) {
        localStorage.setItem("movieSearch", query);
        localStorage.setItem("shortMovies", isShorts);

        if (localStorage.getItem("allMovies")) {
            const movies = JSON.parse(localStorage.getItem("allMovies"));
            handleFilterMovies(movies, query, isShorts);
        } else {
            setIsLoading(true);
            moviesApi.getMovies()
                .then((cardsData) => {
                    handleFilterMovies(cardsData, query, isShorts);
                })
                    .catch((err) => {
                    onError(true);
                    errorMessage(ERROR_REQUEST_TEXT)
                    console.log(err);
                })
                    .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    useEffect(() => {
        if (localStorage.getItem("shortMovies") === "true") {
        setIsShorts(true);
        } else {
        setIsShorts(false);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("movies")) {
        const movies = JSON.parse(localStorage.getItem("movies"));
        setInitialMovies(movies);
        if (localStorage.getItem("shortMovies") === "true") {
            setFilteredMovies(filterDuration(movies));
        } else {
            setFilteredMovies(movies);
        }
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("movieSearch")) {
            if (filteredMovies.length === 0) {
                setIsNotFound(true);
            } else {
                setIsNotFound(false);
            }
        } else {
            setIsNotFound(false);
        }
    }, [filteredMovies]);

    return (
        <>
        <main className="movies">
            <Preloader isLoading={isLoading} />
            <SearchForm
                isSavedMovies={isSavedMovies}
                onSearch={handleSearch}
                onFilterShorts={handleFilterShorts}
                isShorts={isShorts}
            />
            <MoviesCardList
                userMovies={userMovies}
                moviesData={filteredMovies}
                isSavedMovies={isSavedMovies}
                isLoading={isLoading}
                isNotFound={isNotFound}
                onMovieSave={onMovieSave}
                onMovieDelete={onMovieDelete}
            />
        </main>
        <Footer />
        </>
    );
}

export default Movies;
