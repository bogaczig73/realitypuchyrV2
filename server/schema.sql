-- Create properties table if it doesn't exist
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    sqf VARCHAR(50) NOT NULL,
    beds VARCHAR(50) NOT NULL,
    baths VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(3, 1) NOT NULL,
    review_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data if table is empty
INSERT INTO properties (name, image, sqf, beds, baths, price, rating, review_count)
SELECT 
    '10765 Hillshire Ave, Baton Rouge, LA 70810, USA',
    'https://example.com/property1.jpg',
    '8000sqf',
    '4 Beds',
    '4 Baths',
    5000.00,
    5.0,
    30
WHERE NOT EXISTS (SELECT 1 FROM properties LIMIT 1); 