import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { filterMovies, filterDuration } from '../../utils/utils';

function SavedMovies({ isSavedMovies, userMovies, onMovieDelete }) {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isShorts, setIsShorts] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isNotFound, setIsNotFound] = useState(false);

    function handleFilterShorts() {
        setIsShorts(!isShorts);
    }

    function onSearchMovies(query) {
        setSearchQuery(query);
    }

    useEffect(() => {
        const moviesList = filterMovies(userMovies, searchQuery);
        setFilteredMovies(isShorts ? filterDuration(moviesList) : moviesList);
    }, [userMovies, isShorts, searchQuery]);
    
    useEffect(() => {
        if (filteredMovies.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }
    }, [filteredMovies]);

    return (
        <>
        <main className="saved-movies">
            <SearchForm
                isSavedMovies={isSavedMovies}
                onSearch={onSearchMovies}
                onFilterShorts={handleFilterShorts}
            />
            <MoviesCardList
                userMovies={userMovies}
                moviesData={filteredMovies}
                isSavedMovies={isSavedMovies}
                onMovieDelete={onMovieDelete}
                isNotFound={isNotFound}
            />
        </main>
        <Footer />
        </>
    );
}

export default SavedMovies;