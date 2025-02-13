
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export const getSpotifyAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
};

export const getArtists = async (accessToken, genre) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=genre:${genre}&type=artist`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.artists.items;
};