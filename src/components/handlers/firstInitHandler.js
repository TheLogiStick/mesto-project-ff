import { initializeData } from '../../api/api'
import { addCard } from '../cards/addCard'
import { editProfile } from '../profile/profileEdit'

export const firstInitHandler = async (loader, list, popups, profile) => {
	loader.style.visibility = 'visible'

	try {
		const { profileData, cardsData } = await initializeData()

		const profileId = profileData._id
		editProfile(profileData, profile)

		cardsData.forEach(card => addCard(card, list, popups, profileId, true))

		return profileId
	} catch (error) {
		console.error('Ошибка при инициализации данных:', error)
		return null
	} finally {
		loader.style.visibility = 'hidden'
	}
}
