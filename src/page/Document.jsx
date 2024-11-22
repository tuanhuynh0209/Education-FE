import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import axios from 'axios';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailTable from '../component/DetailTable';
import * as XLSX from 'xlsx';

const Document = () => {

  const navigate = useNavigate();
  const [documents, setDocument] = useState([]);
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
          const response = await axios.get("http://localhost:3001/education/getAllDou");
          const documentsWithNames = await Promise.all(response.data.map(async (doc) => {
            const employeeName = await fetchEmployeeName(doc.msnv);
            return { ...doc, ho_ten: employeeName };
          }));
          setDocument(documentsWithNames);
        } else {
          const response = await axios.get(`http://localhost:3001/education/getDocOfUser/${userId}`);
          const documentsWithNames = await Promise.all(response.data.map(async (doc) => {
            const employeeName = await fetchEmployeeName(doc.msnv);
            return { ...doc, ho_ten: employeeName };
          }));
          setDocument(documentsWithNames);
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
        await axios.delete(`http://localhost:3001/education/deleteDoc/${id}`);
        setDocument(documents.filter(doc => doc.ma_tai_lieu !== id));
        alert("Document deleted successfully");
      } catch (err) {
        console.error(err);
      }
    }
  };
  // điều hướng
  const handleAddClick = () => {
    navigate(`/func/document/addDocument`);
  };
  const handleEditClick = (docId) => {
    navigate(`/func/document/editDocument/${docId}`);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // Kiểm tra trạng thái đăng nhập
  }, []);

  const documentColumns = [
    { label: "Hoạt động", key: "hoat_dong" },
    { label: "Tái bản", key: "tai_ban" },
    { label: "Tổng số trang sách", key: "tong_so_trang" },
    { label: "Ngôn ngữ", key: "ngon_ngu" },
    { label: "Ngày xuất bản", key: "ngay_xuat_ban" },
    { label: "Giờ chuẩn hoạt động", key: "gio_chuan_hoat_dong" },
    { label: "Vai trò", key: "vai_tro" },
    { label: "Tổng số thành viên", key: "tong_so_thanh_vien" },
    { label: "Tổng số trang phụ trách", key: "tong_so_trang_phu_trach" },
    { label: "Tỷ lệ đóng góp", key: "ty_le_dong_gop" },
    { label: "Giờ quy đổi", key: "gio_quy_doi" },
  ];

  const handleExport = () => {
    if (documents.length === 0) {
      alert("Không có dữ liệu để export!");
      return;
    }
    // Chuẩn bị dữ liệu cho file Excel
    const formattedData = documents.map((doc, index) => ({
      STT: index + 1,
      "Họ và Tên": doc.ho_ten,
      "Mã số nhân viên": doc.msnv,
      "Mã tài liệu": doc.ma_tai_lieu,
      "Tên sách, tài liệu": doc.ten_sach,
      "Hoạt động": doc.hoat_dong || "Chưa cập nhật",
      "Tái bản": doc.tai_ban || "Chưa cập nhật",
      "Tổng số trang sách": doc.tong_so_trang || "Chưa cập nhật",
      "Ngôn ngữ": doc.ngon_ngu || "Chưa cập nhật",
      "Ngày xuất bản": doc.ngay_xuat_ban || "Chưa cập nhật",
      "Giờ chuẩn hoạt động": doc.gio_chuan_hoat_dong || "Chưa cập nhật",
      "Vai trò": doc.vai_tro || "Chưa cập nhật",
      "Tổng số thành viên": doc.tong_so_thanh_vien || "Chưa cập nhật",
      "Tổng số trang phụ trách": doc.tong_so_trang_phu_trach || "Chưa cập nhật",
      "Tỷ lệ đóng góp": doc.ty_le_dong_gop || "Chưa cập nhật",
      "Giờ quy đổi": doc.gio_quy_doi || "Chưa cập nhật",
    }));

    // Tạo một worksheet và workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Document");

    // Xuất file Excel
    XLSX.writeFile(workbook, "Document.xlsx");
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
          SÁCH, TÀI LIỆU
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
              onClick={handleExport}
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
              <th className="p-2">Mã tài liệu</th>
              <th className="p-2">Tên sách, tài liệu</th>
              <th className="p-2">Chỉnh sửa</th>
              <th className="p-2">Xóa</th>
              <th className="p-2">Mở rộng</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <React.Fragment key={index}>
                <tr className="bg-[#4682B4] text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{document.ho_ten || "Chưa cập nhật"}</td>
                  <td className="p-2">{document.msnv || "Chưa cập nhật"}</td>
                  <td className="p-2">{document.ma_tai_lieu || "Chưa cập nhật"}</td>
                  <td className="p-2">{document.ten_sach || "Chưa cập nhật"}</td>
                  <td>
                    <button onClick={() => handleEditClick(document.ma_tai_lieu)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                      <ModeEditOutlineOutlinedIcon className='text-white' />
                    </button>
                  </td>

                  <td className="p-2">
                    <button onClick={() => handleDelete(document.ma_tai_lieu)} className="bg-red-600 text-white p-2 rounded">
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
                    <DetailTable details={document} columns={documentColumns} />
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

export default Document;
