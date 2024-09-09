import { createCard } from './createCard'
import { showImage } from './showImage'

// Импорт списка карточек
const list = document.querySelector('.places__list')

export const addCard = formCard => {
	const card = createCard(formCard, showImage)
	list.prepend(card)
}
