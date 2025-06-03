'use client'
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import { reviewsApi, Review } from '../../services/api';

const TinySlider = dynamic(() => import("tiny-slider-react"),{ssr:false});
import 'tiny-slider/dist/tiny-slider.css';

const settings = {
    controls: false,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    speed: 400,
    gutter: 12,
    responsive: {
        992: {
            items: 3
        },

        767: {
            items: 2
        },

        320: {
            items: 1
        },
    },
};

const ReviewSlide = ({ review, isExpanded, onToggle }: { review: Review, isExpanded: boolean, onToggle: () => void }) => {
    const MAX_LENGTH = 250;
    const shouldTruncate = review.description.length > MAX_LENGTH && !isExpanded;

    return (
        <div className="tiny-slide">
            <div className="text-center mx-3">
                <p className="text-lg text-slate-400 italic">
                    {shouldTruncate 
                        ? `${review.description.substring(0, MAX_LENGTH)}...`
                        : review.description
                    }
                    {review.description.length > MAX_LENGTH && (
                        <button 
                            onClick={onToggle}
                            className="text-green-600 hover:text-green-700 ml-1 text-sm font-medium transition-colors duration-200"
                        >
                            {isExpanded ? 'Show less' : 'Read more'}
                        </button>
                    )}
                </p>

                <div className="text-center mt-5">
                    <ul className="text-xl font-medium text-amber-400 list-none mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                            <li className="inline ms-1" key={`${review.id}-star-${i}`}><i className="mdi mdi-star"></i></li>
                        ))}
                    </ul>

                    <h6 className="mt-2 fw-semibold">{review.name}</h6>
                    <span className="text-slate-400 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default function ClientTwo() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedReviews, setExpandedReviews] = useState<{ [key: string]: boolean }>({});

    const toggleReview = (reviewId: string | number) => {
        setExpandedReviews(prev => ({
            ...prev,
            [String(reviewId)]: !prev[String(reviewId)]
        }));
    };

    useEffect(() => {
        reviewsApi.getAll()
            .then(setReviews)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className="container lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">What My Client Say ?</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">I let my clients speak for themselves. I'm proud of the work I do and I'm confident that you will be too.</p>
                </div>

                <div className="flex justify-center relative mt-8">
                    <div className="relative w-full">   
                        <div className="tiny-three-item">
                            {loading ? (
                                <div className="text-center">Loading...</div>
                            ) : error ? (
                                <div className="text-center text-red-500">{error}</div>
                            ) : (
                                <TinySlider settings={settings}>
                                    {reviews.map((review) => (
                                        <ReviewSlide
                                            key={review.id}
                                            review={review}
                                            isExpanded={expandedReviews[String(review.id)] || false}
                                            onToggle={() => toggleReview(review.id)}
                                        />
                                    ))}
                                </TinySlider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


