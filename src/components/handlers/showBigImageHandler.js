import { openPopup } from '../popup/popupController'

export const showBigImageHandler = (name, link, popup) => {
	const title = popup.querySelector('.popup__caption')
	const image = popup.querySelector('.popup__image')

	image.src = link
	image.alt = name
	title.textContent = name

	openPopup(popup)
}
