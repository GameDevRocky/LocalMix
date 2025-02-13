import React, { useContext, useEffect, useState, useMemo } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const db = getFirestore();
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    setCurrentUser({ ...user, ...userDoc.data() });
                    setUserLoggedIn(true);
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = useMemo(() => ({
        currentUser,
        userLoggedIn,
        loading,
    }), [currentUser, userLoggedIn, loading]);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}