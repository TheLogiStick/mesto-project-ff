import { headers } from './config'

export const request = async (url, options = {}) => {
	const response = await fetch(url, {
		headers,
		...options,
	})
	if (!response.ok) {
		throw new Error(`Ошибка в запросе: ${response.status}`)
	}
	return await response.json()
}
