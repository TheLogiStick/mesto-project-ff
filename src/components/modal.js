const popupList = document.querySelectorAll('.popup')

export const togglePopup = (popup, operation) => {
	const form = popup.querySelector('.popup__form')

	if (operation === 'open') {
		popup.classList.add('popup_is-opened')
		document.addEventListener('keydown', handlerEscClose)
	}

	if (operation === 'close') {
		popup.classList.remove('popup_is-opened')
		document.removeEventListener('keydown', handlerEscClose)
		if (form) form.reset()
	}
}

const handlerEscClose = event => {
	if (event.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened')
		togglePopup(openedPopup, 'close')
	}
}

popupList.forEach(item => {
	item.addEventListener('click', event => {
		if (
			event.target.classList.contains('popup') ||
			event.target.classList.contains('popup__close')
		) {
			togglePopup(event.target.closest('.popup'), 'close')
		}
	})
})
