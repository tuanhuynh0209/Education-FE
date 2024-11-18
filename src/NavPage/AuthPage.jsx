import React, { useState } from 'react';

const AuthPage = () => {
    const [showDialog, setShowDialog] = useState({ login: false, register: false });
    const [formData, setFormData] = useState({ msnv: '', mat_khau: '', ho_ten: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleDialogOpen = (type) => {
        setShowDialog({ login: type === 'login', register: type === 'register' });
    };

    const handleDialogClose = () => {
        setShowDialog({ login: false, register: false });
        setFormData({ msnv: '', mat_khau: '', ho_ten: '' });
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/education/login', formData);
            setSuccessMessage('Đăng nhập thành công!');
            setErrorMessage('');
            const userId = response.data.msnv;
            const userName = response.data.ho_ten;
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', userName);
            setIsLoggedIn(true);
            setUsername(userName);
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
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button onClick={() => handleDialogOpen('login')} className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4">Đăng nhập</button>
            <button onClick={() => handleDialogOpen('register')} className="bg-orange-500 text-white px-4 py-2 rounded-md">Đăng ký</button>

            {/* Hộp thoại Đăng nhập */}
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                            />
                            <input
                                type="password"
                                name='mat_khau'
                                value={formData.mat_khau}
                                onChange={handleChange}
                                required
                                placeholder="Mật khẩu"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                            />
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

            {/* Hộp thoại Đăng ký */}
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
                                placeholder="Mã nhân viên"
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

export default AuthPage;
