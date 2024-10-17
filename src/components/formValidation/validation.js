const showErrorValid = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add('popup__input_error')
	errorElement.textContent = errorMessage
	errorElement.classList.add('input-error-active')
}

const hideErrorValid = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove('popup__input_error')
	errorElement.textContent = ''
	errorElement.classList.remove('input-error-active')
}

export const isValid = (formElement, inputElement) => {
	inputElement.validity.patternMismatch
		? inputElement.setCustomValidity(inputElement.dataset.errorMessage)
		: inputElement.setCustomValidity('')

	!inputElement.validity.valid
		? showErrorValid(formElement, inputElement, inputElement.validationMessage)
		: hideErrorValid(formElement, inputElement)
}

const hasInvalidInput = inputList =>
	[...inputList].some(inputElement => !inputElement.validity.valid)

export const toggleButtonState = (inputList, buttonElement) => {
	buttonElement.disabled = hasInvalidInput(inputList)
}
