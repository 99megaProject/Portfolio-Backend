import mongoose, { Schema } from 'mongoose'

const homePageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: String, // url from cloudinary 
        required: true
    },
})

const aboutMeSchema = new Schema({
    avatar: {
        type: String, // url from cloudinary 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: [
        {
            type: String,
            required: true
        }
    ],
    resume: {
        type: String,  // url from cloudinary 
        // required: true
    }
})


const HomePage = mongoose.model('HomePage', homePageSchema)
const AboutMe = mongoose.model('AboutMe', aboutMeSchema)

export { HomePage, AboutMe }