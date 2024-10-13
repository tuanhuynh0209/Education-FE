import React, { useCallback, useEffect, useState } from 'react';

const AddDocument = () => {

    const [totalPage, setTotalPage] = useState();
    const [language, setLanguage] = useState();
    const [reprint, setReprint] = useState();
    const [standardTime, setStandardtTime] = useState(0);
    const [totalPageInCharge, setTotalPageInCharge] = useState(0);
    const [totalMem, setTotalMem] = useState();
    const [role, setRole] = useState();
    const [contributionPercentage, setContributionPercentage] = useState(0);
    const [timeRole, setTimeRole] = useState(0);

    const calculateStandardHours = useCallback(() => {

        const numTotalPage = parseFloat(totalPage) || 0;
        let numLanguage = 0;

        if (language === "languageDoc1") {
            numLanguage = 1;
        }
        else if (language === "languageDoc2" || language === "languageDoc3" || language === "languageDoc4"
            || language === "languageDoc5" || language === "languageDoc6"
        ) {
            numLanguage = 2;
        } else {
            return 0;
        }

        let numReprint = 0;
        if (reprint === "publish") {
            numReprint = 1;
        }
        else if (reprint === "reprint") {
            numReprint = 2 / 3;
        } else {
            return 0;
        }
        const numStandardHours = numTotalPage * numLanguage * numReprint;
        setStandardtTime(numStandardHours);
    }, [totalPage, language, reprint]);

    const calculateContributionPercentage = useCallback(() => {
        const numTotalPageInCharge = parseFloat(totalPageInCharge) || 0;
        const numTotalPage = parseFloat(totalPage) || 0;
        const numTotalMember = parseFloat(totalMem) || 0; // Đảm bảo không chia cho 0
        // Tính toán tỷ lệ đóng góp
        const contributionBase = (numTotalPageInCharge / numTotalPage) * (0.85 / numTotalMember);
        // Tính toán phần đóng góp theo vai trò
        let roleContribution = 0;
        if (role === "roleEditor") {
            roleContribution = 0.1;
        } else if (role === "roleSecretary") {
            roleContribution = 0.05;
        }
        // Tổng tỷ lệ đóng góp
        const pageContributionPer = contributionBase + roleContribution;
        setContributionPercentage(pageContributionPer);
    }, [role, totalPageInCharge, totalMem, totalPage]);

    const calculateRoleConversionHours = useCallback(() => {
        // Lấy giờ chuẩn hoạt động nhân với tỉ lệ đóng góp
        const numRoleConversionHours = standardTime * (contributionPercentage);
        setTimeRole(numRoleConversionHours);
    },[standardTime, contributionPercentage]);

    useEffect(() => {
        calculateStandardHours();
        calculateContributionPercentage();
        calculateRoleConversionHours();
    }, [calculateStandardHours, calculateContributionPercentage, calculateRoleConversionHours]);
    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm sách, tài liệu</span>
                <hr className='my-4 border-gray-300' />
            </div>
            <div className='w-full h-full p-10 bg-white shadow-lg rounded-lg'>
                <div className="flex flex-col gap-6">

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Mã số nhân viên</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" disabled placeholder="Mã số nhân viên" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Họ và tên</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" disabled placeholder="Họ và tiên viên chức" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Hoạt động</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
                            <option value="">Ấn vào để chọn</option>
                            <option value="actionDoc1">Biên dịch tài liệu</option>
                            <option value="actionDoc2">Biên soạn Sách chuyên khảo</option>
                            <option value="actionDoc3">Biên soạn giáo trình</option>
                            <option value="actionDoc4">Biên soạn Sách tham khảo</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tái bản, xuất bản</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setReprint(e.target.value); calculateStandardHours(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="publish">Xuất bản</option>
                            <option value="reprint">Tái bản</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên sách, tài liệu</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên sách, tài liệu" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tổng số trang sách, tài liệu</p>
                        </div>
                        <input type="text"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số trang"
                            value={totalPage || ''}
                            onChange={(e) => setTotalPage(Number(e.target.value) || 0)} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngôn ngữ xuất bản</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setLanguage(e.target.value); calculateStandardHours(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="languageDoc1">Tiếng Việt</option>
                            <option value="languageDoc2">Tiếng Nga</option>
                            <option value="languageDoc3">Tiếng Đức</option>
                            <option value="languageDoc4">Tiếng Anh</option>
                            <option value="languageDoc5">Tiếng Pháp</option>
                            <option value="languageDoc6">Tiếng Trung</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày xuất bản, thẩm định, nghiệm thu</p>
                        </div>
                        <input type="date" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn hoạt động</p>
                        </div>
                        <input type="text" readOnly value={standardTime.toFixed(0)} className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập giờ chuẩn' />
                    </div>


                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Vai trò</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setRole(e.target.value); calculateContributionPercentage(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="roleEditor">Chủ biên</option>
                            <option value="roleSecretary">Thư ký</option>
                            <option value="roleMem">Thành viên biên soạn (bao gồm cả chủ biên)</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Số thành viên ban biên soạn</p>
                        </div>
                        <input type="text"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số thành viên"
                            value={totalMem || ''}
                            onChange={(e) => setTotalMem(Number(e.target.value) || 1)} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Số trang phụ trách</p>
                        </div>
                        <input type="text"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số trang"
                            value={totalPageInCharge || ''}
                            onChange={(e) => setTotalPageInCharge(Number(e.target.value) || 0)} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tỷ lệ đóng góp</p>
                        </div>
                        <input type="text" readOnly value={(contributionPercentage * 100).toFixed(0) + '%'} className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input type="text" readOnly value={timeRole.toFixed(0)}  className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className='w-full flex justify-center mt-6'>
                        <button className='bg-[#F9A150] hover:bg-[#e08f40] rounded-lg p-4 text-lg w-fit px-20 font-bold text-white outline-none transition duration-300'>
                            Hoàn tất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDocument