import { serverUrl } from './config'
import { request } from './request'

export const loadProfile = async () => {
	const response = await request(`${serverUrl}/users/me`)
	return response
}

export const updateProfile = async (name, about) => {
	const response = await request(`${serverUrl}/users/me`, {
		method: 'PATCH',
		body: JSON.stringify({ name, about }),
	})
	return response
}
