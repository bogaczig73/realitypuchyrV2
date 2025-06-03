"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import VideoTourCarousel from "./video-tour-carousel";

export default function AboutVideoTour() {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <div className="container lg:mt-24 mt-16">
                <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                    <div className="md:col-span-7">
                        <div className="lg:ms-4">
                            <h4 className="mb-6 md:text-3xl text-2xl lg:leading-normal leading-normal font-semibold">Quality video tour,<br />more than a thousand photos.</h4>
                            <p className="text-slate-400 max-w-xl">An engaging video can evoke positive emotions and fully portray the atmosphere of the property on offer. I also like to work with video because it works great when promoting on social media. I really care about the quality, see for yourself.</p>

                            <div className="mt-4">
                                <Link href="#" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md mt-3">Learn More </Link>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-5">
                    <VideoTourCarousel/>
                        {/* <div className="relative">
                            <Image src="/images/about.jpg" className="rounded-xl shadow-md" alt="" width={0} height={0} sizes="100vw" style={{width:"100%" , height:'auto'}} priority />
                            <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                                <Link href="#" scroll={false} onClick={()=>setOpen(!isOpen)} className="lightbox h-20 w-20 !rounded-full shadow-md dark:shadow-gyay-700 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-green-600">
                                    <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                                </Link>
                            </div>
                        </div> */}
                    </div>

                </div>
                
            </div>
            {isOpen && 
                <div className="flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-1 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow-xs dark:bg-gray-700">
                            <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <button type="button" onClick={()=>setOpen(!isOpen)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-1 md:p-1 space-y-4">
                                <iframe width="100%" height="400" src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );

}
