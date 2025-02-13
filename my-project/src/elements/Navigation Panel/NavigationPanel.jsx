import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FaHeadphones } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { PiBrowsersDuotone } from "react-icons/pi";
import { RiHome2Line } from "react-icons/ri";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { getUserCityAndState } from "../../google/googleAPI";

const NavigationPanel = ({ notifOpen, setNotifOpen, activityOpen, setActivityOpen }) => {
  const { currentUser, userLoggedIn } = useAuth();
  const [location, setLocation] = useState({ city: null, state: null });
  const navigate = useNavigate();

  const OpenNotifPanel = () => {
    setNotifOpen(true);
    setActivityOpen(false);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { city, state } = await getUserCityAndState();
        setLocation({ city, state });
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <motion.div
      animate={{
        height: "75px",
        transition: {
          duration: 0.5,
          ease: "easeIn",
          type: "spring",
          stiffness: 100,
        },
      }}
      className="w-full bg-neutral-900 bg-opacity-60 rounded-xl flex justify-between px-4"
    >
      <div className="flex text-2xl text-white items-center justify-center gap-2">
        <FaHeadphones />
        <h1 className="font-bold">LocalMix</h1>
      </div>
      <div className="flex items-center justify-center gap-4">
        <motion.button className="p-2 text-lg font-bold hover:bg-opacity-50 w-10 h-10 items-center justify-center text-white rounded-full bg-opacity-35 bg-sand-300 flex">
          <RiHome2Line size={24} />
        </motion.button>
        <div className="px-4 py-2 bg-neutral-900 w-96 text-xl transition-colors duration-300 text-white focus:border-white hover:border-sand-100 border border-neutral-900 rounded-full flex items-center">
          <CiSearch size={28} />
          <input className="h-8 border-r mx-2 text-white w-full bg-neutral-900" type="text" />
          <button
            onClick={() => {
              navigate("/browse");
            }}
            className="w-auto text-neutral-400 hover:text-white transition-all flex text-sm items-center gap-2 h-auto bg-none bg-opacity-0"
          >
            Browse
            <PiBrowsersDuotone size={28} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {location.city && location.state && (
          <div className="text-white">
            {location.city}, {location.state}
          </div>
        )}
        {userLoggedIn ? (
          <div className="flex text-white gap-6 items-center justify-center">
            {notifOpen ? (
              <IoMdNotifications onClick={() => setNotifOpen(false)} className="hover:cursor-pointer" size={28} />
            ) : (
              <IoMdNotificationsOutline onClick={OpenNotifPanel} className="hover:cursor-pointer" size={28} />
            )}
            <button
              onClick={() => navigate("/profile")}
              className="p-2 text-lg font-bold hover:bg-opacity-50 w-10 h-10 items-center justify-center text-white rounded-full bg-opacity-35 bg-sand-300 flex"
            >
              {currentUser?.name?.charAt(0)}
            </button>
          </div>
        ) : (
          <div className="div text-sm font-bold transition-all items-center flex gap-2">
            <a
              onClick={() => navigate("/signup")}
              className="p-2 font-bold hover:cursor-pointer transition-all duration-300 border-sand-200 border-opacity-35 text-neutral-400 rounded-md px-6"
            >
              Sign Up
            </a>
            <a
              onClick={() => navigate("/login")}
              className="p-2 hover:bg-opacity-50 font-bold hover:cursor-pointer transition-all duration-300 bg-sand-200 bg-opacity-25 text-white rounded-md px-6"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NavigationPanel;