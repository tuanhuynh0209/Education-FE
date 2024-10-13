import React from 'react';

const AddScientificCfs = () => {
    return (
        <div className='mx-8 w-full'>
            <div className='w-full'>
                <span className='text-3xl font-bold'>Thêm tham gia hội nghị khoa học</span>
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
                            <p className='font-medium text-lg'>Hoạt động đã đạt</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
                            <option value="">Ấn vào để chọn</option>
                            <option value="actionSciCfs1">Giấy chứng nhận sáng chế độc quyền (patent)</option>
                            <option value="actionSciCfs2">Giấy chứng nhận giải pháp hữu ích</option> 
                            <option value="actionSciCfs3">Giấy chứng nhận đăng ký nhãn hiệu sản phẩm phát triển từ đề tài NCKH</option>
                            <option value="actionSciCfs4">Giấy chứng nhận giải pháp hữu ích</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tên sản phẩm, giải pháp, nhãn hiệu đã được cấp chứng nhận hoặc giới thiệu tại hội chợ, triển lãm</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập thông tin" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Đơn vị cấp chứng nhận, tổ chức</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập đơn vị" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Minh chứng</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder="Nhập minh chứng" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Phạm vi</p>
                        </div>
                        <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
                            <option value="">Ấn vào để chọn</option>
                            <option value="rangeIn">Trong nước</option>
                            <option value="rangeOut">Quốc tế</option> 
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Ngày</p>
                        </div>
                        <input type="date" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Giờ chuẩn hoạt động</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập giờ chuẩn'/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <p className='font-medium text-lg'>Tỷ lệ đóng góp theo hồ sơ</p>
                        </div>
                        <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập số liệu'/>
                    </div>

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

export default AddScientificCfs