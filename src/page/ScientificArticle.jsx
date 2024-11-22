import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import thư viện xlsx
// lọc những bài báo khoa học => lấy msnv lưu trong localStorgre để so sánh với list bài báo khoa học để lọc hiển thị theo các bài bóa của user
const ScientificArticle = () => {

  const navigate = useNavigate();
  const [articles, setArticle] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const fetchEmployeeName = async (msnv) => {
    try {
      const response = await axios.get(`http://localhost:3001/education/users/${msnv}`);
      return response.data.ho_ten;
    } catch (err) {
      console.error(err);
      return '';
    }
  };
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
          const response = await axios.get("http://localhost:3001/education/getAllSciArt");
          const articleWName = await Promise.all(response.data.map(async (article) => {
            const employeeName = await fetchEmployeeName(article.msnv);
            return { ...article, ho_ten: employeeName };
          }));
          setArticle(articleWName);
        } else {
          const response = await axios.get(`http://localhost:3001/education/getArtOfUser/${userId}`);
          const articleWName = await Promise.all(response.data.map(async (article) => {
            const employeeName = await fetchEmployeeName(article.msnv);
            return { ...article, ho_ten: employeeName };
          }));
          setArticle(articleWName);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserRoleAndData();
  }, []);

  // hàm xóa tài liệu
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn muốn xóa bài báo khoa học này?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/education/deleteSciArt/${id}`);
        setArticle(articles.filter(article => article.ma_bai_bao !== id));
        alert("Xóa bài báo khoa học thành công");
      } catch (err) {
        console.error(err);
        alert("Không thể xóa bài báo khoa học");
      }
    }
  };

  const handleAddClick = () => {
    navigate('/func/scientificArticle/addSciArt');
  };
  const handleEditClick = (artId) => {
    navigate(`/func/scientificArticle/editSciArt/${artId}`);
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
    const formattedData = articles.map((article, index) => ({
      "STT": index + 1,
      "Họ và tên": article.ho_ten || "Chưa cập nhật",
      "Mã số nhân viên": article.msnv || "Chưa cập nhật",
      "Mã bài báo": article.ma_bai_bao || "Chưa cập nhật",
      "Tên bài báo": article.ten_bai_bao || "Chưa cập nhật",
      "Hoạt động": article.hoat_dong || "Chưa cập nhật",
      "DOI, minh chứng bài báo": article.doi || "Chưa cập nhật",
      "Ngày": article.ngay || "Chưa cập nhật",
      "Tên tạp chí": article.ten_tap_chi || "Chưa cập nhật",
      "Nhà xuất bản": article.ten_nha_xuat_ban || "Chưa cập nhật",
      "Ngôn ngữ": article.ngon_ngu || "Chưa cập nhật",
      "Phạm vi, cấp độ": article.pham_vi_cap_do || "Chưa cập nhật",
      "Impact Factor": article.impact_factor || "Chưa cập nhật",
      "Giờ chuẩn hoạt động": article.gio_chuan_hoat_dong || "Chưa cập nhật",
      "Vai trò": article.vai_tro || "Chưa cập nhật",
      "Tổng số thành viên cùng vai trò": article.tong_so_thanh_vien || "Chưa cập nhật",
      "Tống số tác giả	": article.tong_so_tac_gia || "Chưa cập nhật",
      "Tỷ lệ đóng góp": article.ty_le_dong_gop || "Chưa cập nhật",
      "Giờ quy đổi": article.gio_quy_doi || "Chưa cập nhật"
    }));

    // Tạo workbook và worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BaiBaoKhoaHoc");

    // Xuất file Excel
    XLSX.writeFile(workbook, "BaiBaoKhoaHoc.xlsx");
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
          BÀI BÁO KHOA HỌC
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
              <th className="p-2">Mã bài báo khoa học</th>
              <th className="p-2">Tên bài báo khoa học</th>
              <th className="p-2">Chỉnh sửa</th>
              <th className="p-2">Xóa</th>
              <th className="p-2">Mở rộng</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((scientificArt, index) => (
              <React.Fragment key={index}>
                <tr className="bg-[#4682B4] text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificArt.ho_ten}</td>
                  <td className="p-2">{scientificArt.msnv}</td>
                  <td className="p-2">{scientificArt.ma_bai_bao || "Chưa cập nhật"}</td>
                  <td className="p-2">{scientificArt.ten_bai_bao || "Chưa cập nhật"}</td>
                  <td>
                    <button onClick={() => handleEditClick(scientificArt.ma_bai_bao)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                      <ModeEditOutlineOutlinedIcon className='text-white' />
                    </button>
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(scientificArt.ma_bai_bao)} className="bg-red-600 text-white p-2 rounded">
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
                            <td className="text-gray-600 py-2">{scientificArt.hoat_dong || "Chưa cập nhật"}</td>
                          </tr>
                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 w-1/2 py-2">DOI, minh chứng bài báo</td>
                            <td className="text-gray-600 py-2">{scientificArt.doi || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificArt.ngay || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tên tạp chí, kỷ yếu</td>
                            <td className="text-gray-600 py-2">{scientificArt.ten_tap_chi || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tên nhà xuất bản, đơn vị chủ quản</td>
                            <td className="text-gray-600 py-2">{scientificArt.ten_nha_xuat_ban || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngôn ngữ xuất bản</td>
                            <td className="text-gray-600 py-2">{scientificArt.ngon_ngu || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Phạm vi, cấp độ </td>
                            <td className="text-gray-600 py-2">{scientificArt.pham_vi_cap_do || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Chỉ số Impact Factor(IF) nếu có</td>
                            <td className="text-gray-600 py-2">{scientificArt.impact_factor || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn của hoạt động</td>
                            <td className="text-gray-600 py-2">{scientificArt.gio_chuan_hoat_dong || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Vai trò</td>
                            <td className="text-gray-600 py-2">{scientificArt.vai_tro || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tổng số thành viên cùng vai trò</td>
                            <td className="text-gray-600 py-2">{scientificArt.tong_so_thanh_vien || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tống số tác giả</td>
                            <td className="text-gray-600 py-2">{scientificArt.tong_so_tac_gia || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỷ lệ đóng góp</td>
                            <td className="text-gray-600 py-2">{scientificArt.ty_le_dong_gop || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ quy đổi theo vai trò</td>
                            <td className="text-gray-600 py-2">{scientificArt.gio_quy_doi || "Chưa cập nhật"}</td>
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

export default ScientificArticle;
