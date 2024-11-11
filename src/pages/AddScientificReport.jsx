import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessDialog from '../Dialog/SuccessDialog';
import axios from 'axios';
const AddScientificReport = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // Hàm đóng dialog và điều hướng
    const handleClose = () => {
        setOpen(false);
        navigate('/func/scientificReport'); // Chuyển đến trang bạn muốn
    };

    const [formData, setFormData] = useState({
        msnv: 0,
        hoat_dong: '',
        ten_bai_fulltext: '',
        ten_de_tai: '',
        minh_chung: '',
        ten_hoi_nghi: '',
        don_vi_to_chuc: '',
        ngay: '',
        pham_vi: '',
        giai_thuong: '',
        hinh_thuc: '',
        gio_quy_doi: '',
        tong_so_tac_gia: '',
        vai_tro: '',
        tong_so_tac_gia_vai_tro: '',
        ty_le_dong_gop: '',
        gio_quy_doi_vai_tro: '',
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

    const calculateStandardTimeTempFt = useCallback(() => {
        let numScope = 0;
        if (formData.pham_vi === "Hội nghị trong nước") {
            numScope = 1;
        } else if (formData.pham_vi === "Hội nghị Quốc Tế") {
            numScope = 2;
        } else numScope = 1;
        let numPrize = 0;
        switch (formData.giai_thuong) {
            case "Giải nhất":
                numPrize = 2;
                break;
            case "Giải nhì":
                numPrize = 1.5;
                break;
            case "Giải ba":
                numPrize = 1.25;
                break;
            default:
                numPrize = 1;
        }

        let numReportForm = 0;
        if (formData.hinh_thuc === "Báo cáo hội trường(Oral)") {
            numReportForm = 2;
        } else {
            numReportForm = 1;
        }
        let numStandardTimeTempFt = 0;
        let numActivity = 0;
        if (formData.hoat_dong === "Báo cáo hội nghị khoa học chuyên ngành được hội nghề nghiệp công nhận, chấp nhận") {
            numActivity = 30;
            numStandardTimeTempFt = numActivity * numScope * numPrize * numReportForm;
        } else if (formData.hoat_dong === "Báo cáo hội thảo, sinh hoạt chuyên môn") {
            numActivity = numStandardTimeTempFt = 40;
        }
        return numStandardTimeTempFt;
    }, [formData.hoat_dong, formData.pham_vi, formData.giai_thuong, formData.hinh_thuc]);
    useEffect(() => {
        const calculatedHours = calculateStandardTimeTempFt();
        setFormData(prevData => ({ ...prevData, gio_quy_doi: calculatedHours }));
    }, [formData.hoat_dong, formData.pham_vi, formData.giai_thuong, formData.hinh_thuc, calculateStandardTimeTempFt]);

    const calculateContributionPercentage = useCallback(() => {
        const numTotalMemFt = parseFloat(formData.tong_so_tac_gia);
        const numSameRoleMemFt = parseFloat(formData.tong_so_tac_gia_vai_tro);
        let numRoleFt = 0;
        switch (formData.vai_tro) {
            case "Tác giả đầu tiên":
                numRoleFt = 0.2;
                break;
            case "Tác giả liên hệ":
                numRoleFt = 0.2;
                break;
            case "Tác giả đầu tiên, tác giả liên hệ":
                numRoleFt = 0.4;
                break;
            default:
                numRoleFt = 0;
        }
        const numContributionPer = (numRoleFt / numSameRoleMemFt) + (0.6 / numTotalMemFt);
        return numContributionPer;
    }, [formData.tong_so_tac_gia, formData.tong_so_tac_gia_vai_tro, formData.vai_tro]);
    useEffect(() => {
        const calculatedPercentage = calculateContributionPercentage();
        setFormData(prevData => ({ ...prevData, ty_le_dong_gop: calculatedPercentage }));
    }, [formData.tong_so_tac_gia, formData.tong_so_tac_gia_vai_tro, formData.vai_tro, calculateContributionPercentage]);

    const calculateStandardTimeTemp = useCallback(() => {
        // Lấy giờ chuẩn hoạt động nhân với tỉ lệ đóng góp
        return formData.gio_quy_doi * formData.ty_le_dong_gop;
    }, [formData.gio_quy_doi, formData.ty_le_dong_gop]);
    useEffect(() => {
        const calculatedStandardTimeTemp = calculateStandardTimeTemp();
        setFormData(prevData => ({ ...prevData, gio_quy_doi_vai_tro: calculatedStandardTimeTemp }));
    }, [formData.gio_quy_doi, formData.ty_le_dong_gop, calculateStandardTimeTemp]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/education/AddSciRpt', formData);
            console.log('Báo cáo đã được thêm:', response.data);
            setOpen(true);  // Hiển thị dialog khi thêm thành công
        } catch (error) {
            console.error('Lỗi khi thêm báo cáo:', error);
        }
    };
    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm báo cáo khoa học dạng bài fulltext tại hội nghị, hội thảo sinh hoạt chuyên môn</span>
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
                        <select
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, hoat_dong: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Báo cáo hội nghị khoa học chuyên ngành được hội nghề nghiệp công nhận, chấp nhận">Báo cáo hội nghị khoa học chuyên ngành được hội nghề nghiệp công nhận, chấp nhận</option>
                            <option value="Báo cáo hội thảo, sinh hoạt chuyên môn">Báo cáo hội thảo, sinh hoạt chuyên môn</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên bài fulltext đã báo cáo</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ten_bai_fulltext: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên bài báo cáo" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên đề tài đã báo cáo</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ten_de_tai: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên đề tài" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Minh chứng</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, minh_chung: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập văn bản minh chứng" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên hội nghị khoa học đã báo cáo</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, ten_hoi_nghi: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập tên hội nghị" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Đơn vị tổ chức</p>
                        </div>
                        <input
                            type="text"
                            onChange={(e) => setFormData({ ...formData, don_vi_to_chuc: e.target.value })}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập đơn vị tổ chức" />
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
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, pham_vi: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Hội nghị trong nước">Hội nghị trong nước</option>
                            <option value="Hội nghị Quốc tế">Hội nghị Quốc tế</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giải thưởng đạt được (nếu có)</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, giai_thuong: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Giải nhất">Giải nhất</option>
                            <option value="Giải nhì">Giải nhì</option>
                            <option value="Giải ba">Giải ba</option>
                            <option value="Không">Không</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Hình thức báo cáo</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, hinh_thuc: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Báo cáo hội trường(Oral)">Báo cáo hội trường(Oral)</option>
                            <option value="Báo cáo dạng treo tường(Poster)">Báo cáo dạng treo tường(Poster)</option>
                            <option value="Báo cáo hội thảo, sinh hoạt chuyên môn">Báo cáo hội thảo, sinh hoạt chuyên môn</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò (tạm tính)</p>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={isNaN(formData.gio_quy_doi) ? '' : formData.gio_quy_doi}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder='Nhập giờ' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tổng số tác giả bài fulltext</p>
                        </div>
                        <input
                            type="number"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder='Nhập tổng số tác giả'
                            onChange={(e) => setFormData({ ...formData, tong_so_tac_gia: e.target.value })} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Vai trò trong bài fulltext</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            onChange={(e) => setFormData({ ...formData, vai_tro: e.target.value })}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Tác giả đầu tiên">Tác giả đầu tiên</option>
                            <option value="Tác giả liên hệ">Tác giả liên hệ</option>
                            <option value="Tác giả đầu tiên, tác giả liên hệ">Tác giả đầu tiên, tác giả liên hệ</option>
                            <option value="Đồng tác giả">Đồng tác giả</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tổng số tác giả cùng vai trò</p>
                        </div>
                        <input type="number"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder='Nhập tổng số tác giả'
                            onChange={(e) => setFormData({ ...formData, tong_so_tac_gia_vai_tro: e.target.value })} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tỉ lệ đóng góp</p>
                        </div>
                        <input
                            type="text"
                            readOnly
                            value={isNaN(formData.ty_le_dong_gop * 100) ? '' : formData.ty_le_dong_gop * 100}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò</p>
                        </div>
                        <input 
                        type="text" 
                        value={isNaN(formData.gio_quy_doi_vai_tro) ? '' : formData.gio_quy_doi_vai_tro}
                        readOnly
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

export default AddScientificReport