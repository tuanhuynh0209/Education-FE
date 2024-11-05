import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import axios from 'axios';


const ScientificReport = () => {

  const navigate = useNavigate();
  const [report, setReport] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const fetchEmployeeName = async (msnv) => {
    try {
      const response = await axios.get(`http://localhost:3001/education/users/${msnv}`);
      // console.log(response);
      return response.data.ho_ten;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchReport = async() => {
      try {
        const response = await axios.get("http://localhost:3001/education/getAllSciRep");
        const reportWName = await Promise.all(response.data.map(async(rep) => {
          const employeeName = await fetchEmployeeName(rep.msnv);
          return {...rep, ho_ten: employeeName};
        }));
        setReport(reportWName);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReport();
  },[]);

  const handleAddClick = () => {
    navigate('/func/scientificReport/addSciReport');
  };
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='mx-8 bg-orange-400 w-full'>
      <div className='bg-slate-400 w-full relative p-2'>
        <span className='text-3xl font-semibold text-white block text-center break-words pr-20'>
          BÁO CÁO KHOA HỌC DẠNG BÀI FULLTEXT TẠI HỘI NGHỊ, HỘI THẢO SINH HOẠT CHUYÊN MÔN
        </span>
        <button onClick={handleAddClick} className='absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-1 font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
          <span>Thêm</span>
          <LibraryAddOutlinedIcon className='text-white' />
        </button>
      </div>

      <div className="bg-slate-300 w-full mt-5">
        <table className="table-auto w-full text-center" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr className="bg-gray-800 text-white border-b-2">
              <th className="p-2">STT</th>
              <th className="p-2">Họ và tên</th>
              <th className="p-2">Mã số nhân viên</th>
              <th className="p-2">Hoạt động</th>
              <th className="p-2">Tên bài fulltext đã báo cáo</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {report.map((scientificReport, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificReport.ho_ten}</td>
                  <td className="p-2">{scientificReport.msnv}</td>
                  <td className="p-2">{scientificReport.hoat_dong || "Chưa cập nhật"}</td>
                  <td className="p-2">{scientificReport.ten_bai_fulltext || "Chưa cập nhật"}</td>
                  <td className="p-2">
                    <button onClick={() => toggleExpand(index)}>
                      {expandedIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                    </button>
                  </td>
                </tr>
                <tr className={`transition-all duration-300 ${expandedIndex === index ? '' : 'hidden'}`}>

                  <td className="p-4" colSpan="5">
                    <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                      <table className="table-auto w-full text-left">
                        <tbody>
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
