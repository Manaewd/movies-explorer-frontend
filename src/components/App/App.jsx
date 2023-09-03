import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Header from '../Header/Header';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  // const [isLoader, setIsLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies(), mainApi.getSavedMovies()])
        .then((result) => {
          const [userData, moviesData, moviesSavedData] = result;
          setCurrentUser(userData)
          setMovies(moviesData)
          setSavedMoviesList(moviesSavedData)
          navigate('/movies');
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleLogin({ email, password }) {
    mainApi
      .login({ email, password })
      .then(() => {
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleRegister({ name, email, password }) {
    mainApi
      .register({ name, email, password })
      .then(() => {
        setLoggedIn(true);
        navigate("/movies");
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }
  

  function tokenCheck() {
    mainApi
        .checkToken()
        .then(() => {
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
  }

  function handleLogout() {
    mainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function updateUserProfile({ name, email }) {
    mainApi
      .updateUser({ name, email })
      .then(({ name, email }) => {
        // const {email, name} = newUser
        setCurrentUser({ name, email })
        setIsSuccess(true)
      })
      .catch((err) => {
        console.log(err)
        setIsSuccess(false)
      })
  }

  function handleMovieDelete(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMoviesList((state) => state.filter((item) => item._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieLike(movie) {
    mainApi
      .addNewMovie(movie)
      .then((data) => {
        const newMovie = data;
        setSavedMoviesList([newMovie, ...savedMoviesList]);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleMenuOpen() {
    setIsMobileMenuOpen(true)
  }

  function closeAllPopups() {
    setIsMobileMenuOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Header
        isOpen={isMobileMenuOpen}
        onMenuOpen={handleMenuOpen}
        onClose={closeAllPopups}
        loggedIn={loggedIn}
      />
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/movies"
          element={
          <Movies
            // element={Movies}
            movies={movies}
            savedMoviesList={savedMoviesList}
            onCardSave={handleMovieLike}
          />
        }
        />
        <Route
          path="/saved-movies"
          element={
          <SavedMovies
            // element={SavedMovies}
            movies={movies}
            savedMoviesList={savedMoviesList}
            onCardSave={handleMovieLike}
            onCardDelete={handleMovieDelete}
          />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              // element={Profile}
              onSignOut={handleLogout}
              onUpdateUser={updateUserProfile}
          />}
        />
        <Route
          path="/signup"
          element=
            {<Register
              onRegister={handleRegister}
            />}
        />
        <Route
          path="/signin"
          element=
            {<Login
              onLogin={handleLogin}
            />}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
};

export default App;