import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import axios from 'axios';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx'; // Import thư viện xlsx
const ScientificReport = () => {

  const navigate = useNavigate();
  const [report, setReport] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)
  const fetchEmployeeName = async (msnv) => {
    try {
      const response = await axios.get(`http://localhost:3001/education/users/${msnv}`);
      // console.log(response);
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
          const response = await axios.get("http://localhost:3001/education/getAllSciRep");
          const reportWName = await Promise.all(response.data.map(async (rep) => {
            const employeeName = await fetchEmployeeName(rep.msnv);
            return { ...rep, ho_ten: employeeName };
          }));
          setReport(reportWName);
        } else {
          const response = await axios.get(`http://localhost:3001/education/getRepOfUser/${userId}`);
          const reportWName = await Promise.all(response.data.map(async (rep) => {
            const employeeName = await fetchEmployeeName(rep.msnv);
            return { ...rep, ho_ten: employeeName };
          }));
          setReport(reportWName);
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
        await axios.delete(`http://localhost:3001/education/deleteRpt/${id}`);
        setReport(report.filter(rep => rep.ma_bao_cao !== id));
        alert("Report deleted successfully");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddClick = () => {
    navigate('/func/scientificReport/addSciReport');
  };
  const handleEditClick = (repId) => {
    navigate(`/func/scientificReport/editSciReport/${repId}`);
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
    const formattedData = report.map((rpt, index) => ({
      "STT": index + 1,
      "Họ và tên": rpt.ho_ten || "Chưa cập nhật",
      "Mã số nhân viên": rpt.msnv || "Chưa cập nhật",
      "Mã báo cáo": rpt.ma_bao_cao || "Chưa cập nhật",
      "Tên bài fulltext đã báo cáo": rpt.ten_bai_fulltext || "Chưa cập nhật",
      "Hoạt động": rpt.hoat_dong || "Chưa cập nhật",
      "Tên đề tài đã báo cáo": rpt.ten_de_tai || "Chưa cập nhật",
      "Minh chứng": rpt.minh_chung || "Chưa cập nhật",
      "Tên hội nghị khoa học đã báo cáo": rpt.ten_hoi_nghi || "Chưa cập nhật",
      "Đơn vị tổ chức": rpt.don_vi_to_chuc || "Chưa cập nhật",
      "Ngày": rpt.ngay || "Chưa cập nhật",
      "Phạm vi": rpt.pham_vi || "Chưa cập nhật",
      "Giải thưởng đạt được(nếu có)": rpt.giai_thuong || "Chưa cập nhật",
      "Hình thức báo cáo": rpt.hinh_thuc || "Chưa cập nhật",
      "Giờ chuẩn quy đổi theo vai trò(tạm tính)": rpt.gio_quy_doi || "Chưa cập nhật",
      "Tống số tác giả bài fulltext": rpt.tong_so_tac_gia || "Chưa cập nhật",
      "Vai trò trong bài fulltext": rpt.vai_tro || "Chưa cập nhật",
      "Tổng số tác giả cùng vai trò": rpt.tong_so_tac_gia_vai_tro || "Chưa cập nhật",
      "Tỷ lệ đóng góp": rpt.ty_le_dong_gop || "Chưa cập nhật",
      "Giờ chuẩn quy đổi theo vai trò": rpt.gio_quy_doi_vai_tro || "Chưa cập nhật"
    }));

    // Tạo workbook và worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BaoCaoKhoaHoc");

    // Xuất file Excel
    XLSX.writeFile(workbook, "BaoCaoKhoaHoc.xlsx");
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
          BÁO CÁO KHOA HỌC DẠNG BÀI FULLTEXT TẠI HỘI NGHỊ, HỘI THẢO SINH HOẠT CHUYÊN MÔN
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
              <th className="p-2">Mã báo cáo</th>
              <th className="p-2">Tên bài fulltext đã báo cáo</th>
              <th className="p-2">Chỉnh sửa</th>
              <th className="p-2">Xóa</th>
              <th className="p-2">Mở rộng</th>
            </tr>
          </thead>
          <tbody>
            {report.map((scientificReport, index) => (
              <React.Fragment key={index}>
                <tr className="bg-[#4682B4] text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificReport.ho_ten}</td>
                  <td className="p-2">{scientificReport.msnv}</td>
                  <td className="p-2">{scientificReport.ma_bao_cao || "Chưa cập nhật"}</td>
                  <td className="p-2">{scientificReport.ten_bai_fulltext || "Chưa cập nhật"}</td>
                  <td>
                    <button onClick={() => handleEditClick(scientificReport.ma_bao_cao)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                      <ModeEditOutlineOutlinedIcon className='text-white' />
                    </button>
                  </td>

                  <td className="p-2">
                    <button onClick={() => handleDelete(scientificReport.ma_bao_cao)} className="bg-red-600 text-white p-2 rounded">
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
                            <td className="text-gray-600 py-2">{scientificReport.hoat_dong || "Chưa cập nhật"}</td>
                          </tr>
                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Tên đề tài đã báo cáo</td>
                            <td className="text-gray-600 py-2">{scientificReport.ten_de_tai || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Minh chứng</td>
                            <td className="text-gray-600 py-2">{scientificReport.minh_chung || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tên hội nghị khoa học đã báo cáo</td>
                            <td className="text-gray-600 py-2">{scientificReport.ten_hoi_nghi || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Đơn vị tổ chức</td>
                            <td className="text-gray-600 py-2">{scientificReport.don_vi_to_chuc || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificReport.ngay || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Phạm vi</td>
                            <td className="text-gray-600 py-2">{scientificReport.pham_vi || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giải thưởng đạt được(nếu có)</td>
                            <td className="text-gray-600 py-2">{scientificReport.giai_thuong || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Hình thức báo cáo</td>
                            <td className="text-gray-600 py-2">{scientificReport.hinh_thuc || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò(tạm tính)</td>
                            <td className="text-gray-600 py-2">{scientificReport.gio_quy_doi || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tống số tác giả bài fulltext</td>
                            <td className="text-gray-600 py-2">{scientificReport.tong_so_tac_gia || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Vai trò trong bài fulltext</td>
                            <td className="text-gray-600 py-2">{scientificReport.vai_tro || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tổng số tác giả cùng vai trò</td>
                            <td className="text-gray-600 py-2">{scientificReport.tong_so_tac_gia_vai_tro || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỷ lệ đóng góp</td>
                            <td className="text-gray-600 py-2">{scientificReport.ty_le_dong_gop || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò</td>
                            <td className="text-gray-600 py-2">{scientificReport.gio_quy_doi_vai_tro || "Chưa cập nhật"}</td>
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

export default ScientificReport;
