import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        msnv: '',
        ho_ten: '',
        mat_khau: '',
        confirmPassword: '',
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
        // check độ dài mật khẩu trên 8 ký tự và kèm ký tự đặc biệt
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if(formData.mat_khau.length < 8 || !specialCharRegex.test(formData.mat_khau)){
            setErrorMessage("Mật khẩu phải dài hơn 8 ký tự và phải có ít nhất 1 ký tự đặc biệt");
            setSuccessMessage("");
            return;
        }
        // check khớp khẩu và confirm
        if(formData.mat_khau !== formData.confirmPassword){
            setErrorMessage("Mật khẩu và nhập lại mật khẩu không khớp");
            setSuccessMessage("");
            return;
        }
        try {
            await axios.post('http://localhost:3001/education/register', {
                msnv: formData.msnv,
                ho_ten: formData.ho_ten,
                mat_khau: formData.mat_khau
            });
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
                    <input
                        type='password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder='Nhập lại mật khẩu'
                        className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300'
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
