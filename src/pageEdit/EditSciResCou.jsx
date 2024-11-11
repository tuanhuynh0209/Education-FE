import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessDialog from '../Dialog/SuccessDialog';
import axios from 'axios';
const EditSciResCou = () => {
    const { couId } = useParams();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // Hàm đóng dialog và điều hướng
    const handleClose = () => {
        setOpen(false);
        navigate('/func/scientificResearchCouncil'); // Chuyển đến trang bạn muốn
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
        so_quyet_dinh: '',
        ngay: '',
        vai_tro: '',
        gio_quy_doi: '',
        ten_de_tai: ''
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
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // fill thồng tin hiện tại cho các trường
    useEffect(() => {
        const fetchOldData = async () => {
            // const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:3001/education/getDataCou/${couId}`);
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
    }, [couId]);

    const calculateStandardTimeConversionRole = useCallback(() => {
        let num = 0;
        switch (formData.vai_tro) {
            case "1. Chủ tịch Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở":
                num = 4;
                break;
            case "2. Ủy viên thư ký Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở":
                num = 3;
                break;
            case "3. Ủy viên Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở":
                num = 3;
                break;
            case "4. Thành viên Hội đồng đánh giá đề cương đề tài NCKH cấp cơ sở":
                num = 2;
                break;
            default:
                num = 0;
        }
        return num;
    }, [formData.vai_tro]);
    useEffect(() => {
        const calculatedStandardTimeConversionRole = calculateStandardTimeConversionRole();
        setFormData(prevData => ({ ...prevData, gio_quy_doi: calculatedStandardTimeConversionRole }));
    }, [formData.vai_tro, calculateStandardTimeConversionRole]);

    // Hàm call api chỉnh sửa sáng kiến
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/education/editDataCou/${couId}`, formData);
            setOpen(true);  // Hiển thị dialog khi thêm thành công
        } catch (err) {
            console.error('Lỗi khi thêm sáng kiến:', err)
        }
    }

    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm tham gia hội đồng đánh giá, nghiệm thu đề tài NCKH cấp cơ sở </span>
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
                            <p className='font-medium text-lg'>Tên đề tài NCKH</p>
                        </div>
                        <input
                            type="text"
                            name='ten_de_tai'
                            value={formData.ten_de_tai}
                            onChange={handleInputChange}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên đề tài" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Số quyết định</p>
                        </div>
                        <input
                            type="text"
                            name='so_quyet_dinh'
                            value={formData.so_quyet_dinh}
                            onChange={handleInputChange}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số quyết định" />
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
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Vai trò</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            name='vai_tro'
                            value={formData.vai_tro}
                            onChange={handleInputChange}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="1. Chủ tịch Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở">1. Chủ tịch Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở</option>
                            <option value="2. Ủy viên thư ký Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở">2. Ủy viên thư ký Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở</option>
                            <option value="3. Ủy viên Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở">3. Ủy viên Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở</option>
                            <option value="4. Thành viên Hội đồng đánh giá đề cương đề tài NCKH cấp cơ sở">4. Thành viên Hội đồng đánh giá đề cương đề tài NCKH cấp cơ sở </option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input
                            type="text"
                            readOnly
                            name='gio_quy_doi'
                            value={formData.gio_quy_doi}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập số giờ" />
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

export default EditSciResCou