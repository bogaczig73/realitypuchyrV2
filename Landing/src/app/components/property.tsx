'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { LuBath, LuBedDouble } from "react-icons/lu";
import { propertyApi } from '@/services/api';
import type { Property } from '@/services/api';

export default function Property() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await propertyApi.getAll(1, 6); // Fetch only 6 featured properties
                setProperties(response.properties);
            } catch (error) {
                setError('Failed to load properties. Please try again later.');
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleImageLoad = (id: number) => {
        setImageLoading(prev => ({ ...prev, [id]: false }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <>
            <div className="container lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>
                    <p className="text-slate-400 max-w-xl mx-auto">A great platform to buy, sell and rent your properties without any agent or commissions.</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
                    {properties.map((item) => (
                        <div className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500" key={item.id}>
                            <div className="relative">
                                {imageLoading[item.id] !== false && (
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                                )}
                                <Link href={`/property-detail/${item.id}`}>
                                    <Image 
                                        src={item.images[0]?.url || '/images/property/placeholder.webp'} 
                                        alt={item.name}
                                        width={0} 
                                        height={0} 
                                        sizes="100vw" 
                                        style={{width:"100%", height:"auto"}} 
                                        priority
                                        onLoad={() => handleImageLoad(item.id)}
                                        className={`${imageLoading[item.id] !== false ? 'opacity-0' : 'opacity-100'} cursor-pointer transition-transform duration-300 group-hover:scale-105`}
                                    />
                                </Link>

                                <div className="absolute top-4 end-4">
                                    <Link href="#" className="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 !rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600">
                                        <i className="mdi mdi-heart mdi-18px"></i>
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="pb-6">
                                    <Link href={`/property-detail/${item.id}`} className="text-lg hover:text-green-600 font-medium ease-in-out duration-500">{item.name}</Link>
                                </div>

                                <ul className="py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                                    {item.size && (
                                        <li className="flex items-center me-4">
                                            <LiaCompressArrowsAltSolid className="me-2 text-green-600"/>
                                            <span>{item.size} m²</span>
                                        </li>
                                    )}

                                    {item.beds && (
                                        <li className="flex items-center me-4">
                                            <LuBedDouble className="me-2 text-green-600"/>
                                            <span>{item.beds} Beds</span>
                                        </li>
                                    )}

                                    {item.layout && (
                                        <li className="flex items-center">
                                            <i className="mdi mdi-floor-plan text-2xl me-2 text-green-600"></i>
                                            <span>{item.layout}</span>
                                        </li>
                                    )}
                                </ul>

                                <ul className="pt-6 flex justify-between items-center list-none">
                                    <li>
                                        <span className="text-slate-400">Price</span>
                                        <p className="text-lg font-medium">
                                            ${parseFloat(String(item.price || '0')).toLocaleString()}
                                            {item.discountedPrice && (
                                                <span className="text-sm text-red-500 ml-2 line-through">
                                                    ${parseFloat(String(item.discountedPrice)).toLocaleString()}
                                                </span>
                                            )}
                                        </p>
                                    </li>

                                    {item.status && (
                                        <li>
                                            <span className="text-slate-400">Status</span>
                                            <p className="text-lg font-medium text-green-600">
                                                {item.status}
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

