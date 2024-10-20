import { isValid, toggleButtonState } from './validation.js'

export const enableValidation = config => {
	const formList = document.querySelectorAll(config.formSelector)
	formList.forEach(formElement => setEventListeners(formElement, config))
}

// Вынесли функцию setEventListeners за пределы enableValidation
const setEventListeners = (formElement, config) => {
	const inputList = [...formElement.querySelectorAll(config.inputSelector)]
	const buttonElement = formElement.querySelector(config.submitButtonSelector)

	const handleInputChange = (
		formElement,
		inputElement,
		inputList,
		buttonElement,
		config
	) => {
		isValid(formElement, inputElement, config)
		toggleButtonState(inputList, buttonElement, config)
	}

	formElement.addEventListener('input', event => {
		const inputElement = event.target.closest(config.inputSelector)
		if (inputElement) {
			handleInputChange(
				formElement,
				inputElement,
				inputList,
				buttonElement,
				config
			)
		}
	})
}
