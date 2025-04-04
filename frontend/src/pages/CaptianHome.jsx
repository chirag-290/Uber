import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptianDetails from "../components/CaptianDetails";
import Ridepop from "../components/Ridepop";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from "../../context/CaptainContext";
import { SocketContext } from "../../context/SocketProvider";
import { use } from "react";

const CaptianHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const [confirmridePopupPanel, setconfirmridePopupPanel] = useState(false);
  const ridePopupPanelref = useRef(null); 
  const confirmridePopupPanelref = useRef(null);  
  const [ride,setRide]=useState(null);

  const {socket }=useContext(SocketContext);
  const {captain} =useContext(CaptainDataContext);

  useEffect(() => {
    console.log("captain",captain);
    socket.emit("join",{
      userType:"captain",
      userId:captain._id
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            console.log({
              userId: captain._id,
              location: {
                  ltd: position.coords.latitude,
                  lng: position.coords.longitude
              }
          })

              socket.emit('update-location-captain', {
                  userId: captain._id,
                  location: {
                      ltd: position.coords.latitude,
                      lng: position.coords.longitude
                  }
              })
          })
      }
  }

  const locationInterval = setInterval(updateLocation, 10000)
  updateLocation()

  }, []);


  socket.on('new-ride', (data) => {
    setRide(data);
    setridePopupPanel(true);
    // console.log('data is', data)
    console.log("in new ride",data);
  })

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelref.current, {
          transform: "translateY(0)",
          padding: 24,
        });
      } else {
        gsap.to(ridePopupPanelref.current, {
          transform: "translateY(100%)",
          padding: 0,
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmridePopupPanel) {
        gsap.to(confirmridePopupPanelref.current, {
          transform: "translateY(0)",
          padding: 24,
        });
      } else {
        gsap.to(confirmridePopupPanelref.current, {
          transform: "translateY(100%)",
          padding: 0,
        });
      }
    },
    [confirmridePopupPanel]
  );
  
  
  
  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

        rideId: ride._id,
        captainId: captain._id,


    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    setridePopupPanel(false)
    setconfirmridePopupPanel(true)

}


  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        {/* <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        /> */}
        <h1 className="w-16 absolute left-5 top-5 text-2xl  bold font-bold">RideEase</h1>
        <Link
          to="/home"
          className="h-10 bg-white flex items-center justify-center rounded-full"
        >
          {/* <i className="ri-logout-box-line text-lg font-medium"></i> */}
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://t3.ftcdn.net/jpg/07/28/30/26/240_F_728302620_Xddnf5Cl0K1ACZurd6yByUzHiHMMIoe6.jpg"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptianDetails />
      </div>
      <div
        ref={ridePopupPanelref}
        className="fixed w-full z-10 bottom-0 -translate-y-full  p-3 bg-white px-3 py-6 pt-12"
      >
        <Ridepop
        ride={ride} 
        confirmride={confirmRide}
        setridePopupPanel={setridePopupPanel} setconfirmridePopupPanel={setconfirmridePopupPanel} />
      </div>
      <div
        ref={confirmridePopupPanelref}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full  p-3 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRidePopup 
        ride={ride}
        setconfirmridePopupPanel={setconfirmridePopupPanel} setridePopupPanel={setridePopupPanel}  />
      </div>
    </div>
  );
};

export default CaptianHome;
