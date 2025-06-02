const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { Upload } = require('@aws-sdk/lib-storage');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

console.log('AWS Credentials:');
console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID : '✗ Missing');
console.log('Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY : '✗ Missing');

// Configure AWS S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-central-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Function to upload image to S3
const uploadImageToS3 = async (file, propertyId) => {
    try {
        console.log('File details:', {
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            buffer: file.buffer ? file.buffer.length : 'no buffer'
        });

        const timestamp = Date.now();
        const key = `properties/${propertyId}/${propertyId}-${timestamp}${path.extname(file.originalname)}`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        });

        await s3Client.send(command);

        // Return the URL of the uploaded file
        // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        return `https://d2ibq52z3bzi2i.cloudfront.net/${key}`;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
};

// Configure multer for S3 upload
const upload = multer({
    storage: multer.memoryStorage(), // Use memory storage to get the buffer
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Function to delete a file from S3
const deleteFile = async (fileUrl) => {
    try {
        const key = fileUrl.split('/').slice(-3).join('/'); // Get the key from the URL (properties/id/filename)
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        });
        await s3Client.send(command);
        return true;
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        throw error;
    }
};

// Function to get a signed URL for temporary access
const getSignedUrlForFile = async (key, expiresIn = 3600) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        });
        const url = await getSignedUrl(s3Client, command, { expiresIn });
        return url;
    } catch (error) {
        console.error('Error generating signed URL:', error);
        throw error;
    }
};

module.exports = {
    upload,
    deleteFile,
    getSignedUrl: getSignedUrlForFile,
    uploadImageToS3
}; 