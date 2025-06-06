"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { User } from 'react-feather';
import { usePathname } from "next/navigation";

export default function Navbar({ navClass, topnavClass, tagline }:{ navClass:string, topnavClass:string, tagline:boolean }) {
    let [isOpen, setIsOpen] = useState(true);
    let [topNavbar, setTopNavBar] = useState(false);

    let [manu , setManu] = useState('');
    let [subManu , setSubManu] = useState('');

    let current = usePathname();

    useEffect(() => {

        setManu(current)
        setSubManu(current)

        function windowScroll() {
            setTopNavBar(window.scrollY >= 50)
        }

        window.addEventListener('scroll', windowScroll )
        window.scrollTo(0, 0)
        return()=>{
            window.removeEventListener('scroll', windowScroll )
        }
      }, []);


    const toggleMenu = (): void => {
        setIsOpen(!isOpen);
    
        const navigation = document.getElementById("navigation");
        if (navigation) {
            const anchorArray = Array.from(navigation.getElementsByTagName("a"));
    
            anchorArray.forEach((element) => {
                element.addEventListener("click", (elem: Event) => {
                    const target = elem.target as HTMLElement;
                    if (target) {
                        const href = target.getAttribute("href");
                        if (href && href !== "") {
                            const nextSibling = target.nextElementSibling;
                            if (nextSibling && nextSibling.nextElementSibling) {
                                const submenu = nextSibling.nextElementSibling as HTMLElement;
                                submenu.classList.toggle("open");
                            }
                        }
                    }
                });
            });
        }
    };
    

    return (
        <React.Fragment>
            <nav id="topnav" className={`${topNavbar ? 'nav-sticky': ''} ${tagline ? 'tagline-height' : ''} ${topnavClass ? topnavClass : ''} defaultscroll is-sticky`} >
               
                <div className={`${topnavClass !== '' && topnavClass !== undefined ? 'container-fluid md:px-8 px-3' : 'container'}`}>
                    {/* <!-- Logo container--> */}
                    {navClass === '' || navClass === undefined ?
                        <Link className="logo" href="/">
                            <Image src="/images/logo-dark.png" className="inline-block dark:hidden" alt="" width={98} height={24}/>
                            <Image src="/images/logo-light.png" className="hidden dark:inline-block" alt="" width={98} height={24} />
                        </Link> :
                        <Link className="logo" href="#">
                            <span className="inline-block dark:hidden">
                                <Image src="/images/logo-dark.png" className="l-dark"  alt="" width={98} height={24}/>
                                <Image src="/images/logo-light.png" className="l-light"  alt="" width={98} height={24}/>
                            </span>
                            <Image src="/images/logo-light.png"  className="hidden dark:inline-block" alt="" width={98} height={24}/>
                        </Link>
                    }
                    {/* <!-- End Logo container--> */}

                    {/* <!-- Start Mobile Toggle --> */}
                    <div className="menu-extras">
                        <div className="menu-item">
                            <Link href="#" className="navbar-toggle" id="isToggle" onClick={toggleMenu}>
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* <!-- End Mobile Toggle --> */}

                    {/* <!-- Login button Start --> */}
                    <ul className="buy-button list-none mb-0">
                        <li className="inline mb-0">
                            <Link href="/auth-login" className="btn btn-icon bg-green-600 hover:bg-green-700 border-green-600 dark:border-green-600 text-white !rounded-full"><User className="h-4 w-4 stroke-[3]"></User></Link>
                        </li>
                        <li className="sm:inline ps-1 mb-0 hidden">
                            <Link href="/auth-signup" className="btn bg-green-600 hover:bg-green-700 border-green-600 dark:border-green-600 text-white !rounded-full">Signup</Link>
                        </li>
                    </ul>
                    {/* <!--Login button End--> */}

                    <div id="navigation" className={`${isOpen === true ? 'hidden' : 'block'}`} >
                        {/* <!-- Navigation Menu--> */}
                        <ul className={`navigation-menu  ${navClass === '' || navClass === undefined ? '' : 'nav-light'}   ${topnavClass !== '' && topnavClass !== undefined ? '!justify-center' : '!justify-end'}`}>
                            <li className={`has-submenu parent-menu-item ${["/"].includes(manu) ? 'active' : ''}`}>
                                <Link href="/">Home</Link>
                            </li>

                            <li className={manu ===  "/buy" ? 'active' : '' }><Link href="/buy"  className="sub-menu-item">Buy</Link></li>

                            <li className={manu ===  "/sell" ? 'active' : '' }><Link href="/sell" className="sub-menu-item">Sell</Link></li>

                            <li className={`has-submenu parent-menu-item ${["/list"].includes(manu) ? 'active' : ''}`}><Link href="/list"> Listing </Link></li>

                            <li className={`has-submenu parent-parent-menu-item ${["/aboutus", "/features", "/pricing", "/faqs", "/auth-login", "/auth-signup", "/auth-reset-password", "/terms", "/privacy", "/blogs", "/blog-sidebar", "/blog-detail", "/comingsoon", "/maintenance", "/404","/agents", "/agent-profile","/agencies", "/agency-profile"].includes(manu) ? 'active' : ''}`}>
                                <Link href="#" onClick={()=>{setSubManu(subManu === "/page-item" ? '' : "/page-item")}}>Pages</Link><span className="menu-arrow"></span>
                                <ul className={`submenu ${["/aboutus", "/features", "/pricing", "/faqs", "/auth-login", "/auth-signup", "/auth-reset-password", "/terms", "/privacy", "/blogs", "/blog-sidebar", "/blog-detail", "/comingsoon", "/maintenance", "/404","/page-item","/auth-item","/term-item","/blog-item", "/special-item"].includes(subManu) ? 'open' : ''}`}>
                                    <li className={manu === "/aboutus" ? "active" : ''}><Link href="/aboutus" className="sub-menu-item">About Us</Link></li>
                                    <li className={manu === "/features" ? "active" : ''}><Link href="/features" className="sub-menu-item">Featues</Link></li>
                                    <li className={manu === "/pricing" ? "active" : ''}><Link href="/pricing" className="sub-menu-item">Pricing</Link></li>
                                    <li className={manu === "/faqs" ? "active" : ''}><Link href="/faqs" className="sub-menu-item">Faqs</Link></li>

                                    <li className={`has-submenu parent-menu-item ${["/agents", "/agent-profile"].includes(manu) ? 'active' : ''}`}><Link href="#" onClick={()=>{setSubManu(subManu === "/auth-item" ? '' : "/auth-item")}}> Agents </Link><span className="submenu-arrow"></span>
                                        <ul className={`submenu ${["/auth-item"].includes(subManu) ? 'open' : ''}`}>
                                            <li className={manu === "/agents" ? "active" : ''}><Link href="/agents" className="sub-menu-item">Agents</Link></li>
                                            <li className={manu === "/agent-profile" ? "active" : ''}><Link href="/agent-profile" className="sub-menu-item">Agent Profile</Link></li>
                                        </ul>
                                    </li>
                                    <li className={`has-submenu parent-menu-item ${["/agencies", "/agency-profile"].includes(manu) ? 'active' : ''}`}><Link href="#" onClick={()=>{setSubManu(subManu === "/auth-item" ? '' : "/auth-item")}}> Agencies </Link><span className="submenu-arrow"></span>
                                        <ul className={`submenu ${["/auth-item"].includes(subManu) ? 'open' : ''}`}>
                                            <li className={manu === "/agencies" ? "active" : ''}><Link href="/agencies" className="sub-menu-item">Agencies</Link></li>
                                            <li className={manu === "/agency-profile" ? "active" : ''}><Link href="/agency-profile" className="sub-menu-item">Agency Profile</Link></li>
                                        </ul>
                                    </li>

                                    <li className={`has-submenu parent-menu-item ${["/auth-login", "/auth-signup", "/auth-reset-password"].includes(manu) ? 'active' : ''}`}><Link href="#" onClick={()=>{setSubManu(subManu === "/auth-item" ? '' : "/auth-item")}}> Auth Pages </Link><span className="submenu-arrow"></span>
                                        <ul className={`submenu ${["/auth-login", "/auth-signup", "/auth-reset-password","/auth-item"].includes(subManu) ? 'open' : ''}`}>
                                            <li className={manu === "/auth-login" ? "active" : ''}><Link href="/auth-login" className="sub-menu-item">Login</Link></li>
                                            <li className={manu === "/auth-signup" ? "active" : ''}><Link href="/auth-signup" className="sub-menu-item">Signup</Link></li>
                                            <li className={manu === "/auth-reset-password" ? "active" : ''}><Link href="/auth-reset-password" className="sub-menu-item">Reset Password</Link></li>
                                        </ul>
                                    </li>

                                    <li className={`has-submenu parent-menu-item ${["/terms", "/privacy"].includes(manu) ? 'active' : ''}`}><Link href="#" onClick={()=>{setSubManu(subManu === "/term-item" ? '' : "/term-item")}}> Utility </Link><span className="submenu-arrow"></span>
                                        <ul className={`submenu ${["/terms", "/privacy","/term-item"].includes(subManu) ? 'open' : ''}`}>
                                            <li className={manu === "/terms" ? "active" : ''}><Link href="/terms" className="sub-menu-item">Terms of Services</Link></li>
                                            <li className={manu === "/privacy" ? "active" : ''}><Link href="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                                        </ul>
                                    </li>
                                    <li className={`has-submenu parent-menu-item ${["/blogs", "/blog-sidebar", "/blog-detail"].includes(manu) ? 'active' : ''}`}><Link href="#" onClick={()=>{setSubManu(subManu === "/blog-item" ? '' : "/blog-item")}}> Blog </Link><span className="submenu-arrow"></span>
                                        <ul className={`submenu ${["/blogs", "/blog-sidebar", "/blog-detail", "/blog-item"].includes(subManu) ? 'open' : ''}`}>
                                            <li className={manu === "/blogs" ? "active" : ''}><Link href="/blogs" className="sub-menu-item"> Blogs</Link></li>
                                            <li className={manu === "/blog-sidebar" ? "active" : ''}><Link href="/blog-sidebar" className="sub-menu-item"> Blog Sidebar</Link></li>
                                            <li className={manu === "/blog-detail" ? "active" : ''}><Link href="/blog-detail/1" className="sub-menu-item"> Blog Detail</Link></li>
                                        </ul>
                                    </li>
                                    <li className={`has-submenu parent-menu-item ${["/comingsoon", "/maintenance", "/404"].includes(manu) ? 'active' : ''}`}><Link href="#" onClick={()=>{setSubManu(subManu === "/special-item" ? '' : "/special-item")}}> Special </Link><span className="submenu-arrow"></span>
                                        <ul className={`submenu ${["/comingsoon", "/maintenance", "/404", "/special-item"].includes(subManu) ? 'open' : ''}`}>
                                            <li className={manu === "/comingsoon" ? "active" : ''}><Link href="/comingsoon" className="sub-menu-item">Comingsoon</Link></li>
                                            <li className={manu === "/maintenance" ? "active" : ''}><Link href="/maintenance" className="sub-menu-item">Maintenance</Link></li>
                                            <li className={manu === "/404" ? "active" : ''}><Link href="/404" className="sub-menu-item">404! Error</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li className={manu === "/contact" ? "active" : ''}><Link href="/contact" className="sub-menu-item">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* End Navbar  */}
        </React.Fragment>
    );

}
