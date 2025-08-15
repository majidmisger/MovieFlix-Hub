// StatsDashboard.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

function StatsDashboard({ movies }) {
  // Genre count for Pie chart
  const genreCount = movies.reduce((acc, movie) => {
    movie.genre.forEach(g => {
      acc[g] = (acc[g] || 0) + 1;
    });
    return acc;
  }, {});

  // Avg ratings by genre for Bar chart
  const genreRatings = {};
  movies.forEach(movie => {
    movie.genre.forEach(g => {
      if (!genreRatings[g]) genreRatings[g] = { total: 0, count: 0 };
      genreRatings[g].total += movie.rating;
      genreRatings[g].count += 1;
    });
  });
  const avgRatingsByGenre = Object.keys(genreRatings).map(g => ({
    genre: g,
    avg: genreRatings[g].total / genreRatings[g].count
  }));

  // Avg runtime by year for Line chart
  const yearRuntime = {};
  movies.forEach(movie => {
    if (!yearRuntime[movie.year]) yearRuntime[movie.year] = { total: 0, count: 0 };
    yearRuntime[movie.year].total += movie.runtime;
    yearRuntime[movie.year].count += 1;
  });
  const avgRuntimeByYear = Object.keys(yearRuntime).map(year => ({
    year,
    avg: yearRuntime[year].total / yearRuntime[year].count
  }));

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Analytics Dashboard</h2>

      <Row>
        {/* Pie Chart */}
        <Col md={6} className="mb-4">
          <Card className="p-3" style={{ height: '400px' }}>
            <h5 className="text-center">Genres Distribution</h5>
            <div style={{ height: '100%' }}>
              <Pie
                data={{
                  labels: Object.keys(genreCount),
                  datasets: [
                    {
                      data: Object.values(genreCount),
                      backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                        '#9966FF', '#FF9F40', '#66FF99', '#FF6666'
                      ]
                    }
                  ]
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true
                }}
              />
            </div>
          </Card>
        </Col>

        {/* Bar Chart */}
        <Col md={6} className="mb-4">
          <Card className="p-3" style={{ height: '400px' }}>
            <h5 className="text-center">Average Ratings by Genre</h5>
            <div style={{ height: '100%' }}>
              <Bar
                data={{
                  labels: avgRatingsByGenre.map(g => g.genre),
                  datasets: [
                    {
                      label: 'Avg Rating',
                      data: avgRatingsByGenre.map(g => g.avg),
                      backgroundColor: '#36A2EB'
                    }
                  ]
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      min: 0,
                      max: 10
                    }
                  }
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Line Chart */}
      <Row>
        <Col md={12} className="mb-4">
          <Card className="p-3" style={{ height: '400px' }}>
            <h5 className="text-center">Average Runtime by Year</h5>
            <div style={{ height: '100%' }}>
              <Line
                data={{
                  labels: avgRuntimeByYear.map(d => d.year),
                  datasets: [
                    {
                      label: 'Avg Runtime (min)',
                      data: avgRuntimeByYear.map(d => d.avg),
                      borderColor: '#FF6384',
                      backgroundColor: '#FF6384',
                      tension: 0.3
                    }
                  ]
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StatsDashboard;
