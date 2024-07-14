// export default class Api {
//   constructor(options) {
//     this._baseUrl = options.baseUrl;
//     this._headers = options.headers;
//   }

//   _handleResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   }

//   _handleError(err) {
//     console.error(err);
//   }

//   getInitialCards() {
//     return fetch(`${this._baseUrl}/cards`, {
//       headers: this._headers,
//     })
//       .then(this._handleResponse)
//       .catch(this._handleError);
//   }

//   getUserInfo() {
//     return fetch(`${this._baseUrl}/users/me`, {
//       headers: this._headers,
//     })
//       .then(this._handleResponse)
//       .catch(this._handleError);
//   }

//   setUserInfo(data) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify(data),
//     })
//       .then(this._handleResponse)
//       .catch(this._handleError);
//   }

//   editAvatar(data) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify(data),
//     }).then(this._checkResponse);
//   }

//   addCard(data) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify(data),
//     })
//       .then(this._handleResponse)
//       .catch(this._handleError);
//   }

//   deleteCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}`, {
//       method: "DELETE",
//       headers: this._headers,
//     })
//       .then(this._handleResponse)
//       .catch(this._handleError);
//   }

//   likeCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: "PUT",
//       headers: this._headers,
//     })
//       .then(this._handleResponse)
//       .catch(this._handleError);
//   }

//   unlikeCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: "DELETE",
//       headers: this._headers,
//     })
//       .then(this._handleResponse)
//       .catch(this._handleError);
//   }
// }

// const api = new Api({
//   baseUrl: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "740df34c-ea9e-4ff2-ad05-85becca779ab",
//     "Content-Type": "application/json",
//   },
// });

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "740df34c-ea9e-4ff2-ad05-85becca779ab",
    "Content-Type": "application/json",
  },
});

export { api };
