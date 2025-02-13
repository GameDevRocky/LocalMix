import { getFirestore, getDoc, collection, addDoc, doc, query, where, getDocs } from "firebase/firestore";


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

    export const getEvent = async (eventId) => {
        const db = getFirestore();
        const eventDocRef = doc(db, "events", eventId); // Reference to the specific document
        const eventDoc = await getDoc(eventDocRef); // Retrieve the document
    
        if (eventDoc.exists()) {
            return { id: eventDoc.id, ...eventDoc.data() }; // Return the document's data with its ID
        } else {
            throw new Error("Event not found");
        }
    };


export const getUser = async (userRef) => {
    const db = getFirestore();
    // Use the provided user reference directly to fetch the document
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() }; // Return the user data along with its ID
    } else {
        throw new Error("User not found");
    }
};



    export const getImg = async (imgData) => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
    
        // Set the canvas dimensions
        const { width, height, pixelArray } = imgData; // Assuming imgData contains width, height, and pixel array (data)
        canvas.width = width;
        canvas.height = height;
    
        // Create an ImageData object
        const imageData = new ImageData(new Uint8ClampedArray(pixelArray), width, height);
    
        // Draw the ImageData onto the canvas
        context.putImageData(imageData, 0, 0);
    
        // Convert the canvas to an image and return it
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const img = new Image();
                img.src = URL.createObjectURL(blob);
                img.onload = () => resolve(img);
            }, imgData.Id);
        });
    };  

    export const convertImgToArray = async (imgFile) => {
        console.log(imgFile)
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const img = new Image();

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);
    
                    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const pixelArray = imgData.data;
    
                    resolve({
                        width: canvas.width,
                        height: canvas.height,
                        pixelArray: Array.from(pixelArray) // Convert to array for easier handling
                    });
                };
                img.onerror = (error) => reject(error);
                img.src = event.target.result;
            };
    
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(imgFile);
        });
    };

    export const sendImg = async (imgData, location) =>{
    const db = getFirestore();
    const data = convertImgToArray(imgData)
    const collectionRef = collection(db, `${location.collection}/${location.Id}/imageData`);
    const collectionDocRef = await addDoc(collectionRef, data);
    return collectionDocRef.id;
    }

export const addEvent = async (eventData) => {
    const eventsCollectionRef = collection(db, "events");
    const eventDocRef = await addDoc(eventsCollectionRef, eventData);
    return eventDocRef.id;
};