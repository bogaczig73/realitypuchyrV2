"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Switcher from "../components/switcher";

export default function Comingsoon() {

    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.classList.add('light')


        const interval = setInterval(() => {
            let startDate = new Date('June 25, 2025 16:37:52');
            let currentDate = new Date();
            const diff = startDate.getTime() - currentDate.getTime();

            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            setTime({ hours, minutes, seconds, days });
        }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, []);


    return (
        <>

            <section className="md:h-screen py-36 flex items-center justify-center relative overflow-hidden zoom-image">
                <div
                    style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                    className="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover"></div>
                    <div  className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2"></div>
                <div className="container-fluid relative z-3">
                    <div className="grid grid-cols-1">
                        <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                            <div className="text-center">
                                <Link href="/"><Image src="/images/logo-icon-64.png" className="mx-auto" alt="" width={64} height={64}/></Link>
                            </div>
                            <div className="title-heading text-center my-auto">
                                <h1 className="text-white mt-3 mb-6 md:text-5xl text-3xl font-bold">We Are Coming Soon...</h1>
                                <p className="text-white/70 text-lg max-w-xl mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                                <div id="countdown">
                                    <ul className="count-down list-none inline-block text-white text-center mt-8 m-6">
                                        <li id="days" className="count-number inline-block m-2">{time.days}
                                            <p className="count-head">Days</p>
                                        </li>
                                        <li id="hours" className="count-number inline-block m-2"> {time.hours}
                                            <p className="count-head">Hours</p>
                                        </li>
                                        <li id="mins" className="count-number inline-block m-2">{time.minutes}
                                            <p className="count-head">Mins</p>
                                        </li>
                                        <li id="secs" className="count-number inline-block m-2">{time.seconds}
                                            <p className="count-head">Secs</p>
                                        </li>
                                        <li id="end" className="h1"></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="mb-0 text-slate-400">© {(new Date().getFullYear())}{" "} Hously. Design & Develop with <i className="mdi mdi-heart text-red-600"></i> by <Link href="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</Link>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--end section --> */}
            <Switcher/>
           
        </>
    );

}
