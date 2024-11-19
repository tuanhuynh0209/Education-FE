import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../user/UserProvider';

const LoginPage = () => {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({ msnv: '', mat_khau: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/education/login', formData);
            const { msnv, ho_ten } = response.data;

            setSuccessMessage('Đăng nhập thành công!');
            setErrorMessage('');
            localStorage.setItem('userId', msnv);
            localStorage.setItem('username', ho_ten);

            // Cập nhật UserContext
            setUser({
                isLoggedIn: true,
                username: ho_ten,
            });

            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            if (error.response?.status === 401) {
                setErrorMessage('Tên đăng nhập hoặc mật khẩu không đúng.');
            } else {
                setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#112D60] to-[#DD83E0]">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96 relative transition-transform transform scale-100 duration-300">
                <h2 className="text-xl font-bold mb-6 text-gray-800">Đăng nhập</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                <p className="text-gray-500 text-sm mt-4 text-center">Chưa có tài khoản? <span onClick={() => navigate('/register')} className="text-indigo-600 hover:underline cursor-pointer">Đăng ký ngay</span></p>
            </div>
        </div>
    );
};

export default LoginPage;
