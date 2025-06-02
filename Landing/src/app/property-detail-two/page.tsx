'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import dynamic from 'next/dynamic';


const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';

import { LiaCompressArrowsAltSolid } from 'react-icons/lia';
import { LuBath, LuBedDouble } from 'react-icons/lu';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Switcher from '../components/switcher';

export default function PropertyDetailTwo() {

  const settings = {
        container: '.tiny-one-item',
        items: 1,
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
};

  let images = ['/images/property/single/1.jpg', '/images/property/single/2.jpg', '/images/property/single/3.jpg', '/images/property/single/4.jpg', '/images/property/single/5.jpg']
  return (
    <>
      <Navbar navClass={''} topnavClass={''} tagline={false}/>

          <section className="relative md:py-24 pt-24 pb-16">
            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                    <div className="lg:col-span-8 md:col-span-7">
                        <div className="grid grid-cols-1 relative">
                            <div className="tiny-one-item">
                              <TinySlider settings={settings} >
                                {images.map((item,index)=>{
                                  return(
                                    <div className="tiny-slide" key={index}>
                                        <Image src={item} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700" alt=""/>
                                    </div>
                                  )
                                })}
                              </TinySlider>
                            </div>
                        </div>
                        
                        <h4 className="text-2xl font-medium mt-6 mb-3">4BHK Luxury Family Home</h4>
                        <span className="text-slate-400 flex items-center"><FiMapPin className="size-5 me-2"/> 10765 Hillshire Ave, Baton Rouge, LA 70810, USA</span>

                        <ul className="py-6 flex items-center list-none">
                            <li className="flex items-center lg:me-6 me-4">
                                <LiaCompressArrowsAltSolid className="lg:text-3xl text-2xl me-2 text-green-600"/>
                                <span className="lg:text-xl">8000sqf</span>
                            </li>

                            <li className="flex items-center lg:me-6 me-4">
                                <LuBedDouble className="lg:text-3xl text-2xl me-2 text-green-600"/>
                                <span className="lg:text-xl">4 Beds</span>
                            </li>

                            <li className="flex items-center">
                                <LuBath className="lg:text-3xl text-2xl me-2 text-green-600"/>
                                <span className="lg:text-xl">4 Baths</span>
                            </li>
                        </ul>

                        <p className="text-slate-400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                        <p className="text-slate-400 mt-4">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</p>
                        <p className="text-slate-400 mt-4">Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.</p>
                    
                        <div className="w-full leading-[0] border-0 mt-6">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" style={{border:'0'}} title='myfram' className="w-full h-[500px]" allowFullScreen></iframe>
                        </div>
                    </div>

                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="sticky top-20">
                            <div className="rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                                <div className="p-6">
                                    <h5 className="text-2xl font-medium">Price:</h5>
    
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-xl font-medium">$ 45,231</span>
    
                                        <span className="bg-green-600/10 text-green-600 text-sm px-2.5 py-0.75 rounded h-6">For Sale</span>
                                    </div>
    
                                    <ul className="list-none mt-4">
                                        <li className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Days on Hously</span>
                                            <span className="font-medium text-sm">124 Days</span>
                                        </li>
    
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className="text-slate-400 text-sm">Price per sq ft</span>
                                            <span className="font-medium text-sm">$ 186</span>
                                        </li>
    
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className="text-slate-400 text-sm">Monthly Payment (estimate)</span>
                                            <span className="font-medium text-sm">$ 1497/Monthly</span>
                                        </li>
                                    </ul>
                                </div>
    
                                <div className="flex">
                                    <div className="p-1 w-1/2">
                                        <Link href="" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">Book Now</Link>
                                    </div>
                                    <div className="p-1 w-1/2">
                                        <Link href="" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">Offer Now</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 text-center">
                                <h3 className="mb-6 text-xl leading-normal font-medium text-black dark:text-white">Have Question ? Get in touch!</h3>

                                <div className="mt-6">
                                    <Link href="/contact" className="btn bg-transparent hover:bg-green-600 border border-green-600 text-green-600 hover:text-white rounded-md"><FiPhone className="align-middle me-2"/> Contact us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        <Switcher/>
    </>
  )
}