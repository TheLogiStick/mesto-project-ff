import './pages/index.css'

import { initialCards } from './components/cards'

// Импорт списка карточек
const list = document.querySelector('.places__list')

// Импорт шаблона для карточек
const template = document.querySelector('#card-template').content

// Импорт попапов
const profilePopup = document.querySelector('.popup_type_edit')
const cardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')

// Импорт кнопок попапов
const popupCloseList = document.querySelectorAll('.popup__close')

const profileEditBtn = document.querySelector('.profile__edit-button')
const profileSubmitBtn = profilePopup.querySelector('.popup__button')

const addCardBtn = document.querySelector('.profile__add-button')
const cardPopupBtn = cardPopup.querySelector('.popup__button')

// Переключение видимости попапов
const togglePopup = popup => {
	popup.classList.toggle('popup_is-opened')
}

popupCloseList.forEach(elem => {
	elem.addEventListener('click', event => {
		togglePopup(event.target.closest('.popup'))
	})
})

// Редактирование профиля
profileEditBtn.addEventListener('click', () => togglePopup(profilePopup))

profileSubmitBtn.addEventListener('click', event => {
	event.preventDefault()

	const name = profilePopup.querySelector('.popup__input_type_name')
	const desc = profilePopup.querySelector('.popup__input_type_description')

	editProfile({ name: name.value, desc: desc.value })
	togglePopup(profilePopup)
})

const editProfile = ({ name, desc }) => {
	const profileTitle = document.querySelector('.profile__title')
	const profileDesc = document.querySelector('.profile__description')

	profileTitle.textContent = name
	profileDesc.textContent = desc
}

// Работа с карточками
addCardBtn.addEventListener('click', () => togglePopup(cardPopup))

const addCard = cardData => {
	const card = createCard(cardData)
	list.prepend(card)
}

cardPopupBtn.addEventListener('click', event => {
	event.preventDefault()

	const title = cardPopup.querySelector('.popup__input_type_card-name')
	const url = cardPopup.querySelector('.popup__input_type_url')

	addCard({ name: title.value, link: url.value })
	togglePopup(cardPopup)
})

const createCard = ({ name, link }) => {
	const card = template.querySelector('.card').cloneNode(true)
	const cardTitle = card.querySelector('.card__title')
	const cardImage = card.querySelector('.card__image')
	const cardLikeBtn = card.querySelector('.card__like-button')
	const cardDelBtn = card.querySelector('.card__delete-button')

	cardTitle.textContent = name
	cardImage.src = link
	cardImage.alt = name

	cardLikeBtn.addEventListener('click', event =>
		event.target.classList.toggle('card__like-button_is-active')
	)

	cardDelBtn.addEventListener('click', () => cardDel(card))

	cardImage.addEventListener('click', () => {
		imagePopup.querySelector('.popup__image').src = link
		imagePopup.querySelector('.popup__caption').textContent = name

		togglePopup(imagePopup)
	})

	return card
}

const cardDel = card => {
	card.remove()
}

// Загрузка карточек на страницу
initialCards.forEach(cardData => addCard(cardData))
