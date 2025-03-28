// import "../css/MovieCard.css";
// import { useMovieContext } from "../contexts/MovieContext";
// import { useState } from "react";

// const API_KEY = "091368ecc5c17077fa6b2f8d11fbca65";

// function MovieCard({ movie }) {
//     const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
//     const favorite = isFavorite(movie.id);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [movieDetails, setMovieDetails] = useState(null);

//     function onFavoriteClick(e) {
//         e.preventDefault();
//         if (favorite) removeFromFavorites(movie.id);
//         else addToFavorites(movie);
//     }

//     async function onMovieClick() {
//         setLoading(true);
//         setError(null);

//         try {
//             const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`;
            
//             const response = await fetch(url);
//             if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
//             const data = await response.json();
//             setMovieDetails(data);
//             console.log("Movie Details:", data);
//         } catch (err) {
//             console.error("Fetch error:", err);
//             setError("Failed to load movie details.");
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="movie-card" onClick={onMovieClick}>
//             <div className="movie-poster">
//                 <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//                 <div className="movie-overlay">
//                     <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
//                         ♥
//                     </button>
//                 </div>
//             </div>
//             <div className="movie-info">
//                 <h3>{movie.title}</h3>
//                 <p>{movie.release_date?.split("-")[0]}</p>
//             </div>
//             {loading && <p className="loading">Loading...</p>}
//             {error && <p className="error">{error}</p>}
//             {movieDetails && (
//                 <div className="movie-details">
//                     <h4>{movieDetails.title}</h4>
//                     <p>{movieDetails.overview}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default MovieCard;


import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </Link>
    );
}

export default MovieCard;
