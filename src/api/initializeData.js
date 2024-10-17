import { serverUrl } from './config'
import { request } from './request'

const content = document.querySelector('.loading')

export const initializeData = async (editProfile, addCard) => {
	try {
		content.style.visibility = 'visible'

		const [profileData, cardsData] = await Promise.all([
			request(`${serverUrl}/users/me`),
			request(`${serverUrl}/cards`),
		])

		const profileId = profileData._id
		editProfile(profileData)
		cardsData.forEach(card => addCard(card, profileId, true))
	} catch (error) {
		console.error(`Ошибка загрузки данных: ${error}`)
	} finally {
		content.style.visibility = 'hidden'
	}
}
