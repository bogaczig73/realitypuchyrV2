import Link from 'next/link';
import Image from 'next/image';

import Navbar from '../components/navbar'
import Footer from '../components/footer'

import { blogList } from '../data/data';
import { FiArrowRight, FiCalendar, FiChevronLeft, FiChevronRight, FiClock, FiFacebook, FiGithub, FiGitlab, FiInstagram, FiLinkedin, FiSearch, FiTwitter, FiYoutube } from 'react-icons/fi';
import Switcher from '../components/switcher';

interface BlogList{
    id: number;
    title: string;
    date: string;
    type: string;
    image: string;
}

export default function BlogsideBar(){
    return(
        <>
          <Navbar navClass="navbar-white" topnavClass={''} tagline={false} />
          <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Sell Faster Save Thousands.</h3>
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
            <section className="relative md:py-24 py-16" >
                <div className="container">
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-8 md:order-1 order-2">

                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px]" >
                                {blogList.map((item:BlogList, index:number) => (
                                    <div key={index} className="group relative h-fit hover:-mt-[5px] overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm shadow-gray-200 dark:shadow-gray-700 transition-all duration-500">
                                        <div className="relative overflow-hidden">
                                            <Image src={item.image} className="" alt="" width={0} height={0} sizes='100vw' style={{width:"100%", height:"auto"}} />
                                            <div className="absolute end-4 top-4">
                                                <span className="bg-green-600 text-white text-[14px] px-2.5 py-1 font-medium !rounded-full h-5">{item.type}</span>
                                            </div>
                                        </div>

                                        <div className="relative p-6">
                                            <div className="">
                                                <div className="flex justify-between mb-4">
                                                    <span className="text-slate-400 text-sm flex items-center"><FiCalendar width={16} className="text-slate-900 dark:text-white me-2"/><span>{item.date}</span></span>
                                                    <span className="text-slate-400 text-sm ms-3 flex items-center"><FiClock width={16} className="text-slate-900 dark:text-white me-2"/><span>5 min read</span></span>
                                                </div>

                                                <Link href={`/blog-detail/${item.id}`} className="title text-xl font-medium hover:text-green-600 duration-500 ease-in-out">{item.title}</Link>

                                                <div className="mt-3">
                                                     <Link href={`/blog-detail/${item.id}`} className="btn btn-link hover:text-green-600 after:bg-green-600 duration-500 ease-in-out inline-flex items-center"><span>Read More</span><FiArrowRight width={16}/></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                                <div className="md:col-span-12 text-center">
                                    <nav>
                                        <ul className="inline-flex items-center -space-x-px">
                                            <li>
                                                <Link href="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 !rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">
                                                    <FiChevronLeft className="text-[20px]"/>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 !rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">1</Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 !rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">2</Link>
                                            </li>
                                            <li>
                                                <Link href="#" aria-current="page" className="z-10 w-10 h-10 inline-flex justify-center items-center mx-1 !rounded-full text-white bg-green-600 shadow-xs shadow-gray-200 dark:shadow-gray-700">3</Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 !rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">4</Link>
                                            </li>
                                            <li>
                                                <Link href="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 !rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs shadow-gray-200 dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600">
                                                    <FiChevronRight className="text-[20px]"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4 md:order-2 order-1">
                            <div className="sticky top-20">
                                <form>
                                    <div>
                                        <label htmlFor="searchname" className="font-medium text-lg">Search Properties</label>
                                        <div className="relative mt-2">
                                            <FiSearch className="text-lg absolute top-[8px] start-3"/>
                                            <input name="search" id="searchname" type="text" className="form-input border !border-gray-200 dark:!border-gray-800 !ps-10" placeholder="Search" />
                                        </div>
                                    </div>
                                </form>

                                <h5 className="font-medium text-lg mt-[30px]">Recent post</h5>
                                <div className="flex items-center mt-4">
                                    <Image src="/images/property/6.jpg" className="h-16 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-800" alt="" width={96} height={56} />

                                    <div className="ms-3">
                                        <Link href="#" className="font-medium hover:text-green-600">10 Things You About Real Estate</Link>
                                        <p className="text-sm text-slate-400">2nd March 2023</p>
                                    </div>
                                </div>

                                <div className="flex items-center mt-4">
                                    <Image src="/images/property/3.jpg" className="h-16 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-800" alt="" width={96} height={56} />

                                    <div className="ms-3">
                                        <Link href="#" className="font-medium hover:text-green-600">Why We Love Real Estate</Link>
                                        <p className="text-sm text-slate-400">2nd March 2023</p>
                                    </div>
                                </div>

                                <div className="flex items-center mt-4">
                                    <Image src="/images/property/5.jpg" className="h-16 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-800" alt="" width={96} height={56} />

                                    <div className="ms-3">
                                        <Link href="#" className="font-medium hover:text-green-600">110 Quick Tips About Real Estate</Link>
                                        <p className="text-sm text-slate-400">2nd March 2023</p>
                                    </div>
                                </div>

                                <h5 className="font-medium text-lg mt-[30px]">Social sites</h5>
                                <ul className="list-none mt-4">
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><FiFacebook className="h-4 w-4" /> </Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><FiInstagram className="h-4 w-4" /> </Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><FiTwitter className="h-4 w-4" /></Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><FiLinkedin className="h-4 w-4" /></Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><FiGithub className="h-4 w-4" /> </Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><FiYoutube className="h-4 w-4" /></Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><FiGitlab className="h-4 w-4" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Switcher/>
        </>
    )
}