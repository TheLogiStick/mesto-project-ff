import { deleteCard } from '../../api/cardApi'
import { closePopup, openPopup } from '../popup/popupController'
import { setLoadingState } from '../popup/setLoadingState'

// Создание Map для хранения текущей карточки и её идентификатора
const cardMap = new Map()

// Функция для сброса состояния, очищая содержимое cardMap
const resetState = () => {
	cardMap.clear()
}

export const confirmDeletion = async popup => {
	const popupBtn = popup.querySelector('.popup__button')

	// Извлечение текущей карточки и её id из cardMap
	const [currentCard, currentId] = [...cardMap.entries()][0] || []

	if (currentCard && currentId) {
		try {
			setLoadingState(popupBtn, true, 'Удаление...')

			await deleteCard(currentId)
			currentCard.remove()

			// Очистка cardMap
			resetState()

			closePopup()
		} catch (error) {
			console.error('Ошибка при удалении карточки:', error)
		} finally {
			setLoadingState(popupBtn, false)
		}
	}
}

export const setDeleteCardState = (card, id, popup) => {
	resetState()
	// Добавление карточки и её id в cardMap
	cardMap.set(card, id)
	openPopup(popup)
}
