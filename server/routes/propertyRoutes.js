const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const { upload } = require('../services/s3Service');
const { validateProperty } = require('../middleware/validation');

const pool = new Pool({
    user: process.env.DB_USER || 'radimbohac',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || '12345',
    port: process.env.DB_PORT || 5432,
});

// Get all properties with pagination and search
router.get('/', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const search = req.query.search || '';
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM properties';
        let countQuery = 'SELECT COUNT(*) FROM properties';
        const queryParams = [];

        if (search) {
            query += ' WHERE name ILIKE $1';
            countQuery += ' WHERE name ILIKE $1';
            queryParams.push(`%${search}%`);
        }

        query += ' ORDER BY created_at DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2);
        queryParams.push(limit, offset);

        const [propertiesResult, countResult] = await Promise.all([
            pool.query(query, queryParams),
            pool.query(countQuery, search ? [queryParams[0]] : [])
        ]);

        const total = parseInt(countResult.rows[0].count);
        const pages = Math.ceil(total / limit);

        // Transform the properties to use value instead of price
        const transformedProperties = propertiesResult.rows.map(property => ({
            ...property,
            value: property.price,
            createdAt: property.created_at
        }));

        res.json({
            properties: transformedProperties,
            pagination: {
                total,
                pages,
                currentPage: page,
                limit
            }
        });
    } catch (err) {
        next(err);
    }
});

// Get single property
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }
        
        // Transform the response to use value instead of price
        const property = result.rows[0];
        const transformedProperty = {
            ...property,
            value: property.price,
            createdAt: property.created_at
        };
        delete transformedProperty.price;
        delete transformedProperty.created_at;
        
        res.json(transformedProperty);
    } catch (err) {
        next(err);
    }
});

// Create new property
router.post('/', upload.array('images', 10), validateProperty, async (req, res, next) => {
    try {
        const { name, sqf, beds, baths, price, rating, featuredImageIndex } = req.body;
        
        const result = await pool.query(
            'INSERT INTO properties (name, image, sqf, beds, baths, price, rating) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, 'pending', sqf, beds, baths, price, rating]
        );

        const propertyId = result.rows[0].id;
        let featuredImageUrl = null;

        if (req.files && req.files.length > 0) {
            const imageUrls = [];
            
            for (let i = 0; i < req.files.length; i++) {
                const imageUrl = await uploadImageToS3(req.files[i], propertyId);
                imageUrls.push(imageUrl);
                
                if (i === parseInt(featuredImageIndex)) {
                    featuredImageUrl = imageUrl;
                }
            }

            if (featuredImageUrl) {
                await pool.query(
                    'UPDATE properties SET image = $1 WHERE id = $2',
                    [featuredImageUrl, propertyId]
                );
            }

            for (const imageUrl of imageUrls) {
                await pool.query(
                    'INSERT INTO property_images (property_id, image_url, is_featured) VALUES ($1, $2, $3)',
                    [propertyId, imageUrl, imageUrl === featuredImageUrl]
                );
            }

            const updatedProperty = await pool.query(
                `SELECT p.*, 
                    json_agg(json_build_object(
                        'id', pi.id,
                        'url', pi.image_url,
                        'is_featured', pi.is_featured
                    )) as images
                FROM properties p
                LEFT JOIN property_images pi ON p.id = pi.property_id
                WHERE p.id = $1
                GROUP BY p.id`,
                [propertyId]
            );

            res.status(201).json(updatedProperty.rows[0]);
        } else {
            res.status(201).json(result.rows[0]);
        }
    } catch (err) {
        next(err);
    }
});

// Update property
router.put('/:id', validateProperty, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, sqf, beds, baths, price, rating } = req.body;

        const result = await pool.query(
            'UPDATE properties SET name = $1, sqf = $2, beds = $3, baths = $4, price = $5, rating = $6 WHERE id = $7 RETURNING *',
            [name, sqf, beds, baths, price, rating, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// Delete property
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM properties WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router; 