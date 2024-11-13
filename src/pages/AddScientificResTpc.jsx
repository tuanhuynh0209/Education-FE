import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessDialog from '../Dialog/SuccessDialog';
import axios from 'axios';

const AddScientificResTpc = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // Hàm đóng dialog và điều hướng
    const handleClose = () => {
        setOpen(false);
        navigate('/func/scientificResearchTopic'); // Chuyển đến trang bạn muốn
    };
    const [formData, setFormData] = useState({
        msnv: 0,
        hoat_dong: '',
        pham_vi_cap_do: '',
        ten_de_tai: '',
        ma_so_hop_dong: '',
        ngay: '',
        gio_chuan_hoat_dong: '',
        vai_tro: '',
        so_luong_thanh_vien_vai_tro: '',
        ty_le_dong_gop: '',
        gio_quy_doi: '',
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
        let numActivity = 0;
        switch (formData.hoat_dong) {
            case "Đề tài NCKH đã được nghiệm thu":
                numActivity = 600;
                break;
            case "Đề tài NCKH đã được phê duyệt":
                numActivity = 300;
                break;
            case "Đề cương NCKH đã tham gia đấu thầu hoặc xét tuyển nhưng không được duyệt":
                numActivity = 150;
                break;
            case "Phiếu đề xuất ý tưởng NCKH đã tham gia xét tuyển đối với các chương trình NCKH và CN nhưng không được phê duyệt":
                numActivity = 50;
                break;
            default:
                numActivity = 0;
        }
        let numScope = 0;
        switch (formData.pham_vi_cap_do) {
            case "Cấp nhà nước hoặc có giá trị > 1 tỉ đồng":
                numScope = 1;
                break;
            case "Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị > 500 triệu đồng":
                numScope = 0.8;
                break;
            case "Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị 200 - 500 triệu đồng":
                numScope = 0.6;
                break;
            case "Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị từ 100 đến < 200 triệu đồng":
                numScope = 0.4;
                break;
            case "Cấp cơ sở hoặc có giá trị < 100 triệu đồng":
                numScope = 0.2;
                break;
            default:
                numScope = 0;
        }

        const numStandardHours = numActivity * numScope;
        return numStandardHours;
    }, [formData.hoat_dong, formData.pham_vi_cap_do]);
    useEffect(() => {
        const calculatedHours = calculateStandardHours();
        setFormData(prevData => ({
            ...prevData, gio_chuan_hoat_dong: calculatedHours
        }));
    }, [formData.hoat_dong, formData.pham_vi_cap_do, calculateStandardHours]);

    const calculateContributionPercentage = useCallback(() => {
        const numMemberSameRole = parseFloat(formData.so_luong_thanh_vien_vai_tro) || 0;
        let numcontributionFromRole = 0;
        switch (formData.vai_tro) {
            case "Chủ nhiệm và đồng chủ nhiệm: 50%":
                numcontributionFromRole = 0.5;
                break;
            case "Các thành viên chính và thư ký: 30%":
                numcontributionFromRole = 0.3;
                break;
            case "Thành viên: 15% (cho nhóm)":
                numcontributionFromRole = 0.15;
                break;
            case "KTV và thành phần khác: 5% (cho nhóm)":
                numcontributionFromRole = 0.05;
                break;
            default:
                numcontributionFromRole = 0;
        }
        const numContributionPercentage = numcontributionFromRole / numMemberSameRole;
        return numContributionPercentage;
    }, [formData.vai_tro, formData.so_luong_thanh_vien_vai_tro]);
    useEffect(() => {
        const calculatedPercentage = calculateContributionPercentage();
        setFormData(prevData => ({ ...prevData, ty_le_dong_gop: calculatedPercentage }));
    }, [formData.vai_tro, formData.so_thanh_vien_vai_tro, calculateContributionPercentage]);

    const calculateRoleConversionHours = useCallback(() => {
        // Lấy giờ chuẩn hoạt động nhân với tỉ lệ đóng góp
        return formData.gio_chuan_hoat_dong * formData.ty_le_dong_gop;
    }, [formData.gio_chuan_hoat_dong, formData.ty_le_dong_gop]);
    useEffect(() => {
        const calculatedRoleConversionHours = calculateRoleConversionHours();
        setFormData(prevData => ({ ...prevData, gio_quy_doi: calculatedRoleConversionHours }));
    }, [formData.gio_chuan_hoat_dong, formData.ty_le_dong_gop, calculateRoleConversionHours]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/education/AddSciResTpt', formData);
            setOpen(true);  // Hiển thị dialog khi thêm thành công
        } catch (error) {
            console.error('Lỗi khi thêm Nghiên cứu đề tài:', error);
        }
    };

    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm đề tài nghiên cứu khoa học</span>
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

                    {/* Activity selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Hoạt động</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, hoat_dong: e.target.value })} >
                            <option value="">Ấn vào để chọn</option>
                            <option value="Đề tài NCKH đã được nghiệm thu">Đề tài NCKH đã được nghiệm thu</option>
                            <option value="Đề tài NCKH đã được phê duyệt">Đề tài NCKH đã được phê duyệt</option>
                            <option value="Đề cương NCKH đã tham gia đấu thầu hoặc xét tuyển nhưng không được duyệt">Đề cương NCKH đã tham gia đấu thầu hoặc xét tuyển nhưng không được duyệt</option>
                            <option value="Phiếu đề xuất ý tưởng NCKH đã tham gia xét tuyển đối với các chương trình NCKH và CN nhưng không được phê duyệt">Phiếu đề xuất ý tưởng NCKH đã tham gia xét tuyển đối với các chương trình NCKH và CN nhưng không được phê duyệt</option>
                        </select>
                    </div>

                    {/* DOI field */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Phạm vi, cấp độ</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, pham_vi_cap_do: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Cấp nhà nước hoặc có giá trị > 1 tỉ đồng">Cấp nhà nước hoặc có giá trị &gt; 1 tỉ đồng</option>
                            <option value="Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị > 500 triệu đồng">Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị &gt; 500 triệu đồng</option>
                            <option value="Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị 200 - 500 triệu đồng">Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị 200 - 500 triệu đồng</option>
                            <option value="Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị từ 100 đến < 200 triệu đồng">Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị từ 100 đến &lt; 200 triệu đồng</option>
                            <option value="Cấp cơ sở hoặc có giá trị < 100 triệu đồng">Cấp cơ sở hoặc có giá trị &lt; 100 triệu đồng</option>
                        </select>

                    </div>

                    {/* Date selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên đề tài/ đề cương NCKH</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ten_de_tai: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên đề tài/ đề cương" />
                    </div>

                    {/* Journal name */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Mã số hợp đồng</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ma_so_hop_dong: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên tạp chí, kỷ yếu" />
                    </div>

                    {/* Publisher/Owner name */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày</p>
                        </div>
                        <input
                            type="date"
                            onChange={(e) => setFormData({ ...formData, ngay: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên nhà xuất bản" />
                    </div>

                    {/* Language selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn hoạt động</p>
                        </div>
                        <input
                            type="text"
                            value={formData.gio_chuan_hoat_dong}
                            readOnly
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập giờ chuẩn" />
                    </div>

                    {/* Scope/Level selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Vai trò</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" 
                            onChange={(e) => setFormData({ ...formData, vai_tro: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Chủ nhiệm và đồng chủ nhiệm: 50%">Chủ nhiệm và đồng chủ nhiệm: 50%</option>
                            <option value="Các thành viên chính và thư ký: 30%">Các thành viên chính và thư ký: 30%</option>
                            <option value="Thành viên: 15% (cho nhóm)">Thành viên: 15% (cho nhóm)</option>
                            <option value="KTV và thành phần khác: 5% (cho nhóm)">KTV và thành phần khác: 5% (cho nhóm)</option>
                        </select>
                    </div>

                    {/* Impact Factor input */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Số lượng thành viên cùng vai trò(tính cả quý Thầy/Cô)</p>
                        </div>
                        <input 
                            type="number"
                            onChange={(e) => setFormData({ ...formData, so_luong_thanh_vien_vai_tro: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số lượng" />
                    </div>

                    {/* Standard hours for activity */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-lg">Tỉ lệ đóng góp (%)</p>
                        </div>
                        <input 
                            type="text"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập phần trăm"
                            readOnly
                            // value={isNaN((formData.ty_le_dong_gop * 100) + '%') ? '' : ((formData.ty_le_dong_gop * 100) + '%')}
                            value={(formData.ty_le_dong_gop * 100) + '%'}
                        />
                    </div>

                    {/* Number of members with the same role */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input 
                        type="text" 
                        readOnly
                        value={isNaN(formData.gio_quy_doi) ? '' : formData.gio_quy_doi}
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

export default AddScientificResTpc