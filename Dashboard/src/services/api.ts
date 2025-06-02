import axios from 'axios';
import { Property, Pagination, PaginatedResponse } from '@/types/property';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api';

export const propertyApi = {
  getAll: async (page = 1, limit = 12, search = ''): Promise<PaginatedResponse> => {
    const response = await axios.get(`${API_BASE_URL}/properties`, {
      params: { page, limit, search }
    });
    return response.data;
  },

  getById: async (id: number): Promise<Property> => {
    const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
    return response.data;
  },

  create: async (propertyData: FormData): Promise<Property> => {
    const response = await axios.post(`${API_BASE_URL}/properties`, propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id: number, propertyData: Partial<Property>): Promise<Property> => {
    const response = await axios.put(`${API_BASE_URL}/properties/${id}`, propertyData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/properties/${id}`);
  },
}; 