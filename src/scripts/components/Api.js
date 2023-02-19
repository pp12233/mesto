export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

//1. Загрузка информации о пользователе с сервера
getUserInfo() {
  return fetch(this._baseUrl + '/users/me', {
    headers: this._headers
  })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch((err) => {
      console.log(`Ошибка: ${err} ${res.status}`);
    })
}

//2. Загрузка карточек с сервера
getInitialCards() {
  return fetch(this._baseUrl + '/cards', {
    headers: this._headers
  })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch((err) => {
      console.log(`Ошибка: ${err} ${res.status}`);
    })
}

//3. Редактирование профиля
editingUser(data) {
  return fetch(this._baseUrl + '/users/me', {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject())
  .catch((err) => {
    console.log(`Ошибка: ${err} ${res.status}`);
  })
}

//4. Добавление новой карточки
addingNewCard(data) {
  return fetch(this._baseUrl + '/cards', {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: data.city,
      link: data.link
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject())
  .catch((err) => {
    console.log(`Ошибка: ${err} ${res.status}`);
  })
}

//7. Удаление карточки
deletingCard(_id) {
  return fetch(this._baseUrl + '/cards/' + _id, {
    method: 'DELETE',
    headers: this._headers
  })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch((err) => {
      console.log(`Ошибка: ${err} ${res.status}`);
    })
}

//8. Постановка лайка
settingLike(_id) {
  return fetch(this._baseUrl + '/cards/' + _id + '/likes', {
    method: 'PUT',
    headers: this._headers
  })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch((err) => {
      console.log(`Ошибка: ${err} ${res.status}`);
    })
}

//8. Снятие лайка
removingLike(_id) {
  return fetch(this._baseUrl + '/cards/' + _id + '/likes', {
    method: 'DELETE',
    headers: this._headers
  })
    .then(res => res.ok ? res.json() : Promise.reject())
    .catch((err) => {
      console.log(`Ошибка: ${err} ${res.status}`);
    })
}

//9. Обновление аватара пользователя
updateAvatar(data) {
  return fetch(this._baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: data.link
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject())
  .catch((err) => {
    console.log(`Ошибка: ${err} ${res.status}`);
  })
}
}
