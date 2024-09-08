export const editProfile = ({ name, description }) => {
	const profileTitle = document.querySelector('.profile__title')
	const profileDesc = document.querySelector('.profile__description')

	profileTitle.textContent = name.value
	profileDesc.textContent = description.value
}
