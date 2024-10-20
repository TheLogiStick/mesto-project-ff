import { serverUrl } from './config'
import { request } from './request'

export const initializeData = async () => {
	const [profileData, cardsData] = await Promise.all([
		request(`${serverUrl}/users/me`),
		request(`${serverUrl}/cards`),
	])
	return { profileData, cardsData }
}
