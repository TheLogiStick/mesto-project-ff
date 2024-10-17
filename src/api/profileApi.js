import { serverUrl } from './config'
import { request } from './request'

export const loadProfile = async () => {
	try {
		const response = await request(`${serverUrl}/users/me`)
		return response
	} catch (error) {
		console.error('Не удалось загрузить профиль:', error)
	}
}

export const updateProfile = async (name, about) => {
	try {
		const response = await request(`${serverUrl}/users/me`, {
			method: 'PATCH',
			body: JSON.stringify({ name, about }),
		})
		return response
	} catch (error) {
		console.error('Не удалось обновить профиль:', error)
	}
}
