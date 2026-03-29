import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from './assets/logo.png';

interface Movie {
  id: number;
  name: string;
  image: string;
}

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentMovieSlide, setCurrentMovieSlide] = useState<number>(0);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handlePrevSlide = (): void => {
    setCurrentMovieSlide((prev) =>
      prev === 0 ? Math.max(0, movies.length - 4) : prev - 1
    );
  };

  const handleNextSlide = (): void => {
    setCurrentMovieSlide((prev) =>
      prev >= movies.length - 4 ? 0 : prev + 1
    );
  };

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src={logo} alt="CineVault" className="logo-img" />
            CineVault
          </div>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for Movies, Events, Plays & more"
              value={searchQuery}
              onChange={(e): void => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="nav-right">
            <button className="profile-btn" onClick={() => navigate('/profile')}>Profile</button>
          </div>
        </div>
      </nav>

      {/* Movie Slider */}
      <div className="movie-slider">
        <h2>Now Showing</h2>
        <div className="slider-container">
          <button className="slider-arrow prev" onClick={handlePrevSlide}>
            &lt;
          </button>
          <div className="movie-list" style={{ transform: `translateX(-${currentMovieSlide * 25}%)` }}>
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.name}`)}>
                <img src={movie.image} alt={movie.name} />
                <p>{movie.name}</p>
              </div>
            ))}
          </div>
          <button className="slider-arrow next" onClick={handleNextSlide}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
