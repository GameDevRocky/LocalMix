import { easeIn, motion } from "motion/react"
import { LuBookHeadphones } from "react-icons/lu";
import { FaMicrophoneAlt } from "react-icons/fa";
import { LiaDrumSolid } from "react-icons/lia";
import { MdOutlinePiano } from "react-icons/md";
import { GiSaxophone } from "react-icons/gi";
import { FaGuitar } from "react-icons/fa";
import { GiBoombox } from "react-icons/gi";
import { GiMusicalScore } from "react-icons/gi";
import { BsMusicPlayer } from "react-icons/bs";



const MusicIcons = () =>{

    const cards = [
        <LuBookHeadphones/>,
       <FaMicrophoneAlt/>,
        <LiaDrumSolid/>,
        <MdOutlinePiano/>,
        <GiSaxophone/>,
        <FaGuitar/>,
       <GiBoombox/>,
       <GiMusicalScore/>,
       <BsMusicPlayer/>
    ]


    return(
    <div className="w-full h-full flex flex-wrap items-center justify-evenly gap-2">
        {Object.entries(cards).map(([name, tag], index) =>(
            <motion.div
            initial={{scale:1}}
            whileHover={{scale:1.2}}
            >
            {tag}
            </motion.div>
        ))}
    </div>
    )
}
export default MusicIcons