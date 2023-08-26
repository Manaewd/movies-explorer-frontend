import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [RegSuccess, setRegSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [emailHeader, setEmailHeader] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((result) => {
          const [userData, cardsData] = result;
          setCurrentUser(userData);
          setCards(cardsData);
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then(() => {
        setRegSuccess(true);
        navigate("/signin");
      })
      .catch((err) => {
        setRegSuccess(false);
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }
  

  function handleLogin({ email, password }) {
    auth
      .login({ email, password })
      .then(() => {
        setLoggedIn(true);
        setEmailHeader(email);
      })
      .catch((err) => {
        setRegSuccess(false);
        setIsInfoTooltipOpen(true)
        console.log(err);
      });
  }

  function handleTokenCheck() {
      auth
        .checkToken()
        .then((user) => {
          setLoggedIn(true);
          setEmailHeader(user.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
        state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((newCard) => newCard.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }


  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    auth.logout()
      .then(() => {
        setLoggedIn(false);
        navigate('/signin');
      })
      .catch((err) => console.log(err));
  }

  function handleClickMenuOpen() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }


  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  const [menuOpened, setMenuOpened] = useState(false)
  const closeMenuPopup = () => {
    setMenuOpened(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <ProtectedRoute
          path="/movies"
          element={<Movies
            setMenuOpened={setMenuOpened}
            menuOpened={menuOpened}
            menuClosed={closeMenuPopup}

          />}
        />
        <ProtectedRoute
          path="/saved-movies"
          element={<SavedMovies
            setMenuOpened={setMenuOpened}
            menuOpened={menuOpened}
            menuClosed={closeMenuPopup}
          />}
        />
        <ProtectedRoute
          path="/profile"
          element={<Profile
            setMenuOpened={setMenuOpened}
            menuOpened={menuOpened}
            menuClosed={closeMenuPopup}
          />}
        />
        <Route
          path="/signup"
          element={<Register />}
        />
        <Route
          path="/signin"
          element={<Login />}
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