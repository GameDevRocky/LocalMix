
const client_id = 'f212c266bff449f09a2068137fee4721';
const client_secret = '578e6d49b00e46b096a6068d06cdeca0';

export const getSpotifyAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
};

export const getArtists = async (accessToken, query) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.artists.items;
};