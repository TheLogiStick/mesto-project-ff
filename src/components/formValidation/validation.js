const showErrorValid = (formElement, inputElement, errorMessage, config) => {
	const errorElement = formElement.querySelector(
		`.${inputElement.id}${config.errorSelectorSuffix}`
	)
	inputElement.classList.add(config.inputErrorClass)
	errorElement.textContent = errorMessage
	errorElement.classList.add(config.errorClass)
}

const hideErrorValid = (formElement, inputElement, config) => {
	const errorElement = formElement.querySelector(
		`.${inputElement.id}${config.errorSelectorSuffix}`
	)
	inputElement.classList.remove(config.inputErrorClass)
	errorElement.textContent = ''
	errorElement.classList.remove(config.errorClass)
}

export const clearValidation = (formElement, config) => {
	const inputList = formElement.querySelectorAll(config.inputSelector)
	const buttonElement = formElement.querySelector(config.submitButtonSelector)

	inputList.forEach(inputElement =>
		hideErrorValid(formElement, inputElement, config)
	)

	buttonElement.disabled = true
}

export const isValid = (formElement, inputElement, config) => {
	inputElement.validity.patternMismatch
		? inputElement.setCustomValidity(inputElement.dataset.errorMessage)
		: inputElement.setCustomValidity('')

	!inputElement.validity.valid
		? showErrorValid(
				formElement,
				inputElement,
				inputElement.validationMessage,
				config
		  )
		: hideErrorValid(formElement, inputElement, config)
}

export const toggleButtonState = (inputList, buttonElement) =>
	(buttonElement.disabled = inputList.some(
		inputElement => !inputElement.validity.valid
	))
