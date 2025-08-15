import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MovieList = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 p-4">
      {movies.map((movie) => (
        <Col key={movie.tmdbId}>
          <Card 
            style={{ cursor: 'pointer', height: '100%' }} 
            onClick={() => navigate(`/movies/${movie.tmdbId}`)}
          >
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                Year: {movie.year} <br />
                Rating: {movie.rating}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MovieList;
