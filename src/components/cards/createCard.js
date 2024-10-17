import { deleteCardHandler } from '../handlers/deleteCardHandler'
import {
	handleLikeButtonClick,
	updateLikeState,
} from '../handlers/likeCardHandler'
import { showImage } from '../popup/imagePopup'

// Импорт шаблона для карточек
const template = document.querySelector('#card-template').content

export const createCard = ({ name, link, likes, owner, _id }, profileId) => {
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

	// Скрываем иконку корзины с чужих карточек
	if (owner._id !== profileId) {
		deleteButton.style.display = 'none'
	}

	// Изначально обновляем состояние лайка
	const isLiked = likes.some(user => user._id === profileId)
	updateLikeState(likeButton, likeCount, isLiked, likes)

	// Обработчик событий для карточки
	const handleCardClick = async event => {
		const { target } = event

		try {
			if (target === likeButton) {
				await handleLikeButtonClick(
					likeButton,
					likeCount,
					_id,
					profileId,
					likes
				)
			}
			if (target === deleteButton) {
				deleteCardHandler(card, _id)
			}
			if (target === cardImage) {
				showImage(name, link)
			}
		} catch (error) {
			console.error('Ошибка при обработке клика по карточке:', error)
		}
	}

	card.addEventListener('click', handleCardClick)

	return card
}
