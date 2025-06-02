import React from 'react'
import Navbar from '../components/navbar'
import Link from 'next/link'
import GetInTuch from '../components/get-in-touch'
import Footer from '../components/footer'
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { agentData } from '../data/data'
import Image from 'next/image'
import Switcher from '../components/switcher'

interface AgentData{
  id: number;
  image: string;
  name: string;
  position: string;
}

export default function Page() {
  return (
    <>
        <Navbar navClass="navbar-white" topnavClass={''} tagline={false}/>

        <section className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover" style={{backgroundImage:'url("/images/bg/01.jpg")'}}>
            <div className="absolute inset-0 bg-slate-900/80"></div>
            <div className="container relative">
                <div className="grid grid-cols-1 text-center mt-10">
                    <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Agents / Brokers</h3>
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

        <section className="relative lg:py-24 py-16">
      <div className="container relative">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[30px]">
            {agentData.map((item:AgentData,index:number)=>{
              return(
                <div className="group text-center" key={index}>
                    <div className="relative inline-block mx-auto size-52 !rounded-full overflow-hidden">
                        <Image src={item.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="" alt=""/>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black size-52 !rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>

                        <ul className="list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 transition-all duration-500 ease-in-out">
                            <li className="inline ms-1 rtl:me-1"><Link href="" className="btn btn-icon btn-sm !rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"><FiFacebook className="size-4"/></Link></li>
                            <li className="inline ms-1 rtl:me-1"><Link href="" className="btn btn-icon btn-sm !rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"><FiInstagram className="size-4"/></Link></li>
                            <li className="inline ms-1 rtl:me-1"><Link href="" className="btn btn-icon btn-sm !rounded-full border border-green-600 bg-green-600 hover:border-green-600 hover:bg-green-600 text-white"><FiLinkedin className="size-4"/></Link></li>
                        </ul>
                    </div>

                    <div className="content mt-3">
                        <Link href={`/agent-profile/${item.id}`} className="text-xl font-medium hover:text-green-600 transition-all duration-500 ease-in-out">{item.name}</Link>
                        <p className="text-slate-400">{item.position}</p>
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
