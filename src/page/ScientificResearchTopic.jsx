import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import axios from 'axios';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx'; // Import thư viện xlsx
const ScientificResearchTopic = () => {

  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [topics, setTopics] = useState([]);
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
          const response = await axios.get("http://localhost:3001/education/getAllTopics");
          const topicWName = await Promise.all(response.data.map(async (tpc) => {
            const employeeName = await fetchEmployeeName(tpc.msnv);
            return { ...tpc, ho_ten: employeeName };
          }));
          setTopics(topicWName);
        } else {
          const response = await axios.get(`http://localhost:3001/education/getTpcOfUser/${userId}`);
          const topicWName = await Promise.all(response.data.map(async (tpc) => {
            const employeeName = await fetchEmployeeName(tpc.msnv);
            return { ...tpc, ho_ten: employeeName };
          }));
          setTopics(topicWName);
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
        await axios.delete(`http://localhost:3001/education/deleteSciTpc/${id}`);
        setTopics(topics.filter(tpc => tpc.ma_de_tai !== id));
        alert("Topic deleted successfully");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddClick = () => {
    navigate('/func/scientificResearchTopic/addSciResTpc');
  };
  const handleEditClick = (tpcId) => {
    navigate(`/func/scientificResearchTopic/editSciResTpc/${tpcId}`);
  };
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // Kiểm tra trạng thái đăng nhập
  }, []);

  // Xuất dữ liệu ra file Excel
  const exportToExcel = () => {
    // Dữ liệu cần xuất
    const formattedData = topics.map((topic, index) => ({
      "STT": index + 1,
      "Họ và tên": topic.ho_ten || "Chưa cập nhật",
      "Mã số nhân viên": topic.msnv || "Chưa cập nhật",
      "Mã đề tài": topic.ma_de_tai || "Chưa cập nhật",
      "Tên đề tài": topic.ten_de_tai || "Chưa cập nhật",
      "Hoạt động": topic.hoat_dong || "Chưa cập nhật",
      "Phạm vi, cấp độ": topic.pham_vi_cap_do || "Chưa cập nhật",
      "Mã số hợp đồng": topic.ma_so_hop_dong || "Chưa cập nhật",
      "Ngày": topic.ngay || "Chưa cập nhật",
      "Giờ chuẩn hoạt động": topic.gio_chuan_hoat_dong || "Chưa cập nhật",
      "Vai trò": topic.vai_tro || "Chưa cập nhật",
      "Số lượng thành viên cùng vai trò": topic.so_luong_thanh_vien_vai_tro || "Chưa cập nhật",
      "Tỉ lệ đóng góp": topic.ty_le_dong_gop || "Chưa cập nhật",
      "Giờ chuẩn quy đổi theo vai trò": topic.gio_quy_doi || "Chưa cập nhật",
    }));

    // Tạo workbook và worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "NghienCuuDeTai");

    // Xuất file Excel
    XLSX.writeFile(workbook, "NghienCuuDeTai.xlsx");
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
    <div className="mx-8 bg-orange-400 w-full">
      <div className="bg-slate-400 w-full relative p-2">
        <span className="text-3xl font-semibold text-white block text-center break-words pr-20">
          ĐỀ TÀI NGHIÊN CỨU KHOA HỌC
        </span>
        {isLoggedIn && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-4">
            <button
              onClick={handleAddClick}
              className="flex gap-1 font-semibold text-white bg-[#F9A150] p-2 rounded-sm"
            >
              <LibraryAddOutlinedIcon className="text-white" />
            </button>
            <button
              onClick={exportToExcel}
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
        )}
      </div>

      <div id='printableArea' className="bg-slate-300 w-full mt-5">
        <table className="table-auto w-full text-center" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr className="bg-gray-800 text-white border-b-2">
              <th className="p-2">STT</th>
              <th className="p-2">Họ và tên</th>
              <th className="p-2">Mã số nhân viên</th>
              <th className="p-2">Mã nghiên cứu đề tài</th>
              <th className="p-2">Tên đề tài/ đề cương NCKH</th>
              <th className="p-2">Chỉnh sửa</th>
              <th className="p-2">Xóa</th>
              <th className="p-2">Mở rộng</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((scientificResTpc, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificResTpc.ho_ten}</td>
                  <td className="p-2">{scientificResTpc.msnv}</td>
                  <td className="p-2">{scientificResTpc.ma_de_tai}</td>
                  <td className="p-2">{scientificResTpc.ten_de_tai}</td>
                  <td>
                    <button onClick={() => handleEditClick(scientificResTpc.ma_de_tai)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                      <ModeEditOutlineOutlinedIcon className='text-white' />
                    </button>
                  </td>

                  <td className="p-2">
                    <button onClick={() => handleDelete(scientificResTpc.ma_de_tai)} className="bg-red-600 text-white p-2 rounded">
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
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Hoạt động</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.hoat_dong}</td>
                          </tr>
                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Phạm vi, cấp độ</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.pham_vi_cap_do}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Mã số hợp đồng</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.ma_so_hop_dong}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.ngay}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn hoạt động</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.gio_chuan_hoat_dong}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Vai trò</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.vai_tro}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số lượng thành viên cùng vai trò</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.so_luong_thanh_vien_vai_tro}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỉ lệ đóng góp</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.ty_le_dong_gop}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.gio_quy_doi}</td>
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

export default ScientificResearchTopic;
