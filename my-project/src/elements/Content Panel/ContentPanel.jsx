import {Suspense, forwardRef } from "react"
import Login from "../../sections/LoginPage/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "../../sections/SignupPage/SignUp"
import ProtectedContent from "../../context/authContext/ProtectedContent"
import LandingPage from "../../sections/LandingPage/LandingPage"
import SkeletonLoader from "../../components/SkeletonLoader"
import NewUser from "../../sections/UserPages/NewUserPage/NewUser";
import ViewEvent from "../../sections/UserPages/ViewEventPage/ViewEvent"
import Footer from "../Footer Panel/Footer"
import Profile from "../../sections/UserPages/ProfilePage/Profile"
import Browse from "../../sections/BrowsePage/Browse"

const Panel = ({children}) =>{
    return( 
    <div  className="w-full block  overflow-y-scroll scrollbar-hide h-full bg-gradient-to-t from-neutral-950 to-neutral-900 rounded-md">
            <Suspense fallback={<SkeletonLoader/>} >
            <div 
            className="w-full  h-full  block">
            {children}

            </div>
            </Suspense>
    </div>
    )
}
const ContentPanel = forwardRef(({children}, ref) =>{
    return(
            
                <Routes>
                <Route path="/login" element={<Panel><Login/></Panel>} />
                <Route path="/signup" element={<Panel><SignUp/></Panel>} />
                <Route path="/home" element={<Panel><LandingPage/></Panel>} />
                <Route path="/browse" element={<Panel><Browse/></Panel>}/>
                <Route path="/newuser" element={<Panel> <ProtectedContent><NewUser/> </ProtectedContent> </Panel>} />
                <Route path="/eventview/:id" element={<Panel><ProtectedContent><ViewEvent /></ProtectedContent></Panel>} />
                <Route path="/" element={<Panel><LandingPage/></Panel>} />              
                </Routes>
    )

})

export default ContentPanel