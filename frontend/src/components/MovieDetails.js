// src/components/MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Image } from 'react-bootstrap';
import { getMovieById } from '../helperFunctions/helperFunctions';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getMovieById(id);
      setMovie(data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
}, [id]);


  if (!movie) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        {/* Optional Backdrop Image */}
        {movie.backdropUrl && (
          <Image
            src={movie.backdropUrl}
            alt={`${movie.title} backdrop`}
            fluid
            rounded
            className="mb-4"
          />
        )}

        <Row>
          <Col md={4} className="text-center">
            {/* Poster */}
            {movie.posterUrl && (
              <Image
                src={movie.posterUrl}
                alt={`${movie.title} poster`}
                fluid
                rounded
                className="mb-3"
              />
            )}
            {/* IMDb Link */}
            {movie.imdbLink && (
              <Button
                variant="warning"
                href={movie.imdbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-100"
              >
                View on IMDb
              </Button>
            )}
          </Col>

          <Col md={8}>
            <h2>{movie.title} ({movie.year})</h2>
            <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
            <p><strong>Runtime:</strong> {movie.runtime} min</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
            <p><strong>Genres:</strong> {movie.genre.join(', ')}</p>

            {/* Plot / Overview */}
            {movie.plot && (
              <p><strong>Plot:</strong> {movie.plot}</p>
            )}

            <Link to="/dashboard">
              <Button variant="primary">Back to Dashboard</Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default MovieDetails;
