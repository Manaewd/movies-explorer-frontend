import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Footer from '../Footer/Footer';

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound"

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
      <Route
        path="/movies"
        element={<Movies />}
      />
      <Route
        path="/saved-movies"
        element={<SavedMovies />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/sign-up"
        element={<Register />}
      />
      <Route
        path="/sign-in"
        element={<Login />}
      />
      <Route
        path="/"
        element={<Main />}
      />
      <Route
        path="*"
        element={<PageNotFound />}
      />
      </Routes>
      <Footer />

    </div>
  );
};

export default App;