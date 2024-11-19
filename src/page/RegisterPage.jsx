import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        msnv: '',
        ho_ten: '',
        mat_khau: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/education/register', formData);
            setSuccessMessage('Đăng ký thành công!');
            setErrorMessage('');
            setTimeout(() => {
                navigate('/login'); // Chuyển sang trang đăng nhập
            }, 1000);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Người dùng đã tồn tại');
            } else {
                setErrorMessage('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#112D60] to-[#DD83E0]">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96 relative transition-transform transform scale-100 duration-300">
                <h2 className="text-xl font-bold mb-6 text-gray-800">Đăng ký</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                <p className="text-gray-500 text-sm mt-4 text-center">Đã có tài khoản? <span onClick={() => navigate('/login')} className="text-orange-500 hover:underline cursor-pointer">Đăng nhập ngay</span></p>
            </div>
        </div>
    );
};

export default RegisterPage;
