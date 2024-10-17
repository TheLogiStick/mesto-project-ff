import { updateAvatar } from '../../api/api'
import { editProfile } from '../profile/profileEdit'

export const handleAvatarChange = async (
	event,
	formAvatar,
	setLoadingState,
	closePopup
) => {
	event.preventDefault()

	const submitButton = formAvatar.querySelector('.popup__button')
	setLoadingState(submitButton, true)

	const avatarLink = formAvatar.avatarLink.value

	try {
		await updateAvatar(avatarLink)
		editProfile({ avatar: avatarLink })
	} catch (error) {
		console.error('Ошибка при обновлении аватара:', error)
	} finally {
		setLoadingState(submitButton, false)
		closePopup()
	}
}
