import React from 'react'
import Navbar from './components/navbar'
import HomeBanner from './components/home-banner'
import { aboutData, blogList, teamData } from './data/data'
import { FiArrowRight, FiCalendar, FiClock, FiFacebook, FiHexagon, FiInstagram, FiLinkedin } from 'react-icons/fi'
import Link from 'next/link'
import OurCooperation from './components/about-our-cooperation'
import AboutVideoTour from './components/about-video-tour'
import Categories from './components/categories'
import Property from './components/property'
import ClientTwo from './components/client-two'
import GetInTuch from './components/get-in-touch'
import Footer from './components/footer'
import Switcher from './components/switcher'
import Counter from './components/counter'
import CounterSection from './components/counter-section'
import AboutOurCooperation from './components/about-our-cooperation'

interface AboutData{
    image: string;
    title: string;
    desc: string;
}
interface BlogData{
    id: number;
    title: string;
    date: string;
    type: string;
    image: string;
}

export default function Page() {
  return (
    <>
     <Navbar navClass={''} topnavClass={''} tagline={false}/>
     <HomeBanner/>   
    
     <section className="relative md:pb-24 pb-16">
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">What Do I Do?</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">I take care of my clients' assets—providing expert broker consulting to protect and grow their wealth.</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
                    
                    {aboutData.map((item:AboutData,index:number)=>{
                    return(
                        <div className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center" key={index}>
                            <div className="relative overflow-hidden text-transparent -m-3">
                                <FiHexagon className="size-32 fill-green-600/5 mx-auto"/>
                                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-green-600 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                    <img src={item.image} className="size-12" alt=""/>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link href="" className="text-xl font-medium hover:text-green-600">{item.title}</Link>
                                <p className="text-slate-400 mt-3">{item.desc}</p>

                                <div className="mt-4">
                                    <Link href="" className="btn btn-link text-green-600 hover:text-green-600 after:bg-green-600 transition duration-500">Read More <FiArrowRight className="ms-1"/></Link>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                    
                </div>
            </div>

            <AboutOurCooperation/>
            <AboutVideoTour/>

        </section>
        <CounterSection/>

        <section className="relative md:pb-24 pb-16">
            <div className="container relative md:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Listing Categories</h3>
                </div>

                <Categories/>
            </div>
            <Property/>

            <ClientTwo/>


            <div className="container relative lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Latest Blogs & News</h3>

                    <p className="text-slate-400 max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
                    {blogList.slice(0,3).map((item:BlogData,index:number)=>{
                        return(
                            <div className="group relative h-fit hover:-mt-[5px] overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700 transition-all duration-500" key={index}>
                                <div className="relative overflow-hidden">
                                    <img src={item.image} className="" alt=""/>
                                    <div className="absolute end-4 top-4">
                                        <span className="bg-green-600 text-white text-[14px] px-2.5 py-1 font-medium !rounded-full h-5">{item.type}</span>
                                    </div>
                                </div>

                                <div className="relative p-6">
                                    <div className="">
                                        <div className="flex justify-between mb-4">
                                            <span className="text-slate-400 text-sm inline-flex items-center"><FiCalendar className="text-slate-900 dark:text-white me-2"/>{item.date}</span>
                                            <span className="text-slate-400 text-sm ms-3 inline-flex items-center"><FiClock className="text-slate-900 dark:text-white me-2"/>5 min read</span>
                                        </div>

                                        <Link href="/blog-detail" className="title text-xl font-medium hover:text-green-600 duration-500 ease-in-out">{item.title}</Link>
                                        
                                        <div className="mt-3">
                                            <Link href="/blog-detail" className="btn btn-link hover:text-green-600 after:bg-green-600 duration-500 ease-in-out">Read More <FiArrowRight className=""/></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </div>

            <GetInTuch/>
        </section>

        <Footer/>
        <Switcher/>
    </>
  )
}
