import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const db = getFirestore();

export const doCreateUserWithEmailAndPassword = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    const userData = {
        email: user.email,
        name: user.displayName,
        id: user.uid,
        isNewUser: true,
        events : []
    };

    await setDoc(doc(db, "users", user.uid), {
        ...userData
    });
    return user;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData = {
        email: user.email,
        name: user.displayName,
        id: user.uid,
        isNewUser: false,
        events : []
    };

    await setDoc(doc(db, "users", user.uid), {
        ...userData
    }, { merge: true });
    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};
