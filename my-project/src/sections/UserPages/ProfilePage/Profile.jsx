import { useAuth } from "../../../context/authContext"



const Profile = () => {

    const {currentUser} = useAuth()


    return(
        <div id="/profile" className="w-full h-full">

            <div className="w-full h-16">
                <h1 className="text-6xl font-bold text-white"> {currentUser?.name}  </h1>

            </div>



        </div>
    )




}

export default Profile