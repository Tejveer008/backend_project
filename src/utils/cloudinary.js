import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary= async(localFilePath)=>{
    try {
        if(!localFilePath) return null;
        //uploading file to cloudinary
       const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("file uploaded successfully",response.url);
        fs.unlinkSync(localFilePath); //delete the file from local storage after upload
        //returning the response    
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //delete the file from local storage
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
} 

export default uploadOnCloudinary;