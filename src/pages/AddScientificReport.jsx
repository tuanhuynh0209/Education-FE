import React, { useCallback, useEffect, useState } from 'react';

const AddScientificReport = () => {

    const [activity, setActivity] = useState();
    const [scope, setScope] = useState();
    const [prize, setPrize] = useState();
    const [reportForm, setReportForm] = useState();
    const [standardTimeTempFt, setStandardTimeTempFt] = useState();
    const [totalMemFt, setTotalMemFt] = useState();
    const [roleFt, setRoleFt] = useState();
    const [sameRoleMemFt, setSameRoleMemFt] = useState();
    const [contributionRate, setContributionRate] = useState();

    const calculateStandardTimeTempFt = useCallback(() => {
        let numScope = 0;
        if (scope === "Hội nghị trong nước") {
            numScope = 1;
        } else if (scope === "Hội nghị Quốc Tế") {
            numScope = 2;
        } else numScope = 1;
        let numPrize = 0;
        switch (prize) {
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
        if (reportForm === "Báo cáo hội trường(Oral)") {
            numReportForm = 2;
        } else {
            numReportForm = 1;
        }
        let numStandardTimeTempFt = 0;
        let numActivity = 0;
        if (activity === "Báo cáo hội nghị khoa học chuyên ngành được hội nghề nghiệp công nhận, chấp nhận") {
            numActivity = 30;
            numStandardTimeTempFt = numActivity * numScope * numPrize * numReportForm;
        } else if (activity === "Báo cáo hội thảo, sinh hoạt chuyên môn") {
            numActivity = numStandardTimeTempFt = 40;
        }
        setStandardTimeTempFt(numStandardTimeTempFt);
    }, [activity, scope, prize, reportForm]);

    const calculateContributionPercentage = useCallback(() => {
        const numTotalMemFt = parseFloat(totalMemFt);
        const numSameRoleMemFt = parseFloat(sameRoleMemFt);
        let numRoleFt = 0;
        switch (roleFt) {
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
        setContributionRate(numContributionPer);
    }, [totalMemFt, sameRoleMemFt, roleFt]);

    useEffect(() => {
        calculateStandardTimeTempFt();
        calculateContributionPercentage();
    }, [calculateStandardTimeTempFt, calculateContributionPercentage]);

    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm báo cáo khoa học dạng bài fulltext tại hội nghị, hội thảo sinh hoạt chuyên môn</span>
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

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Hoạt động</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setActivity(e.target.value); calculateStandardTimeTempFt(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Báo cáo hội nghị khoa học chuyên ngành được hội nghề nghiệp công nhận, chấp nhận">Báo cáo hội nghị khoa học chuyên ngành được hội nghề nghiệp công nhận, chấp nhận</option>
                            <option value="Báo cáo hội thảo, sinh hoạt chuyên môn">Báo cáo hội thảo, sinh hoạt chuyên môn</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên bài fulltext đã báo cáo</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên bài báo cáo" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên đề tài đã báo cáo</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên đề tài" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Minh chứng</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập văn bản minh chứng" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên hội nghị khoa học đã báo cáo</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên hội nghị" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Đơn vị tổ chức</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập đơn vị tổ chức" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày</p>
                        </div>
                        <input type="date" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Phạm vi</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setScope(e.target.value); calculateStandardTimeTempFt(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="Hội nghị trong nước">Hội nghị trong nước</option>
                            <option value="Hội nghị Quốc tế">Hội nghị Quốc tế</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giải thưởng đạt được (nếu có)</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setPrize(e.target.value); calculateStandardTimeTempFt(); }}>
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
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setReportForm(e.target.value); calculateStandardTimeTempFt(); }}>
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
                        <input type="text" readOnly value={standardTimeTempFt} className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập giờ' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tổng số tác giả bài fulltext</p>
                        </div>
                        <input type="text"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder='Nhập tổng số tác giả'
                            value={totalMemFt || ''}
                            onChange={(e) => setTotalMemFt(Number(e.target.value) || 0)} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Vai trò trong bài fulltext</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setRoleFt(e.target.value); calculateContributionPercentage(); }}>
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
                        <input type="text"
                            className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
                            placeholder='Nhập tổng số tác giả'
                            value={sameRoleMemFt || ''}
                            onChange={(e) => setSameRoleMemFt(Number(e.target.value) || 0)} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tỉ lệ đóng góp</p>
                        </div>
                        <input type="text" readOnly value={contributionRate * 100} className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tỉ lệ đóng góp" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò</p>
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

export default AddScientificReport