import React from 'react'

const DivCard = (props) => {
  const { title, icon } = props.item;
  return (
    <div className="bg-[#F9A150] p-6 my-3 rounded-xl text-center h-[180px] transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg">
      <div className="mb-3">
        <h4 className="text-2xl text-white font-semibold">{title}</h4>
      </div>

      <span>
        <i>
          <img className="mt-6 w-14 h-14 mx-auto" src={icon} alt="" />
        </i>
      </span>
    </div>
  )
}

export default DivCard;
