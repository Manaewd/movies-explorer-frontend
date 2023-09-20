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
  addNewMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        country: data.country || NO_MOVIE_DATA,
        director: data.director || NO_MOVIE_DATA,
        duration: data.duration || NO_MOVIE_DATA,
        year: data.year || NO_MOVIE_DATA,
        description: data.description || NO_MOVIE_DATA,
        image: `${BASE_URL}${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `${BASE_URL}${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU || NO_MOVIE_DATA,
        nameEN: data.nameEN || NO_MOVIE_DATA,
        
        
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
  // baseUrl: "http://localhost:3000",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;

