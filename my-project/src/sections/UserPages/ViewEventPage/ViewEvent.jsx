import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, getUser } from "../../../firebase/dataFunctions";
import Footer from "../../../elements/Footer Panel/Footer";
import { motion } from "motion/react";
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'


const ViewEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [dateCreated, setDateCreated] = useState(null);
  const [host, setHost] = useState(null)
  const [artists, setArtists] = useState([])


  const fetchEvent = async () => {

    const e = await getEvent(id);
    setDateStart(new Date(e?.dateStart.seconds * 1000 + e?.dateStart.nanoseconds));
    setDateEnd(new Date(e?.dateEnd.seconds * 1000 + e?.dateStart.nanoseconds));
    setDateCreated(new Date(e?.dateCreated.seconds * 1000 + e?.dateStart.nanoseconds));
    setEvent(e);
    if (e?.host){
      const host = await fetchUser(e.host)
      setHost(host)
    }
    if (e?.artists) {
      // Use Promise.all to fetch all artists concurrently
      const artistsPromises = e.artists.map(async (artist) => {
        return await fetchUser(artist);
      });
  
      const artists = await Promise.all(artistsPromises); // Wait for all user fetches to complete
      setArtists(artists);
    }

  };

  const fetchUser = async (id) =>{
    const user = await getUser(id)
    return user;
  }


  useEffect(() => {
    setTimeout(() =>{
      fetchEvent()
    }, 2000)

  }, [id]);

  return (
    <div id="eventview" className="w-full min-h-screen text-white">
      {event ? (
        <div className="w-full flex flex-col gap-2 p-2 bg-gradient-to-t from-black to-neutral-950 rounded-md">
          {/* Header Section */}
          <div className="w-full overflow-hidden h-64 bg-cover bg-center flex flex-col justify-end rounded-md" style={{backgroundImage: 'url(/src/assets/DefaultHeader.jpg)', backgroundPosition: 'center top', backgroundSize: 'contain',}}>
          <motion.div 
          initial= {{y:0, opacity:0}}
          whileInView={{ y:0, opacity:1}}
          transition={{duration:0.5, ease:'anticipate'}}
          className={` rounded-md border-b border-black backdrop-brightness-100 bg-gradient-to-t from-neutral-900 via-neutral-900 w-full h-full gap-4 p-4 justify-end flex flex-col`}>

            <h1 className="text-white font-extrabold text-4xl md:text-5xl xl:text-6xl">
              {event.name}
            </h1>
            <h2 className="text-neutral-400 text-sm md:text-base">
              <strong>Posted: </strong> {dateCreated.toLocaleDateString()}
            </h2>
          </motion.div>
          </div>

          {/* Content Section */}
          <div className=" rounded-md p-4 bg-gradient-to-br from-neutral-900 to-neutral-950">
            <div className="flex gap-8">
              {/* Event Details */}
              <div className="w-1/2  flex flex-col gap-6">
                {/* Overview */}
                <div className="flex flex-col gap-4 justify-center text-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-l from-neutral-300 to-white bg-clip-text text-transparent">
                    Overview
                  </h2>
                  <p className="text-neutral-400 text-base leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

                {/* Event Info */}
                <div className="flex flex-col gap-4 w-1/2  text-sm text-neutral-400 justify-start items-center text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-l from-neutral-300 to-white bg-clip-text text-transparent">
                    Details
                  </h2>
                  <div className="gap-4 w-1/2 justify-evenly items-center flex flex-wrap">

                  <div>
                    <strong className="text-white">Date:<br/> </strong>{dateStart.toLocaleDateString()}
                  </div>
                  <div>
                    <strong className="text-white">Time:<br/> </strong>{dateStart.toLocaleTimeString().replace(':00', '')}
                  </div>
                  <div>
                    <strong className="text-white">Address:<br/> </strong>{event.address}
                  </div>
                  </div>
            </div>
                </div>
  
          <div className="flex items-center justify-center gap-8  w-full rounded-md p-4">
              <div className="w-1/3 flex flex-col gap-4 justify-center items-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-l from-neutral-300 to-white bg-clip-text text-transparent">
                    Hosted By
                  </h2>
                  <motion.div
                  initial= {{scale:1, opacity:0}}
                  whileInView={{ opacity:1}}
                  whileHover={{scale:1.1}}
                  whileTap={{scale: 1}}
                  transition={{ delay:0, duration:0, ease:'backInOut'}} 
                  className="w-auto h-auto  p-2 hover:cursor-pointer hover:bg-neutral-900 transition-all duration-300 shadow-md shadow-black rounded-lg flex items-center justify-center">
                    <div className=" justify-center gap-4 flex flex-col items-center">

                    <div className="w-16 h-16 bg-black rounded-full items-center justify-center flex">
                        {host?.profileImg?
                        <img src={host.profileImg} alt="" />
                        :
                        <h1 className="text-4xl font-black"> {host?.name.charAt(0)} </h1>
                      }
                    </div>
                    <h1> {host?.name} </h1>
                    </div>
                    
                  </motion.div>

              </div>
                      
                      

              <div className="w-60 flex flex-col gap-4 justify-center items-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-l from-neutral-300 to-white bg-clip-text text-transparent">
                    Featured Artists
                  </h2>
                  <ul className="w-full pb-2 flex flex-col justify-center scrollbar-hide gap-4">

                  { 

                  artists.map((artist, index) => ( 

                    <motion.li
                    key={index}
                    initial= {{scale:1, opacity:0}}
                    whileInView={{ opacity:1}}
                    whileHover={{scale:1.1}}
                    whileTap={{scale: 1}}
                    transition={{ delay:0, duration:0, ease:'backInOut'}} 
                    className="w-auto h-auto  p-2 hover:cursor-pointer hover:bg-neutral-900 transition-all duration-300 shadow-md shadow-black rounded-lg flex items-center justify-center">
                        <div className="justify-center gap-4 flex flex-col items-center">

                        <div className="w-16 h-16 bg-black rounded-full items-center justify-center flex">
                            {host?.profileImg?
                            <img src={artist.profileImg} alt="" />
                            :
                            <h1 className="text-4xl font-black"> {artist?.name.charAt(0)} </h1>
                          }
                        </div>
                        <h1> {artist?.name} </h1>
                        </div>
                        
                      </motion.li>
                      ) )
                  }
                          </ul>

              </div>
              


              </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center min-h-screen">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <div style={{ width: "800%", height: "100%", margin: "0 auto" }}>
              <Skeleton count={10} />
            </div>
          </SkeletonTheme>
        </div>
      )}

    </div>
  );
};

export default ViewEvent;
