import React, { useCallback, useEffect, useState } from 'react';

const AddScientificResTpc = () => {

    const [activity, setActivity] = useState();
    const [scope, setScope] = useState();
    const [standardHours, setStandardHours] = useState();
    const [role, setRole] = useState();
    const [totalMembersWithSameRole, setTotalMembersWithSameRole] = useState();
    const [contributionPercentage, setContributionPercentage] = useState(0);

    const calculateStandardHours = useCallback(() => {
        let numActivity = 0;
        switch (activity) {
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
        switch (scope) {
            case "Cấp nhà nước hoặc có giá trị &gt; 1 tỉ đồng":
                numScope = 1;
                break;
            case "Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị &gt; 500 triệu đồng":
                numScope = 0.8;
                break;
            case "Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị 200 - 500 triệu đồng":
                numScope = 0.6;
                break;
            case "Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị từ 100 đến &lt; 200 triệu đồng":
                numScope = 0.4;
                break;
            case "Cấp cơ sở hoặc có giá trị &lt; 100 triệu đồng":
                numScope = 0.2;
                break;
            default:
                numScope = 0;
        }

        const numStandardHours = numActivity * numScope;
        setStandardHours(numStandardHours);
    }, [activity, scope]);

    const calculateContributionPercentage = useCallback(() => {
        let numcontributionFromRole = 0;
        switch (role) {
            case "Chủ nhiệm và đồng chủ nhiệm: 50%":
                numcontributionFromRole = 50;
                break;
            case "Các thành viên chính và thư ký: 30%":
                numcontributionFromRole = 30;
                break;
            case "Thành viên: 15% (cho nhóm)":
                numcontributionFromRole = 15;
                break;
            case "KTV và thành phần khác: 5% (cho nhóm)":
                numcontributionFromRole = 5;
                break;
            default:
                numcontributionFromRole = 0;
        }
        const numContributionPercentage = numcontributionFromRole / totalMembersWithSameRole;
        setContributionPercentage(numContributionPercentage);
    }, [role, totalMembersWithSameRole]);

    useEffect(() => {
        calculateStandardHours();
        calculateContributionPercentage();
    }, [calculateStandardHours, calculateContributionPercentage]);

    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm đề tài nghiên cứu khoa học</span>
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
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" disabled placeholder="Họ và tiên viên chức" />
                    </div>

                    {/* Activity selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Hoạt động</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setActivity(e.target.value); calculateStandardHours(); }} >
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
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setScope(e.target.value); calculateStandardHours(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Cấp nhà nước hoặc có giá trị &gt; 1 tỉ đồng">Cấp nhà nước hoặc có giá trị &gt; 1 tỉ đồng</option>
                            <option value="Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị &gt; 500 triệu đồng">Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị &gt; 500 triệu đồng</option>
                            <option value="Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị 200 - 500 triệu đồng">Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị 200 - 500 triệu đồng</option>
                            <option value="Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị từ 100 đến &lt; 200 triệu đồng">Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị từ 100 đến &lt; 200 triệu đồng</option>
                            <option value="Cấp cơ sở hoặc có giá trị &lt; 100 triệu đồng">Cấp cơ sở hoặc có giá trị &lt; 100 triệu đồng</option>
                        </select>

                    </div>

                    {/* Date selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên đề tài/ đề cương NCKH</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên đề tài/ đề cương" />
                    </div>

                    {/* Journal name */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Mã số hợp đồng</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên tạp chí, kỷ yếu" />
                    </div>

                    {/* Publisher/Owner name */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày</p>
                        </div>
                        <input type="date" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên nhà xuất bản" />
                    </div>

                    {/* Language selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn hoạt động</p>
                        </div>
                        <input type="number" value={standardHours} readOnly className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập giờ chuẩn" />
                    </div>

                    {/* Scope/Level selection */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Vai trò</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setRole(e.target.value); calculateContributionPercentage(); }}>
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
                        <input type="number"
                            value={totalMembersWithSameRole}
                            onChange={(e) => setTotalMembersWithSameRole(Number(e.target.value))}
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập số lượng" />
                    </div>

                    {/* Standard hours for activity */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="font-medium text-lg">Tỉ lệ đóng góp (%)</p>
                        </div>
                        <input type="number"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder="Nhập phần trăm"
                            readOnly
                            value={contributionPercentage.toFixed(1)}
                        />
                    </div>

                    {/* Number of members with the same role */}
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập số giờ" />
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

export default AddScientificResTpc