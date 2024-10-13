import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';


const data = [
  {
    name: 'Trần Duy Thanh',
    employeeId: 'A29-203',
    action: 'Biên dịch tài liệu',
    nameProd: 'Sáng kiến ABC',
    certificationUnit: 'Y HN',
    proof: 'ABC',
    range: 'Trong nước',
    day: '07/10/2024',
    standardTime: 10,
    contributionRate: 11,
    timeRoleTemp: 2,
  },
  {
    name: 'Trần Duy Thanh',
    employeeId: 'A29-203',
    action: 'Biên dịch tài liệu',
    nameProd: 'Sáng kiến ABC',
    certificationUnit: 'Y HN',
    proof: 'ABC',
    range: 'Trong nước',
    day: '07/10/2024',
    standardTime: 10,
    contributionRate: 11,
    timeRoleTemp: 2,
  },
];
// Additional data entries here...


const ScientificResearchProducts = () => {

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/func/scientificResearchProduct/addScientificResPro');
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='mx-8 bg-orange-400 w-full'>
      <div className='bg-slate-400 w-full relative p-2'>
        <span className='text-3xl font-semibold text-white block text-center break-words pr-20'>
          ĐĂNG KÝ SỞ HỮU TRÍ TUỆ, TRIỂN LÃM SẢN PHẨM KHOA HỌC CÔNG NGHỆ
        </span>
        <button onClick={handleAddClick} className='absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-1 font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
          <span>Đăng ký</span>
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
              <th className="p-2">Hoạt động đã đạt</th>
              <th className="p-2">Đơn vị cấp chứng nhận, tổ chức</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((scientificResProd, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificResProd.name}</td>
                  <td className="p-2">{scientificResProd.employeeId}</td>
                  <td className="p-2">{scientificResProd.action}</td>
                  <td className="p-2">{scientificResProd.certificationUnit}</td>
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
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Tên sản phẩm, giải pháp, nhãn hiệu đã được cấp chứng nhận hoặc giới thiệu tại hội chợ, triển lãm</td>
                            <td className="text-gray-600 py-2">{scientificResProd.nameProd}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Minh chứng</td>
                            <td className="text-gray-600 py-2">{scientificResProd.proof}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Phạm vi</td>
                            <td className="text-gray-600 py-2">{scientificResProd.range}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificResProd.day}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn hoạt động</td>
                            <td className="text-gray-600 py-2">{scientificResProd.standardTime}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỷ lệ đóng góp theo hồ sơ</td>
                            <td className="text-gray-600 py-2">{scientificResProd.contributionRate}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò (tạm tính)</td>
                            <td className="text-gray-600 py-2">{scientificResProd.timeRoleTemp}</td>
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
