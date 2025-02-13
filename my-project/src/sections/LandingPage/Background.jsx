import { Canvas } from "@react-three/fiber";
import { Backdrop, Float, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Headphones from "/public/models/Headphones"; // Corrected path for Next.js
import { Suspense, useRef } from "react";
import { easing } from "maath";
import { motion, useAnimationFrame } from "motion/react";
import CanvasLoader from "../../components/CanvasLoader";
const Background = () => {
  const headphoneRef = useRef();
  const lightRef = useRef();

  // Smoothly transition position
  useAnimationFrame(() => {
    if (headphoneRef.current) {
      //headphoneRef.current.rotation.y += 0.005;
    }
  });

  return (
    <div className="w-full h-full flex justify-end ">
        <div className="absolute h-full w-full">
            <div className="absolute  h-full w-full bg-[radial-gradient(#ab966d_1px,transparent_1.5px)] [background-size:8px_8px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>

    <motion.div 
    className="absolute w-full overflow-hidden h-full flex items-center justify-center">
      <motion.div 
      initial = {{x:0, y:100, opacity:0}}
      whileInView = {{x:0, y:0, opacity: 1}}
      transition={{delay: 1, duration: 2, ease:"easeInOut"}}  
      className="w-full h-full overflow-hidden "
      style={{
        filter: "drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.5))", // Corrected drop-shadow syntax
    }}
      >
        <Canvas>
            <Suspense >

          <PerspectiveCamera makeDefault position={[4, 4, 5]} fov={60} />
          <ambientLight intensity={2} />
          <pointLight intensity={20} color={'white'} position={[0,0,1]}> </pointLight>
          <OrbitControls/>
            <group castShadow  rotation={[0, -Math.PI/1.7, 0]} position={[4.5,-3,0]} ref={headphoneRef}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0} >
              <Headphones position={[0,0, 0]} scale={100} />
                </Float>
            </group>
          <OrbitControls enableZoom={false} />
            </Suspense>
        </Canvas>
      </motion.div>
    </motion.div>
    </div>
  );
};

export default Background;
