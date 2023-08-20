import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound"

function App() {
  const [menuOpened, setMenuOpened] = useState(false)
  const closeMenuPopup = () => {
    setMenuOpened(false)
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/movies"
          element={<Movies
            setMenuOpened={setMenuOpened}
            menuOpened={menuOpened}
            menuClosed={closeMenuPopup}

          />}
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies
            setMenuOpened={setMenuOpened}
            menuOpened={menuOpened}
            menuClosed={closeMenuPopup}
          />}
        />
        <Route
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
  );
};

export default App;