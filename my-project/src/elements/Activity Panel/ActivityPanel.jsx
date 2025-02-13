import { useEffect, useState } from "react"
import { motion } from "motion/react"
import Tab from "../../components/Tab"
import { useAuth } from "../../context/authContext"
import { getEvents } from "../../firebase/dataFunctions"
import { useNavigate } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";
import { MdOutlineEvent } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";


const ActivityPanel = ({open, setOpen, notifOpen, setNotifOpen}) =>{
    const {currentUser, userLoggedIn} = useAuth()
    const [userEvents, setUserEvents] = useState([])
    const navigate = useNavigate()
    
    const Toggle = () =>{
        setOpen((open)=> !open)
        setNotifOpen(false)
    }
    const fetchEvents = async () => {
                if (currentUser) {
                    const eventsList = await getEvents(currentUser.id);
                    setUserEvents(eventsList);
                }
            }

    useEffect(() =>{
        fetchEvents()
    }, [currentUser])

    return(
        <motion.div
        initial= {{width: '0px'}}
        animate={{
            width: open ? "500px" : "50px", 
            transition: { duration: 0.25 },
          }} 
     className=" h-full bg-gradient-to-t from-neutral-950 to-neutral-900 rounded-md flex flex-col p-4">
    
            {userLoggedIn? <>
            <div className="w-full text-neutral-400 h-12 justify-start overflow-hidden flex border-b border-neutral-800 items-center">
                
                <div className={` ${open? 'w-full' : 'w-auto'} items-center flex gap-2`}>
                    <div onClick={Toggle} className="items-center flex gap-2 transition-all hover:cursor-pointer duration-300 hover:text-white">

                    <RxActivityLog size={24}/>
                    {open && 
                    <h1>Activity</h1>
                    }
                    </div>
                    {open&& 
                    <div className="w-full items-center justify-end flex">

                    <CiSquarePlus className="hover:text-white transition-all duration-300" size={28}/>
                    </div>
                    }
                </div>
            </div>
            <div onClick={() =>setOpen(true)} className="w-full h-full justify-start overflow-y-scroll scrollbar-hide gap-4 flex flex-col py-4">
                {open? 
                    <Tab className="p-2 text-sm text-sand-100" name='Hosted Events' showButton={open}>
                        <ul className="w-full h-full items-center justify-start p-4 gap-4">

                        {userEvents.map((event, index) =>(
                            <li onClick={() => navigate(`/eventview/${event.Id}`, {state: {Id : event.Id}})} key={index} className="w-full hover:cursor-pointer h-full rounded-md p-2 flex bg-neutral-800 items-center text-center justify-center">
                                <h1>{event.name}</h1>
                                <h1>{event.dateStart.toDate().toString()}</h1>

                            </li>
                        ))}
                        </ul>
                    </Tab>
                    : 
                
                   <div className="w-full justify-center">
                    <button className="hover:bg-neutral-700 rounded-lg">
                    <MdOutlineEvent size={28}/>
                    </button>
                    
                   </div> }
            
            </div></> : 
            <div className="w-full h-full flex flex-col gap-8 justify-center items-center text-sand-200 text-sm">
                <h1>Log in to Continue</h1>
                <button onClick={() =>navigate('/login')} className="">Login</button>   
            </div>
            }
        </motion.div>
    )
}

export default ActivityPanel