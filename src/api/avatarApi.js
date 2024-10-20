import { serverUrl } from './config'
import { request } from './request'

export const updateAvatar = async avatar => {
	const response = await request(`${serverUrl}/users/me/avatar`, {
		method: 'PATCH',
		body: JSON.stringify({ avatar }),
	})
	return response
}
