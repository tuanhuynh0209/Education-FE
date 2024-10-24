import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import axios from 'axios';

const Information = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/education/users');
        console.log(response);
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchUsers();
  }, []);

  const handleEditClick = () => {
    navigate('/func/information/editInf');
  };

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
            {users.map((user, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{user.nam_ap_dung || "Chưa cập nhật"}</td>
                  <td className="p-2">{user.ho_ten}</td>
                  <td className="p-2">{user.msnv}</td>
                  <td className="p-2">{user.co_so || "Chưa cập nhật"}</td>
                  <td className="p-2">{user.don_vi || "Chưa cập nhật"}</td>
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
                            <td className="text-gray-600 py-2">{user.jobTitle || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Viên chức hữu cơ</td>
                            <td className="text-gray-600 py-2">{users.type || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số giờ nghiên cứu khoa học định mức trong năm</td>
                            <td className="text-gray-600 py-2">{users.researchHours || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Trường hợp giảm định mức</td>
                            <td className="text-gray-600 py-2">{users.reducedCase || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Số ngày</td>
                            <td className="text-gray-600 py-2">{users.days || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Định mức giờ NCKH</td>
                            <td className="text-gray-600 py-2">{users.researchQuota || "Chưa cập nhật"}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ghi chú</td>
                            <td className="text-gray-600 py-2">{users.notes || "Chưa cập nhật"}</td>
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
