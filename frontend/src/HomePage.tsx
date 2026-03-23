import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import CitySelector from './CitySelector';
import logo from './assets/logo.png';
import P1 from './assets/P1.jpg';
import P2 from './assets/P2.jpg';
import P3 from './assets/P3.jpg';
import P4 from './assets/P4.png';
import P5 from './assets/P5.jpeg';

interface Movie {
  id: number;
  title: string;
  poster: string;
}

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [showCitySelector, setShowCitySelector] = useState<boolean>(true);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentMovieSlide, setCurrentMovieSlide] = useState<number>(0);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState<boolean>(false);
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);

  const cities = ['Bengaluru', 'Mangaluru', 'Delhi', 'Chennai'];

  const trendingSearches: string[] = [
    'Akash',
    'Gujarat Titans Registrations - TATA IPL 2026',
    'Dhurandhar The Revenge',
    'Dhurandhar',
    'Kanchana (2011)',
    'The Kerala Story 2: Goes Beyond',
    'Ustaad Bhagat Singh',
    'Toxic: A Fairy Tale for Grown-ups',
  ];

  const movieUrlMap: { [key: string]: string } = {
    'Akash': 'akash',
    'Gujarat Titans Registrations - TATA IPL 2026': 'gujarattitans',
    'Dhurandhar The Revenge': 'dhurandharrevenge',
    'Dhurandhar': 'dhurandhar',
    'Kanchana (2011)': 'kanchana',
    'The Kerala Story 2: Goes Beyond': 'keralastory2',
    'Ustaad Bhagat Singh': 'ustaadsingh',
    'Toxic: A Fairy Tale for Grown-ups': 'toxic',
  };

  // Sample movies data
  const movies: Movie[] = [
    { id: 1, title: 'Movie 1', poster: P1 },
    { id: 2, title: 'Movie 2', poster: P2 },
    { id: 3, title: 'Movie 3', poster: P3 },
    { id: 4, title: 'Movie 4', poster: P4 },
    { id: 5, title: 'Movie 5', poster: P5 },
    { id: 6, title: 'Movie 6', poster: P1 },
    { id: 7, title: 'Movie 7', poster: P2 },
    { id: 8, title: 'Movie 8', poster: P3 },
  ];

  const handleCitySelect = (city: string): void => {
    setSelectedCity(city);
    setShowCitySelector(false);
  };

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

  // const filteredMovies = searchQuery
  //   ? trendingSearches.filter((search) =>
  //       search.toLowerCase().includes(searchQuery.toLowerCase())
  //     ).length > 0
  //     ? trendingSearches.filter((search) =>
  //         search.toLowerCase().includes(searchQuery.toLowerCase())
  //       ).map((_, index) => movies[index % movies.length])
  //     : []
  //   : movies;

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src={logo} alt="CineVault" className="logo-img" />
            CineVault
          </div>
          <div className="city-section">
            <div className="city-badge">{selectedCity}
              <div className="city-dropdown-wrapper">
                <button 
                  className="city-dropdown-toggle"
                  onClick={(): void => setShowCityDropdown(!showCityDropdown)}
                >
                  ▼
                </button>
                {showCityDropdown && (
                  <div className="city-dropdown">
                    {cities.map((city) => (
                      <div
                        key={city}
                        className="city-dropdown-item"
                        onClick={(): void => {
                          setSelectedCity(city);
                          setShowCityDropdown(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-wrapper">
          <svg className="search-icon-svg" viewBox="0 0 24 24" width="20" height="20">
            <circle cx="10" cy="10" r="6" fill="none" stroke="#3258a8" strokeWidth="2"/>
            <line x1="14" y1="14" x2="20" y2="20" stroke="#3258a8" strokeWidth="2"/>
          </svg>
          <input
            type="text"
            className="search-bar"
            placeholder="Search for Movies, Events, Plays & more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(): void => setShowSearchSuggestions(true)}
            onBlur={(): void => {
              setTimeout(() => setShowSearchSuggestions(false), 200);
            }}
          />
        </div>
        {showSearchSuggestions && (
          <div className="search-suggestions">
            <div className="suggestions-header">TRENDING SEARCHES</div>
            {trendingSearches
              .filter((search) =>
                search.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((search, index) => (
              <div
                key={index}
                className="suggestion-item"
                onMouseDown={(e): void => {
                  e.preventDefault();
                  e.stopPropagation();
                  const urlTitle = movieUrlMap[search];
                  if (urlTitle) {
                    navigate(`/movie/${urlTitle}`);
                    setShowSearchSuggestions(false);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <span className="suggestion-text">{search}</span>
                <span className="suggestion-icon">🎬</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Movies Carousel */}
      <div className="movies-section">
        <h2>Now Showing</h2>
        <div className="carousel-container">
          <button className="carousel-btn prev-btn" onClick={handlePrevSlide}>
            ❮
          </button>

          <div className="movies-carousel">
            {movies
              .slice(currentMovieSlide, currentMovieSlide + 4)
              .map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-poster"
                  />
                </div>
              ))}
          </div>

          <button className="carousel-btn next-btn" onClick={handleNextSlide}>
            ❯
          </button>
        </div>
      </div>

      {/* City Selector Modal */}
      {showCitySelector && (
        <CitySelector onSelectCity={handleCitySelect} />
      )}
    </div>
  );
};

export default HomePage;
