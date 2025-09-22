export const errorHandler = (statusCode: number, message: string) => {
	throw createError({
		statusCode: statusCode,
		statusMessage: message,
	})
}
