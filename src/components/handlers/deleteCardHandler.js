import { deleteCard } from '../../api/cardApi'
import { closePopup, openPopup } from '../popup/popupController'
import { setLoadingState } from '../popup/setLoadingState'

const popup = document.querySelector('.popup_type_delete_card')
const popupBtn = popup.querySelector('.popup__button')

// Создание Map для хранения текущей карточки и её идентификатора
const cardMap = new Map()

// Функция для сброса состояния, очищая содержимое cardMap
const resetState = () => {
	cardMap.clear()
}

export const confirmDeletion = async event => {
	event.preventDefault()

	// Извлечение текущей карточки и её id из cardMap
	const [currentCard, currentId] = [...cardMap.entries()][0] || []

	if (currentCard && currentId) {
		try {
			setLoadingState(popupBtn, true, 'Удаление...')
			await deleteCard(currentId)
			currentCard.remove()
		} catch (error) {
			console.error('Ошибка при удалении карточки:', error)
		} finally {
			// Очистка cardMap
			resetState()
			setLoadingState(popupBtn, false)
			closePopup()
		}
	}
}

export const deleteCardHandler = (card, id) => {
	openPopup(popup)

	resetState()
	// Добавление карточки и её id в cardMap
	cardMap.set(card, id)
}
