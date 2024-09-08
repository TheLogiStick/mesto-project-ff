import { createCard } from './createCard'

// Импорт списка карточек
const list = document.querySelector('.places__list')

export const addCard = formCard => {
	const card = createCard(formCard)
	list.prepend(card)
}
