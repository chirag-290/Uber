import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
        <Link to="/home" className="fixed  right-2 top-2 h-10 bg-white flex items-center justify-center rounded-full">

        <i className="ri-home-4-line text-lg font-medium"></i>

        </Link>

      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646935/assets/64/93c255-87c8-4e2e-9429-cf709bf1b838/original/3.png"
            alt=""
          />
          <div>
            <h2 className="text-lg font-medium">Sarthak</h2>
            <h4 className="text-xl font-semibold -mt-1 -md-1">MP04 AB 1234</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-2-fill text-lg"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  Kankariya talab,Bhopal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">$190.20</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5  bg-green-600 text-white font-semibold p-2 rounded-lg ">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
