import { setDeleteCardState } from '../handlers/deleteCardHandler'
import {
	handleLikeButtonClick,
	updateLikeState,
} from '../handlers/likeCardHandler'
import { showBigImageHandler } from '../handlers/showBigImageHandler'
import { createCard } from './createCard'

// Добавляем карточку на страницу
export const addCard = (formCard, list, popups, profileId, isFirstInit) => {
	const card = createCard(
		formCard,
		popups,
		profileId,
		showBigImageHandler,
		setDeleteCardState,
		handleLikeButtonClick,
		updateLikeState
	)
	isFirstInit ? list.append(card) : list.prepend(card)
}
