const profileTitle = document.querySelector('.profile__title')
const profileDesc = document.querySelector('.profile__description')

export const editProfile = ({ name, description }) => {
	profileTitle.textContent = name.value
	profileDesc.textContent = description.value
}
