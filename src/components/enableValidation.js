import { isValid, toggleButtonState } from './validation'

export const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.popup__form'))
	formList.forEach(formElement => {
		setEventListeners(formElement)
	})
}

const setEventListeners = formElement => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
	const buttonElement = formElement.querySelector('.popup__button')

	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement)
			toggleButtonState(inputList, buttonElement)
		})
	})
}
