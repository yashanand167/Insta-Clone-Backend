import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const uploadOnCloudinary = async (localFilePath: string): Promise<any | null> => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });
        console.log('File is uploaded on Cloudinary', response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};
