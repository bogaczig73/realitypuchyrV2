const validateProperty = (req, res, next) => {
    const { name, sqf, beds, baths, price, rating } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Name is required and must be a non-empty string');
    }

    if (!sqf || isNaN(sqf) || sqf <= 0) {
        errors.push('Square footage must be a positive number');
    }

    if (!beds || isNaN(beds) || beds < 0) {
        errors.push('Number of bedrooms must be a non-negative number');
    }

    if (!baths || isNaN(baths) || baths < 0) {
        errors.push('Number of bathrooms must be a non-negative number');
    }

    if (!price || isNaN(price) || price <= 0) {
        errors.push('Price must be a positive number');
    }

    if (rating && (isNaN(rating) || rating < 0 || rating > 5)) {
        errors.push('Rating must be a number between 0 and 5');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = {
    validateProperty
}; 