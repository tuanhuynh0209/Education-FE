import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import axios from 'axios';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx';
const ScientificResearchProducts = () => {

  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
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
          const response = await axios.get("http://localhost:3001/education/getAllSciPro");
          const productWName = await Promise.all(response.data.map(async (pro) => {
            const employeeName = await fetchEmployeeName(pro.msnv);
            return { ...pro, ho_ten: employeeName };
          }));
          setProduct(productWName);
        } else {
          const response = await axios.get(`http://localhost:3001/education/getProOfUser/${userId}`);
          const productWName = await Promise.all(response.data.map(async (pro) => {
            const employeeName = await fetchEmployeeName(pro.msnv);
            return { ...pro, ho_ten: employeeName };
          }));
          setProduct(productWName);
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
        await axios.delete(`http://localhost:3001/education/deletePro/${id}`);
        setProduct(product.filter(pro => pro.ma_san_pham !== id));
        alert("Product deleted successfully");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddClick = () => {
    navigate('/func/scientificResearchProduct/addScientificResPro');
  };
  const handleEditClick = (proId) => {
    navigate(`/func/scientificResearchProduct/editProduct/${proId}`);
  };
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // Kiểm tra trạng thái đăng nhập
  }, []);
  const handleExport = () => {
    if (product.length === 0) {
      alert("Không có dữ liệu để export!");
      return;
    }
    // Chuẩn bị dữ liệu cho file Excel
    const formattedData = product.map((prod, index) => ({
      STT: index + 1,
      "Họ và Tên": prod.ho_ten,
      "Mã số nhân viên": prod.msnv,
      "Mã sản phẩm": prod.ma_san_pham,
      "Đơn vị cấp chứng nhận": prod.don_vi_cap_chung_nhan,
      "Hoạt động": prod.hoat_dong || "Chưa cập nhật",
      "Tên sản phẩm": prod.ten_san_pham || "Chưa cập nhật",
      "Minh chứng": prod.minh_chung || "Chưa cập nhật",
      "Phạm vi": prod.pham_vi || "Chưa cập nhật",
      "Ngày": prod.ngay || "Chưa cập nhật",
      "Giờ chuẩn hoạt động": prod.gio_chuan_hoat_dong || "Chưa cập nhật",
      "Tỷ lệ đóng góp": prod.ty_le_dong_gop || "Chưa cập nhật",
      "Giờ quy đổi": prod.gio_quy_doi || "Chưa cập nhật",
    }));

    // Tạo một worksheet và workbook
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scientific Conferences");

    // Xuất file Excel
    XLSX.writeFile(workbook, "ScientificConferences.xlsx");
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
          ĐĂNG KÝ SỞ HỮU TRÍ TUỆ, TRIỂN LÃM SẢN PHẨM KHOA HỌC CÔNG NGHỆ
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
      <div id="printableArea" className="bg-slate-300 w-full mt-5">
        <table className="table-auto w-full text-center" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr className="bg-gray-800 text-white border-b-2">
              <th className="p-2">STT</th>
              <th className="p-2">Họ và tên</th>
              <th className="p-2">Mã số nhân viên</th>
              <th className="p-2">Mã sản phẩm KHCN</th>
              <th className="p-2">Đơn vị cấp chứng nhận, tổ chức</th>
              <th className="p-2">Chỉnh sửa</th>
              <th className="p-2">Xóa</th>
              <th className="p-2">Mở rộng</th>
            </tr>
          </thead>
          <tbody>
            {product.map((scientificResProd, index) => (
              <React.Fragment key={index}>
                <tr className="bg-[#4682B4] text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificResProd.ho_ten}</td>
                  <td className="p-2">{scientificResProd.msnv}</td>
                  <td className="p-2">{scientificResProd.ma_san_pham}</td>
                  <td className="p-2">{scientificResProd.don_vi_cap_chung_nhan}</td>
                  <td>
                    <button onClick={() => handleEditClick(scientificResProd.ma_san_pham)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                      <ModeEditOutlineOutlinedIcon className='text-white' />
                    </button>
                  </td>

                  <td className="p-2">
                    <button onClick={() => handleDelete(scientificResProd.ma_san_pham)} className="bg-red-600 text-white p-2 rounded">
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
                            <td className="text-gray-600 py-2">{scientificResProd.hoat_dong}</td>
                          </tr>
                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Tên sản phẩm, giải pháp, nhãn hiệu đã được cấp chứng nhận hoặc giới thiệu tại hội chợ, triển lãm</td>
                            <td className="text-gray-600 py-2">{scientificResProd.ten_san_pham}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Minh chứng</td>
                            <td className="text-gray-600 py-2">{scientificResProd.minh_chung}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Phạm vi</td>
                            <td className="text-gray-600 py-2">{scientificResProd.pham_vi}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificResProd.ngay}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn hoạt động</td>
                            <td className="text-gray-600 py-2">{scientificResProd.gio_chuan_hoat_dong}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỷ lệ đóng góp theo hồ sơ</td>
                            <td className="text-gray-600 py-2">{scientificResProd.ty_le_dong_gop}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò (tạm tính)</td>
                            <td className="text-gray-600 py-2">{scientificResProd.gio_quy_doi}</td>
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

export default ScientificResearchProducts;
