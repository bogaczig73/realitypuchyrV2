import React from "react";

import Navbar from "../components/navbar";

import Footer from "../components/footer";
import Feature from "../components/feature";
import About from "../components/about";
import GetInTuch from "../components/get-in-touch";
import ClientTwo from "../components/client-two";
import Team from "../components/team";
import Counter from "../components/counter";

import { counterData } from "../data/data";
import Switcher from "../components/switcher";

interface CounterData{
    title: string;
    target: number;
}

export default function Aboutus(){
  
    return(
        <>
          <Navbar navClass="navbar-white" topnavClass={""} tagline={false} />
          <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">About Us</h3>
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
            <section className="relative md:pb-24 pb-16">
                <About />
                <Feature /> 
            </section>
            <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative py-24 bg-no-repeat bg-center bg-fixed bg-cover">
                <div className="absolute inset-0 bg-slate-900/60"></div>
                <div className="container relative">
                    <div className="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
                        <div className="lg:col-start-2 lg:col-span-10">
                            <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                                {counterData.map((item:CounterData, index:number) =>{
                                    return(
                                        <div className="counter-box text-center" key={index}>
                                            <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                                                <Counter start={0} end={item.target}></Counter>
                                                +</h1>
                                            <h5 className="counter-head text-white text-lg font-medium">{item.title}</h5>
                                        </div> 
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Team/>
            </section>
            <section className="md:pb-24 pb-16">
                <ClientTwo/>
                <GetInTuch/>
            </section>

            <Footer />
            <Switcher />
        </>
    )
}