import { ContactMe, FollowMe, ServiceProvide } from '../models/service.model.js'
import ErrorApi from '../utils/ErrorApi.js'
import ResponseApi from '../utils/ResponseApi.js'
import uploadOnCloudinary from '../utils/cloudinary.utils.js'
import { FOLLOW_ME_FOLDER, SERVICE_IMG_FOLDER } from '../../constant.js'
import { sendMail } from '../utils/sendMail.utils.js'


// contact message routes

const createContactMessage = async (req, res) => {
    try {

        const { name, email, message } = req.body

        if ([name, email, message].some((fields) => fields?.trim() == '')) return ErrorApi('All credential required', 400, res)

        const contactMsg = await ContactMe.create({
            name, email, message
        })

        // console.log(contactMsg);

        if (!contactMsg) return ErrorApi("Can't send message.", 400, res)



        const isSend = await sendMail(email, `Successfully send message to Sandeep's portfolio`, `Thank you ${name} \n\n we will contact you as soon as possible.`)


        return ResponseApi('Contact message posted successfully', 201, contactMsg, res)

    } catch (error) {
        return ErrorApi('Contact message failed', 400, res)
    }
}

const deleteMessage = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return ErrorApi('Please enter email', 400, res)

        const contactMsg = await ContactMe.findOne({ email })

        if (!contactMsg) return ErrorApi('Message not found', 404, res)

        await contactMsg.deleteOne()

        return ResponseApi('Contact message deleted successfully', 200, {}, res)
    } catch (error) {

        return ErrorApi('Delete message failed', 400, res)

    }
}

//  follow me routes

const createFollowMe = async (req, res) => {
    console.log(req.body);
    try {

        const { name = "", link = "" } = req.body;


        if ([name, link].some((fields) => fields?.trim() == '')) return ErrorApi('All credentials required', 400, res)

        const imageLocalPath = req?.file?.path || ''

        if (!imageLocalPath) return ErrorApi('Image is required', 400, res)

        const uploadData = await uploadOnCloudinary(imageLocalPath, FOLLOW_ME_FOLDER)

        if (!uploadData) return ErrorApi('Creation of follow me failed', 400, res)

        const followMe = await FollowMe.create({
            name, link, image: uploadData
        })

        if (!followMe) return ErrorApi('Creation of follow me failed', 400, res)

        return ResponseApi('Follow me created successfully.', 201, followMe, res)
    } catch (error) {
        console.log(error.message);
        return ErrorApi('Create Follow me failed', 400, res)

    }
}

const removeFollowMe = async (req, res) => {
    try {
        const { name = "" } = req.body;
        if (!name) return ErrorApi('Name is required', 400, res)

        const followme = await FollowMe.findOneAndDelete({ name })

        if (followme == null) return ErrorApi('Follow me is not found ', 404, res)

        return ResponseApi('Delete follow me successfully', 200, followme, res)



    } catch (error) {
        ErrorApi('Create Follow me failed', 400, res)

    }
}

const getAllFollowMe = async (req, res) => {
    try {

        const followme = await FollowMe.find()

        if (!followme) return ErrorApi("Can't get follow me.", 404, res)

        return ResponseApi('All follow me getting successfully', 200, followme, res)

    } catch (error) {
        return ErrorApi('Follow me getting failed', 400, res)
    }
}


// provided service route 

const createService = async (req, res) => {

    try {
        const { title = '', link = '' } = req.body

        if (!(title && link)) return ErrorApi('All credential required', 400, res)

        const imageLocalPath = req?.file?.path
        if (!imageLocalPath) return ErrorApi('Image is required', 400, res)

        const uploadUrl = await uploadOnCloudinary(imageLocalPath, SERVICE_IMG_FOLDER)

        if (!uploadUrl) return ErrorApi('Image upload failed', 400, res)


        const service = await ServiceProvide.create({
            title, link, image: uploadUrl
        })

        if (!service) return ErrorApi('Service creation failed', 400, res)

        return ResponseApi('Create service successfully', 201, service, res)

    } catch (error) {
        console.log(error.message);
        return ErrorApi('Creation of service failed', 400, res)
    }
}

const deleteService = async (req, res) => {
    try {
        const { title } = req.body
        if (!title) return ErrorApi('Title is required', 400, res)

        const service = await ServiceProvide.findOneAndDelete({ title })

        if (!service) return ErrorApi("Can't found service", 404, res)

        return ResponseApi('Service delete successfully', 200, service, res)
    } catch (error) {
        console.log(error.message);
        return ErrorApi('Deletion of service failed', 400, res)
    }
}

const getAllService = async (req, res) => {
    try {
        const service = await ServiceProvide.find()
        if (!service) return ErrorApi("Can't found service", 404, res)

        return ResponseApi('Getting all service successfully', 200, service, res)
    } catch (error) {
        console.log(error.message);
        return ErrorApi('Getting of service failed', 400, res)
    }
}



export {
    createContactMessage,
    deleteMessage,
    createFollowMe,
    removeFollowMe,
    getAllFollowMe,
    createService,
    deleteService,
    getAllService
}