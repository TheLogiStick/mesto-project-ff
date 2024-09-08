import { togglePopup } from './togglePopup'

const imagePopup = document.querySelector('.popup_type_image')

export const showImage = (name, link) => {
	imagePopup.querySelector('.popup__image').src = link
	imagePopup.querySelector('.popup__caption').textContent = name
	togglePopup(imagePopup, 'open')
}
