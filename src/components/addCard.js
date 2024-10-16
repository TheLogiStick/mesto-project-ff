import { createCard } from './createCard'
import { showImage } from './showImage'

// Импорт списка карточек
const list = document.querySelector('.places__list')

export const addCard = (formCard, profileId, isFirstInit) => {
	const card = createCard(formCard, profileId, showImage)
	isFirstInit ? list.append(card) : list.prepend(card)
}
