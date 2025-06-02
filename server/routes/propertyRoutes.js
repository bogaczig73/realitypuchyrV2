const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { uploadPropertyFiles, uploadFileToS3 } = require('../services/s3Service');
const { validateProperty } = require('../middleware/validation');

const prisma = new PrismaClient();

// Helper function to convert S3 URLs to CloudFront URLs
const convertToCloudFrontUrl = (url) => {
    if (!url) return url;
    return url.replace(
        'realitypuchyr-estate-photos.s3.eu-central-1.amazonaws.com',
        'd2ibq52z3bzi2i.cloudfront.net'
    );
};

// Test S3 upload endpoint
router.post('/test-upload', uploadPropertyFiles, async (req, res) => {
    try {
        if (!req.files || (!req.files.images && !req.files.files)) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        console.log('Test upload - Files received:', {
            images: req.files.images?.map(file => ({
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size
            })),
            files: req.files.files?.map(file => ({
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size
            }))
        });

        // Upload all files to S3
        const uploadPromises = [];
        
        if (req.files.images) {
            uploadPromises.push(...req.files.images.map(async (file) => {
                const imageUrl = await uploadFileToS3(file, 'test', 'images');
                return {
                    type: 'image',
                    originalname: file.originalname,
                    url: imageUrl
                };
            }));
        }

        if (req.files.files) {
            uploadPromises.push(...req.files.files.map(async (file) => {
                const fileUrl = await uploadFileToS3(file, 'test', 'files');
                return {
                    type: 'file',
                    originalname: file.originalname,
                    url: fileUrl,
                    mimetype: file.mimetype,
                    size: file.size
                };
            }));
        }

        const results = await Promise.all(uploadPromises);
        res.json(results);
    } catch (error) {
        console.error('Test upload error:', error);
        res.status(500).json({
            error: 'Upload failed',
            details: error.message
        });
    }
});

// Get all properties with pagination and search
router.get('/', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const search = req.query.search || '';
        const skip = (page - 1) * limit;

        // Build where clause for search
        const where = search ? {
            OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ]
        } : {};

        // Get total count
        const total = await prisma.property.count({ where });

        // Get properties with pagination
        const properties = await prisma.property.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                images: true
            }
        });

        // Convert S3 URLs to CloudFront URLs
        const propertiesWithCloudFrontUrls = properties.map(property => ({
            ...property,
            images: property.images.map(image => ({
                ...image,
                url: convertToCloudFrontUrl(image.url)
            }))
        }));

        res.json({
            properties: propertiesWithCloudFrontUrls,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                currentPage: page,
                limit
            }
        });
    } catch (err) {
        console.error('Error fetching properties:', err);
        next(err);
    }
});

// Get single property
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await prisma.property.findUnique({
            where: { id: parseInt(id) },
            include: {
                images: true,
                floorplans: true
            }
        });
        
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        res.json(property);
    } catch (err) {
        console.error('Error fetching property:', err);
        next(err);
    }
});

