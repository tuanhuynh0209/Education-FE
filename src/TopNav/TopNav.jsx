import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserProvider';

const TopNav = () => {

    const { user, setUser } = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setUser({
            isLoggedIn: false,
            username: '',
        });
        // setIsLoggedIn(false);
        // setUsername('');
        navigate('/login');
    };

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
            <nav className={`fixed w-full transition-all duration-500 top-0 z-20 px-10 py-4 flex justify-between items-center shadow-lg ${isScrolled ? 'backdrop-blur-md bg-white/50 border-b border-gray-200 text-gray-800' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white'}`}>
                <div className="flex items-center space-x-10">
                    <img src="https://bvdaihoccoso2.com.vn/uploads/config/footer-logo-370x90.jpg" alt="Logo" className="h-12" />
                    <NavLink to="/home" className={`text-lg font-semibold hover:text-gray-500 transition duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Trang chủ</NavLink>
                    <NavLink to="/search" className={`text-lg font-semibold hover:text-gray-500 transition duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Tìm kiếm</NavLink>
                    {/* <NavLink to="/information" className={`text-lg font-semibold hover:text-gray-500 transition duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Giới thiệu</NavLink>
                    <NavLink to="/contact" className={`text-lg font-semibold hover:text-gray-500 transition duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Liên hệ</NavLink> */}
                </div>
                <div className="flex space-x-5">
                    {user.isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            <span className={`text-lg font-semibold`}>
                                Xin chào, {user.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-red-600 transition duration-300">
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => navigate('/register')} className={`border-2 py-2 px-6 rounded-full font-semibold transition duration-300 ${isScrolled ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' : 'border-white text-white hover:bg-white hover:text-indigo-600'}`}>Đăng ký</button>
                            <button onClick={() => navigate('/login')} className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-6 rounded-full font-semibold hover:from-orange-600 hover:to-yellow-600 transition duration-300">Đăng nhập</button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default TopNav;
