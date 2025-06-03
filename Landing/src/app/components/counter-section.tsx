'use client'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'

interface Stats {
    activeProperties: number;
    soldProperties: number;
    yearsOfExperience: number;
}

export default function CounterSection() {
    const [stats, setStats] = useState<Stats>({
        activeProperties: 0,
        soldProperties: 0,
        yearsOfExperience: 5
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/properties/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    const counterData = [
        {
            title: "Active Properties",
            target: stats.activeProperties
        },
        {
            title: "Sold Properties",
            target: stats.soldProperties
        },
        {
            title: "Years of Experience",
            target: stats.yearsOfExperience
        }
    ];

    return (
        <section
            style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
            className="relative py-24 bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="absolute inset-0 bg-slate-900/60"></div>
            <div className="container relative">
                <div className="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
                    <div className="lg:col-start-2 lg:col-span-10">
                        <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                            {counterData.map((item, index) => (
                                <div className="counter-box text-center" key={index}>
                                    <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                                        <CountUp
                                            start={0}
                                            end={item.target}
                                            duration={2.5}
                                            className="counter-value"
                                        />
                                        {item.title === "Years of Experience" ? "+" : ""}
                                    </h1>
                                    <h5 className="counter-head text-white text-lg font-medium">{item.title}</h5>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}