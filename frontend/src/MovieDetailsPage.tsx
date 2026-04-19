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
}

const MovieDetailsPage: FC = () => {
  const { movieTitle } = useParams<{ movieTitle: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string>('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

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
            // The 'actors' field is a JSON string, so we need to parse it.
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
    // Directly navigate to the booking page with default values
    navigate(`/booking/${movieTitle}/Kannada/3D`);
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
            <span>⭐ {movie.reviews}</span>
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
