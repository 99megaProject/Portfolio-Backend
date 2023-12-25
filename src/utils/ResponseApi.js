
const ResponseApi = (message = "Work done successfully", statusCode = 200, data = {}, res) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    })
}

export default ResponseApi 