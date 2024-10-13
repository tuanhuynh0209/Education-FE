import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';


const data = [
  {
    name: 'Huỳnh Vũ Anh Tuấn',
    employeeId: 'A29-205',
    action: 'Kỷ yếu hội thảo trong nước có phản biện và xuất bản bằng tiếng Việt',
    artTitle: 'Kỷ yếu tiên tiến',
    doi: 292003,
    day: "02/10/2024",
    magazineName: 'Jama',
    imprint: 'Thanh Niên',
    language: 'Tiếng việt',
    rangge: 'Có chỉ số ảnh hưởng IF > 0.5 (tính theo năm kê khai)',
    impactFactor: 3,
    standardTime: 120,
    role: 'Đồng tác giả',
    totalMember: 7,
    totalAuthor: 7,
    contributionRate: 15,
    timeRole: 72
  },
  {
    name: 'Huỳnh Vũ Anh Tuấn',
    employeeId: 'A29-205',
    action: 'Kỷ yếu hội thảo trong nước có phản biện và xuất bản bằng tiếng Việt',
    artTitle: 'Kỷ yếu tiên tiến',
    doi: 292003,
    day: "02/10/2024",
    magazineName: 'Jama',
    imprint: 'Thanh Niên',
    language: 'Tiếng việt',
    rangge: 'Có chỉ số ảnh hưởng IF > 0.5 (tính theo năm kê khai)',
    impactFactor: 3,
    standardTime: 120,
    role: 'Đồng tác giả',
    totalMember: 7,
    totalAuthor: 7,
    contributionRate: 15,
    timeRole: 72
  }
];
// Additional data entries here...


const ScientificArticle = () => {

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/func/scientificArticle/addSciArt');
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='mx-8 bg-orange-400 w-full'>
      <div className='bg-slate-400 w-full relative flex items-center justify-center p-2'>
        <span className='text-3xl font-semibold text-white'>BÀI BÁO KHOA HỌC</span>
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
              <th className="p-2">Tên bài báo khoa học</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((scientificArt, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificArt.name}</td>
                  <td className="p-2">{scientificArt.employeeId}</td>
                  <td className="p-2">{scientificArt.action}</td>
                  <td className="p-2">{scientificArt.artTitle}</td>
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
                            <td className="font-semibold text-gray-700 w-1/2 py-2">DOI, minh chứng bài báo</td>
                            <td className="text-gray-600 py-2">{scientificArt.doi}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificArt.day}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tên tạp chí, kỷ yếu</td>
                            <td className="text-gray-600 py-2">{scientificArt.magazineName}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tên nhà xuất bản, đơn vị chủ quản</td>
                            <td className="text-gray-600 py-2">{scientificArt.imprint}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngôn ngữ xuất bản</td>
                            <td className="text-gray-600 py-2">{scientificArt.language}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Phạm vi, cấp độ </td>
                            <td className="text-gray-600 py-2">{scientificArt.rangge}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Chỉ số Impact Factor(IF) nếu có</td>
                            <td className="text-gray-600 py-2">{scientificArt.impactFactor}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn của hoạt động</td>
                            <td className="text-gray-600 py-2">{scientificArt.standardTime}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Vai trò</td>
                            <td className="text-gray-600 py-2">{scientificArt.role}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tổng số thành viên cùng vai trò</td>
                            <td className="text-gray-600 py-2">{scientificArt.totalMember}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tống số tác giả</td>
                            <td className="text-gray-600 py-2">{scientificArt.totalAuthor}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỷ lệ đóng góp</td>
                            <td className="text-gray-600 py-2">{scientificArt.contributionRate}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ quy đổi theo vai trò</td>
                            <td className="text-gray-600 py-2">{scientificArt.timeRole}</td>
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
