import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const TopNav = () => {
    const [formData, setFormData] = useState({
        msnv: '',
        ho_ten: '',
        mat_khau: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/education/register', formData);
            setSuccessMessage('Đăng ký thành công!');
            setErrorMessage('');
            setFormData({
                msnv: '',
                ho_ten: '',
                mat_khau: '',
            });
            setTimeout(() => {
                handleDialogClose();
                setSuccessMessage('');
            }, 1500);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Người dùng đã tồn tại');
            } else {
                setErrorMessage('Lỗi khi đăng ký người dùng');
            }
            setSuccessMessage('');
        }
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/education/login', formData);
            setSuccessMessage('Đăng nhập thành công!');
            setErrorMessage('');
            const userId = response.data.msnv; // Đảm bảo rằng ID người dùng là 'msnv' hoặc tùy vào cấu trúc dữ liệu trả về
            localStorage.setItem('userId', userId);
            console.log(userId);
            setFormData({
                msnv: '',
                mat_khau: ''
            });
            setTimeout(() => {
                handleDialogClose();
                setSuccessMessage('');
            }, 1500);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Lỗi khi đăng nhập. Vui lòng thử lại.');
            }
            setSuccessMessage('');
        }
    };

    const [isScrolled, setIsScrolled] = useState(false);
    const [showDialog, setShowDialog] = useState({ login: false, register: false });

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
    // mở
    const handleDialogOpen = (type) => {
        if (type === 'login') {
            setShowDialog({ login: true, register: false });
        } else {
            setShowDialog({ login: false, register: true });
        }
    };
    // đóng dialog
    const handleDialogClose = () => {
        setShowDialog({ login: false, register: false });
    };

    return (
        <div className="relative">
            <nav className={`fixed w-full transition-all duration-500 top-0 z-20 px-10 py-4 flex justify-between items-center shadow-lg ${isScrolled ? 'backdrop-blur-md bg-white/50 border-b border-gray-200 text-gray-800' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white'}`}>
                <div className="flex items-center space-x-10">
                    <img src="https://bvdaihoccoso2.com.vn/uploads/config/footer-logo-370x90.jpg" alt="Logo" className="h-12" />
                    <NavLink to="/home" className={`text-lg font-semibold hover:text-gray-500 transition duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Trang chủ</NavLink>
                    <NavLink to="/information" className={`text-lg font-semibold hover:text-gray-500 transition duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Giới thiệu</NavLink>
                    <NavLink to="/contact" className={`text-lg font-semibold hover:text-gray-500 transition duration-300 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>Liên hệ</NavLink>
                </div>
                <div className="flex space-x-5">
                    <button onClick={() => handleDialogOpen('register')} className={`border-2 py-2 px-6 rounded-full font-semibold transition duration-300 ${isScrolled ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white' : 'border-white text-white hover:bg-white hover:text-indigo-600'}`}>Đăng ký</button>
                    <button onClick={() => handleDialogOpen('login')} className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-6 rounded-full font-semibold hover:from-orange-600 hover:to-yellow-600 transition duration-300">Đăng nhập</button>
                </div>
            </nav>

            {showDialog.login && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-96 relative transition-transform transform scale-100 duration-300">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Đăng nhập</h2>
                        <button onClick={handleDialogClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">✕</button>
                        <form onSubmit={handleSubmitLogin} className="space-y-6">
                            <input
                                type="text"
                                name='msnv'
                                value={formData.msnv}
                                onChange={handleChange}
                                required
                                placeholder="Mã nhân viên"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300" />
                            <input
                                type="password"
                                name='mat_khau'
                                value={formData.mat_khau}
                                onChange={handleChange}
                                required
                                placeholder="Mật khẩu"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300" />
                            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-md hover:bg-gradient-to-l hover:from-indigo-700 hover:to-purple-700 transition duration-300">Đăng nhập</button>
                        </form>
                        {errorMessage && (
                            <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
                        )}
                        {successMessage && (
                            <p className="text-green-500 mt-4 text-center">{successMessage}</p>
                        )}
                        <p className="text-gray-500 text-sm mt-4 text-center">Chưa có tài khoản? <span onClick={() => handleDialogOpen('register')} className="text-indigo-600 hover:underline cursor-pointer">Đăng ký ngay</span></p>
                    </div>
                </div>
            )}

            {showDialog.register && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-96 relative transition-transform transform scale-100 duration-300">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Đăng ký</h2>
                        <button onClick={handleDialogClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">✕</button>
                        <form onSubmit={handleSubmitRegister} className="space-y-6">
                            <input
                                type="text"
                                name="msnv"
                                value={formData.msnv}
                                onChange={handleChange}
                                placeholder="MSNV"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                                required
                            />
                            <input
                                type="text"
                                name="ho_ten"
                                value={formData.ho_ten}
                                onChange={handleChange}
                                placeholder="Họ tên"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                                required
                            />
                            <input
                                type="password"
                                name="mat_khau"
                                value={formData.mat_khau}
                                onChange={handleChange}
                                placeholder="Mật khẩu"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
                                required
                            />
                            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-md hover:bg-gradient-to-l hover:from-orange-600 hover:to-yellow-600 transition duration-300">
                                Đăng ký
                            </button>
                        </form>

                        {errorMessage && (
                            <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
                        )}
                        {successMessage && (
                            <p className="text-green-500 mt-4 text-center">{successMessage}</p>
                        )}
                        <p className="text-gray-500 text-sm mt-4 text-center">Đã có tài khoản? <span onClick={() => handleDialogOpen('login')} className="text-orange-500 hover:underline cursor-pointer">Đăng nhập ngay</span></p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopNav;
