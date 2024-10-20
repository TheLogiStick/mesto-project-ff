export const editProfile = (data = {}, profile) => {
	const name = data.name || profile.title.textContent
	const about = data.about || profile.description.textContent
	const avatar =
		data.avatar || 'https://i.ytimg.com/vi/58Qh1XcZaDA/hqdefault.jpg'

	profile.image.style.backgroundImage = `url('${avatar}')`
	profile.title.textContent = name
	profile.description.textContent = about
}
