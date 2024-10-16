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

	if (!inputElement.validity.valid) {
		showErrorValid(formElement, inputElement, inputElement.validationMessage)
	} else {
		hideErrorValid(formElement, inputElement)
	}
}

const hasInvalidInput = inputList => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid
	})
}

export const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = 'true'
	} else {
		buttonElement.disabled = false
	}
}
