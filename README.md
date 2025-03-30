# Movie App

A React-based movie application that allows users to search for movies, view details, find streaming providers, and save favorites.

## Features

- Search for movies using the TMDB API
- View movie details including trailers and ratings
- See where to watch movies (streaming providers) by region
- Add movies to favorites
- Responsive design for all devices

## Setup Instructions

### Prerequisites

- Node.js (v14.0.0 or later)

### Installation

1. Clone the repository:
```bash

git clone https://github.com/Mherr162/React-App.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Install dotenv dependency using the following command 
   ```bash npm install dotenv --save
   ```
   - Create `.env` file in root dir and add it to the `.gitignore` file
   - Edit the `.env` file and add your TMDB API key
   - You can get your API key by creating an account at [https://www.themoviedb.org/](https://www.themoviedb.org/) and going to Settings > API

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)




## Environment Variables

This project uses environment variables to store sensitive data. To set up your environment:

1. Create a `.env` file in the root directory of the project
2. Add your TMDB API key to the file in this format:
```
VITE_TMDB_API_KEY=your_api_key_here
```

**Note:** The `.env` file should never be committed to the repository. It's already added to `.gitignore` to prevent accidental commits.

## Building for Production

To create a production build:

```bash
npm run build
```

## Technologies Used

- React
- React Router
- Vite
- TMDB API
- CSS (custom styling)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License
