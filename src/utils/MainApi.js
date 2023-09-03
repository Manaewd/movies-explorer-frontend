import { BASE_URL, NO_MOVIE_DATA } from "./constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res);
    // return res.json().then(res => { throw res });
    return Promise.reject(`Что-то пошло не так... Ошибка: ${res.status}`);
  }

  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._checkResponse(res));
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkResponse(res));
  }

  // - Метод запроса данных пользователя с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // - Метот передачи данных пользователя на сервер
  updateUser({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // метод запроса данных карточек с сервера
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  // Метод передачи на сервер новых данных о пользователе
  addNewMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country || NO_MOVIE_DATA,
        director: movie.director || NO_MOVIE_DATA,
        duration: movie.duration || NO_MOVIE_DATA,
        year: movie.year || NO_MOVIE_DATA,
        description: movie.description || NO_MOVIE_DATA,
        image: `${BASE_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU || NO_MOVIE_DATA,
        nameEN: movie.nameEN || NO_MOVIE_DATA,
        thumbnail: `${BASE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }),
    }).then((res) => this._checkResponse(res));
  }

  // Метод удаления карточки с сервера
  deleteCard(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.manaewdiploma.nomoredomains.xyz",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;