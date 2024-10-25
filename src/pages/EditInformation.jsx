import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EditInformation = () => {
  const units = [
    { value: "Ban chuyên gia", label: "Ban chuyên gia" },
    { value: "Ban Giám đốc", label: "Ban Giám đốc" },
    { value: "Đơn vị Can thiệp nội mạch", label: "Đơn vị Can thiệp nội mạch" },
    { value: "Đơn vị Hình ảnh tim mạch", label: "Đơn vị Hình ảnh tim mạch" },
    { value: "Đơn vị Pháp chế", label: "Đơn vị Pháp chế" },
    { value: "Đơn vị Quản lý đấu thầu", label: "Đơn vị Quản lý đấu thầu" },
    { value: "Khoa Cấp cứu", label: "Khoa Cấp cứu" },
    { value: "Khoa Chuẩn đoán hình ảnh", label: "Khoa Chuẩn đoán hình ảnh" },
    { value: "Khoa Chấn thương chỉnh hình", label: "Khoa Chấn thương chỉnh hình" },
    { value: "Khoa Da liễu - Thẩm mỹ da", label: "Khoa Da liễu - Thẩm mỹ da" },
    { value: "Khoa Dinh dưỡng - Tiết chế", label: "Khoa Dinh dưỡng - Tiết chế" },
    { value: "Khoa Dược", label: "Khoa Dược" },
    { value: "Khoa Gây mê - Hồi sức", label: "Khoa Gây mê - Hồi sức" },
    { value: "Khoa Giải phẫu bệnh", label: "Khoa Giải phẫu bệnh" },
    { value: "Khoa Hậu môn - Trực tràng", label: "Khoa Hậu môn - Trực tràng" },
    { value: "Khoa Hô hấp", label: "Khoa Hô hấp" },
    { value: "Khoa Hóa trị ung thư", label: "Khoa Hóa trị ung thư" },
    { value: "Khoa hồi sức tích cực", label: "Khoa hồi sức tích cực" },
    { value: "Khoa Khám bệnh", label: "Khoa Khám bệnh" },
    { value: "Khoa khám sức khỏe theo yêu cầu", label: "Khoa khám sức khỏe theo yêu cầu" },
    { value: "Khoa kiểm soát nhiễm khuẩn", label: "Khoa kiểm soát nhiễm khuẩn" },
    { value: "Khoa Lão - Chăm sóc giảm nhẹ", label: "Khoa Lão - Chăm sóc giảm nhẹ" },
    { value: "Khoa Lồng ngực mạch máu", label: "Khoa Lồng ngực mạch máu" },
    { value: "Khoa Mắt", label: "Khoa Mắt" },
    { value: "Khoa Ngoại Gan-Mật-Tụy", label: "Khoa Ngoại Gan-Mật-Tụy" },
    { value: "Khoa Ngoại thần kinh", label: "Khoa Ngoại thần kinh" },
    { value: "Khoa Ngoại tiêu hóa", label: "Khoa Ngoại tiêu hóa" },
    { value: "Khoa Niệu học chức năng", label: "Khoa Niệu học chức năng" },
    { value: "Khoa Nội cơ xương khớp", label: "Khoa Nội cơ xương khớp" },
    { value: "Khoa Nội soi", label: "Khoa Nội soi" },
    { value: "Khoa Nội thận - Thận nhân tạo", label: "Khoa Nội thận - Thận nhân tạo" },
    { value: "Khoa Nội tiết", label: "Khoa Nội tiết" },
    { value: "Khoa Nội tim mạch", label: "Khoa Nội tim mạch" },
    { value: "Khoa Phẫu thuật Tim mạch người lớn", label: "Khoa Phẫu thuật Tim mạch người lớn" },
    { value: "Khoa Phẫu thuật Tim trẻ em", label: "Khoa Phẫu thuật Tim trẻ em" },
    { value: "Khoa Phụ sản", label: "Khoa Phụ sản" },
    { value: "Khoa Hồi phục chức năng", label: "Khoa Hồi phục chức năng" },
    { value: "Khoa PTHM-Răng Hàm Mặt", label: "Khoa PTHM-Răng Hàm Mặt" },
    { value: "Khoa Sơ sinh", label: "Khoa Sơ sinh" },
    { value: "Khoa Tai Mũi Họng", label: "Khoa Tai Mũi Họng" },
    { value: "Khoa Tạo hình thẩm mỹ", label: "Khoa Tạo hình thẩm mỹ" },
    { value: "Khoa Thăm dò chức năng Hô hấp", label: "Khoa Thăm dò chức năng Hô hấp" },
    { value: "Khoa Thần kinh", label: "Khoa Thần kinh" },
    { value: "Khoa Tiết niệu", label: "Khoa Tiết niệu" },
    { value: "Khoa Tiêu hóa", label: "Khoa Tiêu hóa" },
    { value: "Khoa Tim mạch can thiệp", label: "Khoa Tim mạch can thiệp" },
    { value: "Khoa Tuyến vũ", label: "Khoa Tuyến vũ" },
    { value: "Khoa Vi sinh", label: "Khoa Vi sinh" },
    { value: "Khoa Xét nghiệm", label: "Khoa Xét nghiệm" },
    { value: "Khoa Y học hạt nhân", label: "Khoa Y học hạt nhân" },
    { value: "Phòng Bảo hiểm y tế", label: "Phòng Bảo hiểm y tế" },
    { value: "Phòng Công nghệ thông tin", label: "Phòng Công nghệ thông tin" },
    { value: "Phòng Công tác xã hội", label: "Phòng Công tác xã hội" },
    { value: "Phòng Điều dưỡng", label: "Phòng Điều dưỡng" },
    { value: "Phòng Hành chính", label: "Phòng Hành chính" },
    { value: "Phòng Kế hoạch tổng hợp", label: "Phòng Kế hoạch tổng hợp" },
    { value: "Phòng Khoa học & Đào tạo", label: "Phòng Khoa học & Đào tạo" },
    { value: "Phòng Quản lý chất lượng bệnh viện", label: "Phòng Quản lý chất lượng bệnh viện" },
    { value: "Phòng Quản trị tòa nhà", label: "Phòng Quản trị tòa nhà" },
    { value: "Phòng Tài chính kế toán", label: "Phòng Tài chính kế toán" },
    { value: "Phòng Tổ chức Cán bộ", label: "Phòng Tổ chức Cán bộ" },
    { value: "Phòng Vật tư thiết bị", label: "Phòng Vật tư thiết bị" },
    { value: "Trung tâm Truyền thông", label: "Trung tâm Truyền thông" }
  ];

  const [formData, setFormData] = useState({
    nam_ap_dung: 0,
    ho_ten: '',
    // msvn: '',
    co_so: '',
    don_vi: '',
    vien_chuc_co_huu: '',
    chuc_danh_trinh_do: '',
    so_gio_nckh_dinh_muc: 0,
    truong_hop_giam_dinh_muc: '',
    ngay_neu_thuoc_case3: 0,
    dinh_muc_gio_nckh: 0,
    ghi_chu: '',
    // mat_khau: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  useEffect(() => {
    const fetchOldData = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:3001/education/users/${userId}`);
        setFormData(response.data); // Điền dữ liệu cũ vào form
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOldData();
  }, []);

  // nút edit của user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // Lấy userId từ storage
    if (!userId) {
      console.error('User ID not found');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:3001/education/addInf/${userId}`, formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className='mx-8 w-full'>
      <div className='w-full'>
        <span className='text-3xl font-bold'>Thêm thông tin cá nhân</span>
        <hr className='my-4 border-gray-300' />
      </div>
      <form onSubmit={handleSubmit} className='w-full h-full p-10 bg-white shadow-lg rounded-lg'>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Năm áp dụng</p>
            </div>
            <select
              name="nam_ap_dung"
              value={formData.nam_ap_dung}
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
              name="ho_ten"
              value={formData.ho_ten}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
              placeholder='Nhập họ tên'
            />
          </div>

          {/* Cơ sở */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Cơ sở</p>
            </div>
            <select
              name="co_so"
              value={formData.co_so}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
            >
              <option value="">Chọn cơ sở</option>
              <option value="Cơ sở 1">Cơ sở 1</option>
              <option value="Cơ sở 2">Cơ sở 2</option>
              <option value="Cơ sở 3">Cơ sở 3</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Đơn vị</p>
            </div>
            <select
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300"
              name='don_vi'
              value={formData.don_vi}
              onChange={handleInputChange}>
              <option value="">Chọn đơn vị</option>
              {units.map((unit) => (
                <option key={unit.value} value={unit.label}>{unit.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Viên chức cơ hữu</p>
            </div>
            <select
              name="vien_chuc_co_huu"
              value={formData.vien_chuc_co_huu}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
              <option value="">Chọn thông tin</option>
              <option value="Viên chức hữu cơ UMC">Viên chức hữu cơ UMC</option>
              <option value="Giảng viên hữu cơ UMP">Giảng viên hữu cơ UMP</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Chức danh, trình độ</p>
            </div>
            <select
              name="chuc_danh_trinh_do"
              value={formData.chuc_danh_trinh_do}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
              <option value="">Chọn chức danh, trình độ</option>
              <option value="Giáo sư">Giáo sư</option>
              <option value="Phó Giáo sư">Phó Giáo sư</option>
              <option value="Tiến sĩ">Tiến sĩ</option>
              <option value="Bác sĩ chuyên khoa cấp 2">Bác sĩ chuyên khoa cấp 2</option>
              <option value="Bác sĩ, Dược sĩ, Điều dưỡng-Kỹ thuật y có bằng Thạc sĩ/ Chuyên khoa cấp I và có hệ số lương ≥ 3.33">Bác sĩ, Dược sĩ, Điều dưỡng-Kỹ thuật y có bằng Thạc sĩ/ Chuyên khoa cấp I và có hệ số lương ≥ 3.33</option>
              <option value="Bác sĩ, Dược sĩ, Điều dưỡng-Kỹ thuật y có bằng Thạc sĩ/ Chuyên khoa cấp I và có hệ số lương &lt; 3.33">Bác sĩ, Dược sĩ, Điều dưỡng-Kỹ thuật y có bằng Thạc sĩ/ Chuyên khoa cấp I và có hệ số lương &lt; 3.33</option>
              <option value="Bác sĩ hoặc Thạc sĩ các chuyên ngành khác">Bác sĩ hoặc Thạc sĩ các chuyên ngành khác</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Số giờ NCKH định mức trong năm</p>
            </div>
            <input
              type="text"
              name="so_gio_nckh_dinh_muc"
              value={formData.so_gio_nckh_dinh_muc}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập số giờ' />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Trường hợp giảm định mức</p>
            </div>
            <select
              name="truong_hop_giam_dinh_muc"
              value={formData.truong_hop_giam_dinh_muc}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300">
              <option value="">Chọn trường hợp giảm định mức</option>
              <option value="Không thuộc trường hợp giảm định mức">Không thuộc trường hợp giảm định mức</option>
              <option value="Trường hợp 1">Trường hợp 1</option>
              <option value="Trường hợp 2">Trường hợp 2</option>
              <option value="Trường hợp 3">Trường hợp 3</option>
              <option value="Trường hợp 4">Trường hợp 4</option>
              <option value="Trường hợp 5">Trường hợp 5</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Số ngày nếu thuộc trường hợp 3</p>
            </div>
            <input
              type="text"
              name="ngay_neu_thuoc_case3"
              value={formData.ngay_neu_thuoc_case3}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập số ngày' />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Định mức giờ NCKH</p>
            </div>
            <input
              type="text"
              name="dinh_muc_gio_nckh"
              value={formData.dinh_muc_gio_nckh}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập định mức giờ NCKH' />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className='font-medium text-lg'>Ghi chú</p>
            </div>
            <input
              type="text"
              name="ghi_chu"
              value={formData.ghi_chu}
              onChange={handleInputChange}
              className="bg-slate-100 rounded-lg p-4 outline-none border border-gray-300" placeholder='Nhập ghi chú' />
          </div>
          <div className='w-full flex justify-center mt-6'>
            <button className='bg-[#F9A150] hover:bg-[#e08f40] rounded-lg p-4 text-lg w-fit px-20 font-bold text-white outline-none transition duration-300'>
              Hoàn tất
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditInformation
