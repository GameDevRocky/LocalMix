import { easeIn, motion } from "motion/react";
import MusicIcons from "../../components/MusicIcons";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
const SignUp = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password, name);
                navigate('/newuser');
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('This email address is already being used.');
                } else {
                    setErrorMessage(error.message);
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
            id="signup" className="w-full h-fit items-center justify-center flex">
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 2, ease: "easeIn", type: "spring", stiffness: 200 }}
                className=" items-center justify-center flex gap-2 rounded-md">
                <div className=" w-full h-96 flex justify-evenly items-center flex-col p-4">
                    <h1 className="font-light text-nowrap text-3xl mb-6">Create Your Account</h1>
                    <div className="flex gap-16">

                    <form className=" text-sand-200 flex flex-col gap-2 p-4" >
                        <label>Name: </label>
                        <input className="h-8 rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Email: </label>
                        <input className="h-8 rounded" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Password: </label>
                        <input className="h-8 rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <div className="flex gap-2 text-sm text-nowrap p-2">
                            <h2>Already have an account? </h2>
                            <a onClick={()=>navigate('/login')} className="hover:cursor-pointer hover:text-neutral-600">Login</a>
                        </div>
                        <div className="w-full justify-center flex">

                            <button onClick={onSubmit} className="w-1/2 text-nowrap" type="submit">Register</button>
                        </div>
                    </form>
                    
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <GoogleButton label="Sign up with Google" onClick={onGoogleSignIn} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SignUp;