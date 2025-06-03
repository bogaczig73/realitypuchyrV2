import axios from 'axios';

export interface PropertyImage {
    id: number;
    url: string;
    is_featured: boolean;
}

export interface Property {
    id: number;
    name: string;
    price: number;
    size: string;
    beds: string;
    baths: string;
    images: PropertyImage[];
    layout?: string;
    description?: string;
    city?: string;
    street?: string;
    country?: string;
    category?: string;
    status?: string;
    ownershipType?: string;
    virtualTour?: string;
    videoUrl?: string;
    discountedPrice?: number;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
}

export interface PaginatedResponse {
    properties: Property[];
    pagination: Pagination;
}

export interface Review {
    id: number;
    name: string;
    description: string;
    rating: number;
    createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor for logging
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            params: config.params
        });
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            return Promise.reject(new Error('Request timeout. Please check your internet connection.'));
        }

        if (!error.response) {
            console.error('Network Error:', error);
            return Promise.reject(new Error(`Network error. Please check if the server is running at ${API_BASE_URL}`));
        }

        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const propertyApi = {
    getAll: async (page = 1, limit = 12, search = '', status?: string, categoryId?: string): Promise<PaginatedResponse> => {
        try {
            console.log('Fetching properties with params:', { page, limit, search, status, categoryId });
            const response = await api.get('/properties', {
                params: { page, limit, search, status, categoryId }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching properties:', error);
            throw new Error('Failed to fetch properties. Please try again later.');
        }
    },

    getById: async (id: number): Promise<Property> => {
        try {
            const response = await api.get(`/properties/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching property:', error);
            throw new Error('Failed to fetch property details. Please try again later.');
        }
    }
};

export const reviewsApi = {
    getAll: async (): Promise<Review[]> => {
        try {
            const response = await api.get('/reviews');
            return response.data;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw new Error('Failed to fetch reviews. Please try again later.');
        }
    }
}; 