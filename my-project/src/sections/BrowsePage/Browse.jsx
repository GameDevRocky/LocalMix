import { useEffect, useState } from 'react';
import { getArtists, getSpotifyAccessToken } from '../../spotify/spotifyAPI';
import Footer from '../../elements/Footer Panel/Footer';
const Browse = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchArtists = async () => {
        try {
            const accessToken = await getSpotifyAccessToken();
            const artists = await getArtists(accessToken, 'Boston'); // Example query
            setArtists(artists);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching artists:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
       fetchArtists();
    }, []);

    if (loading) {
        return <div>Loading artists...</div>;
    }

    return (
        <div className="w-full h-full flex flex-col bg-gradient-to-t from-neutral-950 to-neutral-800 p-4">
            <h1 className="text-2xl text-white mb-4">Browse Artists</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {artists.map((artist) => (
                    <div key={artist.id} className="bg-neutral-800 p-4 rounded-lg shadow-md">
                        <img src={artist.images[0]?.url} alt={artist.name} className="w-full h-48 object-cover rounded-md mb-2" />
                        <h2 className="text-lg text-white">{artist.name}</h2>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Browse;