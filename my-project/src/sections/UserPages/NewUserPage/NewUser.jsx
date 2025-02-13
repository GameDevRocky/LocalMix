import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { getFirestore, doc, updateDoc } from "firebase/firestore";




const NewUser = () => {
    const { currentUser } = useAuth();
    const [step, setStep] = useState(0);
    const [name, setName] = useState('');
    const [musicTypes, setMusicTypes] = useState([]);
    const [isNewUser, setIsNewUser] = useState(currentUser.isNewUser || false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || '');
            setMusicTypes(currentUser.musicTypes || []);
        }
    }, [currentUser]);

    const musicOptions = [
        "Rock", "Pop", "Jazz", "Classical", "Hip-Hop", "Electronic", "Country", "Reggae", "Blues", "Soul",
        "R&B", "Metal", "Punk", "Folk", "Disco", "Funk", "Gospel", "Latin", "Ska", "House", "Techno",
        "Trance", "Dubstep", "Drum and Bass", "Ambient", "Indie", "Alternative", "K-Pop", "J-Pop", "Opera",
        "Soundtrack", "World", "New Age", "Dance", "Grunge", "Swing", "Bluegrass", "Reggaeton", "Salsa",
        "Merengue", "Bachata", "UK Drill", "Flamenco", "Bollywood", "Afrobeat", "Trap", "EDM", "Synthwave", "Lo-fi"
    ];

    const handleNext = async () => {
        if (step === 0 && !name) {
            setErrorMessage('Please enter your name.');
            return;
        }
        await sendData(isNewUser);
        setErrorMessage('');
        setStep(step + 1);
    };

    const sendData = async (isNewUserStatus) => {
        const db = getFirestore();
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
            isNewUser: isNewUserStatus,
            name,
            musicTypes,
        });
    };

    const handleFinish = async () => {
        await sendData(false);
        setIsNewUser(false);
        navigate('/home');
    };

    const handleMusicTypeToggle = (type) => {
        setMusicTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div id="newuser" className="text-center w-full h-full flex items-center justify-center">
            {!currentUser.isNewUser && (<Navigate to={'/home'} replace={true} />)}
            {step === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="w-3/4 h-3/4 bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
                >
                    <h1 className="text-2xl mb-4">What should we call you?</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded mb-4"
                    />
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button onClick={handleNext} className="p-2 bg-neutral-600 rounded">
                        Continue
                    </button>
                </motion.div>
            )}
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="w-3/4 h-3/4 bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
                >
                    <h1 className="text-2xl mb-4">What types of music are you interested in?</h1>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center items-center text-sm">
                        {musicOptions.map((type) => (
                            <button
                                key={type}
                                onClick={() => handleMusicTypeToggle(type)}
                                className={`p-1 border rounded ${musicTypes.includes(type) ? 'bg-red-400 text-white' : ''}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNext} className="p-2 bg-neutral-600 text-white rounded">
                        Continue
                    </button>
                </motion.div>
            )}
            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="w-3/4 h-3/4 bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
                >
                    <h1 className="text-2xl mb-4">Thank you for providing your information!</h1>
                    <p className="mb-4">Name: {name}</p>
                    <p className="mb-4">Music Types: {musicTypes.join(', ')}</p>
                    <button onClick={handleFinish} className="p-2 bg-neutral-600 text-white rounded">
                        Finish
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default NewUser;