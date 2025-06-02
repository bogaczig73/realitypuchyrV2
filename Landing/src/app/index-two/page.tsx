import React from "react";

import FormTwo from "../components/formTwo";
import Navbar from "../components/navbar";
import About from "../components/about";
import Feature from "../components/feature";
import PropertyTwo from "../components/property-two";
import ClientTwo from "../components/client-two";
import GetInTuch from "../components/get-in-touch";
import Footer from "../components/footer";
import Switcher from "../components/switcher";
import Cta from "../components/cta";

export default function IndexTwo(){
    return(
        <>
        <Navbar navClass="navbar-white" topnavClass={""} tagline={false} />
        <section className="relative table w-full lg:py-44 py-36 overflow-hidden">
        <div className="zoom-image">
            <div className="absolute inset-0 image-wrap z-1 bg-[url('/images/bg/04.jpg')] bg-no-repeat bg-center bg-cover"></div>
            <div className="absolute inset-0 bg-slate-900/70 z-2"></div>
        </div>
        <div className="container relative z-3">
            <FormTwo/>
        </div>
        </section>
        <section className="relative md:pb-24 pb-16">
            <About />

            <Feature />

            <PropertyTwo />
        </section>

        <Cta/>

        <section className="relative md:pb-24 pb-16">
            <ClientTwo />

           <GetInTuch/>
        </section>

        <Footer />
        <Switcher/>
        </>
    )
}