import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from './assets/logo.png';

interface Movie {
  id: number;
  name: string;
  image: string;
  language: string;
  genre: string;
  rating: number;
  release_date: string;
}

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentMovieSlide, setCurrentMovieSlide] = useState<number>(0);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [language, setLanguage] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [sort, setSort] = useState<string>('');

  const genres = ['All', 'Action', 'Thriller', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];

  useEffect(() => {
    fetch('http://localhost:3000/api/movies')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setAllMovies(data);
        setFilteredMovies(data);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  useEffect(() => {
    let movies = [...allMovies];

    if (searchQuery) {
      movies = movies.filter(movie => movie.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (language) {
      movies = movies.filter(movie => movie.language === language);
    }

    if (genre) {
      movies = movies.filter(movie => movie.genre.includes(genre));
    }

    if (sort) {
      switch (sort) {
        case 'a-z':
          movies.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'top-rated':
          movies.sort((a, b) => b.rating - a.rating);
          break;
        case 'latest':
          movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
          break;
        default:
          break;
      }
    }

    setFilteredMovies(movies);
    setCurrentMovieSlide(0);
  }, [searchQuery, language, genre, sort, allMovies]);

  const handlePrevSlide = (): void => {
    setCurrentMovieSlide((prev) =>
      prev === 0 ? Math.max(0, filteredMovies.length - 4) : prev - 1
    );
  };

  const handleNextSlide = (): void => {
    setCurrentMovieSlide((prev) =>
      prev >= filteredMovies.length - 4 ? 0 : prev + 1
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
            <select className="language-filter" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="">All Languages</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="Kannada">Kannada</option>
              <option value="Telugu">Telugu</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Tamil">Tamil</option>
            </select>
            <select className="sort-filter" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="a-z">A-Z</option>
                <option value="top-rated">Top Rated</option>
                <option value="latest">Latest</option>
            </select>
          </div>
          <div className="nav-right">
            <button className="profile-btn" onClick={() => navigate('/profile')}>Profile</button>
          </div>
        </div>
      </nav>

      <div className="filters-container">
        <div className="genre-filter-container">
          {genres.map((g) => (
              <div 
                key={g} 
                className={`genre-pill ${
                  (g === 'All' && genre === '') || genre === g ? 'active' : ''
                }`} 
                onClick={() => setGenre(g === 'All' ? '' : g)}
              >
                  {g}
              </div>
          ))}
        </div>
      </div>

      {/* Movie Slider */}
      <div className="movie-slider">
        <h2>Now Showing</h2>
        <div className="slider-container">
          {filteredMovies.length > 0 ? (
            <>
              <button
                className="slider-arrow prev"
                onClick={() => {
                  const el = document.querySelector('.movie-list') as HTMLElement;
                  el?.scrollBy({ left: -480, behavior: 'smooth' });
                }}
              >
                &lt;
              </button>

              <div
                className="movie-list"
                ref={(el) => {
                  if (!el) return;
                  let isDown = false, startX = 0, scrollLeft = 0;
                  el.onmousedown = (e) => {
                    isDown = true;
                    el.classList.add('dragging');
                    startX = e.pageX - el.offsetLeft;
                    scrollLeft = el.scrollLeft;
                  };
                  el.onmouseleave = () => { isDown = false; el.classList.remove('dragging'); };
                  el.onmouseup   = () => { isDown = false; el.classList.remove('dragging'); };
                  el.onmousemove = (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5;
                  };
                }}
              >
                {filteredMovies.map((movie) => (
                  <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.name}`)}>
                    <img src={movie.image} alt={movie.name} />
                    <p>{movie.name}</p>
                  </div>
                ))}
              </div>

              <button
                className="slider-arrow next"
                onClick={() => {
                  const el = document.querySelector('.movie-list') as HTMLElement;
                  el?.scrollBy({ left: 480, behavior: 'smooth' });
                }}
              >
                &gt;
              </button>
            </>
          ) : (
            <div className="no-movies-found">
              <p>No movies found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
