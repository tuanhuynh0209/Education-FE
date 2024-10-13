import React from 'react'


const Introduce = () => {
  return (
    <>
      <header className="relative h-[400px] flex items-center justify-center bg-cover bg-center rounded-b-3xl"
        style={{ backgroundImage: 'url(https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/Gioi_thieu_tong_quan_ve_benh_vien_Dai_hoc_Y_Duoc_co_so_2_1_c819a7ec98.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-30 rounded-b-3xl"></div>
        <div className="relative z-10 text-center text-white">
          <p className="text-6xl font-bold">Quản lý đào tạo và nghiên cứu khoa học</p>
          <p className="mt-2">Tin nổi bật: NGUYỄN ANH LỮ: Sáng kiến cải tiến thiết bị Y khoa hỗ trợ nhận diện u bướu...</p>
        </div>
      </header>
      <div>
        {/* top body */}
        <div className=' p-2'>
          <input type="text" className="bg-[#F9A150] rounded-lg p-3.5 outline-none" />
        </div>
        {/* body 100*/}
        <div>
          {/* body left 30 or 35*/}
          <div></div>
          {/* body right 70 or 65*/}
          <div></div>
        </div>
      </div>
    </>


  )
}

export default Introduce