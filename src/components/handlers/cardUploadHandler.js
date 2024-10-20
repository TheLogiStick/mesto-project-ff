import { uploadCard } from '../../api/api'
import { addCard } from '../cards/addCard'
import { closePopup } from '../popup/popupController'
import { setLoadingState } from '../popup/setLoadingState'

export const handleCardUpload = async (formCard, list, popups, profileId) => {
	const submitButton = formCard.querySelector('.popup__button')
	submitButton.disabled = true
	setLoadingState(submitButton, true)

	const name = formCard.placeName.value
	const link = formCard.link.value

	try {
		const cardData = await uploadCard({ name, link })
		addCard(cardData, list, popups, profileId, false)

		closePopup()

		formCard.reset()
	} catch (error) {
		console.error('Ошибка при загрузке карточки:', error)
	} finally {
		setLoadingState(submitButton, false)
	}
}
