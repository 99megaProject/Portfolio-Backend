import ErrorApi from "../utils/ErrorApi.js";
import ResponseApi from "../utils/ResponseApi.js";
import uploadOnCloudinary from "../utils/cloudinary.utils.js";
import { MyClient, Project } from "../models/project.model.js";
import { MY_CLIENT_AVATAR, PROJECT_IMG_FOLDER } from '../../constant.js'


// my client says 

const createClient = async (req, res) => {
    try {

        const { username = '', description = '' } = req.body;

        if ([username, description].some((fields) => fields?.trim() == '')) return ErrorApi('All credential required.', 400, res)

        const avatarLocalPath = req?.file?.path

        console.log(avatarLocalPath);

        if (!avatarLocalPath) return ErrorApi('Avatar is required.', 400, res)

        const uploadUrl = await uploadOnCloudinary(avatarLocalPath, MY_CLIENT_AVATAR)

        if (!uploadUrl) return ErrorApi('Avatar doesnot uploaded', 404, res)

        const clientSays = await MyClient.create({
            username, description, avatar: uploadUrl
        })

        if (!clientSays) return ErrorApi('Creation of client says failed', 400, res)
        return ResponseApi('Create client says successfully', 201, clientSays, res)
    } catch (error) {
        console.log(error.message);
        return ErrorApi('Creation of client says failed', 400, res)
    }
}

const deleteClient = async (req, res) => {
    try {

        const { username = "" } = req.body;

        if (!username) return ErrorApi('Username required', 400, res)

        const clientSays = await MyClient.findOneAndDelete({ username })

        if (clientSays == null) return ErrorApi('Client not found', 404, res)

        return ResponseApi('Deletion of client successfully.', 200, clientSays, res)

    } catch (error) {
        console.log(error.message);
        return ErrorApi('Deletion of client says failed', 400, res)
    }
}


const getAllClient = async (req, res) => {
    try {
        const clientSays = await MyClient.find()
        if (!clientSays) return ErrorApi("Can't get clients", 404, res)
        return ResponseApi('Get all clients successfully', 200, clientSays, res)

    } catch (error) {
        console.log(error.message);
        return ErrorApi('Get all clients failed', 400, res)
    }
}


// my project 

const createProject = async (req, res) => {
    try {
        const { name, description, link, technologies, date, video = "" } = req.body;

        if ([name, description, link].some((fields) => fields?.trim() == '')) return ErrorApi('All credential required', 400, res)

        if (!technologies?.length) return ErrorApi('Atleast one technology is required', 400, res)

        // console.log(technologies, date);

        if (!date || (date && Object.keys(date).length != 2)) return ErrorApi('Date is required', 400, res)

        const imageLocalPath = req?.file?.path

        if (!(video || imageLocalPath)) return ErrorApi('One from image or video is required', 400, res)



        let project = '';


        if (imageLocalPath) {

            const uploadUrl = await uploadOnCloudinary(imageLocalPath, PROJECT_IMG_FOLDER)
            if (!uploadUrl) return ErrorApi('Upload image is failed.', 400, res)

            project = await Project.create({
                name, description, link, technologies, date, image: uploadUrl,
            })
        }
        else {
            project = await Project.create({
                name, description, link, technologies, date, video,
            })
        }

        if (!project) return ErrorApi("Can't create project", 400, res)

        return ResponseApi('Project created successfully', 201, project, res)




    } catch (error) {
        // console.log(error.message);
        return ErrorApi('Create project failed', 400, res)
    }
}


const updateProject = async (req, res) => {
    try {

        // console.log(req.body);

        const { name } = req.params

        if (!name) return ErrorApi('Name is required', 400, res)

        const { updatedName, description, link, date, video, technologies } = req.body



        const project = await Project.findOne({ name })

        // console.log(name, project);

        if (!project) return ErrorApi("Can't found project", 400, res)

        const project02 = {
            'name': updatedName || project.name,
            'description': description || project.description,
            'link': link || project.link,
            'video': video || project.video,
        }



        if (date) {
            let dateObj = project.date
            if (date?.from) dateObj['from'] = date.from
            if (date?.to) dateObj['to'] = date.to
            project02['date'] = dateObj
            dateObj = ''
        }

        // console.log(project02);

        if (technologies?.length) {
            let techArr = project.technologies

            for (let i = 0; i < technologies.length; i++) {

                for (let j = 0; j < techArr.length; j++) {

                    if (techArr[j] == technologies[i]) {
                        techArr.splice(j, 1)
                        technologies.splice(i, 1)
                        i--, j--;
                        break;
                    }
                }
            }

            technologies.forEach((val) => {
                techArr.push(val)
            })

            // console.log(techArr);

            project02['technologies'] = techArr
        }


        // console.log(project02);


        const imageLocalPath = req?.file?.path

        if (imageLocalPath) {
            const uploadUrl = await uploadOnCloudinary(imageLocalPath, PROJECT_IMG_FOLDER)

            if (!uploadUrl) return ErrorApi('Image upload failed', 400, res)

            project02['image'] = uploadUrl
        }


        const newProject = await Project.updateOne({ name }, { $set: project02 })

        if (!newProject) return ErrorApi('Can not update project', 400, res)

        return ResponseApi('Project update successfully', 200, newProject, res)
    } catch (error) {
        console.log(error.message);
        return ErrorApi('Update project failed', 400, res)
    }
}


const deleteProject = async (req, res) => {
    try {

        const { name } = req.body
        if (!name) return ErrorApi('Name is required', 400, res)

        const project = await Project.findOneAndDelete({ name })

        if (!project) return ErrorApi("Can't find project", 404, res)

        return ResponseApi('Delete project successfully', 200, project, res)
    } catch (error) {
        console.log(error.message);
        return ErrorApi('Deletion of project failed', 400, res)
    }
}


const getAllProject = async (req, res) => {
    try {

        const project = await Project.find()
        if (!project) return ErrorApi("Can't get projects", 404, res)

        return ResponseApi('Get all projects successfully', 200, project, res)
    } catch (error) {
        console.log(error.message);
        return ErrorApi('Get all project failed', 400, res)
    }
}




export {
    createClient,
    deleteClient,
    getAllClient,
    createProject,
    getAllProject,
    deleteProject,
    updateProject
}