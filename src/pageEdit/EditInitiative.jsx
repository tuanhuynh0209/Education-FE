import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessDialog from '../Dialog/SuccessDialog';

const EditInitiative = () => {
    const { initId } = useParams();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // Hàm đóng dialog và điều hướng
    const handleClose = () => {
        setOpen(false);
        navigate('/func/initiative'); // Chuyển đến trang bạn muốn
    };
    // Hàm chuyển đổi ngày thành định dạng "yyyy-MM-dd"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [formData, setFormData] = useState({
        msnv: 0,
        hoat_dong: '',
        ten_cong_trinh: '',
        ma_so_chung_nhan: '',
        ngay: '',
        loi_ich: '',
        so_tien_loi_ich: '',
        gio_chuan_hoat_dong: '',
        ty_le_dong_gop: '',
        gio_quy_doi: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // fill thồng tin hiện tại cho các trường
    useEffect(() => {
        const fetchOldData = async () => {
            // const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:3001/education/getDataInit/${initId}`);
                const data = response.data;
                // Kiểm tra và định dạng trường ngày tháng nếu cần
                if (data.ngay) {
                    data.ngay = formatDate(data.ngay);
                }
                setFormData(data); // Điền dữ liệu cũ vào form

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOldData();
    }, [initId]);

    const calculateStandardHours = useCallback(() => {
        let hours = 0;
        if (formData.loi_ich === "Có đem lại lợi ích kinh tế cho Bệnh viện") {
            hours = formData.so_tien_loi_ich + 120
        } else {
            hours = 0;
        }
        return hours;
    }, [formData.loi_ich, formData.so_tien_loi_ich]);
    useEffect(() => {
        const calculatedHours = calculateStandardHours();
        setFormData(prevData => ({ ...prevData, gio_chuan_hoat_dong: calculatedHours }));
    }, [formData.loi_ich, formData.so_tien_loi_ich, calculateStandardHours]);

    const calculateRoleConversionHours = useCallback(() => {
        return formData.gio_chuan_hoat_dong * formData.ty_le_dong_gop;
    }, [formData.gio_chuan_hoat_dong, formData.ty_le_dong_gop]);
    useEffect(() => {
        const calculatedRoleConversionHours = calculateRoleConversionHours();
        setFormData(prevData => ({ ...prevData, gio_quy_doi: calculatedRoleConversionHours }));
    }, [formData.gio_chuan_hoat_dong, formData.ty_le_dong_gop, calculateRoleConversionHours]);

    // Hàm call api chỉnh sửa sáng kiến
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/education/editDataInit/${initId}`, formData);
            setOpen(true);  // Hiển thị dialog khi thêm thành công
        } catch (err) {
            console.error('Lỗi khi thêm sáng kiến:', err)
        }
    }
    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'> Thêm sáng kiến cải tiến kỹ thuật cấp bệnh viện</span>
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
                            name='hoat_dong'
                            value={formData.hoat_dong}
                            onChange={handleInputChange}
                            // onChange={(e) => setFormData({ ...formData, hoat_dong: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập hoạt động" />
                    </div>


                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên công trình, sáng kiến đã được công nhận</p>
                        </div>
                        <input
                            type="text"
                            name='ten_cong_trinh'
                            value={formData.ten_cong_trinh}
                            onChange={handleInputChange}
                            // onChange={(e) => setFormData({ ...formData, ten_cong_trinh: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập thông tin" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Mã số chứng nhận (theo quyết định công nhận)</p>
                        </div>
                        <input
                            type="text"
                            name='ma_so_chung_nhan'
                            value={formData.ma_so_chung_nhan}
                            onChange={handleInputChange}
                            // onChange={(e) => setFormData({ ...formData, ma_so_chung_nhan: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập mã số" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày</p>
                        </div>
                        <input
                            type="date"
                            name='ngay'
                            value={formData.ngay}
                            onChange={handleInputChange}
                            // onChange={(e) => setFormData({ ...formData, ngay: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Lợi ích mang lại cho Bệnh viện</p>
                        </div>
                        <select
                            type="text"
                            name='loi_ich'
                            value={formData.loi_ich}
                            onChange={handleInputChange}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            // onChange={(e) => setFormData({ ...formData, loi_ich: e.target.value })}
                            >
                            <option value="">Ấn vào để chọn</option>
                            <option value="Không đem lại lợi ích kinh tế cho Bệnh viện">Không đem lại lợi ích kinh tế cho Bệnh viện</option>
                            <option value="Có đem lại lợi ích kinh tế cho Bệnh viện">Có đem lại lợi ích kinh tế cho Bệnh viện</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Số tiền lợi ích kinh tế mang lại cho Bệnh viện
                                (đơn vị tính: trăm triệu)</p>
                        </div>
                        <input
                            type="number"
                            name='so_tien_loi_ich'
                            value={formData.so_tien_loi_ich}
                            onChange={handleInputChange}
                            // onChange={(e) => setFormData({ ...formData, so_tien_loi_ich: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số tiền" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn hoạt động</p>
                        </div>
                        <input
                            type="number"
                            name='gio_chuan_hoat_dong'
                            value={formData.gio_chuan_hoat_dong}
                            onChange={handleInputChange}
                            readOnly
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder='Nhập giờ chuẩn' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tỷ lệ tham gia đóng góp (căn cứ theo hồ sơ)</p>
                        </div>
                        <input
                            type="number"
                            name='ty_le_dong_gop'
                            value={formData.ty_le_dong_gop}
                            onChange={handleInputChange}
                            // onChange={(e) => setFormData({ ...formData, ty_le_dong_gop: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder='Nhập số liệu' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input
                            type="number"
                            readOnly
                            name='gio_quy_doi'
                            value={formData.gio_quy_doi}
                            onChange={handleInputChange}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số giờ" />
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

export default EditInitiative