import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import axios from 'axios';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const ScientificResearchCouncil = () => {

  const navigate = useNavigate();
  const [council, setCouncil] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const fetchEmployeeName = async (msnv) => {
    try {
      const response = await axios.get(`http://localhost:3001/education/users/${msnv}`);
      return response.data.ho_ten;
    } catch (err) {
      console.error(err);
    }
  }
  // check tk admin
  useEffect(() => {
    const fetchUserRole = () => {
      const userId = localStorage.getItem('userId');
      // Kiểm tra nếu username là admin
      setIsAdmin(userId === "admin123");
    };

    fetchUserRole();
  }, []);

  // hàm check user - admin để hiển thị list tương ứng
  useEffect(() => {
    const fetchUserRoleAndData = async () => {
      const userId = localStorage.getItem('userId');
      const isAdminUser = userId === "admin123";
      setIsAdmin(isAdminUser);

      // Fetch users based on role
      try {
        if (isAdminUser) {
          const response = await axios.get("http://localhost:3001/education/getAllCouncil");
          const councilWName = await Promise.all(response.data.map(async (cou) => {
            const employeeName = await fetchEmployeeName(cou.msnv);
            return { ...cou, ho_ten: employeeName };
          }));
          setCouncil(councilWName);
        } else {
          const response = await axios.get(`http://localhost:3001/education/getCouOfUser/${userId}`);
          const councilWName = await Promise.all(response.data.map(async (cou) => {
            const employeeName = await fetchEmployeeName(cou.msnv);
            return { ...cou, ho_ten: employeeName };
          }));
          setCouncil(councilWName);
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
        await axios.delete(`http://localhost:3001/education/deleteCou/${id}`);
        setCouncil(council.filter(cou => cou.ma_hoi_dong !== id));
        alert("Council deleted successfully");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddClick = () => {
    navigate('/func/scientificResearchCouncil/addSciResCou');
  };
  const handleEditClick = (couId) => {
    navigate(`/func/scientificResearchCouncil/editSciResCou/${couId}`);
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
          THAM GIA HỘI ĐỒNG ĐÁNH GIÁ, NGHIỆM THU ĐỀ TÀI NCKH CẤP CƠ SỞ
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
              <th className="p-2">Mã hội đồng</th>
              <th className="p-2">Tên đề tài NCKH</th>
              <th className="p-2">Chỉnh sửa</th>
              <th className="p-2">Xóa</th>
              <th className="p-2">Mở rộng</th>
            </tr>
          </thead>
          <tbody>
            {council.map((scientificResCou, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificResCou.ho_ten}</td>
                  <td className="p-2">{scientificResCou.msnv}</td>
                  <td className="p-2">{scientificResCou.ma_hoi_dong || "Chưa cập nhật"}</td>
                  <td className="p-2">{scientificResCou.ten_de_tai || "Chưa cập nhật"}</td>
                  <td>
                    <button onClick={() => handleEditClick(scientificResCou.ma_hoi_dong)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                      <ModeEditOutlineOutlinedIcon className='text-white' />
                    </button>
                  </td>

                  <td className="p-2">
                    <button onClick={() => handleDelete(scientificResCou.ma_hoi_dong)} className="bg-red-600 text-white p-2 rounded">
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
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Số quyết định</td>
                            <td className="text-gray-600 py-2">{scientificResCou.so_quyet_dinh || "Chưa cập nhật"}</td>
                          </tr>
                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificResCou.ngay || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Vai trò</td>
                            <td className="text-gray-600 py-2">{scientificResCou.vai_tro || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò</td>
                            <td className="text-gray-600 py-2">{scientificResCou.gio_quy_doi || "Chưa cập nhật"}</td>
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

export default ScientificResearchCouncil;
