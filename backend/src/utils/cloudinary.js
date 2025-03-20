import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//console.log(cloudinary.config());

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        //console.log("Uploading file to Cloudinary:", localFilePath)

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploadedd
        console.log("File is upload on cloudinary", response.url);

        //fs.unlinkSync(localFilePath);

        return response

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed

        return null
    }
}

export { uploadOnCloudinary }



