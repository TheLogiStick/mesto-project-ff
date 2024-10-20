import { serverUrl } from './config'
import { request } from './request'

export const uploadCard = async ({ name, link }) => {
	const response = await request(`${serverUrl}/cards`, {
		method: 'POST',
		body: JSON.stringify({ name, link }),
	})
	return response
}

export const deleteCard = async cardId => {
	const response = await request(`${serverUrl}/cards/${cardId}`, {
		method: 'DELETE',
	})
	return response
}
