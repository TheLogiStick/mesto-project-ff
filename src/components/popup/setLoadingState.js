// Создание Map для хранения исходных текстов кнопок
const originalTexts = new Map()

export const setLoadingState = (
	button,
	isLoading,
	loadingText = 'Сохранение...'
) => {
	if (!originalTexts.has(button)) {
		// Добавление исходного текста в originalTexts
		originalTexts.set(button, button.textContent)
	}

	if (isLoading) {
		button.textContent = loadingText
	} else {
		// Восстановление исходного текста
		button.textContent = originalTexts.get(button)
	}
}
