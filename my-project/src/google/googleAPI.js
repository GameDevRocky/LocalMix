let API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
//API_KEY = "AIzaSyCNiHyeDUWeceEHZhOKcXDVoYuvFa_pTDw";

export const getUserCityAndState = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                console.log("User Coordinates:", latitude, longitude);
                
                // Call Reverse Geocoding API
                const { city, state } = await getCityAndStateFromCoords(latitude, longitude);
                console.log("Closest City:", city);
                console.log("State:", state);
                resolve({ city, state });
            }, (error) => {
                showError(error);
                reject(error);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
};

async function getCityAndStateFromCoords(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        let city = "City not found";
        let state = "State not found";

        if (data.results.length > 0) {
            // Extract city and state name from address components
            const addressComponents = data.results[0].address_components;
            for (const component of addressComponents) {
                if (component.types.includes("locality")) {
                    city = component.long_name; // Returns the city name
                }
                if (component.types.includes("administrative_area_level_1")) {
                    state = component.long_name; // Returns the state name
                }
            }
        }
        return { city, state };
    } catch (error) {
        console.error("Error fetching city and state:", error);
        return { city: "Error fetching city", state: "Error fetching state" };
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied location access.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information unavailable.");
            break;
        case error.TIMEOUT:
            console.log("Request timed out.");
            break;
        default:
            console.log("An unknown error occurred.");
    }
}