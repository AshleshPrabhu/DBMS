import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetailsPage.css';

interface MovieDetails {
  id: number;
  name: string;
  image: string;
  about: string;
  reviews: number;
  actors: string[];
  language: string;
  genre: string;
  rating: number;
  release_date: string;
}

const MovieDetailsPage: FC = () => {
  const { movieTitle } = useParams<{ movieTitle: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (movieTitle) {
      fetch(`http://localhost:3000/api/movies/${movieTitle}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch movie details');
          }
          return res.json();
        })
        .then(data => {
            if (data.actors && typeof data.actors === 'string') {
                try {
                    data.actors = JSON.parse(data.actors);
                } catch (e) {
                    console.error("Failed to parse actors JSON:", e);
                    data.actors = [];
                }
            }
            setMovie(data);
        })
        .catch(err => {
          setError(err.message);
          console.error(err);
        });
    }
  }, [movieTitle]);

  const handleBooking = (): void => {
    navigate(`/booking/${movieTitle}`);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-page">
      <div className="header-bar">
        <button className="back-arrow" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>{movie.name}</h1>
      </div>

      <div className="movie-content">
        <div className="poster-section">
          <img src={movie.image} alt={movie.name} className="movie-poster" />
        </div>
        <div className="details-section">
          <h2>{movie.name}</h2>
          <div className="rating">
            <span className="rating-value">⭐ {movie.rating.toFixed(1)}/10</span>
            <span className="reviews-count">{movie.reviews.toLocaleString()} reviews</span>
          </div>
          <div className="movie-info">
            <span>{movie.language}</span>
            <span>{movie.genre}</span>
            <span>{new Date(movie.release_date).toLocaleDateString()}</span>
          </div>
          <p>{movie.about}</p>
          
          <h3>Cast</h3>
          <div className="cast-list">
            {movie.actors.map((actor, index) => (
              <span key={index} className="cast-member">{actor}</span>
            ))}
          </div>

          <button className="book-tickets-btn" onClick={handleBooking}>
            Book tickets
          </button>
        </div>
      </div>


    </div>
  );
};

export default MovieDetailsPage;
