import { MOVIES_API_URL } from "./constants";

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // _checkResponse(promise) {
  //     return promise.then((res) => {
  //         if (res.ok) {
  //             return res.json();
  //         }
  //         else {
  //             return Promise.reject(`Ошибка: ${res.status}: ${res.statusText}`);
  //         }
  //     })
  //         .then((result) => {
  //             return result;
  //         })
  // }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;