// Create new property
router.post('/', uploadPropertyFiles, validateProperty, async (req, res, next) => {
    try {
        console.log('Files received:', req.files);
        console.log('Request body:', req.body);

        const {
            name, category, status, ownershipType, description,
            city, street, country, latitude, longitude,
            virtualTour, videoUrl, size, beds, baths,
            price, discountedPrice, buildingStoriesNumber,
            buildingCondition, apartmentCondition, aboveGroundFloors,
            reconstructionYearApartment, reconstructionYearBuilding,
            totalAboveGroundFloors, totalUndergroundFloors,
            floorArea, builtUpArea, gardenHouseArea, terraceArea,
            totalLandArea, gardenArea, garageArea, balconyArea,
            pergolaArea, basementArea, workshopArea, totalObjectArea,
            usableArea, landArea, objectType, objectLocationType,
            houseEquipment, accessRoad, objectCondition,
            reservationPrice, equipmentDescription, additionalSources,
            buildingPermit, buildability, utilitiesOnLand,
            utilitiesOnAdjacentRoad, payments, brokerId, secondaryAgent,
            layout
        } = req.body;

        // Validate required fields
        if (!name || !price) {
            return res.status(400).json({
                error: 'Missing required fields',
                details: [
                    !name && 'Name is required',
                    !price && 'Price is required'
                ].filter(Boolean)
            });
        }

        // Create property with Prisma
        const property = await prisma.property.create({
            data: {
                // Required fields
                name,
                price: parseFloat(price),
                category: category.toUpperCase(),
                status: status.toUpperCase(),
                ownershipType: ownershipType.toUpperCase(),
                description: description || '',
                city: city || '',
                street: street || '',
                country: country || '',
                size: size || '',
                beds: beds || '',
                baths: baths || '',
                layout: layout || '',
                virtualTour: virtualTour || '',
                files: '[]',
                
                // Optional fields
                latitude: latitude ? parseFloat(latitude) : null,
                longitude: longitude ? parseFloat(longitude) : null,
                videoUrl: videoUrl || null,
                discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
                buildingStoriesNumber: buildingStoriesNumber || null,
                buildingCondition: buildingCondition || null,
                apartmentCondition: apartmentCondition || null,
                aboveGroundFloors: aboveGroundFloors || null,
                reconstructionYearApartment: reconstructionYearApartment || null,
                reconstructionYearBuilding: reconstructionYearBuilding || null,
                totalAboveGroundFloors: totalAboveGroundFloors || null,
                totalUndergroundFloors: totalUndergroundFloors || null,
                floorArea: floorArea || null,
                builtUpArea: builtUpArea || null,
                gardenHouseArea: gardenHouseArea || null,
                terraceArea: terraceArea || null,
                totalLandArea: totalLandArea || null,
                gardenArea: gardenArea || null,
                garageArea: garageArea || null,
                balconyArea: balconyArea || null,
                pergolaArea: pergolaArea || null,
                basementArea: basementArea || null,
                workshopArea: workshopArea || null,
                totalObjectArea: totalObjectArea || null,
                usableArea: usableArea || null,
                landArea: landArea || null,
                objectType: objectType || null,
                objectLocationType: objectLocationType || null,
                houseEquipment: houseEquipment || null,
                accessRoad: accessRoad || null,
                objectCondition: objectCondition || null,
                reservationPrice: reservationPrice || null,
                equipmentDescription: equipmentDescription || null,
                additionalSources: additionalSources || null,
                buildingPermit: buildingPermit || null,
                buildability: buildability || null,
                utilitiesOnLand: utilitiesOnLand || null,
                utilitiesOnAdjacentRoad: utilitiesOnAdjacentRoad || null,
                payments: payments || null,
                brokerId: brokerId || null,
                secondaryAgent: secondaryAgent || null
            }
        });

        // Handle image uploads if any
        if (req.files && req.files.images) {
            console.log('Processing', req.files.images.length, 'images');
            const imagePromises = req.files.images.map(async (file, index) => {
                try {
                    console.log('Uploading image', index + 1);
                    const imageUrl = await uploadFileToS3(file, property.id, 'images');
                    console.log('Image uploaded successfully:', imageUrl);
                    return prisma.propertyImage.create({
                        data: {
                            url: imageUrl,
                            isMain: index === 0, // First image is main
                            propertyId: property.id
                        }
                    });
                } catch (error) {
                    console.error('Error uploading image', index + 1, ':', error);
                    throw error;
                }
            });

            try {
                await Promise.all(imagePromises);
                console.log('All images processed successfully');
            } catch (error) {
                console.error('Error processing images:', error);
                // If image upload fails, delete the property
                await prisma.property.delete({
                    where: { id: property.id }
                });
                throw new Error('Failed to upload images: ' + error.message);
            }
        }

        // Handle file uploads if any
        if (req.files && req.files.files) {
            console.log('Processing', req.files.files.length, 'files');
            const filePromises = req.files.files.map(async (file) => {
                try {
                    console.log('Uploading file:', file.originalname);
                    const fileUrl = await uploadFileToS3(file, property.id, 'files');
                    console.log('File uploaded successfully:', fileUrl);
                    return {
                        name: file.originalname,
                        url: fileUrl,
                        type: file.mimetype,
                        size: file.size
                    };
                } catch (error) {
                    console.error('Error uploading file:', file.originalname, error);
                    throw error;
                }
            });

            try {
                const uploadedFiles = await Promise.all(filePromises);
                // Update property with file references
                await prisma.property.update({
                    where: { id: property.id },
                    data: {
                        files: JSON.stringify(uploadedFiles)
                    }
                });
                console.log('All files processed successfully');
            } catch (error) {
                console.error('Error processing files:', error);
                // If file upload fails, delete the property
                await prisma.property.delete({
                    where: { id: property.id }
                });
                throw new Error('Failed to upload files: ' + error.message);
            }
        }

        // Get the complete property with images and files
        const completeProperty = await prisma.property.findUnique({
            where: { id: property.id },
            include: {
                images: true
            }
        });

        res.status(201).json(completeProperty);
    } catch (err) {
        console.error('Error creating property:', err);
        next(err);
    }
});

// Update property
router.put('/:id', validateProperty, async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Convert numeric fields
        if (updateData.latitude) updateData.latitude = parseFloat(updateData.latitude);
        if (updateData.longitude) updateData.longitude = parseFloat(updateData.longitude);
        if (updateData.price) updateData.price = parseFloat(updateData.price);
        if (updateData.discountedPrice) updateData.discountedPrice = parseFloat(updateData.discountedPrice);

        const property = await prisma.property.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                images: true,
                floorplans: true
            }
        });

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json(property);
    } catch (err) {
        console.error('Error updating property:', err);
        next(err);
    }
});

// Delete property
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Delete related records first (Prisma will handle this with cascade)
        await prisma.property.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        console.error('Error deleting property:', err);
        next(err);
    }
});

module.exports = router; 