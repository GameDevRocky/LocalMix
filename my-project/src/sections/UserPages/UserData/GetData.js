import { getFirestore, collection, doc, query, where, getDocs } from "firebase/firestore";

export const getEvents = async (userId) => {
        const db = getFirestore();
        const eventsCollectionRef = collection(db, "events");
        const userDocRef = doc(db, "users", userId);
        const q = query(eventsCollectionRef, where("host", "==", userDocRef));
        const querySnapshot = await getDocs(q);

        const eventsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return(eventsList);
    };
