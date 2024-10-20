import { updateAvatar } from '../../api/api'
import { closePopup } from '../popup/popupController'
import { setLoadingState } from '../popup/setLoadingState'
import { editProfile } from '../profile/profileEdit'

export const handleAvatarChange = async (formAvatar, profile) => {
	const submitButton = formAvatar.querySelector('.popup__button')
	submitButton.disabled = true
	setLoadingState(submitButton, true)

	const avatarLink = formAvatar.avatarLink.value

	try {
		await updateAvatar(avatarLink)
		editProfile({ avatar: avatarLink }, profile)

		closePopup()

		formAvatar.reset()
	} catch (error) {
		console.error('Ошибка при обновлении аватара:', error)
	} finally {
		setLoadingState(submitButton, false)
	}
}
