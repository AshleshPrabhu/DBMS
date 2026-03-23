import './LandingPage.css';
import type { FC, ChangeEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import P1 from './assets/P1.jpg';
import P2 from './assets/P2.jpg';
import P3 from './assets/P3.jpg';
import P4 from './assets/P4.png';
import P5 from './assets/P5.jpeg';

const LandingPage: FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Sample movie posters
  const moviePosters: string[] = [P1, P2, P3, P4, P5];

  useEffect((): (() => void) => {
    const moviePostersLength = 5;
    const interval = setInterval((): void => {
      setCurrentSlide((prev: number): number => (prev + 1) % moviePostersLength);
    }, 3000);
    return (): void => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Login:', { email, password });
    setEmail('');
    setPassword('');
    setShowModal(false);
    // Navigate to home page after login
    navigate('/home');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src={logo} alt="CineVault" className="logo-img" />
            CineVault
          </div>
          <ul className="nav-menu">
            <li><a href="#features">Features</a></li>
            <li><a href="#demo">Demo</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <button 
            className="signin-btn"
            onClick={(): void => setShowModal(true)}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Book Your Movie Tickets Instantly</h1>
          <p>
            Discover the latest blockbuster movies, stream trailers, and book your 
            favorite seats in advance. Enjoy a seamless cinema experience with CineVault.
          </p>
          <button 
            className="cta-btn"
            onClick={(): void => setShowModal(true)}
          >
            Get started →
          </button>
        </div>

        {/* Movie Poster Slideshow */}
        <div className="poster-container">
          <div className="poster-slide">
            <img 
              src={moviePosters[currentSlide]} 
              alt="Movie Poster"
              className="poster-image"
            />
          </div>
          <div className="slide-indicators">
            {moviePosters.map((_: string, index: number) => (
              <span 
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={(): void => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={(): void => setShowModal(false)}>
          <div className="modal-content" onClick={(e): void => e.stopPropagation()}>
            <button 
              className="close-btn"
              onClick={(): void => setShowModal(false)}
            >
              ×
            </button>
            <h2>Welcome to CineVault</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Sign In</button>
            </form>
            <p className="signup-link">Don't have an account? <a href="#signup">Sign up here</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
