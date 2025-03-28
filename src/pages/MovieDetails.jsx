import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/MovieDetails.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

function MovieDetails() {
    const { id } = useParams(); // Get movie ID from URL
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovieDetails() {
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
                const trailer = videoData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
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

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return movie ? (
        <div className="movie-details">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="details-content">
                <h2>{movie.title}</h2>
                <br/>
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                <p><strong>Overview:</strong> {movie.overview}</p>
                <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                
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
            </div>
        </div>
    ) : null;
}

export default MovieDetails;






//************************************************************************************* */

