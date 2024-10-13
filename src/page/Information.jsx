import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
const data = [
  {
    year: 2024,
    name: 'Trần Duy Thanh',
    employeeId: 'A29-203',
    base: 'Cơ sở 1',
    department: 'Khoa Chẩn đoán hình ảnh',
    jobTitle: 'Bác sĩ hoặc Thạc sĩ các chuyên ngành khác',
    type: 'Viên chức cơ hữu UMC',
    researchHours: 30,
    reducedCase: 'Trường hợp 1',
    days: 0,
    researchQuota: 0,
    notes: 'Trống'
  },
  {
    year: 2024,
    name: 'Tiêu Trí Quang',
    employeeId: 'A29-204',
    base: 'Cơ sở 2',
    department: 'Khoa Ngoại tổng quát',
    jobTitle: 'Thạc sĩ chuyên ngành Ngoại khoa',
    type: 'Viên chức cơ hữu UMC',
    researchHours: 40,
    reducedCase: 'Trường hợp 2',
    days: 2,
    researchQuota: 0,
    notes: 'Trống'
  },
  {
    year: 2024,
    name: 'Đặng Duy Thái',
    employeeId: 'A29-205',
    base: 'Cơ sở 3',
    department: 'Khoa Nội tổng quát',
    jobTitle: 'Bác sĩ Nội khoa',
    type: 'Viên chức cơ hữu UMC',
    researchHours: 35,
    reducedCase: 'Trường hợp 3',
    days: 1,
    researchQuota: 0,
    notes: 'Trống'
  },
  {
    year: 2024,
    name: 'Nguyễn Thành Duy',
    employeeId: 'A29-204',
    base: 'Cơ sở 2',
    department: 'Khoa Ngoại tổng quát',
    jobTitle: 'Thạc sĩ chuyên ngành Ngoại khoa',
    type: 'Viên chức cơ hữu UMC',
    researchHours: 40,
    reducedCase: 'Trường hợp 2',
    days: 2,
    researchQuota: 0,
    notes: 'Trống'
  },
  {
    year: 2024,
    name: 'Nguyễn Đức Vinh',
    employeeId: 'A29-205',
    base: 'Cơ sở 3',
    department: 'Khoa Nội tổng quát',
    jobTitle: 'Bác sĩ Nội khoa',
    type: 'Viên chức cơ hữu UMC',
    researchHours: 35,
    reducedCase: 'Trường hợp 3',
    days: 1,
    researchQuota: 0,
    notes: 'Trống'
  },
  {
    year: 2024,
    name: 'Ngô Trần Hoàng Phát',
    employeeId: 'A29-204',
    base: 'Cơ sở 2',
    department: 'Khoa Ngoại tổng quát',
    jobTitle: 'Thạc sĩ chuyên ngành Ngoại khoa',
    type: 'Viên chức cơ hữu UMC',
    researchHours: 40,
    reducedCase: 'Trường hợp 2',
    days: 2,
    researchQuota: 0,
    notes: 'Trống'
  },
  {
    year: 2024,
    name: 'Huỳnh Vũ Anh Tuấn',
    employeeId: 'A29-205',
    base: 'Cơ sở 3',
    department: 'Khoa Nội tổng quát',
    jobTitle: 'Bác sĩ Nội khoa',
    type: 'Viên chức cơ hữu UMC',
    researchHours: 35,
    reducedCase: 'Trường hợp 3',
    days: 1,
    researchQuota: 0,
    notes: 'Trống'
  }
];

const Information = () => {

  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/func/information/editInf');
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='mx-8 bg-orange-400 w-full'>
      <div className='bg-slate-400 w-full relative flex items-center justify-center p-2'>
        <span className='text-3xl font-semibold text-white'>THÔNG TIN VIÊN CHỨC</span>
        <button
          onClick={handleEditClick}
          className='absolute right-4 flex gap-1 font-semibold text-white bg-[#F9A150] p-2 rounded-sm'
        >
          <span>Chỉnh sửa</span>
          <ModeEditOutlineOutlinedIcon className='text-white' />
        </button>
      </div>
      <div className="bg-slate-300 w-full mt-5">
        <table className="table-auto w-full text-center" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr className="bg-gray-800 text-white border-b-2">
              <th className="p-2">Năm áp dụng</th>
              <th className="p-2">Họ và tên</th>
              <th className="p-2">Mã số nhân viên</th>
              <th className="p-2">Cơ sở</th>
              <th className="p-2">Đơn vị</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((person, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{person.year}</td>
                  <td className="p-2">{person.name}</td>
                  <td className="p-2">{person.employeeId}</td>
                  <td className="p-2">{person.base}</td>
                  <td className="p-2">{person.department}</td>
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
                            <td className="font-semibold text-gray-700 w-1/2 py-2">Chức danh, trình độ</td>
                            <td className="text-gray-600 py-2">{person.jobTitle}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Viên chức hữu cơ</td>
                            <td className="text-gray-600 py-2">{person.type}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số giờ nghiên cứu khoa học định mức trong năm</td>
                            <td className="text-gray-600 py-2">{person.researchHours}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Trường hợp giảm định mức</td>
                            <td className="text-gray-600 py-2">{person.reducedCase}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số ngày</td>
                            <td className="text-gray-600 py-2">{person.days}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Định mức giờ NCKH</td>
                            <td className="text-gray-600 py-2">{person.researchQuota}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ghi chú</td>
                            <td className="text-gray-600 py-2">{person.notes}</td>
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
};

export default Information;
