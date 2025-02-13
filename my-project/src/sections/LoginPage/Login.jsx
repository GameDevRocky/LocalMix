import { easeIn, motion } from "motion/react";
import MusicIcons from "../../components/MusicIcons";
import GoogleButton from 'react-google-button';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error message

        if (!email || !password) {
            setErrorMessage('Email and password are required.');
            return;
        }

        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);

            } catch (error) {
                setIsSigningIn(true)

                if (error.code === 'auth/invalid-email'){
                    setErrorMessage('Invalid email')

                }
                if (error.code === 'auth/invalid-credential'){
                    setErrorMessage('Invalid credentials')

                }

                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setErrorMessage(error.message);
                setIsSigningIn(false);
            }
        }
    };

    return (
        <motion.div 
            id="login" className=" block w-full h-full items-center justify-center ">
                {userLoggedIn&& <Navigate to={'/home'} />}
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 2, ease: "easeIn", type: "spring", stiffness: 200 }}
                className=" p-4 w-full h-full items-center shadow-md shadow-black justify-center flex gap-2 rounded-md">
                <div className="w-full h-full flex shadow-md  justify-evenly items-center flex-col p-4">
                    <h1 className="font-light text-white text-nowrap text-3xl mb-6">Welcome Back</h1>
                    <form className=" text-sand-100 flex flex-col gap-2 " onSubmit={onSubmit}>
                        <label>Username: </label>
                        <input className="h-8 rounded" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Password: </label>
                        <input className="h-8 rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <div className="flex gap-2 p-2">
                            <h2>Don't have an account? </h2>
                            <a onClick={() => navigate('/signup')} className="hover:cursor-pointer hover:text-neutral-600">Sign Up</a>
                        </div>
                        <div className="w-full flex flex-col items-center justify-center">
                            <button className="w-1/2 text-nowrap" type="submit">Login</button>
                            <p className="text-sm p-2">OR</p>
                            <GoogleButton label="Continue with Google" onClick={onGoogleSignIn} />
                        </div>
                    </form>
                </div>
                
            </motion.div>
            <div className="w-full h-full flex bg-red-50">

            </div>
            <div className="w-full h-full flex bg-blue-50">

            </div>
        </motion.div>
    );
};

export default Login;