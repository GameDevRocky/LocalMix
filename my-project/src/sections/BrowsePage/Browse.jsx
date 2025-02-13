import { useEffect, useState } from 'react';
import { getArtists, getSpotifyAccessToken } from '../../spotify/spotifyAPI';
import Footer from '../../elements/Footer Panel/Footer';
import { useAuth } from "../../context/authContext";

const Browse = () => {
    const [artistsByGenre, setArtistsByGenre] = useState({});
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    const fetchArtists = async () => {
        try {
            const accessToken = await getSpotifyAccessToken();
            const artistsByGenre = {};

            for (const genre of currentUser.musicTypes) {
                const artists = await getArtists(accessToken, genre);
                artistsByGenre[genre] = artists;
            }

            setArtistsByGenre(artistsByGenre);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching artists:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser && currentUser.musicTypes) {
            fetchArtists();
        }
    }, [currentUser]);

    if (loading) {
        return <div>Loading artists...</div>;
    }

    return (
        <div className="w-full h-full flex flex-col bg-gradient-to-t from-neutral-950 to-neutral-800 p-4">
            <h1 className="text-2xl text-white mb-4">Browse Artists</h1>
            {Object.keys(artistsByGenre).map((genre) => (
                <div key={genre} className="mb-8 w-full flex flex-col">
                    <h2 className="text-xl text-white mb-4">{genre}</h2>
                    <div className=" w-full overflow-x-scroll scrollbar-hide flex gap-4">
                        {artistsByGenre[genre].map((artist) => (
                            <div key={artist.id} className="bg-neutral-800 p-4 rounded-lg shadow-md">
                                <img src={artist.images[0]?.url} alt={artist.name} className="object-cover min-w-48 h-48  rounded-md w-full" />
                                <h2 className="text-lg text-white">{artist.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <Footer />
        </div>
    );
};

export default Browse;