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
  
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    tokenCheck();
    navigate(path);
  }, []);

  useEffect(() => {
    setErrorMessage("");
    setSuccessMessage("");
    tokenCheck();
    console.log(path);
  }, [path]);

  useEffect(() => {
    setIsLoader(true);
      Promise.all([
        mainApi.getUserInfo(),
        moviesApi.getMovies(),
      ])
        .then((result) => {
          const [userData, moviesData] = result;
          setCurrentUser(userData);
          setSavedMoviesList(moviesData);
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

  function handleLogin( email, password ) {
    setErrorMessage("");
    mainApi
      .login( email, password )
      .then((data) => {
        console.log(data);
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          console.log(data.token);
          setCurrentUser(data);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleRegister( name, email, password ) {
    setErrorMessage("");
    setIsLoader(true);
    mainApi
      .register( name, email, password )
      .then(() => {
        handleLogin(email, password)
        setLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    localStorage.clear();
    navigate("/", { replace: true });
    setLoggedIn(false);
  }

  function updateUserProfile(movie) {
    setErrorMessage("");
    setSuccessMessage("");
    mainApi
      .updateUser(movie)
      .then((value) => {
        setErrorMessage("Изменения сохранены.");
        setCurrentUser(value);
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {});
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header
          isOpen={isMobileMenuOpen}
          loggedIn={loggedIn}
        />
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Movies}
                isLoader={isLoader}
                savedMoviesList={savedMoviesList}
                onCardSave={handleMovieLike}
                onCardDelete={handleMovieDelete}
            />    
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMoviesList={savedMoviesList}
                onCardSave={handleMovieLike}
                onCardDelete={handleMovieDelete}
              />           
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                  element={Profile}
                  loggedIn={loggedIn}
                  onSignOut={handleLogout}
                  onUpdateUser={updateUserProfile}
                  errorMessage={errorMessage}
                  successMessage={successMessage}
              />     
            }
          />
          <Route
            path="/signup"
            element={
              <Register onRegister={handleRegister} errorMessage={errorMessage} />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} errorMessage={errorMessage} />}
          />
          <Route
              path="*"
              element={<PageNotFound />}
            />
        </Routes>

        <InfoTooltip
          name={"success"}        
          isOpen={isInfoTooltipOpen}
          textIsSuccessTrue={"Успешно"}
          textIsSuccessFalse={"Во время запроса произошла ошибка"}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
