import React from 'react'

const EditInformation = () => {
  return (
    <div className='mx-8 w-full '>
      <div className='w-full'>
        <span className='text-3xl font-bold'>Chỉnh sửa thông tin cá nhân</span>
        <hr className='my-4 border-gray-300' />
      </div>
      <div className='w-full h-full p-10 bg-white shadow-lg rounded-lg'>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Năm áp dụng</p>
            </div>
            <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
              <option value="">Chọn năm</option>
              {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Họ và tên</p>
            </div>
            <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập họ tên' />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Mã số nhân viên</p>
            </div>
            <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập mã nhân viên' />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Cơ sở</p>
            </div>
            <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
              <option value="">Chọn cơ sở</option>
              <option value="baseInf1">Cơ sở 1</option>
              <option value="baseInf2">Cơ sở 2</option>
              <option value="baseInf3">Cơ sở 3</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Đơn vị</p>
            </div>
            <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
              {/* Các option được giữ nguyên */}

              {/* 63 */}
              <option value="">Chọn đơn vi</option>
              <option value="unitInf1">Ban chuyên gia</option>
              <option value="unitInf2">Ban Giám đốc</option>
              <option value="unitInf3">Đơn vị Can thiệp nội mạch</option>
              <option value="unitInf4">Đơn vị Hình ảnh tim mạch</option>
              <option value="unitInf5">Đơn vị Pháp chế</option>
              <option value="unitInf6">Đơn vị Quản lý đấu thầu</option>
              <option value="unitInf7">Khoa Cấp cứu</option>
              <option value="unitInf8">Khoa Chuẩn đoán hình ảnh</option>
              <option value="unitInf9">Khoa Chấn thương chỉnh hình</option>
              <option value="unitInf10">Khoa Da liễu - Thẩm mỹ da</option>
              <option value="unitInf11">Khoa Dinh dưỡng - Tiết chế</option>
              <option value="unitInf12">Khoa Dược</option>
              <option value="unitInf13">Khoa Gây mê - Hồi sức</option>
              <option value="unitInf14">Khoa Giải phẫu bệnh</option>
              <option value="unitInf15">Khoa Hậu môn - Trực tràng</option>
              <option value="unitInf16">Khoa Hô hấp</option>
              <option value="unitInf17">Khoa Hóa trị ung thư</option>
              <option value="unitInf18">Khoa hồi sức tích cực</option>
              <option value="unitInf19">Khoa Khám bệnh</option>
              <option value="unitInf20">Khoa khám sức khỏe theo yêu cầu</option>
              <option value="unitInf21">Khoa kiểm soát nhiễm khuẩn</option>
              <option value="unitInf22">Khoa Lão - Chăm sóc giảm nhẹ</option>
              <option value="unitInf23">Khoa Lồng ngực mạch máu</option>
              <option value="unitInf24">Khoa Mắt</option>
              <option value="unitInf25">Khoa Ngoại Gan-Mật-Tụy</option>
              <option value="unitInf26">Khoa Ngoại thần kinh</option>
              <option value="unitInf27">Khoa Ngoại tiêu hóa</option>
              <option value="unitInf28">Khoa Niệu học chức năng</option>
              <option value="unitInf29">Khoa Nội cơ xương khớp</option>
              <option value="unitInf30">Khoa Nội soi</option>
              <option value="unitInf31">Khoa Nội thận - Thận nhân tạo</option>
              <option value="unitInf32">Khoa Nội tiết</option>
              <option value="unitInf33">Khoa Nội tim mạch</option>
              <option value="unitInf34">Khoa Phẫu thuật Tim mạch người lớn</option>
              <option value="unitInf35">Khoa Phẫu thuật Tim trẻ em</option>
              <option value="unitInf36">Khoa Phụ sản</option>
              <option value="unitInf37">Khoa Hồi phục chức năng</option>
              <option value="unitInf38">Khoa PTHM-Răng Hàm Mặt</option>
              <option value="unitInf39">Khoa Sơ sinh</option>
              <option value="unitInf40">Khoa Tai Mũi Họng</option>
              <option value="unitInf41">Khoa Tạo hình thẩm mỹ</option>
              <option value="unitInf42">Khoa Thăm dò chức năng Hô hấp</option>
              <option value="unitInf43">Khoa Thần kinh</option>
              <option value="unitInf44">Khoa Tiết niệu</option>
              <option value="unitInf45">Khoa Tiêu hóa</option>
              <option value="unitInf46">Khoa Tim mạch can thiệp</option>
              <option value="unitInf47">Khoa Tuyến vũ</option>
              <option value="unitInf48">Khoa Vi sinh</option>
              <option value="unitInf49">Khoa Xét nghiệm</option>
              <option value="unitInf50">Khoa Y học hạt nhân</option>
              <option value="unitInf51">Phòng Bảo hiểm y tế</option>
              <option value="unitInf52">Phòng Công nghệ thông tin</option>
              <option value="unitInf53">Phòng Công tác xã hội</option>
              <option value="unitInf54">Phòng Điều dưỡng</option>
              <option value="unitInf55">Phòng Hành chính</option>
              <option value="unitInf56">Phòng Kế hoạch tổng hợp</option>
              <option value="unitInf57">Phòng Khoa học & Đào tạo</option>
              <option value="unitInf58">Phòng Quản lý chất lượng bệnh viện</option>
              <option value="unitInf59">Phòng Quản trị tòa nhà</option>
              <option value="unitInf60">Phòng Tài chính kế toán</option>
              <option value="unitInf61">Phòng Tổ chức Cán bộ</option>
              <option value="unitInf62">Phòng Vật tư thiết bị</option>
              <option value="unitInf63">Trung tâm Truyền thông</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Chức danh, trình độ</p>
            </div>
            <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
              <option value="">Chọn chức danh, trình độ</option>
              <option value="levelGS">Giáo sư</option>
              <option value="levelPGS">Phó Giáo sư</option>
              <option value="levelTS">Tiến sĩ</option>
              <option value="levelBSCK">Bác sĩ chuyên khoa cấp 2</option>
              <option value="levelOver">Bác sĩ, Dược sĩ, Điều dưỡng-Kỹ thuật y có bằng Thạc sĩ/ Chuyên khoa cấp I và có hệ số lương ≥ 3.33</option>
              <option value="levelUnder">Bác sĩ, Dược sĩ, Điều dưỡng-Kỹ thuật y có bằng Thạc sĩ/ Chuyên khoa cấp I và có hệ số lương &lt; 3.33</option>
              <option value="levelOther">Bác sĩ hoặc Thạc sĩ các chuyên ngành khác</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Số giờ NCKH định mức trong năm</p>
            </div>
            <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập số giờ' />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Trường hợp giảm định mức</p>
            </div>
            <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
              <option value="">Chọn trường hợp giảm định mức</option>
              <option value="noCaseInf">Không thuộc trường hợp giảm định mức</option>
              <option value="caseInf1">Trường hợp 1</option>
              <option value="caseInf2">Trường hợp 2</option>
              <option value="caseInf3">Trường hợp 3</option>
              <option value="caseInf4">Trường hợp 4</option>
              <option value="caseInf5">Trường hợp 5</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Số ngày nếu thuộc trường hợp 3</p>
            </div>
            <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập số ngày' />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Định mức giờ NCKH</p>
            </div>
            <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập định mức giờ NCKH' />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Ghi chú</p>
            </div>
            <input type="text" className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập ghi chú' />
          </div>
          <div className='w-full flex justify-center mt-6'>
            <button className='bg-[#F9A150] hover:bg-[#e08f40] rounded-lg p-4 text-lg w-fit px-20 font-bold text-white outline-none transition duration-300'>
              Chỉnh sửa thông tin cá nhân
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditInformation
