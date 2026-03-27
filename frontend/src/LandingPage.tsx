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
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const moviePosters: string[] = [P1, P2, P3, P4, P5];

  useEffect((): (() => void) => {
    const moviePostersLength = 5;
    const interval = setInterval((): void => {
      setCurrentSlide((prev: number): number => (prev + 1) % moviePostersLength);
    }, 3000);
    return (): void => clearInterval(interval);
  }, []);

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Login success:', data);
        setEmail('');
        setPassword('');
        setShowModal(false);
        navigate('/home');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Signup success:', data);
        setName('');
        setEmail('');
        setPassword('');
        setIsLogin(true);
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div className="App">
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
            {isLogin ? (
              <>
                <h2>Sign In</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
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
                <p className="signup-link">
                  Don't have an account? <a href="#signup" onClick={() => setIsLogin(false)}>Sign up here</a>
                </p>
              </>
            ) : (
              <>
                <h2>Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignupSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
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
                  <button type="submit" className="submit-btn">Sign Up</button>
                </form>
                <p className="signup-link">
                  Already have an account? <a href="#signin" onClick={() => setIsLogin(true)}>Sign in here</a>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
