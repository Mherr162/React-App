import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import '../css/Home.css'
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
    // state variable
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]) // Initialize as empty array
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                if (popularMovies && Array.isArray(popularMovies)) {
                    setMovies(popularMovies)
                } else {
                    setMovies([])
                    setError("Failed to load movies - invalid response format")
                }
            } catch(err){
                console.error("Error loading movies:", err)
                setError("Failed to load movies")
                setMovies([]) // Ensure movies is at least an empty array
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault() // prevents the input to stay after pressing the search button
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            if (searchResults && Array.isArray(searchResults)) {
                setMovies(searchResults)
                setError(null)
            } else {
                setMovies([])
                setError("Failed to search for movies - invalid response format")
            }
        } catch (err){
            console.error("Search error:", err)
            setError("Failed to search for movies...")
            setMovies([]) // Ensure movies is at least an empty array
        } finally{
            setLoading(false)
        }

        setSearchQuery("") // set the state( set a new value after pressing search button)
    }

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
                Search
            </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
            <div className="loading">Loading...</div>
        ) : (
            <div className="movies-grid">
                {/* Add safety check before mapping */}
                {movies && movies.length > 0 ? (
                    movies.map(movie => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                ) : (
                    <div className="no-movies">
                        <p>No movies found. Try a different search or check back later.</p>
                    </div>
                )}
            </div>
        )}
    </div>
}

export default Home
