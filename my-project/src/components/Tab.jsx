import { IoPersonCircle } from "react-icons/io5";
import { FaCalendarPlus } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "motion/react";

const Tab = ( {children, name, showButton, className} ) =>{

    const [open, setOpen] = useState(false)

    const Toggle = () =>{
        setOpen( (open) => !open)
    }

    useEffect(() =>{

        if(!showButton){
            setOpen(false)

        }
        
    }, [showButton])

    return (
        <motion.div
        className={` w-auto transition-all duration-300 ${ !open && "hover:bg-neutral-800"}  rounded items-center shadow`}>
            <div  onClick={Toggle} className={` ${className} w-full relative text-sand items-center flex justify-between text-base`}>
            <h2 className=" font-thin "> {name} </h2>
            <motion.button 
            initial={{opacity: 0, x:0}}
            animate ={{ opacity: showButton? 1 : 0,
             }}
             className=" w-fit p-0  border-none hover:bg-red-50 hover:bg-opacity-0 text-sand bg-red-50 bg-opacity-0"
            
            > {open? <FaCaretUp/> :<FaCaretDown/> } </motion.button>
            </div>

            <motion.div 
            animate= {{ height: open? 'auto': 0 }}
            className="w-full shadow-inner  scrollbar-hide rounded-2xl shadow-zinc-950  h-auto max-h-96 overflow-scroll">

                {children}
            </motion.div>
        </motion.div>
    )
}


export default Tab