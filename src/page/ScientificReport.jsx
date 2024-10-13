import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';


const data = [
  {
    name: 'Trần Duy Thanh',
    employeeId: 'A29-203',
    action: 'Biên dịch tài liệu',
    nameReported: 'Tên bài fulltext đã báo cáo',
    nameTopicReported: 'Nghiên cứu khoa học 1',
    proof: 'Chứng nhận báo cáo',
    nameConference: 'Hội nghi báo cáo 1',
    organizingUnit: 'Hội ABC',
    day: '04/10/2024',
    range:'Hội nghị trong nước',
    prize: 'Không',
    reportForm: 'Báo cáo hội trường',
    standardTimeTempFt: 10,
    totalMemFt: 200,
    roleFt: 'Tác giả đầu tiên',
    sameRoleMemFt: 2,
    contributionRate: 11,
    standardTimeFt: 10,
  },
  {
    name: 'Tiêu Trí Quang',
    employeeId: 'A29-204',
    action: 'Biên dịch tài liệu',
    nameReported: 'Tên bài fulltext đã báo cáo',
    nameTopicReported: 'Nghiên cứu khoa học 1',
    proof: 'Chứng nhận báo cáo',
    nameConference: 'Hội nghi báo cáo 1',
    organizingUnit: 'Hội ABC',
    day: '04/10/2024',
    range:'Hội nghị trong nước',
    prize: 'Không',
    reportForm: 'Báo cáo hội trường',
    standardTimeTempFt: 10,
    totalMemFt: 200,
    roleFt: 'Tác giả đầu tiên',
    sameRoleMemFt: 2,
    contributionRate: 11,
    standardTimeFt: 10,
  },
];
// Additional data entries here...


const ScientificReport = () => {

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/func/scientificReport/addSciReport');
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

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
            {data.map((scientificReport, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificReport.name}</td>
                  <td className="p-2">{scientificReport.employeeId}</td>
                  <td className="p-2">{scientificReport.action}</td>
                  <td className="p-2">{scientificReport.nameReported}</td>
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
                            <td className="text-gray-600 py-2">{scientificReport.nameTopicReported}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Minh chứng</td>
                            <td className="text-gray-600 py-2">{scientificReport.proof}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tên hội nghị khoa học đã báo cáo</td>
                            <td className="text-gray-600 py-2">{scientificReport.nameConference}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Đơn vị tổ chức</td>
                            <td className="text-gray-600 py-2">{scientificReport.organizingUnit}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificReport.day}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Phạm vi</td>
                            <td className="text-gray-600 py-2">{scientificReport.range}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giải thưởng đạt được(nếu có)</td>
                            <td className="text-gray-600 py-2">{scientificReport.prize}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Hình thức báo cáo</td>
                            <td className="text-gray-600 py-2">{scientificReport.reportForm}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò(tạm tính)</td>
                            <td className="text-gray-600 py-2">{scientificReport.standardTimeTempFt}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tống số tác giả bài fulltext</td>
                            <td className="text-gray-600 py-2">{scientificReport.totalMemFt}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Vai trò trong bài fulltext</td>
                            <td className="text-gray-600 py-2">{scientificReport.roleFt}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tổng số tác giả cùng vai trò</td>
                            <td className="text-gray-600 py-2">{scientificReport.sameRoleMemFt}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỷ lệ đóng góp</td>
                            <td className="text-gray-600 py-2">{scientificReport.contributionRate}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò</td>
                            <td className="text-gray-600 py-2">{scientificReport.standardTimeFt}</td>
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
