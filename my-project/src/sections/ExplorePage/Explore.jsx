import { useAuth } from "../../context/authContext"
import { IoPersonCircle } from "react-icons/io5";
import { FaCalendarPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Navbar from "../LandingPage/Navbar"
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa6";
import { getEvents } from "../UserPages/UserData/GetData";

const Tab = ( {children, name, showSidePanel} ) =>{

    const [open, setOpen] = useState(false)

    const Toggle = () =>{
        setOpen( (open) => !open)
    }

    useEffect(() =>{

        if(!showSidePanel){
            setOpen(false)

        }
        
    }, [showSidePanel])

    return (
        <motion.div
        onClick={Toggle}
        className={`w-full transition-all duration-300 ${ !open && "hover:bg-neutral-800"} h-auto p-2 rounded items-cente shadow`}>
            <div className={` w-full m-3 relative text-sand items-center flex justify-between text-base`}>
            <h2 className="text-base font-light text-sand-300"> {name} </h2>
            <motion.button 
            initial={{opacity: 0, x:0}}
            animate ={{ opacity: showSidePanel? 1 : 0,
             }}
             className="w-auto h-auto border-none hover:bg-red-50 hover:bg-opacity-0 text-sand bg-red-50 bg-opacity-0"
            
            > {open? <FaCaretUp/> :<FaCaretDown/> } </motion.button>
            </div>

            <motion.div 
            animate= {{ height: open? 'auto': 0 }}
            className="w-full scrollbar-hide rounded-2xl shadow-inner h-auto max-h-96 overflow-scroll">

                {children}
            </motion.div>
        </motion.div>
    )
}


const Events = () => {
    const { currentUser } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            if (currentUser) {
                const eventsList = await getEvents(currentUser.id);
                setEvents(eventsList);
                setLoading(false);
            }
        };
        fetchEvents();
    }, [currentUser]);

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (!events.length) {
        return <div>No events available.</div>;
    }
    return (
        <div className="w-full overflow-scroll rounded-md p-4 scrollbar-hide h-auto items-center justify-start flex gap-4 flex-col">
            {events.map((event, index) => (
                <div key={index} className="">
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
    );
};





const SidePanel = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [showSidePanel, setShowSidePanel] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setShowSidePanel(true)}
      onHoverEnd={() => setShowSidePanel(false)}
      animate={{
        width: showSidePanel ? "250px" : "auto", // Adjust dimensions for hover effect
        transition: { duration: 0.3, ease: "easeInOut" }, // Smooth transition
      }}
      className="h-full bg-gradient-to-t to-neutral-900 from-neutral-950  shadow-black shadow-md flex flex-col items-center gap-4 overflow-hidden rounded-xl"
    >
      {userLoggedIn ? (
        <>
          <motion.div
          style={{  scrollbarWidth: 0}}
            animate={{
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-3xl flex h-20 p-2 items-center shadow-neutral-800 border-neutral-800 w-full shadow justify-between "
          >
            <h1 className=" text-sm text-nowrap  font-bold">Your Activity </h1>
            <motion.div
            style={{  scrollbarWidth: 0}}
            initial={{opacity: 0, x:0}}
            animate ={{ opacity: showSidePanel? 1 : 0}}
            className=" w-auto h-full flex items-center justify-center"
            >
                <IoPersonCircle/>
            </motion.div>
          </motion.div>
            <div 
            className="w-full scrollbar-hide h-full justify-start gap-4 items-center flex flex-col overflow-y-scroll p-2">
                <Tab showSidePanel={showSidePanel} name='Events' > <Events/> </Tab>
                <Tab showSidePanel={showSidePanel} name='Artists' > <h2>hello</h2> </Tab>
                <Tab showSidePanel={showSidePanel} name='Music' > <h2>hello</h2> </Tab>
                <Tab showSidePanel={showSidePanel} name='Events' > <h2>hello</h2> </Tab>
               
            </div>
        </>
      ) : (
        <div className="text-center">
          <IoPersonCircle size={32} />
        </div>
      )}
    </motion.div>
  );
};

const ExplorePanel= () =>{

    return(
        <div className="shadow-black w-full h-full rounded-2xl flex bg-gradient-to-t to-neutral-900 from-neutral-950 shadow-md">
            


        </div>
    )

}

const Explore = () =>{

    const {currentUser} = useAuth()
    return(
    
        <div className="w-screen h-screen">
        <Navbar/>

        <div className=" scrollbar-hide text-neutral-800 relative w-full h-full bg-neutral-800 flex p-2 overflow-x-hidden gap-4">
            <div className=" flex relative w-auto top-16 h-full rounded-2xl">
                <SidePanel/>
            </div>
            <div className=" rounded-2xl relative top-16 w-full h-full flex">
                <ExplorePanel/>
            </div>
        </div>
        </div>
    )


}

export default Explore