import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// lọc những bài báo khoa học => lấy msnv lưu trong localStorgre để so sánh với list bài báo khoa học để lọc hiển thị theo các bài bóa của user
const ScientificArticle = () => {

  const navigate = useNavigate();
  const [articles, setArticle] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const fetchEmployeeName = async (msnv) => {
    try {
      const response = await axios.get(`http://localhost:3001/education/users/${msnv}`);
      return response.data.ho_ten;
    } catch (err) {
      console.error(err);
      return '';
    }
  };

  useEffect(() => {
    const fechArticle = async () => {
      try {
        const response = await axios.get("http://localhost:3001/education/getAllSciArt");
        const articleWName = await Promise.all(response.data.map(async (article) => {
          const employeeName = await fetchEmployeeName(article.msnv);
          return { ...article, ho_ten: employeeName };
        }));
        setArticle(articleWName);
      } catch (err) {
        console.error(err);
      }
    };
    fechArticle();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn muốn xóa bài báo khoa học này?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/education/deleteUsers/${id}`);
        setArticle(articles.filter(article => article.ma_bai_bao !== id));
        alert("Xóa bài báo khoa học thành công");
      } catch (err) {
        console.error(err);
        alert("Không thể xóa bài báo khoa học");
      }
    }
  };

  const handleAddClick = () => {
    navigate('/func/scientificArticle/addSciArt');
  };

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
              <th className="p-2">Chỉnh sửa</th>
              <th className="p-2">Xóa</th>
              <th className="p-2">Mở rộng</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((scientificArt, index) => (
              <React.Fragment key={index}>
                <tr className="bg-gray-800 text-white border-b-2 border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{scientificArt.ho_ten}</td>
                  <td className="p-2">{scientificArt.msnv}</td>
                  <td className="p-2">{scientificArt.hoat_dong}</td>
                  <td className="p-2">{scientificArt.ten_bai_bao}</td>
                  <td>
                    {/* nút chỉnh sửa này đang sài cho user */}
                    <button onClick={handleAddClick} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                      <ModeEditOutlineOutlinedIcon className='text-white' />
                    </button>
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(scientificArt.ma_bai_bao)} className="bg-red-600 text-white p-2 rounded">
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
                            <td className="font-semibold text-gray-700 w-1/2 py-2">DOI, minh chứng bài báo</td>
                            <td className="text-gray-600 py-2">{scientificArt.doi}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngày</td>
                            <td className="text-gray-600 py-2">{scientificArt.ngay}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tên tạp chí, kỷ yếu</td>
                            <td className="text-gray-600 py-2">{scientificArt.ten_tap_chi}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tên nhà xuất bản, đơn vị chủ quản</td>
                            <td className="text-gray-600 py-2">{scientificArt.ten_nha_xuat_ban}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Ngôn ngữ xuất bản</td>
                            <td className="text-gray-600 py-2">{scientificArt.ngon_ngu}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Phạm vi, cấp độ </td>
                            <td className="text-gray-600 py-2">{scientificArt.pham_vi_cap_do}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Chỉ số Impact Factor(IF) nếu có</td>
                            <td className="text-gray-600 py-2">{scientificArt.impact_factor}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ chuẩn của hoạt động</td>
                            <td className="text-gray-600 py-2">{scientificArt.gio_chuan_hoat_dong}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Vai trò</td>
                            <td className="text-gray-600 py-2">{scientificArt.vai_tro}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tổng số thành viên cùng vai trò</td>
                            <td className="text-gray-600 py-2">{scientificArt.tong_so_thanh_vien}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tống số tác giả</td>
                            <td className="text-gray-600 py-2">{scientificArt.tong_so_tac_gia}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Tỷ lệ đóng góp</td>
                            <td className="text-gray-600 py-2">{scientificArt.ty_le_dong_gop}</td>
                          </tr>

                          <tr className="py-2">
                            <td className="font-semibold text-gray-700 py-2">Giờ quy đổi theo vai trò</td>
                            <td className="text-gray-600 py-2">{scientificArt.gio_quy_doi}</td>
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
