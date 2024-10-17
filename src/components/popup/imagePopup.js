import { openPopup } from './popupController'

const imagePopup = document.querySelector('.popup_type_image')
const imagePopupTitle = imagePopup.querySelector('.popup__caption')
const imagePopupImage = imagePopup.querySelector('.popup__image')

export const showImage = (name, link) => {
	imagePopupImage.src = link
	imagePopupImage.alt = name
	imagePopupTitle.textContent = name
	openPopup(imagePopup)
}
