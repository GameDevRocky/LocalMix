import ActivityPanel from "./Activity Panel/ActivityPanel"
import NavigationPanel from "./Navigation Panel/NavigationPanel"
import ContentPanel from "./Content Panel/ContentPanel"
import { Suspense, useRef, useState } from "react"
import Login from "../sections/LoginPage/Login"
import Footer from "./Footer Panel/Footer"
import { BrowserRouter } from "react-router-dom"
import NotificationsPanel from "./Notifications Panel/NotificationsPanel"

const Display = () =>{

    const [notifPanelOpen, setNotifPanelOpen] = useState(false)
    const [activityPanelOpen, setActivityPanelOpen] = useState(false)

    return(
        <BrowserRouter>
        <div className="w-screen h-screen overflow-y-scroll scrollbar-hide gap-2 p-2 -z-50 bg-black flex flex-col">
            <NavigationPanel notifOpen={notifPanelOpen} setNotifOpen={setNotifPanelOpen} activityOpen={activityPanelOpen} setActivityOpen={setActivityPanelOpen} />
            <div className="w-full h-full flex gap-2">
                <ActivityPanel open={activityPanelOpen} setOpen={setActivityPanelOpen} notifOpen={notifPanelOpen} setNotifOpen={setNotifPanelOpen} /> 
                
                <div className="w-full h-full flex gap-2 justify-end">
                    <ContentPanel />
                    <NotificationsPanel open={notifPanelOpen} setOpen={setNotifPanelOpen} />
                </div>
            </div>
        </div>
            </BrowserRouter>
    )


}

export default Display