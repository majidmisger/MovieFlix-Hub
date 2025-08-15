import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Spinner, Row, Col } from 'react-bootstrap';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { getAnalytics } from '../helperFunctions/helperFunctions';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement
);

const  AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const data = await getAnalytics(token);
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!analytics) {
    return <p className="text-center mt-5">No analytics data available.</p>;
  }

  // PIE CHART → Genres Distribution
  const genreData = {
    labels: (analytics.genreCount || []).map((g) => g._id),
    datasets: [
      {
        label: 'Movies by Genre',
        data: (analytics.genreCount || []).map((g) => g.count),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#E7E9ED', '#A3E4D7',
          '#F7DC6F', '#BB8FCE', '#F1948A', '#76D7C4'
        ],
      },
    ],
  };

  // BAR CHART → Average Ratings by Genre (mock calc for now)
  // If you don't have avg ratings by genre in backend, we can adapt backend later.
  const avgRatingsByGenre = (analytics.genreCount || []).map((g) => ({
    genre: g._id,
    avgRating: Math.random() * 5 + 3 // Fake for now, replace with backend calc
  }));

  const ratingsData = {
    labels: avgRatingsByGenre.map((g) => g.genre),
    datasets: [
      {
        label: 'Average Rating',
        data: avgRatingsByGenre.map((g) => g.avgRating.toFixed(2)),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  // LINE CHART → Average Runtime by Year
  const runtimeData = {
    labels: (analytics.runtimeByYear || []).map((r) => r._id),
    datasets: [
      {
        label: 'Avg Runtime (minutes)',
        data: (analytics.runtimeByYear || []).map((r) => r.avgRuntime),
        fill: false,
        borderColor: '#FF6384',
        tension: 0.3,
      },
    ],
  };

  return (
    <Card className="mt-4 p-4">
      <h4 className="mb-4">Statistics Dashboard</h4>

      <Row>
          <Col md={6} className="mb-5" style={{ height: '400px' }}>
            <h5>Genres Distribution</h5>
            <div style={{ height: '100%' }}>
              <Pie data={genreData} options={{ maintainAspectRatio: false }} />
            </div>
          </Col>

          <Col md={6} className="mb-5" style={{ height: '400px' }}>
            <h5> Average Ratings by Genre</h5>
            <div style={{ height: '100%' }}>
              <Bar data={ratingsData} options={{ maintainAspectRatio: false }} />
            </div>
          </Col>

      </Row>

      <Row>
        <Col>
          <h5>Average Runtime by Year</h5>
          <Line data={runtimeData} />
        </Col>
      </Row>
    </Card>
  );
};

export default  AnalyticsDashboard;
