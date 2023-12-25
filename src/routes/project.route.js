import express from 'express'
import upload from '../middlewares/multer.middleware.js'
import { createClient, deleteClient, getAllClient, createProject, getAllProject, deleteProject, updateProject } from '../controllers/project.controller.js'
const router = express.Router()

// my client
router.route('/client/create').post(upload.single('avatar'), createClient)
router.route('/client/delete').delete(deleteClient)
router.route('/client').get(getAllClient)


// my project

router.route('/project/create').post(upload.single('image'), createProject)
router.route('/project/update/:name').put(upload.single('image'), updateProject)
router.route('/project/delete').delete(deleteProject)
router.route('/project').get(getAllProject)


export default router 