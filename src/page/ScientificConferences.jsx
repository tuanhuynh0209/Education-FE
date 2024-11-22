import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import axios from 'axios';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailTable from '../component/DetailTable';
import * as XLSX from 'xlsx';


const ScientificConferences = () => {

    const navigate = useNavigate();
    const [conferences, setConferences] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchEmployeeName = async (msnv) => {
        try {
            const response = await axios.get(`http://localhost:3001/education/users/${msnv}`);
            return response.data.ho_ten;
        } catch (err) {
            console.error(err);
        }
    }
    // check tk admin
    useEffect(() => {
        const fetchUserRole = () => {
            const userId = localStorage.getItem('userId');
            // Kiểm tra nếu username là admin
            setIsAdmin(userId === "admin123");
        };

        fetchUserRole();
    }, []);

    // hàm check user - admin để hiển thị list tương ứng
    useEffect(() => {
        const fetchUserRoleAndData = async () => {
            const userId = localStorage.getItem('userId');
            const isAdminUser = userId === "admin123";
            setIsAdmin(isAdminUser);

            // Fetch users based on role
            try {
                if (isAdminUser) {
                    const response = await axios.get("http://localhost:3001/education/getAllSciConf");
                    const conferencesWName = await Promise.all(response.data.map(async (conf) => {
                        const employeeName = await fetchEmployeeName(conf.msnv);
                        return { ...conf, ho_ten: employeeName };
                    }));
                    setConferences(conferencesWName);
                } else {
                    const response = await axios.get(`http://localhost:3001/education/getCfsOfUser/${userId}`);
                    const conferencesWName = await Promise.all(response.data.map(async (conf) => {
                        const employeeName = await fetchEmployeeName(conf.msnv);
                        return { ...conf, ho_ten: employeeName };
                    }));
                    setConferences(conferencesWName);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserRoleAndData();
    }, []);

    // hàm xóa tài liệu
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn chắc chắn muốn xóa bài đăng này?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/education/deleteConf/${id}`);
                setConferences(conferences.filter(cfs => cfs.ma_hoi_nghi !== id));
                alert("Conferences deleted successfully");
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleAddClick = () => {
        navigate('/func/scientificConferences/addScientificCfs');
    };
    const handleEditClick = (cfsId) => {
        navigate(`/func/scientificConferences/editConferences/${cfsId}`);
    };

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setIsLoggedIn(!!userId); // Kiểm tra trạng thái đăng nhập
    }, []);
    const conferenceColumns = [
        // { label: "Mã số nhân viên", key: "msnv" },
        // { label: "Mã tài liệu", key: "ma_tai_lieu" },
        { label: "Hoạt động", key: "hoat_dong" },
        // { label: "Tên sách", key: "ten_sach" },
        { label: "Đơn vị tổ chức", key: "don_vi_to_chuc" },
        { label: "Ngày", key: "ngay" },
        { label: "Phạm vi", key: "pham_vi" },
        { label: "Thời lượng tham dự (đơn vị tính: buổi)", key: "thoi_luong" },
        { label: "Giờ chuẩn hoạt động", key: "gio_chuan_hoat_dong" },
        { label: "Giờ chuẩn quy đổi theo vai trò(tạm tính)", key: "gio_quy_doi" },
    ];

    const handleExport = () => {
        if (conferences.length === 0) {
            alert("Không có dữ liệu để export!");
            return;
        }
        // Chuẩn bị dữ liệu cho file Excel
        const formattedData = conferences.map((conf, index) => ({
            STT: index + 1,
            "Họ và Tên": conf.ho_ten,
            "Mã số nhân viên": conf.msnv,
            "Mã hội nghị": conf.ma_hoi_nghi,
            "Tên hội nghị": conf.ten_hoi_nghi,
            "Hoạt động": conf.hoat_dong || "Chưa cập nhật",
            "Đơn vị tổ chức": conf.don_vi_to_chuc || "Chưa cập nhật",
            "Ngày": conf.ngay || "Chưa cập nhật",
            "Phạm vi": conf.pham_vi || "Chưa cập nhật",
            "Thời lượng": conf.thoi_luong || "Chưa cập nhật",
            "Giờ chuẩn hoạt động": conf.gio_chuan_hoat_dong || "Chưa cập nhật",
            "Giờ quy đổi": conf.gio_quy_doi || "Chưa cập nhật",
        }));

        // Tạo một worksheet và workbook
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Scientific Conferences");

        // Xuất file Excel
        XLSX.writeFile(workbook, "ScientificConferences.xlsx");
    };

    const handlePrint = () => {
        // Lọc hoặc chuẩn bị nội dung cần in
        const printContent = document.getElementById("printableArea");
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid black; padding: 8px; text-align: center; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
            </body>
            </html>
        `);
        newWindow.document.close();
        newWindow.print();
    };

    return (
        <div className="mx-8 bg-orange-400 w-full">
            <div className="bg-slate-400 w-full relative p-2">
                <span className="text-3xl font-semibold text-white block text-center break-words pr-20">
                    THAM GIA HỘI NGHỊ KHOA HỌC
                </span>
                {isLoggedIn && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-4">
                        <button
                            onClick={handleAddClick}
                            className="flex gap-1 font-semibold text-white bg-[#F9A150] p-2 rounded-sm"
                        >
                            <LibraryAddOutlinedIcon className="text-white" />
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex gap-1 font-semibold text-white bg-blue-500 p-2 rounded-sm"
                        >
                            <span>Export</span>
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex gap-1 font-semibold text-white bg-green-500 p-2 rounded-sm"
                        >
                            <span>Print</span>
                        </button>
                    </div>
                )}
            </div>
            <div id="printableArea" className="bg-slate-300 w-full mt-5">
                <table className="table-auto w-full text-center" style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr className="bg-gray-800 text-white border-b-2">
                            <th className="p-2">STT</th>
                            <th className="p-2">Họ và tên</th>
                            <th className="p-2">Mã số nhân viên</th>
                            <th className="p-2">Mã hội nghị</th>
                            <th className="p-2">Tên hội nghị khoa học đã tham dự</th>
                            <th className="p-2">Chỉnh sửa</th>
                            <th className="p-2">Xóa</th>
                            <th className="p-2">Mở rộng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conferences.map((scientificCfs, index) => (
                            <React.Fragment key={index}>
                                <tr className="bg-[#4682B4] text-white border-b-2 border-white">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{scientificCfs.ho_ten}</td>
                                    <td className="p-2">{scientificCfs.msnv}</td>
                                    <td className="p-2">{scientificCfs.ma_hoi_nghi}</td>
                                    <td className="p-2">{scientificCfs.ten_hoi_nghi}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(scientificCfs.ma_hoi_nghi)} className='font-semibold text-white bg-[#F9A150] p-2 rounded-sm'>
                                            <ModeEditOutlineOutlinedIcon className='text-white' />
                                        </button>
                                    </td>

                                    <td className="p-2">
                                        <button onClick={() => handleDelete(scientificCfs.ma_hoi_nghi)} className="bg-red-600 text-white p-2 rounded">
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
                                        <DetailTable details={scientificCfs} columns={conferenceColumns} />
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

export default ScientificConferences;
