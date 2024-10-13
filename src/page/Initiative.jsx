import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';


const data = [
  {
    name: 'Trần Duy Thanh',
    employeeId: 'A29-203',
    action: 'Biên dịch tài liệu',
    nameSciInit: 'Công trình ABC',
    certificationCode: '02092003',
    day: '04/10/2024',
    benefits: 'Có đem lại lợi ích kinh tế cho Bệnh viện',
    benefitMoney: 1111000,
    standardTime: 10,
    contributeRate: 60,
    timeRoleTemp: 2,
  },
  {
    name: 'Trần Duy Thanh',
    employeeId: 'A29-203',
    action: 'Biên dịch tài liệu',
    nameSciInit: 'Công trình ABC',
    certificationCode: '02092003',
    day: '04/10/2024',
    benefits: 'Có đem lại lợi ích kinh tế cho Bệnh viện',
    benefitMoney: 1111000,
    standardTime: 10,
    contributeRate: 60,
    timeRoleTemp: 2,
  },
];
// Additional data entries here... 


const Initiative = () => {

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/func/Initiative/addInitiative');
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='mx-8 bg-orange-400 w-full'>
      <div className='bg-slate-400 w-full relative p-2'>
        <span className='text-3xl font-semibold text-white block text-center break-words pr-20'>
          SÁNG KIẾN CẢI TIẾN KỸ THUẬT CẤP BỆNH VIỆN
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
              <th className="p-2">Tên công trình, sáng kiến đã được công nhận</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((initiative, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{initiative.name}</td>
                  <td className="p-2">{initiative.employeeId}</td>
                  <td className="p-2">{initiative.action}</td>
                  <td className="p-2">{initiative.nameSciInit}</td>
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
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Mã số chứng nhận (theo quyết định công nhận)</td>
                            <td className="text-gray-600 py-2">{initiative.certificationCode}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{initiative.day}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Lợi ích mang lại cho Bệnh viện</td>
                            <td className="text-gray-600 py-2">{initiative.benefits}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số tiền lợi ích kinh tế mang lại cho Bệnh viện 
                            (đơn vị tính: trăm triệu)</td>
                            <td className="text-gray-600 py-2">{initiative.benefitMoney}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn hoạt động</td>
                            <td className="text-gray-600 py-2">{initiative.standardTime}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỷ lệ tham gia đóng góp (căn cứ theo hồ sơ)</td>
                            <td className="text-gray-600 py-2">{initiative.contributeRate}</td>
                          </tr>
                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò(tạm tính)</td>
                            <td className="text-gray-600 py-2">{initiative.timeRoleTemp}</td>
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
