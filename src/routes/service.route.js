import express from 'express'
const router = express.Router()
import { createContactMessage, deleteMessage, createFollowMe, removeFollowMe, getAllFollowMe, createService, deleteService, getAllService } from '../controllers/service.controller.js'
import upload from '../middlewares/multer.middleware.js'

// contact me message 
router.route('/contact/create').post(createContactMessage)
router.route('/contact/delete').post(deleteMessage)

// follow me 
router.route('/follow/create').post(upload.single('image'), createFollowMe)
router.route('/follow/delete').delete(removeFollowMe)
router.route('/follow').get(getAllFollowMe)


// service provide route 

router.route('/service/create').post(upload.single('image'), createService)
router.route('/service/delete').delete(deleteService)
router.route('/service').get(getAllService)


export default router 