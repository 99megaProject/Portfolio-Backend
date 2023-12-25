import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (imageLocalPath, folder) => {
    if (!imageLocalPath) return null
    try {
        console.log('Uploading on cloudinary....');
        const data = await cloudinary.uploader.upload(imageLocalPath, {
            folder
        });

        console.log(data);
        fs.unlinkSync(imageLocalPath)

        return data.url
    } catch (error) {
        fs.unlinkSync(imageLocalPath)
        console.log(error.message);
        return null
    }
}

export default uploadOnCloudinary 