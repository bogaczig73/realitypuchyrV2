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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const propertyApi = {
    getAll: async (page = 1, limit = 12, search = '', status?: string, categoryId?: string): Promise<PaginatedResponse> => {
        try {
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