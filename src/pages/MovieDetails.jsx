import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/MovieDetails.css";
import WatchProviders from "../components/WatchProviders";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

function MovieDetails() {
    const { id } = useParams(); // Get movie ID from URL
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovieDetails() {
            if (!id) {
                setError("No movie ID provided");
                setLoading(false);
                return;
            }

            try {
                // Fetch movie details
                const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
                if (!movieResponse.ok) throw new Error(`Movie fetch error! Status: ${movieResponse.status}`);
                const movieData = await movieResponse.json();
                setMovie(movieData);

                // Fetch trailers
                const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
                if (!videoResponse.ok) throw new Error(`Video fetch error! Status: ${videoResponse.status}`);
                const videoData = await videoResponse.json();

                // Find the first official YouTube trailer
                const trailer = videoData.results?.find(video => video.type === "Trailer" && video.site === "YouTube");
                if (trailer) setTrailerKey(trailer.key);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        }

        fetchMovieDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading movie details...</div>;

    if (error) return (
        <div className="movie-details error-state">
            <div className="error-message">{error}</div>
            <Link to="/" className="back-button">Back to Movies</Link>
        </div>
    );

    if (!movie) return (
        <div className="movie-details error-state">
            <div className="error-message">Movie not found</div>
            <Link to="/" className="back-button">Back to Movies</Link>
        </div>
    );

    // Handle case where movie poster is missing
    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image+Available';

    return (
        <div className="movie-details">
            <div className="details-content">
                <img src={posterPath} alt={movie.title || 'Movie'} />
                <h2>{movie.title || 'Untitled Movie'}</h2>
                <br/>
                <p><strong>Release Date:</strong> {movie.release_date || 'Unknown'}</p>
                <p><strong>Overview:</strong> {movie.overview || 'No overview available.'}</p>
                <p><strong>Rating:</strong> {movie.vote_average ? `${movie.vote_average} / 10` : 'Not rated'}</p>

                {/* Watch Providers */}
                <WatchProviders movieId={id} />

                {/* Embed the YouTube Trailer if available */}
                {trailerKey ? (
                    <div className="trailer-container">
                        <br/>
                        <h3>Watch Trailer</h3>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            title="Movie Trailer"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <p>No trailer available.</p>
                )}

                <Link to="/" className="back-button">Back to Movies</Link>
            </div>
        </div>
    );
}

export default MovieDetails;
