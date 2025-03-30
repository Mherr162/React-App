

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
}

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    )
    const data = await response.json()
    return data.results
}

export const getWatchProviders = async (movieId) => {
    try {
        if (!movieId) {
            return null;
        }

        const response = await fetch(
            `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`API providers fetch failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data.results || {}; // Returns providers by country
    } catch (error) {
        console.error("Error fetching watch providers:", error);
        return null;
    }
}