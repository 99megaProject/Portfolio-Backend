import express from 'express'
import { createHomePage, getHomePage, updateHomePage, createAboutMe, getAboutMe, updateAboutMe } from '../controllers/profile.controller.js'
import upload from '../middlewares/multer.middleware.js'

const router = express.Router()

// home page route 

router.route('/profile/home/create').post(createHomePage)
router.route('/profile/home/update/:title').put(updateHomePage)
router.route('/profile/home').get(getHomePage)

// about me route 
router.route('/profile/aboutme/create').post(upload.single('avatar'), createAboutMe)
router.route('/profile/aboutme/update').put(upload.single('avatar'), updateAboutMe)
router.route('/profile/aboutme').get(getAboutMe)



export default router 