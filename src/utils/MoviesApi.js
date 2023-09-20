import { BASE_URL } from "./constants";

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});