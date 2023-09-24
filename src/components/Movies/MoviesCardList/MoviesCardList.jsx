import { useEffect, useState } from "react";
import './MoviesCardList.css';

import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
    DESKTOP_ADDITIONAL_MOVIES,
    MOBILE_ADDITIONAL_MOVIES,
    TAB_ADDITIONAL_MOVIES,
    DESKTOP_MOVIES,
    TAB_MOVIES,
    MOBILE_MOVIES,
    SCREEN_LARGE,
    SCREEN_MIDDLE
} from '../../../utils/constants';

function MoviesCardList({
    isSavedMovies,
    moviesData,
    isLoading,
    isNotFound,
    onMovieSave,
    userMovies,
    onMovieDelete
}) {
    const [movies, setMovies] = useState(moviesData);
    const [shownMovies, setShownMovies] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);

    function showMovies() {
            if (width > SCREEN_LARGE) {
                setShownMovies(DESKTOP_MOVIES);
            } else if (width > SCREEN_MIDDLE) {
                setShownMovies(TAB_MOVIES);
            } else if (width <= SCREEN_MIDDLE) {
                setShownMovies(MOBILE_MOVIES);
            }
     }

    useEffect(() => {
        const handleResizeWindow = () => {
            setWidth(window.innerWidth);
            showMovies();
        }
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    useEffect(() => {
        setMovies(moviesData);
        setShownMovies(0);
        showMovies();
    }, [moviesData]);

    function loadMovies() {
        if (width > SCREEN_LARGE) {
            setShownMovies(shownMovies + DESKTOP_ADDITIONAL_MOVIES);
        } else if (width > SCREEN_MIDDLE) {
            setShownMovies(shownMovies + TAB_ADDITIONAL_MOVIES);
        } else if (width <= SCREEN_MIDDLE) {
            setShownMovies(shownMovies + MOBILE_ADDITIONAL_MOVIES);
        }
    }

    function getSavedMovies(userMovies, movie) {
        return userMovies.find((userMovie) => userMovie.movieId === movie.id);
    }

    return (
        <section className='movies-card-list'>
            {movies.length > 0 ? (
                <ul className='movies-card-list__container'>
                    {isSavedMovies ? (
                        movies.map((movie) => (
                            <MoviesCard
                                key={isSavedMovies ? movie._id : movie.id}
                                userMovies={userMovies}
                                movie={movie}
                                isSavedMovies={isSavedMovies}
                                onMovieSave={onMovieSave}
                                onMovieDelete={onMovieDelete}
                                saved={getSavedMovies(userMovies, movie)}
                            />
                        ))) : (movies.slice(0, shownMovies).map((movie) => (
                            <MoviesCard
                                key={isSavedMovies ? movie._id : movie.id}
                                userMovies={userMovies}
                                movie={movie}
                                isSavedMovies={isSavedMovies}
                                onMovieSave={onMovieSave}
                                onMovieDelete={onMovieDelete}
                                saved={getSavedMovies(userMovies, movie)}
                            />
                        )))}
                </ul>
            ) : (
                isNotFound && !isLoading && <p className='movies-card-list__notfound'>Ничего не найдено</p>
            )}
            {movies.length > shownMovies && !isSavedMovies && (
                <button type='button' className='movies-card-list__button' onClick={loadMovies}>Ещё</button>
            )}
        </section>
    );
};

export default MoviesCardList;