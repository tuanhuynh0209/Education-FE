import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessDialog from '../Dialog/SuccessDialog';
import axios from 'axios';
const AddScientificResPro = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // Hàm đóng dialog và điều hướng
    const handleClose = () => {
        setOpen(false);
        navigate('/func/scientificResearchProduct'); // Chuyển đến trang bạn muốn
    };
    const [formData, setFormData] = useState({
        msnv: 0,
        hoat_dong: '',
        ten_san_pham: '',
        don_vi_cap_chung_nhan: '',
        minh_chung: '',
        pham_vi: '',
        ngay: '',
        gio_chuan_hoat_dong: '',
        ty_le_dong_gop: '',
        gio_quy_doi: ''
    });
    useEffect(() => {
        const storeMsnv = localStorage.getItem('userId');
        if (storeMsnv) {
            setFormData((prevData) => ({
                ...prevData,
                msnv: storeMsnv,
            }));
        }
    }, []);

    const calculateStandardHours = useCallback(() => {
        let hours = 0;
        switch (formData.hoat_dong) {
            case "Giấy chứng nhận sáng chế độc quyền (patent)":
                hours = 200;
                break;
            case "Giấy chứng nhận giải pháp hữu ích":
                hours = 160;
                break;
            case "Giấy chứng nhận đăng ký nhãn hiệu sản phẩm phát triển từ đề tài NCKH":
                hours = 100;
                break;
            case "4. Giới thiệu sản phẩm phát triển từ đề tài/đề án nghiên cứu khoa học tại các hội chợ, triển lãm":
                hours = 20;
                break;
            default:
                hours = 0;
        }
        let numScope = 0;
        if (formData.pham_vi === "Trong nước") {
            numScope = 1;
        } else if (formData.pham_vi === "Quốc tế") {
            numScope = 2;
        }
        const numStandandHours = hours * numScope
        return numStandandHours;
    }, [formData.hoat_dong, formData.pham_vi]);
    useEffect(() => {
        const calculatedHours = calculateStandardHours();
        setFormData(prevData => ({ ...prevData, gio_chuan_hoat_dong: calculatedHours }));
    }, [formData.hoat_dong, formData.pham_vi, calculateStandardHours]);

    const calculateStandardHoursTemp = useCallback(() => {
        let numContribute = parseFloat(formData.ty_le_dong_gop);
        let numHours = parseFloat(formData.gio_chuan_hoat_dong);
        const hoursTemp = numHours * numContribute;
        return hoursTemp;
    }, [formData.ty_le_dong_gop, formData.gio_chuan_hoat_dong]);
    useEffect(() => {
        const calculatedStandardHoursTemp = calculateStandardHoursTemp();
        setFormData(prevData => ({ ...prevData, gio_quy_doi: calculatedStandardHoursTemp }));
    }, [formData.ty_le_dong_gop, formData.gio_chuan_hoat_dong, calculateStandardHoursTemp]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/education/AddSciResPro', formData);
            setOpen(true);  // Hiển thị dialog khi thêm thành công
        } catch (error) {
            console.error('Lỗi khi thêm tài liệu:', error);
        }
    };

    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Đăng ký sở hữu trí tuệ, triển lãm sản phẩm khoa học công nghệ</span>
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
                            <p className='font-medium text-lg'>Hoạt động đã đạt</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, hoat_dong: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Giấy chứng nhận sáng chế độc quyền (patent)">Giấy chứng nhận sáng chế độc quyền (patent)</option>
                            <option value="Giấy chứng nhận giải pháp hữu ích">Giấy chứng nhận giải pháp hữu ích</option>
                            <option value="Giấy chứng nhận đăng ký nhãn hiệu sản phẩm phát triển từ đề tài NCKH">Giấy chứng nhận đăng ký nhãn hiệu sản phẩm phát triển từ đề tài NCKH</option>
                            <option value="4. Giới thiệu sản phẩm phát triển từ đề tài/đề án nghiên cứu khoa học tại các hội chợ, triển lãm">4. Giới thiệu sản phẩm phát triển từ đề tài/đề án nghiên cứu khoa học tại các hội chợ, triển lãm</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên sản phẩm, giải pháp, nhãn hiệu đã được cấp chứng nhận hoặc giới thiệu tại hội chợ, triển lãm</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ten_san_pham: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập thông tin" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Đơn vị cấp chứng nhận, tổ chức</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, don_vi_cap_chung_nhan: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập đơn vị" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Minh chứng</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, minh_chung: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập minh chứng" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Phạm vi</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, pham_vi: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Trong nước">Trong nước</option>
                            <option value="Quốc tế">Quốc tế</option>
                        </select>
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
                            <p className='font-medium text-lg'>Giờ chuẩn hoạt động</p>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={isNaN(formData.gio_chuan_hoat_dong) ? '' : formData.gio_chuan_hoat_dong}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập giờ chuẩn' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tỷ lệ đóng góp theo hồ sơ</p>
                        </div>
                        <input type="text"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder='Nhập số liệu'
                            onChange={(e) => setFormData({ ...formData, ty_le_dong_gop: e.target.value })} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input type="text" readOnly value={isNaN(formData.gio_quy_doi) ? '' : formData.gio_quy_doi} className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập số giờ" />
                    </div>

                    <div className='w-full flex justify-center mt-6'>
                        <button type='submit' className='bg-[#F9A150] hover:bg-[#e08f40] rounded-lg p-4 text-lg w-fit px-20 font-bold text-white outline-none transition duration-300'>
                            Hoàn tất
                        </button>
                    </div>
                </div>
            </form>
            <SuccessDialog open={open} onClose={handleClose} />
        </div>
    )
}

export default AddScientificResPro