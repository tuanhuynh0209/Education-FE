import React, { useCallback, useEffect, useState } from 'react';

const AddSciResCou = () => {
    const [role, setRole] = useState();
    const [standardTime, setStandardtTime] = useState();

    const calculateStandardTimeConversionRole = useCallback(() => {
        let num = 0;
        switch (role) {
            case "roleSciResCou1":
                num = 4;
                break;
            case "roleSciResCou2":
                num = 3;
                break;
            case "roleSciResCou3":
                num = 3;
                break;
            case "roleSciResCou4":
                num = 2;
                break;
            default:
                num = 0;
        }

        setStandardtTime(num);
    }, [role]);

    useEffect(() => {
        calculateStandardTimeConversionRole();
    }, [calculateStandardTimeConversionRole]);

    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm tham gia hội đồng đánh giá, nghiệm thu đề tài NCKH cấp cơ sở </span>
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
                            <p className='font-medium text-lg'>Tên đề tài NCKH</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập tên đề tài" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Số quyết định</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập số quyết định" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Vai trò</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" onChange={(e) => { setRole(e.target.value); calculateStandardTimeConversionRole(); }}>
                            <option value="">Ấn vào để chọn</option>
                            <option value="roleSciResCou1">1. Chủ tịch Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở</option>
                            <option value="roleSciResCou2">2. Ủy viên thư ký Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở</option>
                            <option value="roleSciResCou3">3. Ủy viên Hội đồng nghiệm thu kết quả đề tài NCKH cấp cơ sở</option>
                            <option value="roleSciResCou4">4. Thành viên Hội đồng đánh giá đề cương đề tài NCKH cấp cơ sở </option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn quy đổi theo vai trò(tạm tính)</p>
                        </div>
                        <input type="text" value={standardTime} className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập số giờ" />
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

export default AddSciResCou