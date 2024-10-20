// Сохранение всех открытых попапов
const openedPopups = new Set()

export const openPopup = popup => {
	popup.classList.add('popup_is-opened')

	// Добавление попапа в openedPopups
	openedPopups.add(popup)
	document.addEventListener('keydown', handleEscClose)
}

export const closePopup = () => {
	if (openedPopups.size > 0) {
		// Получение последнего открытого попапа и закрытие его
		const lastOpenedPopup = [...openedPopups].pop()
		lastOpenedPopup.classList.remove('popup_is-opened')

		// Удаление попапа из openedPopups
		openedPopups.delete(lastOpenedPopup)

		if (openedPopups.size === 0) {
			document.removeEventListener('keydown', handleEscClose)
		}
	}
}

const handleEscClose = event => {
	if (event.key === 'Escape') {
		closePopup()
	}
}

const handlePopupClick = event => {
	if (
		event.target.classList.contains('popup') ||
		event.target.classList.contains('popup__close')
	) {
		closePopup()
	}
}

export const setPopupListeners = popupList => {
	popupList.forEach(item => {
		item.addEventListener('click', handlePopupClick)
	})
}
