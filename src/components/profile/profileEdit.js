const profileTitle = document.querySelector('.profile__title')
const profileDesc = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

export const editProfile = ({
	name = profileTitle.textContent,
	about = profileDesc.textContent,
	avatar = profileImage.style.backgroundImage,
}) => {
	profileImage.style.backgroundImage = `url('${avatar}')`
	profileTitle.textContent = name
	profileDesc.textContent = about
}
