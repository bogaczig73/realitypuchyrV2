import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
}

async function getCategories(): Promise<Category[]> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${apiUrl}/api/categories`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to load categories. Please try again later.');
    }
}

export default async function Categories() {
    try {
        const categories = await getCategories();

        return (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 md:gap-[30px] gap-3">
                {categories.map((category) => (
                    <div 
                        className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500" 
                        key={category.id}
                    >
                        <div className="relative h-48">
                            <Image 
                                src={category.image} 
                                fill
                                style={{objectFit: 'cover'}}
                                alt={category.name}
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:opacity-0 transition-all duration-300" />
                        </div>
                        <div className="p-4">
                            <Link 
                                href={`/list?categoryId=${category.id}`} 
                                className="text-xl font-medium hover:text-green-600"
                            >
                                {category.name}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">Failed to load categories. Please try again later.</p>
            </div>
        );
    }
}