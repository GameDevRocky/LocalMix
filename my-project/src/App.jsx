import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./sections/LandingPage/LandingPage";
import Login from "./sections/LoginPage/Login";
import { AuthProvider } from "./context/authContext";
import SignUp from "./sections/SignupPage/SignUp";
import NewUser from "./sections/UserPages/NewUserPage/NewUser";
import Profile from "./sections/UserPages/ProfilePage/Profile";
import Explore from "./sections/ExplorePage/Explore";
import Display from "./elements/Display";
const App = () => {
  return (
    <AuthProvider>
      <Display/>
    </AuthProvider>
  );
};

export default App;