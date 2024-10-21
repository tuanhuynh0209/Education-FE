import axios from 'axios'
import React, { useState } from 'react'

const EditInformation = () => {
  const units = [
    { value: "unitInf1", label: "Ban chuyên gia" },
    { value: "unitInf2", label: "Ban Giám đốc" },
    { value: "unitInf3", label: "Đơn vị Can thiệp nội mạch" },
    { value: "unitInf4", label: "Đơn vị Hình ảnh tim mạch" },
    { value: "unitInf5", label: "Đơn vị Pháp chế" },
    { value: "unitInf6", label: "Đơn vị Quản lý đấu thầu" },
    { value: "unitInf7", label: "Khoa Cấp cứu" },
    { value: "unitInf8", label: "Khoa Chuẩn đoán hình ảnh" },
    { value: "unitInf9", label: "Khoa Chấn thương chỉnh hình" },
    { value: "unitInf10", label: "Khoa Da liễu - Thẩm mỹ da" },
    { value: "unitInf11", label: "Khoa Dinh dưỡng - Tiết chế" },
    { value: "unitInf12", label: "Khoa Dược" },
    { value: "unitInf13", label: "Khoa Gây mê - Hồi sức" },
    { value: "unitInf14", label: "Khoa Giải phẫu bệnh" },
    { value: "unitInf15", label: "Khoa Hậu môn - Trực tràng" },
    { value: "unitInf16", label: "Khoa Hô hấp" },
    { value: "unitInf17", label: "Khoa Hóa trị ung thư" },
    { value: "unitInf18", label: "Khoa hồi sức tích cực" },
    { value: "unitInf19", label: "Khoa Khám bệnh" },
    { value: "unitInf20", label: "Khoa khám sức khỏe theo yêu cầu" },
    { value: "unitInf21", label: "Khoa kiểm soát nhiễm khuẩn" },
    { value: "unitInf22", label: "Khoa Lão - Chăm sóc giảm nhẹ" },
    { value: "unitInf23", label: "Khoa Lồng ngực mạch máu" },
    { value: "unitInf24", label: "Khoa Mắt" },
    { value: "unitInf25", label: "Khoa Ngoại Gan-Mật-Tụy" },
    { value: "unitInf26", label: "Khoa Ngoại thần kinh" },
    { value: "unitInf27", label: "Khoa Ngoại tiêu hóa" },
    { value: "unitInf28", label: "Khoa Niệu học chức năng" },
    { value: "unitInf29", label: "Khoa Nội cơ xương khớp" },
    { value: "unitInf30", label: "Khoa Nội soi" },
    { value: "unitInf31", label: "Khoa Nội thận - Thận nhân tạo" },
    { value: "unitInf32", label: "Khoa Nội tiết" },
    { value: "unitInf33", label: "Khoa Nội tim mạch" },
    { value: "unitInf34", label: "Khoa Phẫu thuật Tim mạch người lớn" },
    { value: "unitInf35", label: "Khoa Phẫu thuật Tim trẻ em" },
    { value: "unitInf36", label: "Khoa Phụ sản" },
    { value: "unitInf37", label: "Khoa Hồi phục chức năng" },
    { value: "unitInf38", label: "Khoa PTHM-Răng Hàm Mặt" },
    { value: "unitInf39", label: "Khoa Sơ sinh" },
    { value: "unitInf40", label: "Khoa Tai Mũi Họng" },
    { value: "unitInf41", label: "Khoa Tạo hình thẩm mỹ" },
    { value: "unitInf42", label: "Khoa Thăm dò chức năng Hô hấp" },
    { value: "unitInf43", label: "Khoa Thần kinh" },
    { value: "unitInf44", label: "Khoa Tiết niệu" },
    { value: "unitInf45", label: "Khoa Tiêu hóa" },
    { value: "unitInf46", label: "Khoa Tim mạch can thiệp" },
    { value: "unitInf47", label: "Khoa Tuyến vũ" },
    { value: "unitInf48", label: "Khoa Vi sinh" },
    { value: "unitInf49", label: "Khoa Xét nghiệm" },
    { value: "unitInf50", label: "Khoa Y học hạt nhân" },
    { value: "unitInf51", label: "Phòng Bảo hiểm y tế" },
    { value: "unitInf52", label: "Phòng Công nghệ thông tin" },
    { value: "unitInf53", label: "Phòng Công tác xã hội" },
    { value: "unitInf54", label: "Phòng Điều dưỡng" },
    { value: "unitInf55", label: "Phòng Hành chính" },
    { value: "unitInf56", label: "Phòng Kế hoạch tổng hợp" },
    { value: "unitInf57", label: "Phòng Khoa học & Đào tạo" },
    { value: "unitInf58", label: "Phòng Quản lý chất lượng bệnh viện" },
    { value: "unitInf59", label: "Phòng Quản trị tòa nhà" },
    { value: "unitInf60", label: "Phòng Tài chính kế toán" },
    { value: "unitInf61", label: "Phòng Tổ chức Cán bộ" },
    { value: "unitInf62", label: "Phòng Vật tư thiết bị" },
    { value: "unitInf63", label: "Trung tâm Truyền thông" }
  ];

  const [formData, setFormData] = useState({
    year: '',
    fullName: '',
    employeeId: '',
    base: '',
    unit: '',
    official: '',
    level: '',
    researchHours: '',
    caseReduction: '',
    caseDays: '',
    researchQuota: '',
    note: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData)
      console.log('Response:', response.data)
      // Xử lý kết quả sau khi gửi thành công
    } catch (error) {
      console.error('Error:', error)
      // Xử lý lỗi
    }
  }
  return (
    <div className='mx-8 w-full '>
      <div className='w-full'>
        <span className='text-3xl font-bold'>Thêm thông tin cá nhân</span>
        <hr className='my-4 border-gray-300' />
      </div>
      <div className='w-full h-full p-10 bg-white shadow-lg rounded-lg'>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Năm áp dụng</p>
            </div>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
            >
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
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
              placeholder='Nhập họ tên'
            />
          </div>

          {/* Mã số nhân viên */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Mã số nhân viên</p>
            </div>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
              placeholder='Nhập mã nhân viên'
            />
          </div>

          {/* Cơ sở */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Cơ sở</p>
            </div>
            <select
              name="base"
              value={formData.base}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
            >
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
            <select
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
              name='unit'
              value={formData.unit}
              onChange={handleInputChange}>
              <option value="">Chọn đơn vị</option>
              {units.map((unit) => (
                <option key={unit.value} value={unit.value}>{unit.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Viên chức cơ hữu</p>
            </div>
            <select className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
              <option value="">Chọn thông tin</option>
              <option value="caseUMC">Viên chức hữu cơ UMC</option>
              <option value="caseUMP">Giảng viên hữu cơ UMP</option>
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
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditInformation
