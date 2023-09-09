import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const [isLoader, setIsLoader] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [movies, setMovies] = useState([]);

  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    setIsLoader(true);
      Promise.all([
        mainApi.getUserInfo(),
        moviesApi.getMovies(),
      ])
        .then((result) => {
          const [userData, moviesData] = result;
          setCurrentUser(userData);
          setMovies(moviesData);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoader(false));
  }, [loggedIn]);

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
      .checkToken(jwt)
      .then((data) => {
        setCurrentUser(data)
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }

  function handleLogin({ email, password }) {
    setIsLoader(true);
    mainApi
      .login({ email, password })
      .then(() => {
        setLoggedIn(true);
        navigate("/movies", { replace: true });
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleRegister({ name, email, password }) {
    setIsLoader(true);
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



  function handleLogout() {
    mainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function updateUserProfile({ name, email }) {
    setIsLoader(true);
    mainApi
      .updateUser({ name, email })
      .then(({ name, email }) => {
        setCurrentUser({ name, email });
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => setIsLoader(false));
  }

  function handleMovieDelete(movie) {
    setIsLoader(true);
    mainApi
      .deleteCard(movie._id)
      .then(() => {
        setSavedMoviesList((state) =>
          state.filter((item) => item._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoader(false));
  }

  function handleMovieLike(movie) {
    setIsLoader(true);
    mainApi
      .addNewMovie(movie)
      .then((data) => {
        const newMovie = data;
        setSavedMoviesList([newMovie, ...savedMoviesList]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMenuOpen() {
    setIsMobileMenuOpen(true);
  }

  function closeAllPopups() {
    setIsMobileMenuOpen(false);
    setIsInfoTooltipOpen(false);
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
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Movies
                  movies={movies}
                  savedMoviesList={savedMoviesList}
                  onCardSave={handleMovieLike}
                  onCardDelete={handleMovieDelete}
                />
            </ProtectedRouteElement>    
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <SavedMovies
                  movies={movies}
                  savedMoviesList={savedMoviesList}
                  onCardSave={handleMovieLike}
                  onCardDelete={handleMovieDelete}
                />
              </ProtectedRouteElement>           
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <Profile
                  onSignOut={handleLogout}
                  onUpdateUser={updateUserProfile}
                  isLoader={isLoader}
                />
            </ProtectedRouteElement>     
            }
          />
          <Route
            path="/signup"
            element={
              <Register onRegister={handleRegister} isLoader={isLoader} />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} isLoader={isLoader} />}
          />
          <Route
              path="*"
              element={<PageNotFound />}
            />
        </Routes>

        <InfoTooltip
          name={"success"}
          isSuccess={isSuccess}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          textIsSuccessTrue={"Успешно"}
          textIsSuccessFalse={"Во время запроса произошла ошибка"}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
