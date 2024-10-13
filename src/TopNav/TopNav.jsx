import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './topNav.css'


const TopNav = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative">
            <nav className={`flex-wrap fixed w-full transition-all duration-300 top-0 z-20 px-10 py-4 flex justify-between items-center ${isScrolled ? 'top__nav-wrapper-blur bg-transparent' : 'bg-black'}`}>
                <div className="flex space-x-10">
                    <img src="https://bvdaihoccoso2.com.vn/uploads/config/footer-logo-370x90.jpg" alt="Logo" className="h-12" />
                    <NavLink to="/home" className="text-white font-bold">Trang chủ</NavLink>
                    <NavLink to="/information" className="text-white font-bold">Giới thiệu</NavLink>
                    <NavLink to="/contact" className="text-white font-bold">Liên hệ</NavLink>
                </div>
                <div className="flex space-x-5">
                    <button className="border-2 border-white text-white py-2 px-5 rounded-lg font-semibold">Đăng ký</button>
                    <button className="bg-[#F9A150] text-white py-2 px-5 rounded-lg font-semibold">Đăng nhập</button>
                </div>
            </nav>

            
        </div>
    );
};

export default TopNav;
