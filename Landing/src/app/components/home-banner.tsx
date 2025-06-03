'use client'
import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';
import Image from 'next/image'
import { counterData, partnerData } from '../data/data'
import Counter from './counter'
const heroimage = '/images/agency/pavel.webp'

export default function HomeBanner() {
    const settings = {
        container: '.tiny-single',
        items: 1,
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        nav: false,
        speed: 800,
        gutter: 0,
      };

  return (
    <>
    <section className="relative py-24">
        <div className="absolute inset-0 opacity-40 dark:opacity-[0.03] bg-no-repeat bg-bottom bg-cover" style={{backgroundImage:`url('/images/map.svg')`}}></div>
        <div className="container relative mt-10">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                <div className="md:col-span-4">
                    <div className="md:text-start text-center">
                        <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl">Rest assured that everything will turn out well!</h1>

                        <div className="mt-4">
                            <Link href="#" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md md:mt-20">Learn More <i className="mdi mdi-arrow-right ms-1 align-middle"></i></Link>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-5">
                    <div className="!rounded-full shadow-lg shadow-gray-200 dark:shadow-gray-800 relative overflow-hidden border-8 border-white dark:border-slate-900">
                        <div className="grid grid-cols-1 relative">
                            <div className="tiny-single">
                                
                                <div className="tiny-slide">
                                    <img src={heroimage} className="object-cover w-full lg:h-[600px] md:h-[500px]" alt="" fetchPriority="high"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <div className="md:text-end text-center">
                        <p className="text-slate-400 text-xl max-w-xl">"With over 5 years of experience in Prague real estate, I build successful partnerships through honesty, diligence, and mutual trust between buyers and sellers."</p>
                        <p className="text-green-600 font-semibold text-xl mt-4">- Pavel Puchýř</p>
                    </div>
                </div>
            </div>
        </div>

        {/* <section className="pt-10">
            <div className="container relative">
                <div className="grid md:grid-cols-6 grid-cols-2 justify-center gap-[30px]">
                    {partnerData.map((item:string,index:number)=>{
                        return(
                            <div className="mx-auto py-4" key={index}>
                                <Image src={item} width={72} height={24} className="h-6" alt=""/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section> */}
        
    </section>
    </>
  )
}
