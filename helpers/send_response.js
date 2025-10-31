
export const sendResponse = ({ res, message, statusCode = 200, data = null }) => {
  return res.status(statusCode).json({
    success: statusCode < 300,
    message,
    data
  })
}
