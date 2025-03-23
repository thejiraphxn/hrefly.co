'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Person2Icon from '@mui/icons-material/Person2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HistoryIcon from '@mui/icons-material/History';






const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    

    useEffect(() => {

    }, [])
    
    

    return (
        <div className="w-full container mx-auto pt-3">
            <div className="w-full flex items-center justify-between">
                <Link href="/" className="flex items-center text-sky-900 duration-300 ease-in-out hover:text-sky-950 no-underline hover:no-underline font-bold text-2xl lg:text-3xl ps-2 pe-2">
                    <img className='h-12' src='./assets/titlelogo.png' />
                    {/* hrefly.co */}
                </Link>

                <div className="ps-2 pe-2 w-2/5 justify-end content-center hidden lg:flex">
                    <ul className='flex w-full'>
                        <li className='w-1/3 justify-items-center'>
                            <Link href="/" className="flex inline-block text-sky-900 hover:text-sky-700 text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
                                <HomeIcon />
                                <span className='ms-2'>Home</span>
                            </Link>
                        </li>
                        <li className='w-1/3 justify-items-center'>
                            {
                                session?.user?.username ? (
                                    <Link href="/History" className="flex inline-block text-sky-900 hover:text-sky-700 text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
                                        <HistoryIcon />
                                        <span className='ms-2'>History</span>
                                    </Link>
                                ) : (
                                    <Link href="/SignUp" className="flex inline-block text-sky-900 hover:text-sky-700 text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
                                        <PersonAddIcon />
                                        <span className='ms-2'>SingUp</span>
                                    </Link>
                                )
                            }
                        </li>
                        <li className='w-1/3 justify-items-center'>
                            {
                                session?.user?.username ? (
                                    <Link href="/Logout" className="flex inline-block text-sky-900 hover:text-sky-700 text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
                                        <LogoutIcon /> 
                                        <span className='ms-2'>Logout</span>
                                    </Link>
                                ) : (
                                    <Link href="/Login" className="flex inline-block text-sky-900 hover:text-sky-700 text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">
                                        <LoginIcon />
                                        <span className='ms-2'>Login</span>
                                    </Link>
                                )
                            }
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        {isOpen ? (
                            <svg className="text-sky-900 hover:text-sky-700 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="text-sky-900 hover:text-sky-700 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden lg:hidden basis-full top-16 left-0 bg-transparent p-3"
            >
                <ul>
                    <li>
                        <Link href="/" className="block px-3 py-2 text-base text-sky-900 font-medium hover:text-sky-700">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/AboutMe" className="block px-3 py-2 text-base text-sky-900 font-medium hover:text-sky-700">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/TimeCapsule" className="block px-3 py-2 text-base text-sky-900 font-medium hover:text-sky-700">
                            TimeCapsule
                        </Link>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
}

export default NavBar;
