// Импорт стилей
import '.././pages/index.css'

// Импорт попапов
const profilePopup = document.querySelector('.popup_type_edit')
const cardPopup = document.querySelector('.popup_type_new-card')
const avatarPopup = document.querySelector('.popup_type_avatar')

// Кнопки открытия попапов
const profileEditBtn = document.querySelector('.profile__edit-button')
const addCardBtn = document.querySelector('.profile__add-button')
const avatarBtn = document.querySelector('.profile__image')

// Импорт форм
const formCard = document.forms.newPlace
const formProfile = document.forms.editProfile
const formAvatar = document.forms.newAvatar

// Импорт кнопок форм
const formProfileBtn = formProfile.querySelector('.popup__button')
const formAvatarBtn = formAvatar.querySelector('.popup__button')
const formCardBtn = formCard.querySelector('.popup__button')

// Импорт заголовков профиля
const titleProfile = document.querySelector('.profile__title')
const descProfile = document.querySelector('.profile__description')

// Импорт функций
import { addCard } from './addCard.js'
import { loadData, updateAvatar, updateProfile, uploadCard } from './api.js'
import { enableValidation } from './enableValidation.js'
import { setPopupListeners, togglePopup } from './modal.js'
import { editProfile } from './profileEdit.js'

// Кеш профиля
let profileId

// Установка слушателей на попапы
setPopupListeners()

// Изменение текста кнопки во время загрузки
const setLoadingState = (button, isLoading) => {
	isLoading
		? (button.textContent = 'Сохранение...')
		: (button.textContent = 'Сохранить')
}

// Редактирование профиля
profileEditBtn.addEventListener('click', () => {
	// Заполнение полей формы редактирования профиля
	formProfile.name.value = titleProfile.textContent
	formProfile.about.value = descProfile.textContent

	togglePopup(profilePopup, 'open')
})

formProfile.addEventListener('submit', event => {
	event.preventDefault()

	setLoadingState(formProfileBtn, true)

	const name = formProfile.name.value
	const about = formProfile.about.value

	updateProfile(name, about)
		.then(data => editProfile(data))
		.finally(() => {
			setLoadingState(formProfileBtn, false)
			togglePopup(profilePopup, 'close')
		})
})

// Изменение аватарки
avatarBtn.addEventListener('click', () => togglePopup(avatarPopup, 'open'))

formAvatar.addEventListener('submit', event => {
	event.preventDefault()

	setLoadingState(formAvatarBtn, true)

	const avatarLink = formAvatar.avatarLink.value

	updateAvatar(avatarLink)
		.then(() => editProfile({ avatar: avatarLink }))
		.finally(() => setLoadingState(formAvatarBtn, false))
})

// Работа с карточками
addCardBtn.addEventListener('click', () => togglePopup(cardPopup, 'open'))

formCard.addEventListener('submit', event => {
	event.preventDefault()

	setLoadingState(formCardBtn, true)

	const name = formCard.placeName.value
	const link = formCard.link.value

	uploadCard({ name, link }, profileId, addCard).finally(() => {
		setLoadingState(formCardBtn, false)
		togglePopup(cardPopup, 'close')
		formCard.reset()
	})
})

// Включение валидации
enableValidation()

// Первоначальная загрузка данных
loadData(profileData => {
	profileId = profileData._id
	editProfile(profileData)
}, addCard)
