import { showImage } from '../popup/imagePopup'
import { createCard } from './createCard'

// Импорт списка карточек
const list = document.querySelector('.places__list')

// Добавляем карточку на страницу
export const addCard = (formCard, profileId, isFirstInit) => {
	const card = createCard(formCard, profileId, showImage)
	isFirstInit ? list.append(card) : list.prepend(card)
}
