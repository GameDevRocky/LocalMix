import { useNavigate } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../../context/authContext";
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [showNavbar, setShowNavbar] = useState(true);
  const navigate = useNavigate();

  const navLinks = {
    Home: "#home",
    Explore: "explore",
    About: "#about",
    Contact: "#contact",
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navigateTo = (link) => {
    navigate(link);
  };

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={showNavbar ? { y: 0 } : { y: 0 }}
      className="text-white z-50  backdrop-blur-md fixed items-center shadow-md w-full flex justify-between p-4 h-16"
    >
      <div className=" text-xl font-bold gap-3 w-auto h-auto items-center justify-center flex">
        <FaHeadphones />
        <header>LocalMix</header>
      </div>

      <div className="items-center justify-evenly flex flex-row">
        <ul className="items-center text-neutral-500 justify-evenly flex flex-row gap-6">
          {Object.entries(navLinks).map(([name, link], index) => (
            <li>
              <a className="text-orange-100" href={link}>
                {name}{" "}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="justify-center items-center">
        {currentUser ? (
          <button onClick={() => navigateTo("/explore")} className="border-0 ">
            <IoPersonCircleOutline />
          </button>
        ) : (
          <button onClick={() => navigateTo("/login")} className="border-0 ">
            Login
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
