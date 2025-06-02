const express = require('express');
const router = express.Router();
const { upload, deleteFile, getSignedUrl } = require('../services/s3Service');

// Upload single image
router.post('/image', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageUrl = await uploadImageToS3(req.file);
        res.json({ url: imageUrl });
    } catch (err) {
        next(err);
    }
});

// Get signed URL for image
router.get('/signed-url/:key', async (req, res, next) => {
    try {
        const { key } = req.params;
        const signedUrl = await getSignedUrl(key);
        res.json({ url: signedUrl });
    } catch (err) {
        next(err);
    }
});

// Delete image
router.delete('/image/:key', async (req, res, next) => {
    try {
        const { key } = req.params;
        await deleteFile(key);
        res.json({ message: 'Image deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router; 