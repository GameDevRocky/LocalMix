import Background from "./Background";
import { motion } from "motion/react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { HashLink } from 'react-router-hash-link';
const Hero = () => {

  const navigate = useNavigate()
  useEffect(() => {
    // Set a timeout to show the component
    const timer = setTimeout(() => {
    }, 3000); // 3000ms = 3 seconds

    // Cleanup timeout on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="home" className="relative w-full h-full">
      <Background />

      <div className="absolute inset-0 flex items-center justify-start p-16 z-10">
        <div className="drop-shadow-xl justify-start items-start flex flex-col gap-6 p-4 rounded-3xl">
        <h1 className=" lg:text-7xl bg-gradient-to-r from-orange-100 to-red-300 bg-clip-text text-transparent text-white text-6xl font-bold">
          Music <br/> Done <br/> Correctly.
        </h1>

       
        <div className="w-full justify-start text-center items-center flex gap-4 text-sm text-nowrap">

            <motion.button 
                initial = {{y:0}}
                whileHover = {{y:-5}}
                onClick={() =>{navigate('/signup')}}
                className="p-2 w-1/2" >
                    Get Started
            </motion.button>
            <HashLink 
            smooth
            to="/home/#about"
            className="p-2 w-1/2"
            
            >
                Learn More
            </HashLink>
            
        </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
