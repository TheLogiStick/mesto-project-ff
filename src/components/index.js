// Импорт стилей
import '../pages/index.css'

// Импорт функций
import { initializeData } from './../api/api.js'
import { addCard } from './cards/addCard.js'
import { enableValidation } from './formValidation/initFormValidation.js'
import {
	closePopup,
	openPopup,
	setPopupListeners,
} from './popup/popupController.js'
import { setLoadingState } from './popup/setLoadingState.js'
import { editProfile } from './profile/profileEdit.js'

// Импорт handlers
import { handleAvatarChange } from './handlers/avatarFormHandler.js'
import { handleCardUpload } from './handlers/cardUploadHandler.js'
import { confirmDeletion } from './handlers/deleteCardHandler.js'
import { handleProfileEdit } from './handlers/profileFormHandler.js'

// Импорт попапов
const popups = {
	profile: document.querySelector('.popup_type_edit'),
	card: document.querySelector('.popup_type_new-card'),
	avatar: document.querySelector('.popup_type_avatar'),
}

// Кнопки открытия попапов
const buttons = {
	profileEdit: document.querySelector('.profile__edit-button'),
	addCard: document.querySelector('.profile__add-button'),
	avatar: document.querySelector('.profile__image'),
}

// Формы
const forms = {
	card: document.forms.newPlace,
	profile: document.forms.editProfile,
	avatar: document.forms.newAvatar,
	confirmDel: document.forms.deleteCard,
}

// Заголовки профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

// Установка id профиля текущего пользователя
let profileId

// Установка слушателей на попапы
setPopupListeners()

// Установка обработчиков событий для открытия попапов
buttons.profileEdit.addEventListener('click', () => {
	forms.profile.name.value = profileTitle.textContent
	forms.profile.about.value = profileDescription.textContent
	openPopup(popups.profile)
})

buttons.avatar.addEventListener('click', () => openPopup(popups.avatar))
buttons.addCard.addEventListener('click', () => openPopup(popups.card))

// Установка обработчиков событий для обработки форм
forms.profile.addEventListener('submit', event =>
	handleProfileEdit(event, forms.profile, setLoadingState, closePopup)
)

forms.avatar.addEventListener('submit', event =>
	handleAvatarChange(event, forms.avatar, setLoadingState, closePopup)
)

forms.card.addEventListener('submit', event =>
	handleCardUpload(event, forms.card, profileId, setLoadingState, closePopup)
)

forms.confirmDel.addEventListener('submit', confirmDeletion)

// Включение валидации
enableValidation()

// Первоначальная загрузка данных
initializeData(profileData => {
	profileId = profileData._id
	editProfile(profileData)
}, addCard)
