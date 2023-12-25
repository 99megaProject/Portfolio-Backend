import { AboutMe, HomePage } from '../models/personalDetail.model.js'
import uploadOnCloudinary from '../utils/cloudinary.utils.js'
import ErrorApi from '../utils/ErrorApi.js'
import ResponseApi from '../utils/ResponseApi.js'
import { ABOUT_ME_AVATAR } from '../../constant.js'


// home page 

const createHomePage = async (req, res) => {
    try {
        const { title = "", heading = "", description = "" } = req.body

        if ([title, heading, description].some((fields) => (fields?.trim() == ''))) return ErrorApi('All credential required', 400, res)

        const homePage = await HomePage.create({
            title, heading, description
        })


        if (!homePage) return ErrorApi("Can't create home page", 400, res)

        return ResponseApi('Create home page successfully', 201, homePage, res)
    } catch (error) {

        console.log(error.message);
        return ErrorApi("Create home page failed", 400, res)
    }
}

const getHomePage = async (req, res) => {
    try {

        const homePage = await HomePage.find()

        if (!homePage) return ErrorApi("Can't found home page", 404, res)

        return ResponseApi('Get all home page successfully', 200, homePage, res)
    } catch (error) {
        console.log(error.message);
        return ErrorApi("Get home page failed", 400, res)
    }
}

const updateHomePage = async (req, res) => {

    try {
        const { title } = req.params

        if (!title) return ErrorApi("Title is required", 400, res)

        const { updateTitle = '', heading = '', description = '' } = req.body


        const homepage = await HomePage.findOne({ title })

        if (!homepage) return ErrorApi("Can't find home page", 400, res)

        const updatedHomePage = {
            'title': updateTitle || homepage.title,
            'heading': heading || homepage.heading,
            'description': description || homepage.description
        }

        const newHomePage = await HomePage.updateOne({ title }, { $set: updatedHomePage })

        if (!newHomePage) return ErrorApi("Can't update home page", 400, res)

        return ResponseApi('Update home page successfully', 201, newHomePage, res)
    } catch (error) {

    }
}


// about me 

const createAboutMe = async (req, res) => {

    try {
        const { description, skills, resume = "" } = req.body

        if (!description) return ErrorApi("Description is required", 400, res)
        if (!skills || (skills?.length == 0)) return ErrorApi('Aleast one skill is compulsory', 400, res)

        const avatarLocalPath = req?.file?.path

        if (!avatarLocalPath) return ErrorApi('Avatar is required', 400, res)

        const uploadUrl = await uploadOnCloudinary(avatarLocalPath, ABOUT_ME_AVATAR)

        if (!uploadUrl) return ErrorApi('Avatar upload failed', 400, res)

        const aboutMe = await AboutMe.create({
            description, skills, resume, avatar: uploadUrl
        })


        if (!aboutMe) return ErrorApi('Can not create about me', 400, res)


        return ResponseApi('Create about me successfully', 201, aboutMe, res)


    } catch (error) {
        console.log(error.message);
        return ErrorApi('Create about me failed', 400, res)
    }
}


const updateAboutMe = async (req, res) => {
    try {

        const { description = "", skills, resume = '' } = req.body


        const aboutme = await AboutMe.findOne()

        if (!aboutme) return ErrorApi("Can't found about me", 404, res)

        const aboutMe02 = {
            'description': description || aboutme.description,
            'resume': resume || aboutme.resume
        }

        if (skills?.length) {

            let skillsArr = aboutme.skills

            for (let i = 0; i < skills.length; i++) {

                for (let j = 0; j < skillsArr.length; j++) {

                    if (skillsArr[j] == skills[i]) {
                        skillsArr.splice(j, 1)
                        skills.splice(i, 1)
                        i--, j--;
                        break;
                    }
                }
            }

            skills.forEach((val) => {
                skillsArr.push(val)
            })

            console.log(skillsArr);

            aboutMe02['skills'] = skillsArr
        }


        const avatarLocalPath = req?.file?.path

        if (avatarLocalPath) {

            const uploadUrl = await uploadOnCloudinary(avatarLocalPath, ABOUT_ME_AVATAR)

            if (!uploadUrl) return ErrorApi("Can't upload avatar", 400, res)

            aboutMe02['avatar'] = uploadUrl
        }

        const newAboutMe = await AboutMe.findByIdAndUpdate(aboutme._id, { $set: aboutMe02 }, { new: true })

        console.log(newAboutMe);
        if ((newAboutMe && newAboutMe?.acknowledged == false)) return ErrorApi("Can't update about me", 400, res)


        return ResponseApi('Update about me successfully', 200, newAboutMe, res)


    } catch (error) {
        console.log(error.message);
        return ErrorApi('Update about me failed', 400, res)
    }
}

const getAboutMe = async (req, res) => {
    try {

        const aboutme = await AboutMe.findOne()
        if (!aboutme) return ErrorApi("Can't found about me", 404, res)

        return ResponseApi('Get about me successfully', 200, aboutme, res)

    } catch (error) {
        console.log(error.message);
        return ErrorApi('Get about me failed', 400, res)
    }
}



export {
    createHomePage,
    updateHomePage,
    getHomePage,
    createAboutMe,
    getAboutMe,
    updateAboutMe
}