import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navbar";

import Footer from "../components/footer";
import GetInTuch from "../components/get-in-touch";
import Client from "../components/client";
import About from "../components/about";
import Feature from "../components/feature";
import Counter from "../components/counter";
import FormFive from "../components/formFive";
import HeroSlider from "../components/heroSlider";
import Switcher from "../components/switcher";

import { properties, counterData, teamData } from "../data/data";

import { LiaBathSolid, LiaCompressArrowsAltSolid } from "react-icons/lia";
import {BiBed} from 'react-icons/bi'
import { FiArrowRight, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

interface Properties{
    id: number;
    image: string;
    name: string;
    square: number;
    beds: number;
    baths: number;
    price: number;
    rating: number;
    detail: string[];
}

interface CounterData{
    title: string;
    target: number;
}

interface TeamData{
    image: string;
    name: string;
    designation: string;
}

export default function IndexSeven(){
    return(
        <>
        <Navbar navClass="navbar-white" topnavClass={""} tagline={false}/>

        <HeroSlider/>

        <section className="relative md:pb-24 pb-16">
            <div className="container relative z-1">
                <div className="grid grid-cols-1 justify-center">
                    <div className="relative md:-mt-52 -mt-40">
                    <FormFive/>
                    </div>
                </div>
            </div>


            <About/>

           <Feature/>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px] mt-8">
                    {properties.map((item:Properties, index:number) => (
                        <div key={index} className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto lg:max-w-2xl">
                            <div className="md:flex">
                                <div className="relative md:shrink-0">
                                    <img className="h-full w-full object-cover md:w-48" src={item.image} alt="" />
                                    <div className="absolute top-4 end-4">
                                        <Link href="#" className="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 !rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i className="mdi mdi-heart mdi-18px"></i></Link>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="md:pb-4 pb-6">
                                        <Link href={`/property-detail/${item.id}`} className="text-lg hover:text-green-600 font-medium ease-in-out duration-500">10765 Hillshire Ave, Baton Rouge, LA 70810, USA</Link>
                                    </div>

                                    <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                                        <li className="flex items-center me-4">
                                            <LiaCompressArrowsAltSolid className="text-2xl me-2 text-green-600"/>
                                            <span>{item.square}sqf</span>
                                        </li>

                                        <li className="flex items-center me-4">
                                            <BiBed className="text-2xl me-2 text-green-600"/>
                                            <span>{item.beds} Beds</span>
                                        </li>

                                        <li className="flex items-center">
                                            <LiaBathSolid className="text-2xl me-2 text-green-600"/>
                                            <span>{item.baths} Baths</span>
                                        </li>
                                    </ul>

                                    <ul className="md:pt-4 pt-6 flex justify-between items-center list-none">
                                        <li>
                                            <span className="text-slate-400">Price</span>
                                            <p className="text-lg font-medium">${item.price}</p>
                                        </li>

                                        <li>
                                            <span className="text-slate-400">Rating</span>
                                            <ul className="text-lg font-medium text-amber-400 list-none">
                                                <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                                <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                                <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                                <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                                <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                                <li className="inline ms-1 text-black dark:text-white">{item.rating}(30)</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="md:flex justify-center text-center mt-6">
                    <div className="md:w-full">
                        <Link href="/list" className="btn btn-link text-green-600 hover:text-green-600 after:bg-green-600 transition duration-500">View More Properties <FiArrowRight className="ms-1"/></Link>
                    </div>
                </div>
            </div>

            <div className="container relative lg:mt-24 mt-16 lg:pt-24 pt-16">
                <div className="absolute inset-0 opacity-25 dark:opacity-50 bg-no-repeat bg-center bg-cover" style={{backgroundImage:`url('/images/map.png')`}}></div>
                <div className="relative grid grid-cols-1 pb-8 text-center z-1">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Trusted by more than 10K users</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <div className="relative grid md:grid-cols-3 grid-cols-1 items-center mt-8 gap-[30px] z-1">
                    {counterData.map((item:CounterData,index:number) =>{
                        return(
                            <div className="counter-box text-center" key={index}>
                                <h1 className="lg:text-5xl text-4xl font-semibold mb-2 text-slate-400 dark:text-white">
                                    <Counter start={0} end={item.target}/>
                                    +</h1>
                                <h5 className="counter-head text-lg font-medium">{item.title}</h5>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Meet The Agent Team</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <div className="grid md:grid-cols-12 grid-cols-1 mt-8 gap-[30px]">
                    {teamData.map((item:TeamData, index:number) =>{
                        return(
                            <div className="lg:col-span-3 md:col-span-6" key={index}>
                                <div className="group text-center">
                                    <div className="relative inline-block mx-auto h-52 w-52 !rounded-full overflow-hidden">
                                        <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="" alt="" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 !rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
    
                                        <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 transition-all duration-500 ease-in-out">
                                            <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm !rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"><FiFacebook className="h-4 w-4" /></Link></li>
                                            <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm !rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"><FiInstagram className="h-4 w-4" /></Link></li>
                                            <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm !rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"><FiLinkedin  className="h-4 w-4" /></Link></li>
                                        </ul>
                                    </div>
    
                                    <div className="content mt-3">
                                        <Link href="#" className="text-xl font-medium hover:text-green-600 transition-all duration-500 ease-in-out">{item.name}</Link>
                                        <p className="text-slate-400">{item.designation}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Client/>

            <GetInTuch/>
        </section>
        <Footer/>
        <Switcher/>
        </>
    )
}