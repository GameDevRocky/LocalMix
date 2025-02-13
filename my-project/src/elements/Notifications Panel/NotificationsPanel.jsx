import { motion } from "motion/react"
import { useState } from "react"
import { IoIosArrowForward } from "react-icons/io";
import { useAuth } from "../../context/authContext";

const NotificationsPanel = ({open, setOpen, activityOpen, setActivityOpen}) =>{   

    const {currentUser} = useAuth();


    return(
        <motion.div 
        initial= {{width: '0px'}}
        animate={{width: open? '500px': '0px' }}
        className="w-full block scrollbar-hide h-full bg-gradient-to-t from-neutral-950 to-neutral-900 rounded-md">
            <div className="justify-center text-neutral-400 relative p-2 flex items-center">
                <button
                onClick={() =>{setOpen((open) => false)}} 
                className="text-lg absolute left-2 top-4 hover:text-white transition-all duration-300">
                <IoIosArrowForward/>
                </button>
                <motion.h1 
                animate = {{
                    opacity: open? 1: 0
                }}
                
                className="font-light text-xl">Notifications</motion.h1>
            </div>
            <div className="w-full h-full scrollbar-hide overflow-y-scroll p-4">
               
                <motion.div 
                initial= {{y:-5, opacity:0}}
                animate={{
                    opacity: open? 1 : 0,
                    y: open? 0 : 20
                }}
                transition={{duration: 0.5}}
                className="w-full h-24 bg-neutral-900 shadow-sm shadow-black text-neutral-600 rounded-lg justify-center flex items-center">
                        No Notifications
                </motion.div>
                

            </div>
          

        </motion.div>

    )



}


export default NotificationsPanel