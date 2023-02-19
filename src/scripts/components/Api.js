export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //1. Загрузка информации о пользователе с сервера
  getUserInfo = () =>
    this._request(this._baseUrl + "/users/me", { headers: this._headers });

  //2. Загрузка карточек с сервера
  getCards = () =>
    this._request(this._baseUrl + "/cards", { headers: this._headers });

  //3. Редактирование профиля
  editingUser = (data) =>
    this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.about }),
    });

  //4. Добавление новой карточки
  addingNewCard = (data) =>
    this._request(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: data.city, link: data.link }),
    });

  //7. Удаление карточки
  deletingCard = (_id) =>
    this._request(this._baseUrl + "/cards/" + _id, {
      method: "DELETE",
      headers: this._headers,
    });

  //8. Постановка лайка
  settingLike = (_id) =>
    this._request(this._baseUrl + "/cards/" + _id + "/likes", {
      method: "PUT",
      headers: this._headers,
    });

  //8. Снятие лайка
  removingLike = (_id) =>
    this._request(this._baseUrl + "/cards/" + _id + "/likes", {
      method: "DELETE",
      headers: this._headers,
    });

  //9. Обновление аватара пользователя
  updateAvatar = (data) =>
    this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      }),
    });
}
