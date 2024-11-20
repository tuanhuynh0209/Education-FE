import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import thư viện xlsx

const Information = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRoleAndData = async () => {
      const userId = localStorage.getItem('userId');
      const isAdminUser = userId === "admin123";
      setIsAdmin(isAdminUser);

      // Fetch users based on role
      try {
        if (isAdminUser) {
          const response = await axios.get('http://localhost:3001/education/users');
          setUsers(response.data);
        } else {
          const response = await axios.get(`http://localhost:3001/education/user/${userId}`);
          setUsers(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserRoleAndData();
  }, []);

  // hàm xóa user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn muốn xóa người dùng này?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/education/deleteUsers/${id}`);
        setUsers(users.filter(user => user.msnv !== id));
        alert("User deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Không thể xóa người dùng vì liên kết khóa ngoại ở các bảng khác");
      }
    }
  };
  // điều hướng
  const handleEditClick = (userId) => {
    navigate(`/func/information/editInf/${userId}`);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  // Hàm export dữ liệu ra file Excel
  const handleExportExcel = () => {
    const data = users.map(user => ({
      "Năm áp dụng": user.nam_ap_dung || "Chưa cập nhật",
      "Họ và tên": user.ho_ten,
      "Mã số viên chức (MSVC)": user.msnv,
      "Cơ sở công tác": user.co_so || "Chưa cập nhật",
      "Đơn vị trực thuộc": user.don_vi || "Chưa cập nhật",
      "Chức danh, trình độ": user.chuc_danh_trinh_do || "Chưa cập nhật",
      "Viên chức cơ hữu": user.vien_chuc_co_huu || "Chưa cập nhật",
      "Giờ NCKH định mức": user.so_gio_nckh_dinh_muc || "Chưa cập nhật",
      "Trường hợp giảm định mức": user.truong_hop_giam_dinh_muc || "Chưa cập nhật",
      "Ngày thuộc trường hợp 3": user.ngay_neu_thuoc_case3 || "Chưa cập nhật",
      "Định mức giờ NCKH": user.dinh_muc_gio_nckh || "Chưa cập nhật",
      "Ghi chú": user.ghi_chu || "Chưa cập nhật"
    }));
    const worksheet = XLSX.utils.json_to_sheet(data); // Convert JSON data thành worksheet
    const workbook = XLSX.utils.book_new(); // Tạo workbook mới
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users"); // Append worksheet vào workbook
    XLSX.writeFile(workbook, "UsersData.xlsx"); // Xuất file Excel với tên "UsersData.xlsx"
  };

  const handlePrint = () => {
    // Lọc hoặc chuẩn bị nội dung cần in
    const printContent = document.getElementById("printableArea");
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: center; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            ${printContent.innerHTML}
        </body>
        </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className='mx-8 bg-orange-400 w-full'>
      <div className='bg-slate-400 w-full relative p-2'>
        <span className='text-3xl font-semibold text-white block text-center break-words pr-20'>
          THÔNG TIN VIÊN CHỨC
        </span>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-4">
          {isAdmin && (
            <button onClick={handleEditClick} className='flex gap-1 font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
              <ModeEditOutlineOutlinedIcon className='text-white' />
            </button>
          )}
          <button
            onClick={handleExportExcel}
            className="flex gap-1 font-semibold text-white bg-blue-500 p-2 rounded-sm"
          >
            <span>Export</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex gap-1 font-semibold text-white bg-green-500 p-2 rounded-sm"
          >
            <span>Print</span>
          </button>

        </div>

      </div>
      <div id="printableArea" className="bg-slate-300 w-full mt-5">
        <table className="table-auto w-full text-center" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr className="bg-gray-800 text-white border-b-2">
              <th className="p-2">Năm áp dụng</th>
              <th className="p-2">Họ và tên</th>
              <th className="p-2">Mã số nhân viên</th>
              <th className="p-2">Cơ sở</th>
              <th className="p-2">Đơn vị</th>
              <th className="p-2">Chỉnh sửa</th>
              {isAdmin && <th className="p-2">Xóa</th>}
              <th className="p-2">Mở rộng</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{user.nam_ap_dung || "Chưa cập nhật"}</td>
                  <td className="p-2">{user.ho_ten}</td>
                  <td className="p-2">{user.msnv}</td>
                  <td className="p-2">{user.co_so || "Chưa cập nhật"}</td>
                  <td className="p-2">{user.don_vi || "Chưa cập nhật"}</td>
                  <td>
                    <button onClick={() => handleEditClick(user.msnv)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                      <ModeEditOutlineOutlinedIcon className='text-white' />
                    </button>
                  </td>

                  {isAdmin && (
                    <td className="p-2">
                      <button onClick={() => handleDelete(user.msnv)} className="bg-red-600 text-white p-2 rounded">
                        <DeleteIcon />
                      </button>
                    </td>
                  )}

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
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Chức danh, trình độ</td>
                            <td className="text-gray-600 py-2">{user.chuc_danh_trinh_do || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Viên chức cơ hữu</td>
                            <td className="text-gray-600 py-2">{user.vien_chuc_co_huu || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số giờ nghiên cứu khoa học định mức trong năm</td>
                            <td className="text-gray-600 py-2">{user.so_gio_nckh_dinh_muc || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Trường hợp giảm định mức</td>
                            <td className="text-gray-600 py-2">{user.truong_hop_giam_dinh_muc || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số ngày nếu thuộc trường hợp 3(Không phải trường hợp 3 bỏ trống)</td>
                            <td className="text-gray-600 py-2">{user.ngay_neu_thuoc_case3 || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Định mức giờ NCKH</td>
                            <td className="text-gray-600 py-2">{user.dinh_muc_gio_nckh || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ghi chú</td>
                            <td className="text-gray-600 py-2">{user.ghi_chu || "Chưa cập nhật"}</td>
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
};

export default Information;
