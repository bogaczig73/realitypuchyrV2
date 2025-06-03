"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FormOne from "../components/formOne";
import Switcher from "../components/switcher";
import { propertyApi, Property, Pagination } from "../../services/api";

import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { LuBath, LuBedDouble } from "react-icons/lu";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function List() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        total: 0,
        pages: 0,
        currentPage: 1,
        limit: 12
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProperties = async (page: number) => {
        try {
            setLoading(true);
            const response = await propertyApi.getAll(page);
            setProperties(response.properties);
            setPagination(response.pagination);
            setError(null);
        } catch (err) {
            setError('Failed to load properties. Please try again later.');
            console.error('Error fetching properties:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties(1);
    }, []);

    const handlePageChange = (page: number) => {
        fetchProperties(page);
    };

    return (
        <>
            <Navbar navClass="navbar-white" topnavClass={""} tagline={false} />
            <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">List View Layout</h3>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <div className="container relative -mt-16 z-1">
                <div className="grid grid-cols-1">
                    <FormOne />
                </div>
            </div>
            <section className="relative lg:py-24 py-16">
                <div className="container relative">
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading properties...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-600">
                            {error}
                        </div>
                    ) : (
                        <>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px]">
                                {properties.map((property) => (
                                    <div key={property.id} className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto xl:max-w-4xl">
                                        <div className="md:flex">
                                            <div className="relative md:shrink-0">
                                                <img 
                                                    className='h-full w-full object-cover md:w-48' 
                                                    src={property.images[0]?.url || '/images/placeholder.jpg'} 
                                                    alt={property.name}
                                                />
                                                <div className="absolute top-4 end-4">
                                                    <Link href="#" className="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 !rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600">
                                                        <i className="mdi mdi-heart mdi-18px"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="md:pb-4 pb-6">
                                                    <Link href={`/property-detail/${property.id}`} className="text-lg hover:text-green-600 font-medium ease-in-out duration-500">
                                                        {property.name}
                                                    </Link>
                                                </div>

                                                <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                                                    <li className="flex items-center me-4">
                                                        <LiaCompressArrowsAltSolid width={20} className="me-2 text-green-600 text-2xl" />
                                                        <span>{property.size}</span>
                                                    </li>

                                                    <li className="flex items-center me-4">
                                                        <LuBedDouble width={20} className="me-2 text-green-600 text-2xl" />
                                                        <span>{property.beds}</span>
                                                    </li>

                                                    <li className="flex items-center">
                                                        <LuBath width={20} className="me-2 text-green-600 text-2xl" />
                                                        <span>{property.baths}</span>
                                                    </li>
                                                </ul>

                                                <ul className="md:pt-4 pt-6 flex justify-between items-center list-none">
                                                    <li>
                                                        <span className="text-slate-400">Price</span>
                                                        <p className="text-lg font-medium">${property.price.toLocaleString()}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {pagination.pages > 1 && (
                                <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                                    <div className="md:col-span-12 text-center">
                                        <nav>
                                            <ul className="inline-flex items-center -space-x-px">
                                                <li>
                                                    <button
                                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                                        disabled={pagination.currentPage === 1}
                                                        className="w-10 h-10 inline-flex justify-center items-center mx-1 !rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <FiChevronLeft className="text-[20px]" />
                                                    </button>
                                                </li>
                                                {[...Array(pagination.pages)].map((_, index) => (
                                                    <li key={index + 1}>
                                                        <button
                                                            onClick={() => handlePageChange(index + 1)}
                                                            className={`w-10 h-10 inline-flex justify-center items-center mx-1 !rounded-full ${
                                                                pagination.currentPage === index + 1
                                                                    ? 'text-white bg-green-600'
                                                                    : 'text-slate-400 hover:text-white bg-white dark:bg-slate-900 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600'
                                                            } shadow-xs shadow-gray-200 dark:shadow-gray-700`}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                                <li>
                                                    <button
                                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                                        disabled={pagination.currentPage === pagination.pages}
                                                        className="w-10 h-10 inline-flex justify-center items-center mx-1 !rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        <FiChevronRight className="text-[20px]" />
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    );
}