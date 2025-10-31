
export const handleError = (error, req, res, next) => {
  console.error('[ERROR]', error)
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Ocurrió un error inesperado',
    data: null
  })
}
