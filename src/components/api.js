// Данные сервера
const cohortId = 'wff-cohort-24'
const serverUrl = `https://nomoreparties.co/v1/${cohortId}`
const token = '394ce982-88eb-4371-a636-4c507197f692'

// Обработчик ответа сервера
const handleResponse = response => {
	if (response.ok) return response.json()

	return Promise.reject(`Ошибка: ${response.status}`)
}

// Первоначальная загрузка данных
export const loadData = (editProfile, addCard) => {
	const profilePromise = fetch(`${serverUrl}/users/me`, {
		headers: {
			authorization: token,
		},
	}).then(handleResponse)

	const cardPromise = fetch(`${serverUrl}/cards`, {
		headers: {
			authorization: token,
		},
	}).then(handleResponse)

	Promise.all([profilePromise, cardPromise])
		.then(([profileData, cardsData]) => {
			const profileId = profileData._id
			console.log(cardsData)
			editProfile(profileData)
			cardsData.forEach(card => addCard(card, profileId, true))
		})
		.catch(error => console.error(`Ошибка загрузки данных: ${error}`))
}

// Обновление данных профиля
export const updateProfile = (name, about) => {
	return fetch(`${serverUrl}/users/me`, {
		method: 'PATCH',
		headers: {
			authorization: token,
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			name,
			about,
		}),
	})
		.then(handleResponse)
		.catch(error => console.error('Ошибка про обновлении данных: ', error))
}

// Загрузка карточки
export const uploadCard = ({ name, link }, profileId, addCard) => {
	return fetch(`${serverUrl}/cards`, {
		method: 'POST',
		headers: {
			authorization: token,
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			name,
			link,
		}),
	})
		.then(handleResponse)
		.then(cardData => addCard(cardData, profileId, false))
		.catch(error => console.error('Не удалось добавить карточку: ', error))
}

// Удаление карточки
export const deleteCard = cardId => {
	return fetch(`${serverUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: {
			authorization: token,
		},
	}).then(handleResponse)
}

// Добавление лайка карточки
export const addLike = cardId => {
	return fetch(`${serverUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: {
			authorization: token,
		},
	}).then(handleResponse)
}

// Удаление лайка карточки
export const removeLike = cardId => {
	return fetch(`${serverUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: {
			authorization: token,
		},
	}).then(handleResponse)
}

// Обновление аватарки
export const updateAvatar = avatar => {
	return fetch(`${serverUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			avatar,
		}),
	})
		.then(handleResponse)
		.catch(error => console.error(error))
}
