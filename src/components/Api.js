export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this.renderResult);
  }

  renderResult = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  };

  fetchUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  fetchEditProfile(userData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.title,
        about: userData.description,
      }),
    });
  }

  fetchNewCard(cardData) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.title,
        link: cardData.url,
      }),
    });
  }

  fetchDeleteCard(getId) {
    return this._request(`${this._baseUrl}/cards/${getId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  fetchLikeCard(getId) {
    return this._request(`${this._baseUrl}/cards/${getId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  fetchDisLikeCard(getId) {
    return this._request(`${this._baseUrl}/cards/${getId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  fetchProfilePicture(link) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  loadPageResults() {
    return Promise.all([this.getInitialCards(), this.fetchUserInfo()]);
  }
}
