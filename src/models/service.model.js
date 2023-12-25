import mongoose, { Schema } from 'mongoose'

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})


const followMeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


const serviceProvideSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


const ContactMe = mongoose.model('ContactMe', contactSchema)
const FollowMe = mongoose.model('FollowMe', followMeSchema)
const ServiceProvide = mongoose.model('ServiceProvide', serviceProvideSchema)



export { ContactMe, FollowMe, ServiceProvide }