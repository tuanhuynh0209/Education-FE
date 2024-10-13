import React, { useState, useEffect, useCallback } from 'react';


const AddScientificArt = () => {
    const [activity, setActivity] = useState('');
    const [impactFactor, setImpactFactor] = useState('');
    const [language, setLanguage] = useState('');
    const [scope, setScope] = useState('');
    const [standardHours, setStandardHours] = useState(0);
    const [role, setRole] = useState('');
    const [totalMembersWithSameRole, setTotalMembersWithSameRole] = useState(0);
    const [totalAuthors, setTotalAuthors] = useState(0);
    const [contributionPercentage, setContributionPercentage] = useState(0);
    const [roleConversionHours, setRoleConversionHours] = useState(0);

    const calculateStandardHours = useCallback(() => {
        let hours = 0;
        const impactValue = parseFloat(impactFactor) || 0;
        if (activity === "actionSciArt1" || activity === "actionSciArt2") {
            hours = impactValue <= 0.5 ? 160 : 320 * impactValue;
        } else if (activity === "actionSciArt3") {
            hours = language === "languageSciArt1" ? 140 : 140 * 2;
        } else if (activity === "actionSciArt4" || activity === "actionSciArt5") {
            hours = 120;
            if (scope === "rangeSciArt4") hours += 20;
            else if (scope === "rangeSciArt5") hours += 40;
        }
        setStandardHours(hours);
    }, [impactFactor, language, activity, scope]);

    const calculateContributionPercentage = useCallback(() => {
        let contributionFromRole = 0;

        switch (role) {
            case "roleSciArt1":
                contributionFromRole = 0.2;
                break;
            case "roleSciArt2":
                contributionFromRole = 0.2;
                break;
            case "roleSciArt3":
                contributionFromRole = 0.4;
                break;
            default:
                contributionFromRole = 0;
        }
        const contributionPercentage = (contributionFromRole / totalMembersWithSameRole) + (0.6 / totalAuthors);
        setContributionPercentage(contributionPercentage);
    }, [role, totalMembersWithSameRole, totalAuthors]);

    const calculateRoleConversionHours = useCallback(() => {
        let timeRole = standardHours * contributionPercentage;
        setRoleConversionHours(timeRole);
    }, [standardHours, contributionPercentage]);

    // Cập nhật khi dữ liệu thay đổi
    useEffect(() => {
        calculateStandardHours();
        calculateContributionPercentage();
        calculateRoleConversionHours();
    }, [calculateStandardHours, calculateContributionPercentage, calculateRoleConversionHours]);


    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm bài báo khoa học</span>
                <hr className='my-4 border-gray-300' />
            </div>
            <div className='w-full h-full p-10 bg-white shadow-lg rounded-lg'>
                <div className="flex flex-col gap-6">
                    {/* Employee ID (to be passed from user data) */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Mã số nhân viên</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" disabled placeholder="Mã số nhân viên" />
                    </div>

                    {/* Full Name (to be passed from user data) */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Họ và tên</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" disabled placeholder="Họ và tên viên chức" />
                    </div>

                    {/* Activity selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Hoạt động</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setActivity(e.target.value); calculateStandardHours(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="actionSciArt1">1.Đăng trên tạp chí thuộc hệ thống ISI/Scopus</option>
                            <option value="actionSciArt2">2.Đăng trong kỷ yếu hội thảo quốc tế có phản biện và xuất bản bằng tiếng Anh hoặc tiếng Pháp</option>
                            <option value="actionSciArt3">3.Đăng dưới dạng chương sách trong sách có ISBN</option>
                            <option value="actionSciArt4">4.Đăng trên tạp chí khoa học trong nước (có ISSN)</option>
                            <option value="actionSciArt5">5.Kỷ yếu hội thảo trong nước có phản biện và xuất bản bằng tiếng Việt</option>
                        </select>
                    </div>

                    {/* DOI field */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>DOI, minh chứng bài báo</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập DOI hoặc minh chứng bài báo" />
                    </div>

                    {/* Date selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày</p>
                        </div>
                        <input type="date" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    {/* Journal name */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên tạp chí, kỷ yếu</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên tạp chí, kỷ yếu" />
                    </div>

                    {/* Publisher/Owner name */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên nhà xuất bản, đơn vị chủ quản</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên nhà xuất bản" />
                    </div>

                    {/* Language selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngôn ngữ xuất bản</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setLanguage(e.target.value); calculateStandardHours(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="languageSciArt1">Tiếng Việt</option>
                            <option value="languageSciArt2">Tiếng Anh</option>
                            <option value="languageSciArt3">Tiếng Pháp</option>
                        </select>
                    </div>

                    {/* Scope/Level selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Phạm vi, cấp độ</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setScope(e.target.value); calculateStandardHours(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="rangeSciArt1">Chưa có chỉ số ảnh hưởng (Impact Factor – IF) hoặc IF ≤ 0.5</option>
                            <option value="rangeSciArt2">Có chỉ số ảnh hưởng IF &gt; 0.5 (tính theo năm kê khai)</option>
                            <option value="rangeSciArt3">Chưa có trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước</option>
                            <option value="rangeSciArt4">Có điểm tối đa &lt; 0.5 điểm trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước</option>
                            <option value="rangeSciArt5">Có điểm tối đa từ 0.5 điểm trở lên trong danh mục tạp chí tính điểm công trình của Hội đồng Giáo sư Nhà nước</option>
                        </select>
                    </div>

                    {/* Impact Factor input */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Chỉ số Impact Factor (IF) nếu có</p>
                        </div>
                        <input
                            type="number"
                            value={impactFactor}
                            onChange={(e) => {
                                const value = e.target.value;
                                setImpactFactor(value);
                                calculateStandardHours(value);
                            }}
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
                            value={isNaN(standardHours) ? '' : standardHours}
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
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Ấn vào để chọn</option>
                            <option value="roleSciArt1">Tác giả đầu tiên</option>
                            <option value="roleSciArt2">Tác giả liên hệ</option>
                            <option value="roleSciArt3">Tác giả đầu tiên, tác giả liên hệ</option>
                            <option value="roleSciArt4">Đồng tác giả</option>
                        </select>
                    </div>

                    {/* Total members with the same role */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-lg">Tổng số thành viên có cùng vai trò</p>
                        </div>
                        <input
                            type="number"
                            value={totalMembersWithSameRole || ''}
                            onChange={(e) => setTotalMembersWithSameRole(Number(e.target.value) || 0)}
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
                            value={totalAuthors}
                            onChange={(e) => setTotalAuthors(Number(e.target.value))}
                        />
                    </div>

                    {/* Contribution percentage */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-lg">Tỉ lệ đóng góp (%)</p>
                        </div>
                        <input
                            type="number"
                            readOnly={(contributionPercentage * 100).toFixed(0)}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input
                            type="number"
                            value={isNaN(roleConversionHours) ? '' : roleConversionHours}
                            readOnly
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                        />
                    </div>

                    <div className='w-full flex justify-center mt-6'>
                        <button className='bg-[#F9A150] hover:bg-[#e08f40] rounded-lg p-4 text-lg w-fit px-20 font-bold text-white outline-none transition duration-300'>
                            Hoàn tất
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddScientificArt;
