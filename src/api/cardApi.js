import { serverUrl } from './config'
import { request } from './request'

export const uploadCard = async ({ name, link }, profileId, addCard) => {
	try {
		const cardData = await request(`${serverUrl}/cards`, {
			method: 'POST',
			body: JSON.stringify({ name, link }),
		})
		addCard(cardData, profileId, false)
	} catch (error) {
		console.error('Не удалось добавить карточку: ', error)
	}
}

export const deleteCard = async cardId => {
	try {
		const response = await request(`${serverUrl}/cards/${cardId}`, {
			method: 'DELETE',
		})
		return response
	} catch (error) {
		console.error('Не удалось удалить карточку:', error)
	}
}
