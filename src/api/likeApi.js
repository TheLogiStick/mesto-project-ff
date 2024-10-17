import { serverUrl } from './config'
import { request } from './request'

export const addLike = async cardId => {
	try {
		const response = await request(`${serverUrl}/cards/likes/${cardId}`, {
			method: 'PUT',
		})
		return response
	} catch (error) {
		console.error('Не удалось добавить лайк:', error)
	}
}

export const removeLike = async cardId => {
	try {
		const response = await request(`${serverUrl}/cards/likes/${cardId}`, {
			method: 'DELETE',
		})
		return response
	} catch (error) {
		console.error('Не удалось удалить лайк:', error)
	}
}
