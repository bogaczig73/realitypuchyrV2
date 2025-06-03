"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import 'tiny-slider/dist/tiny-slider.css';

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

interface VideoTourProperty {
    id: number;
    name: string;
    videoUrl: string;
    images: {
        url: string;
    }[];
}

const settings = {
    controls: false,
    mouseDrag: true,
    loop: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    speed: 400,
    gutter: 12
};

const VideoModal = ({ isOpen, onClose, videoUrl }: { isOpen: boolean; onClose: () => void; videoUrl: string }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-5xl">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="w-full h-[40vh]">
                    <iframe
                        src={videoUrl}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>,
        document.body
    );
};

export default function VideoTourCarousel() {
    const [properties, setProperties] = useState<VideoTourProperty[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                setError(null);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const response = await fetch(`${apiUrl}/api/properties/video-tours`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Oops, we haven't got JSON!");
                }

                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching video tours:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch video tours');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleVideoClick = (e: React.MouseEvent, videoUrl: string) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Convert YouTube URL to embed URL if needed
        let embedUrl = videoUrl;
        if (videoUrl.includes('youtube.com/watch')) {
            const videoId = videoUrl.split('v=')[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (videoUrl.includes('youtu.be/')) {
            const videoId = videoUrl.split('youtu.be/')[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        
        setSelectedVideo(embedUrl);
        setIsOpen(true);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Loading video tours...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-gray-500">No video tours available</div>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="tiny-three-item">
                    <TinySlider settings={settings}>
                        {properties.map((property) => (
                            <div className="tiny-slide" key={property.id}>
                                <div className="relative group cursor-pointer mx-3">
                                    <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                        <Image
                                            src={property.images[0]?.url || '/images/placeholder.jpg'}
                                            alt={property.name}
                                            width={400}
                                            height={225}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                                        <button 
                                            onClick={(e) => handleVideoClick(e, property.videoUrl)}
                                            className="absolute inset-0 flex items-center justify-center w-full h-full"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-110">
                                                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                    <h3 className="mt-2 text-lg font-medium">{property.name}</h3>
                                </div>
                            </div>
                        ))}
                    </TinySlider>
                </div>
            </div>

            {mounted && (
                <VideoModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    videoUrl={selectedVideo}
                />
            )}
        </>
    );
} 