import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@mui/icons-material";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';


const data = [
    {
        name: 'Trần Duy Thanh',
        employeeId: 'A29-203',
        action: 'Biên dịch tài liệu',
        nameSciCfs: 'Tên bài fulltext đã báo cáo',
        organizingUnit: 'Y HN',
        day: '04/10/2024',
        range: 'Hội nghị trong nước',
        durationAttend: 3,
        standardTime: 10,
        timeRoleTemp: 2,
    },
    {
        name: 'Trần Duy Thanh',
        employeeId: 'A29-203',
        action: 'Biên dịch tài liệu',
        nameSciCfs: 'Tên bài fulltext đã báo cáo',
        organizingUnit: 'Y TPHCM',
        day: '04/10/2024',
        range: 'Hội nghị trong nước',
        durationAttend: 3,
        standardTime: 10,
        timeRoleTemp: 2,
    },
];
// Additional data entries here...


const ScientificConferences = () => {

    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate('/func/scientificConferences/addScientificCfs');
    };

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className='mx-8 bg-orange-400 w-full'>
            <div className='bg-slate-400 w-full relative p-2'>
                <span className='text-3xl font-semibold text-white block text-center break-words pr-20'>
                    THAM DỰ HỘI NGHỊ KHOA HỌC
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
                            <th className="p-2">Tên hội nghị khoa học đã tham dự</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((scientificCfs, index) => (
                            <React.Fragment key={index}>
                                <tr className="bg-gray-800 text-white border-b-2 border-white">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{scientificCfs.name}</td>
                                    <td className="p-2">{scientificCfs.employeeId}</td>
                                    <td className="p-2">{scientificCfs.action}</td>
                                    <td className="p-2">{scientificCfs.nameSciCfs}</td>
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
                                                        <td className="font-semibold text-gray-700 w-1/2 py-2">Đơn vị tổ chức</td>
                                                        <td className="text-gray-600 py-2">{scientificCfs.organizingUnit}</td>
                                                    </tr>

                                                    <tr className="py-2">
                                                        <td className="font-semibold text-gray-700 py-2">Ngày</td>
                                                        <td className="text-gray-600 py-2">{scientificCfs.day}</td>
                                                    </tr>

                                                    <tr className="py-2">
                                                        <td className="font-semibold text-gray-700 py-2">Phạm vi</td>
                                                        <td className="text-gray-600 py-2">{scientificCfs.range}</td>
                                                    </tr>

                                                    <tr className="py-2">
                                                        <td className="font-semibold text-gray-700 py-2">Thời lượng tham dự (đơn vị tính: buổi)</td>
                                                        <td className="text-gray-600 py-2">{scientificCfs.durationAttend}</td>
                                                    </tr>

                                                    <tr className="py-2">
                                                        <td className="font-semibold text-gray-700 py-2">Giờ chuẩn hoạt động</td>
                                                        <td className="text-gray-600 py-2">{scientificCfs.standardTime}</td>
                                                    </tr>

                                                    <tr className="py-2">
                                                        <td className="font-semibold text-gray-700 py-2">Giờ chuẩn quy đổi theo vai trò(tạm tính)</td>
                                                        <td className="text-gray-600 py-2">{scientificCfs.timeRoleTemp}</td>
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

export default ScientificConferences;
