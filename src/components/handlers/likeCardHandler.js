import { addLike, removeLike } from '../../api/api'

// Обновления состояния лайка
export const updateLikeState = (likeButton, likeCount, isLiked, likes) => {
	isLiked
		? likeButton.classList.add('card__like-button_is-active')
		: likeButton.classList.remove('card__like-button_is-active')

	likeCount.textContent = likes.length
}

// Обработки клика по кнопке лайка
export const handleLikeButtonClick = async (likeButton, likeCount, cardId) => {
	const isLiked = likeButton.classList.contains('card__like-button_is-active')
	try {
		const updatedCard = isLiked
			? await removeLike(cardId)
			: await addLike(cardId)

		updateLikeState(likeButton, likeCount, !isLiked, updatedCard.likes)
	} catch (error) {
		console.error('Ошибка при обработке лайка:', error)
	}
}
