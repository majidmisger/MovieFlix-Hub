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

## Screenshots 


Before Login - So no Analytics is accessible 




<img width="1470" height="744" alt="Screenshot 2025-08-16 at 10 01 51 AM" src="https://github.com/user-attachments/assets/5de13661-a963-41cf-92a2-b5857b9a1b4b" />




After Login - Analytics is Accessible 


<img width="1443" height="871" alt="Screenshot 2025-08-16 at 10 03 28 AM" src="https://github.com/user-attachments/assets/b712c529-20f3-40be-8962-3fce12c9c51e" />



Selecting a particular Movies For Details 


<img width="1465" height="884" alt="Screenshot 2025-08-16 at 10 04 23 AM" src="https://github.com/user-attachments/assets/88c62e8a-64c4-465f-a016-8cc8bf98b8a9" />


Analytics Page 



<img width="1459" height="875" alt="Screenshot 2025-08-16 at 10 05 00 AM" src="https://github.com/user-attachments/assets/6f728991-d784-4439-a41c-e47cee877862" />

<img width="1470" height="885" alt="Screenshot 2025-08-16 at 10 05 32 AM" src="https://github.com/user-attachments/assets/da9855ca-7e79-4314-8822-01e7c0a36f61" />


