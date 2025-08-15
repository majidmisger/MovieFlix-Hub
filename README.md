# MovieFlix Hub

MovieFlix Hub is an interactive movie dashboard application that allows users to explore, search, and analyze movie data sourced from the TMDB API. Built with a Node.js/Express backend and a React frontend, it features movie listings, genre filtering, rating sorting, and basic analytics.

## Installation
1. Clone the repository: `git clone https://github.com/majidmisger/MovieFlix-Hub.git`
2. Navigate to the backend: `cd backend`
3. Install dependencies: `npm install`
4. Set up environment variables in `.env`

```
TMDB_API_KEY=XXXXXXXXXXXXXXXXX
TMDB_BASE_URL=XXXXXXXX
MONGODB_URI=mongodb://localhost:27017/movieflix
JWT_SECRET=XXXXXXXXXXXX

```
5. Start the server: `node server.js`
6. Navigate to the frontend: `cd frontend`
7. set up environment Varaibles in `.env`

```
REACT_APP_API_BASE_URL=http://localhost:5001/api

```

9. Install dependencies: `npm install`
10. Start the frontend: `npm start`

## Usage
- Access the app at `http://localhost:3000`.
- Search movies, filter by genre, and sort by rating.

## Technologies
- Backend: Node.js, Express, MongoDB
- Frontend: React, React Bootstrap
- API: TMDB
