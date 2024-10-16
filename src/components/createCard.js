import { addLike, deleteCard, removeLike } from './api'

// Импорт шаблона для карточек
const template = document.querySelector('#card-template').content

// Функция обновления состояния лайка
const updateLikeState = (likeButton, likeCount, isLiked, likes) => {
	if (isLiked) {
		likeButton.classList.add('card__like-button_is-active')
	} else {
		likeButton.classList.remove('card__like-button_is-active')
	}
	likeCount.textContent = likes.length
}

export const createCard = (
	{ name, link, likes, owner, _id },
	profileId,
	showImage
) => {
	// Создание новой карточки
	const card = template.querySelector('.card').cloneNode(true)

	const cardTitle = card.querySelector('.card__title')
	const cardImage = card.querySelector('.card__image')
	const likeButton = card.querySelector('.card__like-button')
	const likeCount = card.querySelector('.card__like-count')
	const deleteButton = card.querySelector('.card__delete-button')

	// Установка данных карточки
	cardTitle.textContent = name
	cardImage.src = link
	cardImage.alt = name
	likeCount.textContent = likes.length

	if (!(owner._id === profileId)) deleteButton.style.display = 'none'

	const isLiked = likes.some(user => user._id === profileId)

	if (isLiked) {
		likeButton.classList.add('card__like-button_is-active')
	}

	// Обработчик событий для карточки
	const handleCardClick = event => {
		const { target } = event

		if (target === likeButton) {
			if (likeButton.classList.contains('card__like-button_is-active')) {
				removeLike(_id)
					.then(updatedCard => {
						updateLikeState(likeButton, likeCount, false, updatedCard.likes)
					})
					.catch(error => {
						console.error('Ошибка при удалении лайка:', error)
					})
			} else {
				addLike(_id)
					.then(updatedCard => {
						updateLikeState(likeButton, likeCount, true, updatedCard.likes)
					})
					.catch(error => {
						console.error('Ошибка при добавлении лайка:', error)
					})
			}
		}

		if (target === deleteButton) {
			deleteCard(_id)
				.then(() => {
					card.remove()
				})
				.catch(error => {
					console.log(error)
				})
		}

		if (target === cardImage) {
			showImage(name, link)
		}
	}

	card.addEventListener('click', handleCardClick)

	return card
}
