import { isValid, toggleButtonState } from './validation.js'

export const enableValidation = () => {
	const formList = document.querySelectorAll('.popup__form')
	formList.forEach(setEventListeners)
}

const setEventListeners = formElement => {
	const inputList = formElement.querySelectorAll('.popup__input')
	const buttonElement = formElement.querySelector('.popup__button')

	const handleInputChange = (
		formElement,
		inputElement,
		inputList,
		buttonElement
	) => {
		isValid(formElement, inputElement)
		toggleButtonState(inputList, buttonElement)
	}

	formElement.addEventListener('input', event => {
		const inputElement = event.target.closest('.popup__input')
		if (inputElement)
			handleInputChange(formElement, inputElement, inputList, buttonElement)
	})
}
