import { serverUrl } from './config'
import { request } from './request'

export const addLike = async cardId => {
	const response = await request(`${serverUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
	})
	return response
}

export const removeLike = async cardId => {
	const response = await request(`${serverUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
	})
	return response
}
