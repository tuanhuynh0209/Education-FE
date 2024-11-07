import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessDialog from '../Dialog/SuccessDialog';
const EditDocument = () => {
    const { docId } = useParams();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // Hàm đóng dialog và điều hướng
    const handleClose = () => {
        setOpen(false);
        navigate('/func/document'); // Chuyển đến trang bạn muốn
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
        ten_sach: '',
        tong_so_trang: '',
        ngon_ngu: '',
        ngay_xuat_ban: '',
        gio_chuan_hoat_dong: '',
        vai_tro: '',
        tong_so_thanh_vien: '',
        tong_so_trang_phu_trach: '',
        ty_le_dong_gop: '',
        gio_quy_doi: '',
        tai_ban: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    // fill thông tin hiện tại cho các trường
    useEffect(() => {
        const fetchOldData = async () => {
            // const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:3001/education/getDataDoc/${docId}`);
                const data = response.data;
                // Kiểm tra và định dạng trường ngày tháng nếu cần
                if (data.ngay_xuat_ban) {
                    data.ngay_xuat_ban = formatDate(data.ngay_xuat_ban);
                }
                setFormData(data); // Điền dữ liệu cũ vào form

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchOldData();
    }, [docId]);

    const calculateStandardHours = useCallback(() => {
        const numTotalPage = parseFloat(formData.tong_so_trang) || 0;
        let numLanguage = 0;

        if (formData.ngon_ngu === "Tiếng Việt") {
            numLanguage = 1;
        }
        else if (formData.ngon_ngu === "Tiếng Nga" || formData.ngon_ngu === "Tiếng Đức" || formData.ngon_ngu === "Tiếng Anh"
            || formData.ngon_ngu === "Tiếng Pháp" || formData.ngon_ngu === "Tiếng Trung"
        ) {
            numLanguage = 2;
        } else {
            return 0;
        }

        let numReprint = 0;
        if (formData.tai_ban === "Xuất bản") {
            numReprint = 1;
        }
        else if (formData.tai_ban === "Tái bản") {
            numReprint = 2 / 3;
        } else {
            return 0;
        }
        const numStandardHours = numTotalPage * numLanguage * numReprint;
        return numStandardHours;
    }, [formData.tong_so_trang, formData.ngon_ngu, formData.tai_ban]);
    useEffect(() => {
        const calculatedHours = calculateStandardHours();
        setFormData(prevData => ({ ...prevData, gio_chuan_hoat_dong: calculatedHours }));
    }, [formData.tong_so_trang, formData.ngon_ngu, formData.tai_ban, calculateStandardHours]);

    const calculateContributionPercentage = useCallback(() => {
        const numTotalPageInCharge = parseFloat(formData.tong_so_trang_phu_trach) || 0;
        const numTotalPage = parseFloat(formData.tong_so_trang) || 0;
        const numTotalMember = parseFloat(formData.tong_so_thanh_vien) || 0;
        // Tính tỷ lệ đóng góp
        const contributionBase = (numTotalPageInCharge / numTotalPage) * (0.85 / numTotalMember);
        // Tính phần đóng góp theo vai trò
        let roleContribution = 0;
        if (formData.vai_tro === "Chủ biên") {
            roleContribution = 0.1;
        } else if (formData.vai_tro === "Thư ký") {
            roleContribution = 0.05;
        }
        // Tổng tỷ lệ đóng góp
        const pageContributionPer = contributionBase + roleContribution;
        return pageContributionPer;
    }, [formData.vai_tro, formData.tong_so_trang_phu_trach, formData.tong_so_thanh_vien, formData.tong_so_trang]);
    useEffect(() => {
        const calculatedPercentage = calculateContributionPercentage();
        setFormData(prevData => ({ ...prevData, ty_le_dong_gop: calculatedPercentage }));
    }, [formData.tong_so_thanh_vien, formData.tong_so_trang, formData.tong_so_trang_phu_trach, formData.vai_tro, calculateContributionPercentage])

    const calculateRoleConversionHours = useCallback(() => {
        // Lấy giờ chuẩn hoạt động nhân với tỉ lệ đóng góp
        return formData.gio_chuan_hoat_dong * formData.ty_le_dong_gop;
    }, [formData.gio_chuan_hoat_dong, formData.ty_le_dong_gop]);
    useEffect(() => {
        const calculatedRoleConversionHours = calculateRoleConversionHours();
        setFormData(prevData => ({ ...prevData, gio_quy_doi: calculatedRoleConversionHours }));
    }, [formData.gio_chuan_hoat_dong, formData.ty_le_dong_gop, calculateRoleConversionHours]);

    // hàm call api chỉnh sửa Doc
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/education/editDataDoc/${docId}`, formData);
            setOpen(true);  // Hiển thị dialog khi thêm thành công
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm sách, tài liệu</span>
                <hr className='my-4 border-gray-300' />
            </div>
            <form onSubmit={handleSubmit} className='w-full h-full p-10 bg-white shadow-lg rounded-lg'>
                <div className="flex flex-col gap-6">

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
                        <select
                            name='hoat_dong'
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            // onChange={(e) => setFormData({ ...formData, hoat_dong: e.target.value })}
                            value={formData.hoat_dong}
                            onChange={handleInputChange}
                        >
                            <option value="">Ấn vào để chọn</option>
                            <option value="Biên dịch tài liệu">Biên dịch tài liệu</option>
                            <option value="Biên soạn Sách chuyên khảo">Biên soạn Sách chuyên khảo</option>
                            <option value="Biên soạn giáo trình">Biên soạn giáo trình</option>
                            <option value="Biên soạn Sách tham khảo">Biên soạn Sách tham khảo</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tái bản, xuất bản</p>
                        </div>
                        <select
                            name='tai_ban'
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            // onChange={(e) => setFormData({ ...formData, tai_ban: e.target.value })}
                            value={formData.tai_ban}
                            onChange={handleInputChange}
                        >
                            <option value="">Ấn vào để chọn</option>
                            <option value="Xuất bản">Xuất bản</option>
                            <option value="Tái bản">Tái bản</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên sách, tài liệu</p>
                        </div>
                        <input
                            type="text"
                            name='ten_sach'
                            // onChange={(e) => setFormData({ ...formData, ten_sach: e.target.value })}
                            value={formData.ten_sach}
                            onChange={handleInputChange}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên sách, tài liệu" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tổng số trang sách, tài liệu</p>
                        </div>
                        <input
                            type="text"
                            name='tong_so_trang'
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số trang"
                            // onChange={(e) => setFormData({ ...formData, tong_so_trang: e.target.value })} 
                            value={formData.tong_so_trang}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngôn ngữ xuất bản</p>
                        </div>
                        <select
                            name='ngon_ngu'
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            // onChange={(e) => setFormData({ ...formData, ngon_ngu: e.target.value })}
                            value={formData.ngon_ngu}
                            onChange={handleInputChange}
                        >
                            <option value="">Ấn vào để chọn</option>
                            <option value="Tiếng Việt">Tiếng Việt</option>
                            <option value="Tiếng Nga">Tiếng Nga</option>
                            <option value="Tiếng Đức">Tiếng Đức</option>
                            <option value="Tiếng Anh">Tiếng Anh</option>
                            <option value="Tiếng Pháp">Tiếng Pháp</option>
                            <option value="Tiếng Trung">Tiếng Trung</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày xuất bản, thẩm định, nghiệm thu</p>
                        </div>
                        <input
                            type="date"
                            name='ngay_xuat_ban'
                            // onChange={(e) => setFormData({ ...formData, ngay_xuat_ban: e.target.value })}
                            value={formData.ngay_xuat_ban}
                            onChange={handleInputChange}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn hoạt động</p>
                        </div>
                        <input
                            type="text"
                            name='gio_chuan_hoat_dong'
                            readOnly
                            value={formData.gio_chuan_hoat_dong}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập giờ chuẩn' />
                    </div>


                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Vai trò</p>
                        </div>
                        <select
                            name='vai_tro'
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            // onChange={(e) => setFormData({ ...formData, vai_tro: e.target.value })}
                            value={formData.vai_tro}
                            onChange={handleInputChange}
                        >
                            <option value="">Ấn vào để chọn</option>
                            <option value="Chủ biên">Chủ biên</option>
                            <option value="Thư ký">Thư ký</option>
                            <option value="Thành viên biên soạn bao gồm cả chủ biên">Thành viên biên soạn (bao gồm cả chủ biên)</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Số thành viên ban biên soạn</p>
                        </div>
                        <input
                            type="text"
                            name='tong_so_thanh_vien'
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số thành viên"
                            // onChange={(e) => setFormData({ ...formData, tong_so_thanh_vien: e.target.value })} 
                            value={formData.tong_so_thanh_vien}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Số trang phụ trách</p>
                        </div>
                        <input
                            type="text"
                            name='tong_so_trang_phu_trach'
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số trang"
                            // onChange={(e) => setFormData({ ...formData, tong_so_trang_phu_trach: e.target.value })} 
                            value={formData.tong_so_trang_phu_trach}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tỷ lệ đóng góp</p>
                        </div>
                        <input
                            type="text"
                            name='ty_le_dong_gop'
                            readOnly
                            value={(formData.ty_le_dong_gop * 100) + '%'}
                            // value={isNaN(formData.ty_le_dong_gop* 100) + '%' ? '' : (formData.ty_le_dong_gop* 100) + '%'}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input
                            type="text"
                            name='gio_quy_doi'
                            readOnly
                            value={isNaN(formData.gio_quy_doi) ? '' : formData.gio_quy_doi}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
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

export default EditDocument