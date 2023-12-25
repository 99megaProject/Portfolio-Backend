const ErrorApi = (message = "Something went wrong", statusCode = 500, res) => {
    return res.status(statusCode).json({ success: false, message })

}
export default ErrorApi 