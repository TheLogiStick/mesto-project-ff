import { updateProfile } from '../../api/api'
import { closePopup } from '../popup/popupController'
import { setLoadingState } from '../popup/setLoadingState'
import { editProfile } from '../profile/profileEdit'

export const handleProfileEdit = async (formProfile, profile) => {
	const submitButton = formProfile.querySelector('.popup__button')
	submitButton.disabled = true
	setLoadingState(submitButton, true)

	const name = formProfile.name.value
	const about = formProfile.about.value

	try {
		const data = await updateProfile(name, about)
		editProfile(data, profile)

		closePopup()
	} catch (error) {
		console.error('Ошибка при обновлении профиля:', error)
	} finally {
		setLoadingState(submitButton, false)
	}
}
