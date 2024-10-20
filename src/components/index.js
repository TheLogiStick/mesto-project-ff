// Стили
import '../pages/index.css'

// Функции
import { enableValidation } from './formValidation/initFormValidation.js'
import { clearValidation } from './formValidation/validation.js'
import { openPopup, setPopupListeners } from './popup/popupController.js'

// handlers
import { handleAvatarChange } from './handlers/avatarFormHandler.js'
import { handleCardUpload } from './handlers/cardUploadHandler.js'
import { confirmDeletion } from './handlers/deleteCardHandler.js'
import { firstInitHandler } from './handlers/firstInitHandler.js'
import { handleProfileEdit } from './handlers/profileFormHandler.js'

// Все попапы на странице
const popupList = [...document.querySelectorAll('.popup')]

const popups = {
	profile: document.querySelector('.popup_type_edit'),
	card: document.querySelector('.popup_type_new-card'),
	avatar: document.querySelector('.popup_type_avatar'),
	confirmDeletion: document.querySelector('.popup_type_delete_card'),
	showBigImage: document.querySelector('.popup_type_image'),
}

// Кнопки открытия попапов
const buttons = {
	profileEdit: document.querySelector('.profile__edit-button'),
	addCard: document.querySelector('.profile__add-button'),
	avatar: document.querySelector('.profile__image'),
}

// Формы
export const forms = {
	card: document.forms.newPlace,
	profile: document.forms.editProfile,
	avatar: document.forms.newAvatar,
	confirmDel: document.forms.deleteCard,
}

// Конфигурация валидации
export const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inputErrorClass: 'popup__input_error',
	errorClass: 'input-error-active',
	errorSelectorSuffix: '-error',
}

// Профиль
export const profile = {
	profileId: null,
	title: document.querySelector('.profile__title'),
	description: document.querySelector('.profile__description'),
	image: document.querySelector('.profile__image'),
}

// Лоадер
const loader = document.querySelector('.loading')

// Список карточек
const list = document.querySelector('.places__list')

// Функция инициализации
const initializeApp = async () => {
	// Установка слушателей на попапы
	setPopupListeners(popupList)

	// Установка обработчиков событий для открытия попапов
	buttons.profileEdit.addEventListener('click', () => {
		forms.profile.name.value = profile.title.textContent
		forms.profile.about.value = profile.description.textContent

		clearValidation(forms.profile, validationConfig)

		openPopup(popups.profile)
	})

	buttons.avatar.addEventListener('click', () => {
		forms.avatar.reset()

		clearValidation(forms.avatar, validationConfig)

		openPopup(popups.avatar)
	})
	buttons.addCard.addEventListener('click', () => {
		forms.card.reset()

		clearValidation(forms.card, validationConfig)

		openPopup(popups.card)
	})

	// Установка обработчиков событий для обработки форм
	forms.profile.addEventListener('submit', event => {
		event.preventDefault()

		handleProfileEdit(forms.profile, profile)
	})

	forms.avatar.addEventListener('submit', event => {
		event.preventDefault()

		handleAvatarChange(forms.avatar, profile)
	})

	forms.card.addEventListener('submit', event => {
		event.preventDefault()

		handleCardUpload(forms.card, list, popups, profile.profileId)
	})

	forms.confirmDel.addEventListener('submit', event => {
		event.preventDefault()

		confirmDeletion(popups.confirmDeletion)
	})

	// Включение валидации
	enableValidation(validationConfig)

	// Ожидание инициализации данных
	profile.profileId = await firstInitHandler(loader, list, popups, profile)
}

// Запуск инициализации приложения
initializeApp()
