import React, { useEffect, useState } from 'react';
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
    const [expandedDocIndex, setExpandedDocIndex] = useState(null);
    const [expandedInitIndex, setExpandedInitIndex] = useState(null);
    const [expandedConfIndex, setExpandedConfIndex] = useState(null);
    const [expandedRepIndex, setExpandedRepIndex] = useState(null);
    const [expandedCouIndex, setExpandedCouIndex] = useState(null);
    const [expandedProIndex, setExpandedProIndex] = useState(null);
    const [expandedTpcIndex, setExpandedTpcIndex] = useState(null);

    const toggleInitExpand = (index) => {
        setExpandedInitIndex(expandedInitIndex === index ? null : index);
    };
    const toggleConfExpand = (index) => {
        setExpandedConfIndex(expandedConfIndex === index ? null : index);
    };

    const toggleRepExpand = (index) => {
        setExpandedRepIndex(expandedRepIndex === index ? null : index);
    };
    const toggleCouExpand = (index) => {
        setExpandedCouIndex(expandedCouIndex === index ? null : index);
    };
    const toggleProExpand = (index) => {
        setExpandedProIndex(expandedProIndex === index ? null : index);
    };

    const toggleTpcleExpand = (index) => {
        setExpandedTpcIndex(expandedTpcIndex === index ? null : index);
    };
    const toggleDocExpand = (index) => {
        setExpandedDocIndex(expandedDocIndex === index ? null : index);
    };
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
    const handleEditDocClick = (docId) => {
        navigate(`/func/document/editDocument/${docId}`);
    };
    const handleEditInitClick = (initId) => {
        navigate(`/func/initiative/editInitiative/${initId}`);
    };
    const handleEditConfClick = (cfsId) => {
        navigate(`/func/scientificConferences/editConferences/${cfsId}`);
    };
    const handleEditRepClick = (repId) => {
        navigate(`/func/scientificReport/editSciReport/${repId}`);
    };
    const handleEditCouClick = (couId) => {
        navigate(`/func/scientificResearchCouncil/editSciResCou/${couId}`);
    };
    const handleEditProdClick = (proId) => {
        navigate(`/func/scientificResearchProduct/editProduct/${proId}`);
    };
    const handleEditTpcClick = (tpcId) => {
        navigate(`/func/scientificResearchTopic/editSciResTpc/${tpcId}`);
    };
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setIsLoggedIn(!!userId); // Kiểm tra trạng thái đăng nhập
    }, []);
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
    const reportColumns = [
        { label: "Tên đề tài", key: "ten_de_tai" },
        { label: "Minh chứng", key: "minh_chung" },
        { label: "Tên hội nghị", key: "ten_hoi_nghi" },
        { label: "Đơn vị tổ chức", key: "don_vi_to_chuc" },
        { label: "Ngày", key: "ngay" },
        { label: "Phạm vi", key: "pham_vi" },
        { label: "Giải thưởng", key: "giai_thuong" },
        { label: "Hình thức", key: "hinh_thuc" },
        { label: "Giờ quy đổi", key: "gio_quy_doi" },
        { label: "Tổng số tác giả", key: "tong_so_tac_gia" },
        { label: "Vai trò", key: "vai_tro" },
        { label: "Tống số tác giả cùng vai trò", key: "tong_so_tac_gia_vai_tro" },
        { label: "Tỷ lệ đóng góp", key: "ty_le_dong_gop" },
        { label: "Giờ quy đổi", key: "gio_quy_doi" },
    ];
    const councilColumns = [
        { label: "Ngày", key: "ngay" },
        { label: "Vai trò", key: "vai_tro" },
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
    const conferenceColumns = [
        // { label: "Mã số nhân viên", key: "msnv" },
        // { label: "Mã tài liệu", key: "ma_tai_lieu" },
        // { label: "Hoạt động", key: "hoat_dong" },
        // { label: "Tên sách", key: "ten_sach" },
        { label: "Đơn vị tổ chức", key: "don_vi_to_chuc" },
        { label: "Ngày", key: "ngay" },
        { label: "Phạm vi", key: "pham_vi" },
        { label: "Thời lượng", key: "thoi_luong" },
        { label: "Giờ chuẩn hoạt động", key: "gio_chuan_hoat_dong" },
        { label: "Giờ quy đổi", key: "gio_quy_doi" },
    ];
    const topicColumns = [
        { label: "Tên đề tài", key: "ten_de_tai" },
        { label: "Mã số hợp đồng", key: "ma_so_hop_dong" },
        { label: "Ngày", key: "ngay" },
        { label: "Giờ chuẩn hoạt động", key: "gio_chuan_hoat_dong" },
        { label: "Vai trò", key: "vai_tro" },
        { label: "Số lượng thành viên cùng vai trò", key: "so_luong_thanh_vien_vai_tro" },
        { label: "Tỷ lệ đóng góp", key: "ty_le_dong_gop" },
        { label: "Giờ quy đổi", key: "gio_quy_doi" },
    ];
    const productColumns = [
        { label: "Đơn vị cấp chứng nhận", key: "don_vi_cap_chung_nhan" },
        { label: "Phạm vi", key: "pham_vi" },
        { label: "Minh chứng", key: "minh_chung" },
        { label: "Ngày", key: "ngay" },
        { label: "Giờ chuẩn hoạt động", key: "gio_chuan_hoat_dong" },
        { label: "Tỷ lệ đóng góp", key: "ty_le_dong_gop" },
        { label: "Giờ quy đổi", key: "gio_quy_doi" },
    ];
    const initiativeColumns = [
        { label: "Mã số chứng nhận", key: "ma_so_chung_nhan" },
        { label: "Ngày", key: "ngay" },
        { label: "Lợi ích", key: "loi_ich" },
        { label: "Số tiền lợi ích", key: "so_tien_loi_ich" },
        { label: "Giờ chuẩn hoạt động", key: "gio_chuan_hoat_dong" },
        { label: "Vai trò", key: "vai_tro" },
        { label: "Số lượng thành viên cùng vai trò", key: "so_luong_thanh_vien_vai_tro" },
        { label: "Tỷ lệ đóng góp", key: "ty_le_dong_gop" },
        { label: "Giờ quy đổi", key: "gio_quy_doi" },
    ];

    return (
        <div className="p-8 mt-24">
            <h1 className="text-2xl font-bold mb-6">Tìm kiếm thông tin</h1>
            {isLoggedIn && (
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
            )}

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
                    {result.documents && (
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
                                        <th className="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Xóa</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mở rộng</th>
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
                                                <td>
                                                    <button onClick={() => handleEditDocClick(document.ma_tai_lieu)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                                        <ModeEditOutlineOutlinedIcon className='text-white' />
                                                    </button>
                                                </td>
                                                <td className="p-2">
                                                    <button onClick={() => toggleDocExpand(index)}>
                                                        {expandedDocIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedDocIndex === index ? '' : 'hidden'}`}>
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

                    {result.topic && (
                        <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Nghiên cứu đề tài</h2>
                            <table className="w-full border-collapse border border-gray-300 text-left">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Mã số nhân viên</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Họ tên</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mã đề tài</th>
                                        <th className="border border-gray-300 px-4 py-2">Hoạt động</th>
                                        <th className="border border-gray-300 px-4 py-2">Phạm vi cấp độ</th>
                                        <th className="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Xóa</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mở rộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.topic.map((tpc, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="bg-gray-800 text-white border-b-2 border-white">
                                                <td className="border border-gray-300 px-4 py-2">{tpc.msnv}</td>
                                                <td className="border border-gray-300 px-4 py-2">{tpc.ma_de_tai}</td>
                                                <td className="border border-gray-300 px-4 py-2">{tpc.hoat_dong}</td>
                                                <td className="border border-gray-300 px-4 py-2">{tpc.pham_vi_cap_do}</td>
                                                <td>
                                                    <button onClick={() => handleEditTpcClick(tpc.ma_de_tai)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                                        <ModeEditOutlineOutlinedIcon className='text-white' />
                                                    </button>
                                                </td>
                                                <td className="p-2">
                                                    <button onClick={() => toggleTpcleExpand(index)}>
                                                        {expandedTpcIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedTpcIndex === index ? '' : 'hidden'}`}>
                                                <td className="p-4" colSpan="7">
                                                    <DetailTable details={tpc} columns={topicColumns} />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {result.initiatives && (
                        <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Sáng kiến, cải tiến</h2>
                            <table className="w-full border-collapse border border-gray-300 text-left">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Mã số nhân viên</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Họ tên</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mã sáng kiến</th>
                                        <th className="border border-gray-300 px-4 py-2">Hoạt động</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên công trình</th>
                                        <th className="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Xóa</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mở rộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.initiatives.map((init, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="bg-gray-800 text-white border-b-2 border-white">
                                                <td className="border border-gray-300 px-4 py-2">{init.msnv}</td>
                                                <td className="border border-gray-300 px-4 py-2">{init.ma_sang_kien}</td>
                                                <td className="border border-gray-300 px-4 py-2">{init.hoat_dong}</td>
                                                <td className="border border-gray-300 px-4 py-2">{init.ten_cong_trinh}</td>
                                                <td>
                                                    <button onClick={() => handleEditInitClick(init.ma_sang_kien)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                                        <ModeEditOutlineOutlinedIcon className='text-white' />
                                                    </button>
                                                </td>
                                                <td className="p-2">
                                                    <button onClick={() => toggleInitExpand(index)}>
                                                        {expandedInitIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedInitIndex === index ? '' : 'hidden'}`}>
                                                <td className="p-4" colSpan="7">
                                                    <DetailTable details={init} columns={initiativeColumns} />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {result.products && (
                        <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Sản phẩm KHCN</h2>
                            <table className="w-full border-collapse border border-gray-300 text-left">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Mã số nhân viên</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Họ tên</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mã sản phẩm</th>
                                        <th className="border border-gray-300 px-4 py-2">Hoạt động</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
                                        <th className="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Xóa</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mở rộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.products.map((prod, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="bg-gray-800 text-white border-b-2 border-white">
                                                <td className="border border-gray-300 px-4 py-2">{prod.msnv}</td>
                                                <td className="border border-gray-300 px-4 py-2">{prod.ma_san_pham}</td>
                                                <td className="border border-gray-300 px-4 py-2">{prod.hoat_dong}</td>
                                                <td className="border border-gray-300 px-4 py-2">{prod.ten_san_pham}</td>
                                                <td>
                                                    <button onClick={() => handleEditProdClick(prod.ma_san_pham)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                                        <ModeEditOutlineOutlinedIcon className='text-white' />
                                                    </button>
                                                </td>
                                                <td className="p-2">
                                                    <button onClick={() => toggleProExpand(index)}>
                                                        {expandedProIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedProIndex === index ? '' : 'hidden'}`}>
                                                <td className="p-4" colSpan="7">
                                                    <DetailTable details={prod} columns={productColumns} />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {result.councils && (
                        <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Hội đồng</h2>
                            <table className="w-full border-collapse border border-gray-300 text-left">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Mã số nhân viên</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Họ tên</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mã hội đồng</th>
                                        <th className="border border-gray-300 px-4 py-2">Hoạt động</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên đề tài</th>
                                        <th className="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Xóa</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mở rộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.councils.map((cou, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="bg-gray-800 text-white border-b-2 border-white">
                                                <td className="border border-gray-300 px-4 py-2">{cou.msnv}</td>
                                                <td className="border border-gray-300 px-4 py-2">{cou.ma_hoi_dong}</td>
                                                <td className="border border-gray-300 px-4 py-2">{cou.hoat_dong}</td>
                                                <td className="border border-gray-300 px-4 py-2">{cou.ten_de_tai}</td>
                                                <td>
                                                    <button onClick={() => handleEditCouClick(cou.ma_hoi_dong)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                                        <ModeEditOutlineOutlinedIcon className='text-white' />
                                                    </button>
                                                </td>
                                                <td className="p-2">
                                                    <button onClick={() => toggleCouExpand(index)}>
                                                        {expandedCouIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedCouIndex === index ? '' : 'hidden'}`}>
                                                <td className="p-4" colSpan="7">
                                                    <DetailTable details={cou} columns={councilColumns} />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {result.reports && (
                        <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Báo báo khoa học</h2>
                            <table className="w-full border-collapse border border-gray-300 text-left">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Mã số nhân viên</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Họ tên</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mã báo cáo</th>
                                        <th className="border border-gray-300 px-4 py-2">Hoạt động</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên bài fulltext</th>
                                        <th className="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Xóa</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mở rộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.reports.map((rep, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="bg-gray-800 text-white border-b-2 border-white">
                                                <td className="border border-gray-300 px-4 py-2">{rep.msnv}</td>
                                                <td className="border border-gray-300 px-4 py-2">{rep.ma_bao_cao}</td>
                                                <td className="border border-gray-300 px-4 py-2">{rep.hoat_dong}</td>
                                                <td className="border border-gray-300 px-4 py-2">{rep.ten_bai_fulltext}</td>
                                                <td>
                                                    <button onClick={() => handleEditRepClick(rep.ma_bao_cao)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                                        <ModeEditOutlineOutlinedIcon className='text-white' />
                                                    </button>
                                                </td>
                                                <td className="p-2">
                                                    <button onClick={() => toggleRepExpand(index)}>
                                                        {expandedRepIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedRepIndex === index ? '' : 'hidden'}`}>
                                                <td className="p-4" colSpan="7">
                                                    <DetailTable details={rep} columns={reportColumns} />
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {result.conferences && (
                        <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Hội nghị khoa học</h2>
                            <table className="w-full border-collapse border border-gray-300 text-left">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Mã số nhân viên</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Họ tên</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mã hội nghị</th>
                                        <th className="border border-gray-300 px-4 py-2">Hoạt động</th>
                                        <th className="border border-gray-300 px-4 py-2">Tên hội nghị</th>
                                        <th className="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
                                        {/* <th className="border border-gray-300 px-4 py-2">Xóa</th> */}
                                        <th className="border border-gray-300 px-4 py-2">Mở rộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.conferences.map((conf, index) => (
                                        <React.Fragment key={index}>
                                            <tr className="bg-gray-800 text-white border-b-2 border-white">
                                                <td className="border border-gray-300 px-4 py-2">{conf.msnv}</td>
                                                <td className="border border-gray-300 px-4 py-2">{conf.ma_hoi_nghi}</td>
                                                <td className="border border-gray-300 px-4 py-2">{conf.hoat_dong}</td>
                                                <td className="border border-gray-300 px-4 py-2">{conf.ten_hoi_nghi}</td>
                                                <td>
                                                    <button onClick={() => handleEditConfClick(conf.ma_hoi_nghi)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                                        <ModeEditOutlineOutlinedIcon className='text-white' />
                                                    </button>
                                                </td>
                                                <td className="p-2">
                                                    <button onClick={() => toggleConfExpand(index)}>
                                                        {expandedConfIndex === index ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className={`transition-all duration-300 ${expandedConfIndex === index ? '' : 'hidden'}`}>
                                                <td className="p-4" colSpan="7">
                                                    <DetailTable details={conf} columns={conferenceColumns} />
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