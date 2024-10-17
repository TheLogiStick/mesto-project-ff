import { uploadCard } from '../../api/api'
import { addCard } from '../cards/addCard'

export const handleCardUpload = async (
	event,
	formCard,
	profileId,
	setLoadingState,
	closePopup
) => {
	event.preventDefault()

	const submitButton = formCard.querySelector('.popup__button')
	setLoadingState(submitButton, true)

	const name = formCard.placeName.value
	const link = formCard.link.value

	try {
		await uploadCard({ name, link }, profileId, addCard)
	} catch (error) {
		console.error('Ошибка при загрузке карточки:', error)
	} finally {
		setLoadingState(submitButton, false)
		closePopup()
		formCard.reset()
	}
}
