import React from "react";
import Link from "next/link";

import Wrapper from "../components/wrapper";
import ImageUpload from "../components/imageUpload";

export default function AddProperty(){
    return(
        <Wrapper>
            <div className="container-fluid relative px-3">
                <div className="layout-specing">
                    <div className="md:flex justify-between items-center">
                        <h5 className="text-lg font-semibold">Add Property</h5>

                        <ul className="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                            <li className="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-green-600 dark:hover:text-white"><Link href="/">Hously</Link></li>
                            <li className="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block capitalize text-[16px] font-medium text-green-600 dark:text-white" aria-current="page">Add Property</li>
                        </ul>
                    </div>

                    <div className="container relative">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6">
                            <div className="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900 h-fit">
                                <ImageUpload/>
                            </div>

                            <div className="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900 h-fit">
                                <form className="">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <label htmlFor="name" className="font-medium">Title:</label>
                                            <input name="name" id="name" type="text" className="form-input border !border-gray-200 dark:!border-gray-800 mt-2" placeholder="Property Title :"/>
                                        </div>

                                        <div className="md:col-span-4 col-span-12">
                                            <label htmlFor="name" className="font-medium">Square ft:</label>
                                            <div className="form-icon relative mt-2">
                                                <i className="mdi mdi-arrow-expand-all absolute top-2 start-4 text-green-600"></i>
                                                <input name="number" id="sqf" type="number" className="form-input border !border-gray-200 dark:!border-gray-800 !ps-11" placeholder="Size (sqf) :"/>
                                            </div>
                                        </div>

                                        <div className="md:col-span-4 col-span-12">
                                            <label htmlFor="name" className="font-medium">Beds:</label>
                                            <div className="form-icon relative mt-2">
                                                <i className="mdi mdi-bed absolute top-2 start-4 text-green-600"></i>
                                                <input name="number" id="beds" type="number" className="form-input border !border-gray-200 dark:!border-gray-800 !ps-11" placeholder="Total Beds :"/>
                                            </div>
                                        </div>

                                        <div className="md:col-span-4 col-span-12">
                                            <label htmlFor="name" className="font-medium">Baths:</label>
                                            <div className="form-icon relative mt-2">
                                                <i className="mdi mdi-shower absolute top-2 start-4 text-green-600"></i>
                                                <input name="number" id="baths" type="number" className="form-input border !border-gray-200 dark:!border-gray-800 !ps-11" placeholder="Baths :"/>
                                            </div>
                                        </div>

                                        <div className="col-span-12">
                                            <label htmlFor="name" className="font-medium">Price:</label>
                                            <div className="form-icon relative mt-2">
                                                <i className="mdi mdi-currency-usd absolute top-2 start-4 text-green-600"></i>
                                                <input name="number" id="price" type="number" className="form-input border !border-gray-200 dark:!border-gray-800 !ps-11" placeholder="Price :"/>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" id="submit" name="send" className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md mt-5">Add Property</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}