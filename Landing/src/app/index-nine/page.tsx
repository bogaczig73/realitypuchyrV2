"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Select = dynamic(()=>import('react-select'),{ssr:false})

import Navbar from "../components/navbar";
import Tagline from "../components/tagline";
import About from "../components/about";
import Feature from "../components/feature";
import Cta from "../components/cta";
import Categories from "../components/categories";
import Client from "../components/client";
import GetInTuch from "../components/get-in-touch";
import Footer from "../components/footer";
import Switcher from "../components/switcher";

import { LuSearch } from "react-icons/lu";
import { RxHome } from "react-icons/rx";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { LiaBathSolid, LiaCompressArrowsAltSolid } from "react-icons/lia";
import { BiBed } from "react-icons/bi";
import { FiArrowRight, FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";

import { properties,teamData  } from "../data/data";

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

interface TeamData{
    image: string;
    name: string;
    designation: string;
}

export default function IndexNine() {
    const Houses = [
        { value: 'AF', label: 'Apartment' },
        { value: 'AZ', label: ' Offices' },
        { value: 'BS', label: 'Townhome' },
    ]
    const minPrice = [
        { value: '1', label: '500' },
        { value: '2', label: '1000' },
        { value: '3', label: '2000' },
        { value: '4', label: '3000' },
        { value: '5', label: '4000' },
        { value: '5', label: '5000' },
        { value: '5', label: '6000' },
    ]

    const [activeTabIndex, setactiveTabIndex] = useState<number>(0);

    const handleTabClick = (tabIndex:number) => {
        setactiveTabIndex(tabIndex);
    };
  return (
    <>
        <Tagline/>
        <Navbar tagline={true} navClass={""} topnavClass={""}/> 

        <section className="relative overflow-hidden md:h-screen flex items-center md:py-0 py-36 bg-cyan-100 dark:bg-cyan-500/20  bg-no-repeat bg-top bg-cover" style={{backgroundImage:`url(${'/images/bg/bg3.png'})`}}>
            <div className="container relative">
                <div className="grid grid-cols-1 items-center mt-10">
                    <div className="md:text-start text-center">
                        <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">We will find a perfect <br/> home for you</h1>
                        <p className="text-xl max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                        <div className="relative flex mt-8">
                            <div className="lg:w-5/6 w-full">
                                <ul className="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl border-b  border-slate-100 dark:border-gray-800" id="myTab" data-tabs-toggle="#StarterContent" role="tablist">
                                    <li role="presentation" className="inline-block">
                                        <button onClick={() => handleTabClick(0)} className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${activeTabIndex === 0 ? 'text-white bg-green-600' : 'hover:text-green-600'}`} id="buy-home-tab" data-tabs-target="#buy-home" type="button" role="tab" aria-controls="buy-home" aria-selected="true">Buy</button>
                                    </li>
                                    <li role="presentation" className="inline-block">
                                        <button onClick={() => handleTabClick(1)} className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${activeTabIndex === 1 ? 'text-white bg-green-600' : 'hover:text-green-600'}`} id="sell-home-tab" data-tabs-target="#sell-home" type="button" role="tab" aria-controls="sell-home" aria-selected="false">Sell</button>
                                    </li>
                                    <li role="presentation" className="inline-block">
                                        <button onClick={() => handleTabClick(2)} className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${activeTabIndex === 2 ? 'text-white bg-green-600' : 'hover:text-green-600'}`} id="rent-home-tab" data-tabs-target="#rent-home" type="button" role="tab" aria-controls="rent-home" aria-selected="false">Rent</button>
                                    </li>
                                </ul>
    
                                <div id="StarterContent" className="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-md  shadow-gray-200 dark:shadow-gray-700">
                                    {activeTabIndex === 0 && (
                                        <div id="buy-home" role="tabpanel" aria-labelledby="buy-home-tab">
                                            <form action="#">
                                                <div className="registration-form text-dark text-start">
                                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                                        <div>
                                                            <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <LuSearch className="icons"/>
                                                                <input name="name" type="text" id="job-keyword" className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" placeholder="Search your Keywords" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <RxHome className=" icons"/>
                                                                <Select className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" options={Houses} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <AiOutlineDollarCircle className="icons"/>
                                                                <Select className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" options={minPrice} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="md:mt-8">
                                                                <input type="submit" id="search-buy" name="search" className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-[60px] rounded lg:rounded-none" value="Search" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                    {activeTabIndex === 1 && (
                                        <div id="sell-home" role="tabpanel" aria-labelledby="sell-home-tab">
                                            <form action="#">
                                            <div className="registration-form text-dark text-start">
                                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                                        <div>
                                                            <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <LuSearch className="icons"/>
                                                                <input name="name" type="text" id="job-keyword" className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" placeholder="Search your Keywords" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <RxHome className="icons"/>
                                                                <Select className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" options={Houses} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <AiOutlineDollarCircle className="icons"/>
                                                                <Select className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" options={minPrice} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="md:mt-8">
                                                                <input type="submit" id="search-buy" name="search" className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-[60px] rounded lg:rounded-none" value="Search" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                    {activeTabIndex === 2 && (
                                        <div id="rent-home" role="tabpanel" aria-labelledby="rent-home-tab">
                                            <form action="#">
                                            <div className="registration-form text-dark text-start">
                                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                                        <div>
                                                            <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <LuSearch className="icons"/>
                                                                <input name="name" type="text" id="job-keyword" className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" placeholder="Search your Keywords" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <RxHome className="icons"/>
                                                                <Select className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" options={Houses} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <AiOutlineDollarCircle className="icons"/>
                                                                <Select className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" options={minPrice} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="md:mt-8">
                                                                <input type="submit" id="search-buy" name="search" className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-[60px] rounded lg:rounded-none" value="Search" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="relative lg:pb-24 pb-16">
            <About/>
            <Feature/>
        </section>

        <Cta/>

        <section className="relative md:py-24 py-16">
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Listing Categories</h3>

                    <p className="text-slate-400 max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <Categories/>
            </div>

            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Featured Properties</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px]">
                        {properties.map((item:Properties, index:number) => (
                            <div key={index} className="group rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl dark:hover:shadow-xl shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto">
                                <div className="md:flex">
                                    <div className="relative md:shrink-0">
                                        <img className="h-full w-full object-cover md:w-48" src={item.image} alt="" />
                                        <div className="absolute top-4 end-4">
                                            <Link href="#" className="btn btn-icon bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 !rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i className="mdi mdi-heart mdi-18px"></i></Link>
                                        </div>
                                    </div>
                                    <div className="p-6 w-full">
                                        <div className="md:pb-4 pb-6">
                                            <Link href={`/property-detail/${item.id}`} className="text-lg hover:text-green-600 font-medium ease-in-out duration-500">10765 Hillshire Ave, Baton Rouge, LA 70810, USA</Link>
                                        </div>

                                        <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center justify-between list-none">
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

            <Client/>
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
                                        <div className="relative inline-block mx-auto size-52 !rounded-full overflow-hidden">
                                            <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="" alt="" />
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black size-52 !rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
        
                                            <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 transition-all duration-500 ease-in-out">
                                                <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm !rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"><FiFacebook className="size-4" /></Link></li>
                                                <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm !rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"><FiInstagram className="size-4" /></Link></li>
                                                <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm !rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"><FiLinkedin  className="size-4" /></Link></li>
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
                <GetInTuch />
            </div>
        </section>
    <Footer/>
    <Switcher/>
    </>
  )
}