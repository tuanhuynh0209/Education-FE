import React from 'react';
import BBKH from '../image/BBKH1.svg';
import BCKH from '../image/BCKH1.svg';
import BTKDT from '../image/BTKDT1.svg';
import DTNCKH from '../image/DTNCKH1.svg';
import HDNCKH from '../image/HDNCKH1.svg';
import SKCT from '../image/SKCT1.svg';
import SPKHCN from '../image/SPKHCN1.svg';
import STL from '../image/STL1.svg';
import TTVC from '../image/TTVC1.svg';
import TGHNKH from '../image/TGHNKH1.svg';
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/sideBar.css';
// Define your navigation links array
const navLinks = [
    { path: "/func/information", icon: TTVC, display: "Thông tin viên chức" },
    { path: "/func/scientificArticle", icon: BBKH, display: "Bài báo khoa học" },
    { path: "/func/scientificResearchTopic", icon: DTNCKH, display: "Đề tài nghiên cứu khoa học" },
    { path: "/func/scientificResearchCouncil", icon: HDNCKH, display: "Hội đồng NCKH cấp cơ sở" },
    { path: "/func/document", icon: STL, display: "Sách, tài liệu" },
    { path: "/func/scientificReport", icon: BCKH, display: "Báo cáo khoa học" },
    { path: "/func/scientificConferences", icon: TGHNKH, display: "Tham dự hội nghị khoa học" },
    { path: "/func/scientificResearchProduct", icon: SPKHCN, display: "Sản phẩm KHCN" },
    { path: "/func/initiative", icon: SKCT, display: "Sáng kiến, cải tiến" },
    { path: "/func/statistic", icon: BTKDT, display: "BTK đào tạo y khoa" },
];


const MainPage = () => {
    return (
        <div>
            {/* Header section */}
            <header
                className="relative h-[400px] flex items-center justify-center bg-cover bg-center rounded-b-3xl"
                style={{
                    backgroundImage: 'url(https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/Gioi_thieu_tong_quan_ve_benh_vien_Dai_hoc_Y_Duoc_co_so_2_1_c819a7ec98.jpg)',
                }}
            >
                <div className="absolute inset-0 bg-black opacity-30 rounded-b-3xl"></div>
                <div className="relative z-10 text-center text-white">
                    <p className="text-6xl font-bold">Quản lý đào tạo và nghiên cứu khoa học</p>
                    <p className="mt-2">
                        Tin nổi bật: NGUYỄN ANH LỮ: Sáng kiến cải tiến thiết bị Y khoa hỗ trợ nhận diện u bướu...
                    </p>
                </div>
            </header>

            <div className="p-3 flex justify-end text-center">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="bg-[#F9A150] rounded-lg p-3.5 outline-none mb-4 text-white"
                />

            </div>

            {/* Main content */}
            <div className="flex flex-col md:flex-row ">
                {/* Left side - Sidebar */}
                <aside className="w-full md:w-1/3 lg:w-1/4 p-4 bg-[#FDE4CC] rounded-r-3xl">


                    <ul className="nav__list space-y-4">
                        {navLinks.map((item, index) => {
                            ;
                            return (
                                <li key={index} className="nav__item">
                                    <NavLink
                                        to={item.path}
                                        className={(navClass) =>
                                            navClass.isActive ? "nav__active nav__link " : "nav__link "
                                        }
                                    >
                                        <img src={item.icon} alt={item.display} className="w-6 h-6" />
                                        <p>{item.display}</p>
                                    </NavLink>
                                </li>
                            );
                        })}

                    </ul>
                </aside>

                {/* Right side - Main content */}
                <div className='height-div2 h-full flex flex-row flex-wrap'>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
