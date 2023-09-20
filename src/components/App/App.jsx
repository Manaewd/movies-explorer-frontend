import { useEffect, useState } from "react";
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
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import mainApi from "../../utils/MainApi";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userMovies, setUserMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([
        mainApi.getUserInfo(),
        mainApi.getSavedMovies(),
      ])
        .then((result) => {
          const [userData, userMovies] = result;
          setCurrentUser(userData);
          setUserMovies(userMovies);
          navigate(location, { replace: true });
        })
        .catch((err) => {
          console.log(err);
          setIsSuccess(false);
          setIsInfoToolTipOpen(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  async function handleLogin({ email, password }) {
    setIsLoading(true);
    try {
      await mainApi.login({ email, password });
      setLoggedIn(true);
      navigate("/movies", { replace: true });
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setIsInfoToolTipOpen(true);
    }
  }

  async function handleRegister({ name, email, password }) {
    try {
      await mainApi.register({ name, email, password });
      handleLogin({ email, password });
      setIsSuccess(true);
      setIsInfoToolTipOpen(true);
    } catch (err) {
      console.error(err);
      setIsLoading(false);  
    } finally {
      setIsInfoToolTipOpen(true);
    }
  }

  function tokenCheck() {
    mainApi
      .checkToken()
      .then(() => {
        setLoggedIn(true);
        navigate(location, { replace: true });
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
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function updateUserProfile({ name, email }) {
    setIsLoading(true);
    mainApi
      .updateUser({ name, email })
      .then(({ name, email }) => {
        setCurrentUser({ name, email });
        setIsSuccess(true);
        setIsInfoToolTipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoToolTipOpen(true);
      })
      .finally(() => setIsLoading(false));
  }

  function handleMovieDelete(movie) {
    mainApi
      .deleteCard(movie._id)
      .then(() => {
        setUserMovies((state) =>
          state.filter((item) => item._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleMovieLike(movie) {
    mainApi
      .addNewMovie(movie)
      .then((data) => {
        const newMovie = data;
        setUserMovies([newMovie, ...userMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleMenuOpen() {
    setIsMobileMenuOpen(true);
  }

  function closeAllPopups() {
    setIsMobileMenuOpen(false);
    setIsInfoToolTipOpen(false);
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
                  userMovies={userMovies}
                  isSavedMovies={false}
                  onError={setIsInfoToolTipOpen}
                  onMovieSave={handleMovieLike}
                  onMovieDelete={handleMovieDelete}
                  isLoader={isLoading}
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement loggedIn={loggedIn}>
                <SavedMovies
                  userMovies={userMovies}
                  isSavedMovies={true}
                  onError={setIsInfoToolTipOpen}
                  onMovieSave={handleMovieLike}
                  onMovieDelete={handleMovieDelete}
                  
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
                  isLoader={isLoading}
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/signup"
            element={
              <Register onRegister={handleRegister} isLoader={isLoading} />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} isLoader={isLoading} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <InfoTooltip
          textIsSuccessTrue={"Успешно"}
          textIsSuccessFalse={"Что-то пошло не так! Попробуйте ещё раз."}
          isSuccess={isSuccess}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;