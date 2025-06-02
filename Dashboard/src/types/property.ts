export interface Property {
    id: number;
    name: string;
    image: string;
    sqf: string;
    beds: string;
    baths: string;
    value: string;
    rating: string;
    review_count: number;
    createdAt: string;
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