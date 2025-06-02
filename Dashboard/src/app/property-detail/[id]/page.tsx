'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Wrapper from "../../components/wrapper";
import PropertyImage from "../../components/propertyImage";
import { useParams } from "next/navigation";
import { propertyApi, Property } from "@/services/api";

export default function PropertyDetail() {
    const params = useParams();
    const id = parseInt(String(params?.id || 0));
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const data = await propertyApi.getById(id);
                console.log('Property data:', data);
                setProperty(data);
                setError(null);
            } catch (err) {
                setError('Failed to load property details. Please try again later.');
                console.error('Error fetching property:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    if (loading) {
        return (
            <Wrapper>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </Wrapper>
        );
    }

    if (error || !property) {
        return (
            <Wrapper>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-red-500">{error || 'Property not found'}</div>
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className="container-fluid relative px-3">
                <div className="layout-specing">
                    <div className="md:flex justify-between items-center">
                        <h5 className="text-lg font-semibold">Property Details</h5>

                        <ul className="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                            <li className="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-green-600 dark:hover:text-white">
                                <Link href="/">Hously</Link>
                            </li>
                            <li className="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180">
                                <i className="mdi mdi-chevron-right"></i>
                            </li>
                            <li className="inline-block capitalize text-[16px] font-medium text-green-600 dark:text-white" aria-current="page">
                                Property Details
                            </li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <img 
                            src={property.image} 
                            alt={property.name}
                            className="w-full h-[400px] object-cover rounded-lg"
                        />
                    </div>

                    <div className="grid lg:grid-cols-12 md:grid-cols-2 gap-6 mt-6">
                        <div className="lg:col-span-8">
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700">
                                <h4 className="text-2xl font-medium">{property.name}</h4>

                                <ul className="py-6 flex items-center list-none">
                                    <li className="flex items-center lg:me-6 me-4">
                                        <i className="mdi mdi-arrow-expand-all lg:text-3xl text-2xl me-2 text-green-600"></i>
                                        <span className="lg:text-xl">{property.sqf}</span>
                                    </li>

                                    <li className="flex items-center lg:me-6 me-4">
                                        <i className="mdi mdi-bed lg:text-3xl text-2xl me-2 text-green-600"></i>
                                        <span className="lg:text-xl">{property.beds}</span>
                                    </li>

                                    <li className="flex items-center">
                                        <i className="mdi mdi-shower lg:text-3xl text-2xl me-2 text-green-600"></i>
                                        <span className="lg:text-xl">{property.baths}</span>
                                    </li>
                                </ul>

                                <div className="w-full leading-[0] border-0 mt-6">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" 
                                        style={{border:"0"}} 
                                        title="property-location" 
                                        className="w-full h-[500px]" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="rounded-md bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                                <div className="p-6">
                                    <h5 className="text-2xl font-medium">Price:</h5>

                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-xl font-medium">
                                            ${parseFloat(property.value || '0').toLocaleString()}
                                        </span>

                                        <span className="bg-green-600/10 text-green-600 text-sm px-2.5 py-0.75 rounded h-6">
                                            For Sale
                                        </span>
                                    </div>

                                    <ul className="list-none mt-4">
                                        <li className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Rating</span>
                                            <span className="font-medium text-sm">
                                                {Number(property.rating).toFixed(1)} ({property.review_count} reviews)
                                            </span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2">
                                            <span className="text-slate-400 text-sm">Listed on</span>
                                            <span className="font-medium text-sm">
                                                {new Date(property.created_at).toLocaleDateString()}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="flex">
                                    <div className="p-1 w-1/2">
                                        <Link href="" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">
                                            Book Now
                                        </Link>
                                    </div>
                                    <div className="p-1 w-1/2">
                                        <Link href="" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">
                                            Offer Now
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 text-center">
                                <h3 className="mb-6 text-xl leading-normal font-medium text-black dark:text-white">
                                    Have Question? Get in touch!
                                </h3>

                                <div className="mt-6">
                                    <Link 
                                        href="/contact" 
                                        className="btn bg-transparent hover:bg-green-600 border border-green-600 text-green-600 hover:text-white rounded-md"
                                    >
                                        <i className="mdi mdi-phone align-middle me-2"></i> Contact us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}