import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';


const data = [
  {
    name: 'Huỳnh Vũ Anh Tuấn',
    employeeId: 'A29-205',
    action: 'Đề cương NCKH đã tham gia đấu thầu hoặc xét tuyển nhưng không được duyệt',
    tpcTitle: 'Nghiên cứu khoa học 1',
    range: 'Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị > 500 triệu đồng',
    idContract: 200320209,
    day: '04/10/2024',
    standardTime: 0,
    role: 'Chủ nhiệm và đồng chủ nhiệm: 50%',
    numberRole: 1,
    contributionRate: 30,
    timeRole: 72
  },
  {
    name: 'Huỳnh Vũ Anh Tuấn',
    employeeId: 'A29-205',
    action: 'Đề cương NCKH đã tham gia đấu thầu hoặc xét tuyển nhưng không được duyệt',
    tpcTitle: 'Nghiên cứu khoa học 1',
    range: 'Cấp bộ-tỉnh/thành phố-nhánh cấp nhà nước hoặc có giá trị > 500 triệu đồng',
    idContract: 200320209,
    day: '04/10/2024',
    standardTime: 0,
    role: 'Chủ nhiệm và đồng chủ nhiệm: 50%',
    numberRole: 1,
    contributionRate: 30,
    timeRole: 72
  }
];
// Additional data entries here...


const ScientificResearchTopic = () => {

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/func/scientificResearchTopic/addSciResTpc');
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='mx-8 bg-orange-400 w-full'>
      <div className='bg-slate-400 w-full relative flex items-center justify-center p-2'>
        <span className='text-3xl font-semibold text-white'>ĐỀ TÀI NGHIÊN CỨU KHOA HỌC</span>
        <button onClick={handleAddClick} className='absolute right-4 flex gap-1 font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
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
              <th className="p-2">Tên đề tài/ đề cương NCKH</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((scientificResTpc, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificResTpc.name}</td>
                  <td className="p-2">{scientificResTpc.employeeId}</td>
                  <td className="p-2">{scientificResTpc.action}</td>
                  <td className="p-2">{scientificResTpc.tpcTitle}</td>
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
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Phạm vi, cấp độ</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.range}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Mã số hợp đồng</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.idContract}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.day}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn hoạt động</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.standardTime}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Vai trò</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.role}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số lượng thành viên cùng vai trò</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.numberRole}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỉ lệ đóng góp</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.contributionRate}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò</td>
                            <td className="text-gray-600 py-2">{scientificResTpc.timeRole}</td>
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
