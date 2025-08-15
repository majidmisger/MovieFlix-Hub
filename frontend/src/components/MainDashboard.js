// src/components/MainDashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { searchMovies } from '../helperFunctions/helperFunctions';

function MainDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [genreOption, setGenreOption] = useState('');
  const [page, setPage] = useState(1); // For pagination when no search
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Tracks if more pages are available

  // Fetch all movies on page load
  useEffect(() => {
    fetchMovies(1, true);
  }, []);

 const fetchMovies = async (pageNum, reset = false) => {
  setLoading(true);
  const results = await searchMovies(searchTerm, sortOption, genreOption, pageNum);

  setMovies(prev => {
    const combined = reset ? results : [...prev, ...results];
    const seen = new Set();
    return combined.filter(movie => {
      if (seen.has(movie.tmdbId)) return false;
      seen.add(movie.tmdbId);
      return true;
    });
  });

  setHasMore(results.length > 0); // Show "See More" only if results returned
  setLoading(false);
};
;

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(1, true);
  };

  const handleSort = async (e) => {
    const option = e.target.value;
    setSortOption(option);
    setPage(1);
    fetchMovies(1, true);
  };

  const handleGenreChange = async (e) => {
    const genre = e.target.value;
    setGenreOption(genre);
    setPage(1);
    fetchMovies(1, true);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, false);
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
          style={{ maxWidth: '600px', height: '50px', fontSize: '18px', padding: '10px' }}
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
      {movies.length > 0 && (
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
        {movies.map((movie) => (
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

      {/* See More Button - Only if no search term */}
      {!searchTerm && hasMore && (
        <div className="text-center mt-4">
          <Button
            variant="secondary"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'See More'}
          </Button>
        </div>
      )}

      {/* No results */}
      {searchTerm && movies.length === 0 && !loading && (
        <p className="text-center text-muted">No movies found.</p>
      )}
    </Container>
  );
}

export default MainDashboard;
