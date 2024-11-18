import React, { useState } from 'react';
import axios from 'axios';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import DetailTable from '../component/DetailTable';
import { useNavigate } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [type, setType] = useState('msnv');
    const [result, setResult] = useState(null);
    const [expandedUserIndex, setExpandedUserIndex] = useState(null);
    const [expandedArticleIndex, setExpandedArticleIndex] = useState(null);

    const toggleUserExpand = (index) => {
        setExpandedUserIndex(expandedUserIndex === index ? null : index);
    };

    const toggleArticleExpand = (index) => {
        setExpandedArticleIndex(expandedArticleIndex === index ? null : index);
    };
    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:3001/education/search', {
                params: {
                    keyword,
                    type,
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleEditArtClick = (artId) => {
        navigate(`/func/scientificArticle/editSciArt/${artId}`);
    };
    const handleEditUserClick = (userId) => {
        navigate(`/func/information/editInf/${userId}`);
    };
    const userColumns = [
        { label: "Chức danh, trình độ", key: "chuc_danh_trinh_do" },
        { label: "Viên chức cơ hữu", key: "vien_chuc_co_huu" },
        { label: "Số giờ nghiên cứu khoa học định mức trong năm", key: "so_gio_nckh_dinh_muc" },
        { label: "Trường hợp giảm định mức", key: "truong_hop_giam_dinh_muc" },
        { label: "Số ngày nếu thuộc trường hợp 3", key: "ngay_neu_thuoc_case3" },
        { label: "Định mức giờ NCKH", key: "dinh_muc_gio_nckh" },
        { label: "Ghi chú", key: "ghi_chu" },
    ];
    const articleColumns = [
        { label: "DOI, minh chứng bài báo", key: "doi" },
        { label: "Ngày", key: "ngay" },
        { label: "Tên tạp chí, kỷ yếu", key: "ten_tap_chi" },
        { label: "Tên nhà xuất bản, đơn vị chủ quản", key: "ten_nha_xuat_ban" },
        { label: "Ngôn ngữ xuất bản", key: "ngon_ngu" },
        { label: "Phạm vi, cấp độ", key: "pham_vi_cap_do" },
        { label: "Chỉ số Impact Factor(IF) nếu có", key: "impact_factor" },
        { label: "Giờ chuẩn của hoạt động", key: "gio_chuan_hoat_dong" },
        { label: "Vai trò", key: "vai_tro" },
        { label: "Tổng số thành viên cùng vai trò", key: "tong_so_thanh_vien" },
        { label: "Tổng số tác giả", key: "tong_so_tac_gia" },
        { label: "Tỷ lệ đóng góp", key: "ty_le_dong_gop" },
        { label: "Giờ quy đổi", key: "gio_quy_doi" },
    ];
    const documentColumns = [
        { label: "Mã số nhân viên", key: "msnv" },
        { label: "Mã tài liệu", key: "ma_tai_lieu" },
        { label: "Hoạt động", key: "hoat_dong" },
        { label: "Tên sách", key: "ten_sach" },
        { label: "Tái bản", key: "tai_ban" },
        { label: "Tổng số trang sách", key: "tong_so_trang" },
        { label: "Ngôn ngữ", key: "ngon_ngu" },
        { label: "Ngày xuất bản", key: "ngay_xuat_ban" },
        { label: "Giờ chuẩn hoạt động", key: "gio_chuan_hoat_dong" },
        { label: "Vai trò", key: "vai_tro" },
        { label: "Tổng số thành viên", key: "tong_so_thanh_vien" },
        { label: "Tổng số trang phụ trách", key: "tong_so_trang_phu_trach" },
        { label: "Tỷ lệ đóng góp", key: "ty_le_dong_gop" },
        { label: "Giờ quy đổi", key: "gio_quy_doi" },
    ];
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Tìm kiếm thông tin</h1>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Nhập từ khóa tìm kiếm"
                    className="border border-gray-300 rounded-lg p-2 flex-1 w-full sm:w-auto"
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2"
                >
                    <option value="msnv">Tìm theo mã nhân viên</option>
                    <option value="ma">Tìm theo mã bảng</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                >
                    Tìm kiếm
                </button>
            </div>

            {result && (
                <div className="mt-8">
                    {/* Thông tin nhân viên */}
                    {result.user && (
                        <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
                            <table className="w-full border-collapse border border-gray-300 text-left">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Mã nhân viên</th>
                                        <th className="border border-gray-300 px-4 py-2">Họ tên</th>
                                        <th className="border border-gray-300 px-4 py-2">Năm áp dụng</th>
                                        <th className="border border-gray-300 px-4 py-2">Cở sở</th>
                                        <th className="border border-gray-300 px-4 py-2">Đơn vị</th>
                                        <th className="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Xóa</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mở rộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.user.map((user, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="bg-gray-800 text-white border-b-2 border-white">
                                                <td className="border border-gray-300 px-4 py-2">{user.msnv}</td>
                                                <td className="border border-gray-300 px-4 py-2">{user.ho_ten}</td>
                                                <td className="border border-gray-300 px-4 py-2">{user.nam_ap_dung}</td>
                                                <td className="border border-gray-300 px-4 py-2">{user.co_so}</td>
                                                <td className="border border-gray-300 px-4 py-2">{user.don_vi || "Chưa cập nhật"}</td>
                                                <td>
                                                    <button onClick={() => handleEditUserClick(user.msnv)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                                        <ModeEditOutlineOutlinedIcon className='text-white' />
                                                    </button>
                                                </td>
                                                {/* <td className="p-2">
                                                    <button onClick={() => handleDelete(user.msnv)} className="bg-red-600 text-white p-2 rounded">
                                                        <DeleteIcon />
                                                    </button>
                                                </td> */}
                                                <td className="p-2">
                                                    <button onClick={() => toggleUserExpand(index)}>
                                                        {expandedUserIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedUserIndex === index ? '' : 'hidden'}`}>
                                                <td className="p-4" colSpan="7">
                                                    <DetailTable details={user} columns={userColumns} />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {result.articles && (
                        <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Bài báo khoa học</h2>
                            <table className="w-full border-collapse border border-gray-300 text-left">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Mã số nhân viên</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Họ tên</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mã bài báo</th>
                                        <th className="border border-gray-300 px-4 py-2">Hoạt động</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên bài báo</th>
                                        <th className="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Xóa</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mở rộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.articles.map((baiBao, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="bg-gray-800 text-white border-b-2 border-white">
                                                <td className="border border-gray-300 px-4 py-2">{baiBao.msnv}</td>
                                                <td className="border border-gray-300 px-4 py-2">{baiBao.ma_bai_bao}</td>
                                                <td className="border border-gray-300 px-4 py-2">{baiBao.ten_bai_bao}</td>
                                                <td className="border border-gray-300 px-4 py-2">{baiBao.hoat_dong || "Chưa cập nhật"}</td>
                                                <td className='items-center'>
                                                    <button onClick={() => handleEditArtClick(baiBao.ma_bai_bao)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                                        <ModeEditOutlineOutlinedIcon className='text-white' />
                                                    </button>
                                                </td>
                                                <td className="p-2">
                                                    <button onClick={() => toggleArticleExpand(index)}>
                                                        {expandedArticleIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedArticleIndex === index ? '' : 'hidden'}`}>
                                                <td className="p-4" colSpan="7">
                                                    <DetailTable details={baiBao} columns={articleColumns} />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {result.articles && (
                        <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Tài liệu, Sách</h2>
                            <table className="w-full border-collapse border border-gray-300 text-left">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Mã số nhân viên</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Họ tên</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mã tài liệu</th>
                                        <th className="border border-gray-300 px-4 py-2">Hoạt động</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên tài liệu, sách</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.documents.map((document, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="bg-gray-800 text-white border-b-2 border-white">
                                                <td className="border border-gray-300 px-4 py-2">{document.msnv}</td>
                                                <td className="border border-gray-300 px-4 py-2">{document.ma_tai_lieu}</td>
                                                <td className="border border-gray-300 px-4 py-2">{document.hoat_dong}</td>
                                                <td className="border border-gray-300 px-4 py-2">{document.ten_sach}</td>
                                                <td className="p-2">
                                                    <button onClick={() => toggleArticleExpand(index)}>
                                                        {expandedArticleIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedArticleIndex === index ? '' : 'hidden'}`}>
                                                <td className="p-4" colSpan="7">
                                                    <DetailTable details={document} columns={documentColumns} />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default Search;