import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessDialog from '../Dialog/SuccessDialog';
//  sử dụng localStorage để lưu msnv sau khi đăng nhập sau đó getItem khi thêm bài báo khoa học
const AddScientificArt = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // Hàm đóng dialog và điều hướng
    const handleClose = () => {
        setOpen(false);
        navigate('/func/scientificArticle'); // Chuyển đến trang bạn muốn
    };
    const [formData, setFormData] = useState({
        msnv: 0,
        hoat_dong: '',
        ten_bai_bao: '',
        doi: '',
        ngay: '',
        ten_tap_chi: '',
        ten_nha_xuat_ban: '',
        ngon_ngu: '',
        pham_vi_cap_do: '',
        impact_factor: '',
        gio_chuan_hoat_dong: '',
        vai_tro: '',
        tong_so_thanh_vien: '',
        tong_so_tac_gia: '',
        ty_le_dong_gop: '',
        gio_quy_doi: '',
    });
    useEffect(() => {
        const storedMsnv = localStorage.getItem('userId');
        if (storedMsnv) {
            setFormData((prevData) => ({
                ...prevData,
                msnv: storedMsnv,
            }));
        }
    }, []);

    const calculateStandardHours = useCallback(() => {
        let hours = 0;
        const impactValue = parseFloat(formData.impact_factor) || 0;

        if (formData.hoat_dong === "1.Đăng trên tạp chí thuộc hệ thống ISI/Scopus" || formData.hoat_dong === "2.Đăng trong kỷ yếu hội thảo quốc tế có phản biện và xuất bản bằng tiếng Anh hoặc tiếng Pháp") {
            hours = impactValue <= 0.5 ? 160 : 320 * impactValue;
        } else if (formData.hoat_dong === "3.Đăng dưới dạng chương sách trong sách có ISBN") {
            hours = formData.ngon_ngu === "Tiếng Việt" ? 140 : 280;
        } else if (formData.hoat_dong === "4.Đăng trên tạp chí khoa học trong nước (có ISSN)" || formData.hoat_dong === "5.Kỷ yếu hội thảo trong nước có phản biện và xuất bản bằng tiếng Việt") {
            hours = 120;
            if (formData.pham_vi_cap_do === "Có điểm tối đa &lt; 0.5 điểm trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước") hours += 20;
            else if (formData.pham_vi_cap_do === "Có điểm tối đa từ 0.5 điểm trở lên trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước") hours += 40;
        }
        return hours;
    }, [formData.impact_factor, formData.hoat_dong, formData.ngon_ngu, formData.pham_vi_cap_do]);
    useEffect(() => {
        const calculatedHours = calculateStandardHours();
        setFormData(prevData => ({ ...prevData, gio_chuan_hoat_dong: calculatedHours }));
    }, [formData.hoat_dong, formData.impact_factor, formData.ngon_ngu, formData.pham_vi_cap_do, calculateStandardHours]);

    const calculateContributionPercentage = useCallback(() => {
        let contributionFromRole = 0;

        switch (formData.vai_tro) {
            case "Tác giả đầu tiên":
            case "Tác giả liên hệ":
                contributionFromRole = 0.2;
                break;
            case "Tác giả đầu tiên, tác giả liên hệ":
                contributionFromRole = 0.4;
                break;
            default:
                contributionFromRole = 0;
        }
        const contributionPercentage = (contributionFromRole / Math.max(formData.tong_so_thanh_vien, 1)) + (0.6 / Math.max(formData.tong_so_tac_gia, 1));
        return contributionPercentage;
    }, [formData.vai_tro, formData.tong_so_thanh_vien, formData.tong_so_tac_gia]);
    useEffect(() => {
        const calculatedPercentage = calculateContributionPercentage();
        setFormData(prevData => ({ ...prevData, ty_le_dong_gop: calculatedPercentage }));
    }, [formData.vai_tro, formData.tong_so_thanh_vien, formData.tong_so_tac_gia, calculateContributionPercentage]);

    const calculateRoleConversionHours = useCallback(() => {
        return (formData.gio_chuan_hoat_dong * formData.ty_le_dong_gop);
    }, [formData.gio_chuan_hoat_dong, formData.ty_le_dong_gop]);
    useEffect(() => {
        const calculatedRoleConversionHours = calculateRoleConversionHours();
        setFormData(prevData => ({ ...prevData, gio_quy_doi: calculatedRoleConversionHours }));
    }, [formData.gio_chuan_hoat_dong, formData.ty_le_dong_gop, calculateRoleConversionHours]);

    // Cập nhật khi dữ liệu thay đổi
    useEffect(() => {
        calculateStandardHours();
        calculateContributionPercentage();
        calculateRoleConversionHours();
    }, [calculateStandardHours, calculateContributionPercentage, calculateRoleConversionHours]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/education/AddSciArt', formData);
            console.log('Bài báo đã được thêm:', response.data);
            setOpen(true);  // Hiển thị dialog khi thêm thành công
        } catch (error) {
            console.error('Lỗi khi thêm bài báo:', error);
        }
    };
    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm bài báo khoa học</span>
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
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" disabled placeholder="Mã số nhân viên" />
                    </div>

                    {/* Activity selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Hoạt động</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, hoat_dong: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="1.Đăng trên tạp chí thuộc hệ thống ISI/Scopus">1.Đăng trên tạp chí thuộc hệ thống ISI/Scopus</option>
                            <option value="2.Đăng trong kỷ yếu hội thảo quốc tế có phản biện và xuất bản bằng tiếng Anh hoặc tiếng Pháp">2.Đăng trong kỷ yếu hội thảo quốc tế có phản biện và xuất bản bằng tiếng Anh hoặc tiếng Pháp</option>
                            <option value="3.Đăng dưới dạng chương sách trong sách có ISBN">3.Đăng dưới dạng chương sách trong sách có ISBN</option>
                            <option value="4.Đăng trên tạp chí khoa học trong nước (có ISSN)">4.Đăng trên tạp chí khoa học trong nước (có ISSN)</option>
                            <option value="5.Kỷ yếu hội thảo trong nước có phản biện và xuất bản bằng tiếng Việt">5.Kỷ yếu hội thảo trong nước có phản biện và xuất bản bằng tiếng Việt</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên bài báo khoa học</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ten_bai_bao: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên bài báo" />
                    </div>

                    {/* DOI field */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>DOI, minh chứng bài báo</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập DOI hoặc minh chứng bài báo" />
                    </div>

                    {/* Date selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày</p>
                        </div>
                        <input
                            type="date"
                            onChange={(e) => setFormData({ ...formData, ngay: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    {/* Journal name */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên tạp chí, kỷ yếu</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ten_tap_chi: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên tạp chí, kỷ yếu" />
                    </div>

                    {/* Publisher/Owner name */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên nhà xuất bản, đơn vị chủ quản</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ten_nha_xuat_ban: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên nhà xuất bản" />
                    </div>

                    {/* Language selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngôn ngữ xuất bản</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, ngon_ngu: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Tiếng Việt">Tiếng Việt</option>
                            <option value="Tiếng Anh">Tiếng Anh</option>
                            <option value="Tiếng Pháp">Tiếng Pháp</option>
                        </select>
                    </div>

                    {/* Scope/Level selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Phạm vi, cấp độ</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, pham_vi_cap_do: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Chưa có chỉ số ảnh hưởng (Impact Factor – IF) hoặc IF ≤ 0.5">Chưa có chỉ số ảnh hưởng (Impact Factor – IF) hoặc IF ≤ 0.5</option>
                            <option value="Có chỉ số ảnh hưởng IF &gt; 0.5 (tính theo năm kê khai)">Có chỉ số ảnh hưởng IF &gt; 0.5 (tính theo năm kê khai)</option>
                            <option value="Chưa có trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước">Chưa có trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước</option>
                            <option value="Có điểm tối đa &lt; 0.5 điểm trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước">Có điểm tối đa &lt; 0.5 điểm trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước</option>
                            <option value="Có điểm tối đa từ 0.5 điểm trở lên trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước">Có điểm tối đa từ 0.5 điểm trở lên trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước</option>
                        </select>
                    </div>

                    {/* Impact Factor input */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Chỉ số Impact Factor (IF) nếu có</p>
                        </div>
                        <input
                            type="number"
                            onChange={(e) => setFormData({ ...formData, impact_factor: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập IF (nếu có)"
                        />
                    </div>

                    {/* Standard hours for activity */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn hoạt động</p>
                        </div>
                        <input
                            type="number"
                            value={formData.gio_chuan_hoat_dong}
                            readOnly
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                        />
                    </div>
                    {/* Role selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-lg">Vai trò</p>
                        </div>
                        <select
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, vai_tro: e.target.value })}
                        >
                            <option value="">Ấn vào để chọn</option>
                            <option value="Tác giả đầu tiên">Tác giả đầu tiên</option>
                            <option value="Tác giả liên hệ">Tác giả liên hệ</option>
                            <option value="Tác giả đầu tiên, tác giả liên hệ">Tác giả đầu tiên, tác giả liên hệ</option>
                            <option value="Đồng tác giả">Đồng tác giả</option>
                        </select>
                    </div>

                    {/* Total members with the same role */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-lg">Tổng số thành viên có cùng vai trò</p>
                        </div>
                        <input
                            type="number"
                            onChange={(e) => setFormData({ ...formData, tong_so_thanh_vien: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                        />
                    </div>

                    {/* Total number of authors */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-lg">Tổng số tác giả</p>
                        </div>
                        <input
                            type="number"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tổng số tác giả"
                            onChange={(e) => setFormData({ ...formData, tong_so_tac_gia: e.target.value })}
                        />
                    </div>

                    {/* Contribution percentage */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-lg">Tỉ lệ đóng góp (%)</p>
                        </div>
                        <input
                            type="number"
                            value={(formData.ty_le_dong_gop * 100).toFixed(0) + '%'}
                            readOnly
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input
                            type="number"
                            value={formData.gio_quy_doi}
                            readOnly
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                        />
                    </div>

                    <div className='w-full flex justify-center mt-6'>
                        <button
                            type='submit'
                            className='bg-[#F9A150] hover:bg-[#e08f40] rounded-lg p-4 text-lg w-fit px-20 font-bold text-white outline-none transition duration-300'>
                            Hoàn tất
                        </button>
                    </div>
                </div>
            </form>
            <SuccessDialog open={open} onClose={handleClose} />
        </div>
    );
};

export default AddScientificArt;
