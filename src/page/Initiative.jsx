import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import axios from 'axios';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const Initiative = () => {

  const navigate = useNavigate();
  const [initatives, setInitative] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // hàm call api lấy data user để lấy tên user
  const fetchEmployeeName = async (msnv) => {
    try {
      const response = await axios.get(`http://localhost:3001/education/users/${msnv}`);
      return response.data.ho_ten;
    } catch (err) {
      console.error(err);
      return '';
    }
  };

  // hàm check user - admin để hiển thị list tương ứng
  useEffect(() => {
    const fetchUserRoleAndData = async () => {
      const userId = localStorage.getItem('userId');
      const isAdminUser = userId === "admin123";
      setIsAdmin(isAdminUser);

      // Fetch users based on role
      try {
        if (isAdminUser) {
          const response = await axios.get("http://localhost:3001/education/getAllInit");
          const initativeWName = await Promise.all(response.data.map(async (init) => {
            const employeeName = await fetchEmployeeName(init.msnv);
            return { ...init, ho_ten: employeeName };
          }));
          setInitative(initativeWName);
        } else {
          const response = await axios.get(`http://localhost:3001/education/getInitOfUser/${userId}`);
          const initativeWName = await Promise.all(response.data.map(async (init) => {
            const employeeName = await fetchEmployeeName(init.msnv);
            return { ...init, ho_ten: employeeName };
          }));
          setInitative(initativeWName);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserRoleAndData();
  }, []);

  // hàm xóa tài liệu
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn muốn xóa bài đăng này?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/education/deleteInit/${id}`);
        setInitative(initatives.filter(init => init.ma_sang_kien !== id));
        alert("Initiative deleted successfully");
      } catch (err) {
        console.error(err);
      }
    }
  };
  // điều hướng
  const handleAddClick = () => {
    navigate('/func/Initiative/addInitiative');
  };
  const handleEditClick = (initId) => {
    navigate(`/func/initiative/editInitiative/${initId}`);
  };
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // Kiểm tra trạng thái đăng nhập
  }, []);

  return (
    <div className="mx-8 bg-orange-400 w-full">
      <div className="bg-slate-400 w-full relative p-2">
        <span className="text-3xl font-semibold text-white block text-center break-words pr-20">
          SÁNG KIẾN CẢI TIẾN KỸ THUẬT CẤP BỆNH VIỆN
        </span>
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-1 font-semibold text-white bg-[#F9A150] p-2 rounded-sm"
          >
            <span>Thêm</span>
            <LibraryAddOutlinedIcon className="text-white" />
          </button>
        )}
      </div>
      <div className="bg-slate-300 w-full mt-5">
        <table className="table-auto w-full text-center" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr className="bg-gray-800 text-white border-b-2">
              <th className="p-2">STT</th>
              <th className="p-2">Họ và tên</th>
              <th className="p-2">Mã số nhân viên</th>
              <th className="p-2">Hoạt động</th>
              <th className="p-2">Tên công trình, sáng kiến đã được công nhận</th>
              <th className="p-2">Chỉnh sửa</th>
              <th className="p-2">Xóa</th>
              <th className="p-2">Mở rộng</th>
            </tr>
          </thead>
          <tbody>
            {initatives.map((initiative, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{initiative.ho_ten || "Chưa cập nhật"}</td>
                  <td className="p-2">{initiative.msnv || "Chưa cập nhật"}</td>
                  <td className="p-2">{initiative.hoat_dong || "Chưa cập nhật"}</td>
                  <td className="p-2">{initiative.ten_cong_trinh || "Chưa cập nhật"}</td>
                  <td>
                    <button onClick={() => handleEditClick(initiative.ma_sang_kien)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                      <ModeEditOutlineOutlinedIcon className='text-white' />
                    </button>
                  </td>

                  <td className="p-2">
                    <button onClick={() => handleDelete(initiative.ma_sang_kien)} className="bg-red-600 text-white p-2 rounded">
                      <DeleteIcon />
                    </button>
                  </td>
                  <td className="p-2">
                    <button onClick={() => toggleExpand(index)}>
                      {expandedIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                    </button>
                  </td>
                </tr>
                <tr className={`transition-all duration-300 ${expandedIndex === index ? '' : 'hidden'}`}>

                  <td className="p-4" colSpan="7">
                    <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                      <table className="table-auto w-full text-left">
                        <tbody>
                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Mã số chứng nhận (theo quyết định công nhận)</td>
                            <td className="text-gray-600 py-2">{initiative.ma_so_chung_nhan || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{initiative.ngay || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Lợi ích mang lại cho Bệnh viện</td>
                            <td className="text-gray-600 py-2">{initiative.loi_ich || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số tiền lợi ích kinh tế mang lại cho Bệnh viện
                              (đơn vị tính: trăm triệu)</td>
                            <td className="text-gray-600 py-2">{initiative.so_tien_loi_ich || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn hoạt động</td>
                            <td className="text-gray-600 py-2">{initiative.gio_chuan_hoat_dong || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỷ lệ tham gia đóng góp (căn cứ theo hồ sơ)</td>
                            <td className="text-gray-600 py-2">{initiative.ty_le_dong_gop || "Chưa cập nhật"}</td>
                          </tr>
                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò(tạm tính)</td>
                            <td className="text-gray-600 py-2">{initiative.gio_quy_doi || "Chưa cập nhật"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>

                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Initiative;
