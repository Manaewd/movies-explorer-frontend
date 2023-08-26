class Api {
  //+
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    // - Метод запроса данных пользователя с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            credentials: 'include'
        })
        .then(res => this._checkResponse(res));
    }

  //+
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        console.log(res);
        return res.json().then(res => { throw res });
        // return Promise.reject(`Что-то пошло не так... Ошибка: ${res.status}`);
      }
  

  
    // - Метот передачи данных пользователя на сервер
    setUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            about: about,
          }) 
        })
        .then(res => this._checkResponse(res))
      }
    
    // метод запроса данных карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            credentials: 'include'
        })
        .then(res => this._checkResponse(res));
    }
  
  
    // Метод передачи на сервер новых данных о пользователе 
    addNewUser({ name, password, email }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => this._checkResponse(res));
    }
  
    // Метод удаления карточки с сервера
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: 'DELETE', 
          credentials: 'include',
          headers: this._headers,
        }).then(res => this._checkResponse(res));
      }
    
    // Метод отправки данных об установке/снятии лайка на сервер
    changeLikeCardStatus(id, isLiked) {
      if (isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: 'PUT',
          credentials: 'include',
          headers: this._headers,
        }).then(res => this._checkResponse(res));
      } else {
          return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
          }).then(res => this._checkResponse(res));
      }
    }
  }
  
  const mainApi = new Api({
    url: 'https://api.manaewd.nomoredomains.work',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });  
  
  export default mainApi;