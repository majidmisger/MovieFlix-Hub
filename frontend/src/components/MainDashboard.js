// src/components/MainDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { searchMovies } from '../helperFunctions/helperFunctions';

function MainDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [genreOption, setGenreOption] = useState('');

  // Fetch all movies on page load
  useEffect(() => {
    const fetchAllMovies = async () => {
      const results = await searchMovies('', sortOption, genreOption);
      setFilteredMovies(results);
    };
    fetchAllMovies();
  }, []);


  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchMovies(searchTerm, sortOption, genreOption);
    setFilteredMovies(results);
  };

  const handleSort = async (e) => {
    const option = e.target.value;
    setSortOption(option);
    const results = await searchMovies(searchTerm, option, genreOption);
    setFilteredMovies(results);
  };

  const handleGenreChange = async (e) => {
    const genre = e.target.value;
    setGenreOption(genre);
    const results = await searchMovies(searchTerm, sortOption, genre);
    setFilteredMovies(results);
  };

  return (
    <Container className="mt-5">
      {/* Search Bar */}
      <Form
        onSubmit={handleSearch}
        className="d-flex justify-content-center mb-4"
        style={{ gap: '10px' }}
      >
        <Form.Control
          type="search"
          placeholder="Search for a movie..."
          style={{
            maxWidth: '600px',
            height: '50px',
            fontSize: '18px',
            padding: '10px',
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ height: '50px', padding: '0 20px', fontSize: '18px' }}
        >
          Search
        </button>
      </Form>

      {/* Sorting & Genre Filter */}
      {filteredMovies.length > 0 && (
        <div className="d-flex justify-content-end mb-3" style={{ gap: '10px' }}>
          <Form.Select
            value={sortOption}
            onChange={handleSort}
            style={{ width: '200px' }}
          >
            <option value="">Sort By...</option>
            <option value="titleAsc">Title (A–Z)</option>
            <option value="titleDesc">Title (Z–A)</option>
            <option value="rating_desc">Rating (High → Low)</option>
            <option value="rating_asc">Rating (Low → High)</option>
            <option value="year_desc">Year (Newest → Oldest)</option>
            <option value="year_asc">Year (Oldest → Newest)</option>
          </Form.Select>

          <Form.Select
            value={genreOption}
            onChange={handleGenreChange}
            style={{ width: '200px' }}
          >
            <option value="">Filter by Genre...</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Crime">Crime</option>
          </Form.Select>
        </div>
      )}

      {/* Movie List */}
      <Row>
        {filteredMovies.map((movie) => (
          <Col key={movie.tmdbId} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Link
              to={`/movie/${movie.tmdbId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card className="h-100 shadow-sm hover-shadow">
                {movie.posterUrl && (
                  <Image
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    fluid
                    style={{
                      height: '300px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '0.375rem',
                      borderTopRightRadius: '0.375rem',
                    }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    Year: {movie.year} <br />
                    Rating: ⭐ {movie.rating} <br />
                    Runtime: {movie.runtime} min <br />
                    Genres: {movie.genre.join(', ')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* No results message */}
      {searchTerm && filteredMovies.length === 0 && (
        <p className="text-center text-muted">No movies found.</p>
      )}
    </Container>
  );
}

export default MainDashboard;
