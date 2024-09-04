import { initialCards } from './cards.js'

const list = document.querySelector('.places__list')

const addCardBtn = document.querySelector('.profile__add-button')
const cardPopup = document.querySelector('.popup_type_new-card')
const cardPopupBtn = cardPopup.querySelector('.popup__button')
const template = document.querySelector('#card-template').content

const profilePopup = document.querySelector('.popup_type_edit')
const profileEditBtn = document.querySelector('.profile__edit-button')
const profileSubmitBtn = profilePopup.querySelector('.popup__button')

const imagePopup = document.querySelector('.popup_type_image')

// редактирование профиля

profileEditBtn.addEventListener('click', () => {
	profilePopup.classList.toggle('popup_is-opened')
})

profileSubmitBtn.addEventListener('click', event => {
	event.preventDefault()

	const name = profilePopup.querySelector('.popup__input_type_name')
	const desc = profilePopup.querySelector('.popup__input_type_description')

	profilePopup.style.display = 'none'

	editProfile(name.value, desc.value)
})

const editProfile = (name, desc) => {
	const profileTitle = document.querySelector('.profile__title')
	const profileDesc = document.querySelector('.profile__description')

	profileTitle.textContent = name
	profileDesc.textContent = desc
}

// добавление карточек

addCardBtn.addEventListener('click', () => {
	cardPopup.classList.toggle('popup_is-opened')
})

cardPopupBtn.addEventListener('click', event => {
	event.preventDefault()

	const title = cardPopup.querySelector('.popup__input_type_card-name')
	const url = cardPopup.querySelector('.popup__input_type_url')

	cardPopup.style.display = 'none'

	addCard(title.value, url.value)
})

const addCard = (title, link) => {
	const card = template.querySelector('.card').cloneNode(true)
	const cardDelBtn = card.querySelector('.card__delete-button')
	const cardImage = card.querySelector('.card__image')

	card.querySelector('.card__title').textContent = title
	card.querySelector('.card__image').src = link

	list.append(card)

	cardDelBtn.addEventListener('click', event => {
		event.target.closest('.card').remove()
	})

	cardImage.addEventListener('click', event => {
		imagePopup.querySelector('.popup__image').src = event.target.src
		imagePopup.querySelector('.popup__caption').textContent = event.target
			.closest('.card')
			.querySelector('.card__title').textContent

		imagePopup.classList.toggle('popup_is-opened')
	})
}

// Закрытие поп-ап

const popupCloseList = document.querySelectorAll('.popup__close')
popupCloseList.forEach(elem => {
	elem.addEventListener('click', event => {
		event.target.closest('.popup').classList.toggle('popup_is-opened')
	})
})

// Загрузка карточек на страницу

initialCards.forEach(({ name, link }) => addCard(name, link))
