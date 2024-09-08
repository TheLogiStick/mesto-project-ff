import { showImage } from './showImage'

export const createCard = ({ name, link }) => {
	// Импорт шаблона для карточек
	const template = document.querySelector('#card-template').content

	// Создание новой карточки
	const card = template.querySelector('.card').cloneNode(true)

	const cardTitle = card.querySelector('.card__title')
	const cardImage = card.querySelector('.card__image')
	const likeButton = card.querySelector('.card__like-button')
	const deleteButton = card.querySelector('.card__delete-button')

	// Установка данных карточки
	cardTitle.textContent = name
	cardImage.src = link
	cardImage.alt = name

	// Обработчик событий для карточки
	const handleCardClick = event => {
		const { target } = event

		if (target === likeButton) {
			likeButton.classList.toggle('card__like-button_is-active')
		}

		if (target === deleteButton) {
			card.remove()
		}

		if (target === cardImage) {
			showImage(name, link)
		}
	}

	card.addEventListener('click', handleCardClick)

	return card
}
