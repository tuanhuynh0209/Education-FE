import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessDialog from '../Dialog/SuccessDialog';
import axios from 'axios';

const AddScientificCfs = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // Hàm đóng dialog và điều hướng
    const handleClose = () => {
        setOpen(false);
        navigate('/func/scientificConferences'); // Chuyển đến trang bạn muốn
    };

    const [formData, setFormData] = useState({
        msnv: 0,
        hoat_dong: '',
        ten_hoi_nghi: '',
        don_vi_to_chuc: '',
        ngay: '',
        pham_vi: '',
        thoi_luong: '',
        gio_chuan_hoat_dong: '',
        gio_quy_doi: ''
    });
    useEffect(() => {
        const storedMsnv = localStorage.getItem('userId');
        if (storedMsnv) {
            setFormData((prevData) => ({
                ...prevData,
                msnv: storedMsnv
            }));
        }
    }, []);

    const calculateStandardHours = useCallback(() => {
        let numDurationAttend = parseFloat(formData.thoi_luong);
        const hours = 2.5 * numDurationAttend;
        return hours;
    }, [formData.thoi_luong]);
    useEffect(() => {
        const calculatedHours = calculateStandardHours();
        setFormData(prevData => ({ ...prevData, gio_chuan_hoat_dong: calculatedHours, gio_quy_doi: calculatedHours }));
    }, [formData.thoi_luong, calculateStandardHours]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/education/AddSciCfs', formData);
            console.log('Tham dự hội nghị đã được thêm:', response.data);
            setOpen(true);  // Hiển thị dialog khi thêm thành công
        } catch (error) {
            console.error('Lỗi khi thêm tham dự hội nghị:', error);
        }
    };
    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm tham gia hội nghị khoa học</span>
                <hr className='my-4 border-gray-300' />
            </div>
            <form onSubmit={handleSubmit} className='w-full h-full p-10 bg-white shadow-lg rounded-lg'>
                <div className="flex flex-col gap-6">

                    {/* Employee ID (to be passed from user data) */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Mã số nhân viên</p>
                        </div>
                        <input
                            type="text"
                            value={formData.msnv}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            disabled placeholder="Mã số nhân viên" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Hoạt động</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, hoat_dong: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập hoạt động" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên hội nghị khoa học đã tham dự</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ten_hoi_nghi: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập đơn vị" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày</p>
                        </div>
                        <input
                            type="date"
                            onChange={(e) => setFormData({ ...formData, ngay: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Phạm vi</p>
                        </div>
                        <select
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, pham_vi: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Hội nghị trong nước">Hội nghị trong nước</option>
                            <option value="Hội nghị Quốc tế">Hội nghị Quốc tế</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Thời lượng tham dự (đơn vị tính: buổi)</p>
                        </div>
                        <input type="number"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên sách, tài liệu"
                            onChange={(e) => setFormData({ ...formData, thoi_luong: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn hoạt động</p>
                        </div>
                        <input
                            type="number"
                            readOnly
                            value={isNaN(formData.gio_chuan_hoat_dong) ? '' : formData.gio_chuan_hoat_dong}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder='Nhập giờ chuẩn' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input
                            type="number"
                            readOnly
                            value={isNaN(formData.gio_quy_doi) ? '' : formData.gio_quy_doi}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số giờ" />
                    </div>

                    <div className='w-full flex justify-center mt-6'>
                        <button className='bg-[#F9A150] hover:bg-[#e08f40] rounded-lg p-4 text-lg w-fit px-20 font-bold text-white outline-none transition duration-300'>
                            Hoàn tất
                        </button>
                    </div>
                </div>
            </form>
            <SuccessDialog open={open} onClose={handleClose} />
        </div>
    )
}

export default AddScientificCfs