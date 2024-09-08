// Импорт стилей
import '.././pages/index.css'

// Импорт карточек
import { initialCards } from './cards.js'

// Импорт попапов
const profilePopup = document.querySelector('.popup_type_edit')
const cardPopup = document.querySelector('.popup_type_new-card')

// Кнопки открытия попапов
const profileEditBtn = document.querySelector('.profile__edit-button')
const addCardBtn = document.querySelector('.profile__add-button')

// Импорт форм
const formCard = document.forms.newPlace
const formProfile = document.forms.editProfile

// Импорт заголовков профиля
const titleProfile = document.querySelector('.profile__title')
const descProfile = document.querySelector('.profile__description')

// Импорт функций
import { addCard } from './addCard.js'
import { togglePopup } from './modal.js'
import { editProfile } from './profileEdit.js'

// Редактирование профиля
profileEditBtn.addEventListener('click', () => {
	formProfile.name.value = titleProfile.textContent
	formProfile.description.value = descProfile.textContent
	togglePopup(profilePopup, 'open')
})

formProfile.addEventListener('submit', event => {
	event.preventDefault()
	editProfile(formProfile)
	togglePopup(profilePopup, 'close')
})

// Работа с карточками
addCardBtn.addEventListener('click', () => togglePopup(cardPopup, 'open'))

formCard.addEventListener('submit', event => {
	event.preventDefault()

	const name = formCard.placeName.value
	const link = formCard.link.value

	addCard({ name, link })
	togglePopup(cardPopup, 'close')
})

// Загрузка карточек на страницу
initialCards.forEach(cardData => addCard(cardData))
