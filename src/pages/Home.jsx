import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import '../css/Home.css'
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
    // state variable
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
       
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch(err){
                console.log(err)
                setError("Failed to load movies")
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
            setMovies(searchResults)
            setError(null)
        } catch (err){
            setError("Failed to search for movies...")
        } finally{
            setLoading(false)
        }

        setSearchQuery("") // set the state( set a new value after pressing search button)

    }
    return <div className="home">

        <form onSubmit={handleSearch} className="search-form">

            {/* value property will update depends on the state */}
            <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} 
            // update the state of search
            onChange={(e) => setSearchQuery(e.target.value)}/>

            <button type="submit" className="search-button">
                Search
            </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (<div className="loading">Loading...</div> ):(
        <div className="movies-grid">
            {/* mappping the movies array and search for the requested one */}
            {movies.map(movie =>
               // movie.title.toLowerCase().startsWith(searchQuery) &&
                <MovieCard movie={movie} key={movie.id} />
            )}
        </div>
        )}
    </div>
}
export default Home