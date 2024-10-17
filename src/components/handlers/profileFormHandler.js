import { updateProfile } from '../../api/api'
import { editProfile } from '../profile/profileEdit'

export const handleProfileEdit = async (
	event,
	formProfile,
	setLoadingState,
	closePopup
) => {
	event.preventDefault()

	const submitButton = formProfile.querySelector('.popup__button')
	setLoadingState(submitButton, true)

	const name = formProfile.name.value
	const about = formProfile.about.value

	try {
		const data = await updateProfile(name, about)
		editProfile(data)
	} catch (error) {
		console.error('Ошибка при обновлении профиля:', error)
	} finally {
		setLoadingState(submitButton, false)
		closePopup()
	}
}
