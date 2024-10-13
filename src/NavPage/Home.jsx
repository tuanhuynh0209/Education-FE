import React from 'react';
import BBKH from '../image/BBKH.svg';
import BCKH from '../image/BCKH.svg';
import BTKDT from '../image/BTKDT.svg';
import DTNCKH from '../image/DTNCKH.svg';
import HDNCKH from '../image/HDNCKH.svg';
import SKCT from '../image/SKCT.svg';
import SPKHCN from '../image/SPKHCN.svg';
import STL from '../image/STL.svg';
import TTVC from '../image/TTVC.svg';
import TGHNKH from '../image/TGHNKH.svg';
import { NavLink } from 'react-router-dom';
import DivCard from '../component/DivCard';
import '../TopNav/topNav.css'

const Home = () => {
  const cards = [
    { title: "Thông tin viên chức", icon: TTVC, link: "/func/information" },
    { title: "Bài báo khoa học", icon: BBKH, link: "/func/scientificArticle" },
    { title: "Đề tài NCKH", icon: DTNCKH, link: "/func/scientificResearchTopic" },
    { title: "Hội đồng nghiên cứu khoa học", icon: HDNCKH, link: "/func/scientificResearchCouncil" },
    { title: "Sách, tài liệu", icon: STL, link: "/func/document" },
    { title: "Báo cáo khoa học", icon: BCKH, link: "/func/scientificReport" },
    { title: "Tham dự hội nghị khoa học", icon: TGHNKH, link: "/func/scientificConferences" },
    { title: "Sản phẩm KHCN", icon: SPKHCN, link: "/func/scientificResearchProduct" },
    { title: "Sáng kiến, cải tiến", icon: SKCT, link: "/func/initiative" },
    { title: "Bảng thống kê đào tạo", icon: BTKDT, link: "/func/statistic" }
  ];
  return (
    <>
      <header className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/Gioi_thieu_tong_quan_ve_benh_vien_Dai_hoc_Y_Duoc_co_so_2_1_c819a7ec98.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center text-white">
          <p className="text-6xl font-bold">Quản lý đào tạo và nghiên cứu khoa học</p>
          <p className="mt-2">Tin nổi bật: NGUYỄN ANH LỮ: Sáng kiến cải tiến thiết bị Y khoa hỗ trợ nhận diện u bướu...</p>
        </div>
      </header>

      <div className="relative bg-white rounded-lg p-14 mt-[-50px] mx-auto shadow-lg w-4/5 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {cards.map((card, index) => (
            <NavLink to={card.link} key={index}>
              <div className="container child bounce">
                <DivCard item={card} />
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>

  )
}

export default Home