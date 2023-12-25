import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,  // url from cloudinary
        default: 'https://png.pngtree.com/png-vector/20220330/ourmid/pngtree-startup-project-mobile-development-team-rocket-takes-off-for-launching-a-png-image_4520231.png'
    },
    video: {
        type: String,  // url from cloudinary
        default: ''
    },
    link: {
        type: String,
        required: true
    },
    technologies: [
        {
            type: String,
            required: true
        }
    ],
    date: {
        from: String,
        to: String
    }


})


const myClientSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const Project = mongoose.model('Project', projectSchema)
const MyClient = mongoose.model('MyClient', myClientSchema)

export { Project, MyClient }