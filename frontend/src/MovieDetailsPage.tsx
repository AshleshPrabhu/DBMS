import type { FC } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetailsPage.css';
import P1 from './assets/P1.jpg';
import P2 from './assets/P2.jpg';
import P3 from './assets/P3.jpg';
import P4 from './assets/P4.png';
import P5 from './assets/P5.jpeg';

const MovieDetailsPage: FC = () => {
  const { movieTitle } = useParams<{ movieTitle: string }>();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const movieDescriptions: { [key: string]: { poster: string; description: string[]; cast: string[] } } = {
    'akash': {
      poster: P1,
      description: [
        'Akash is an inspiring drama that explores the dreams and aspirations of a young protagonist aiming to reach new heights. With stunning cinematography and powerful performances, this film takes you on an emotional journey through challenges and triumphs.',
        'The movie showcases the beauty of determination and the power of never giving up on your dreams, no matter how difficult the path may seem.',
      ],
      cast: ['Raj Kumar', 'Priya Sharma', 'Vikram Singh', 'Anjali Verma'],
    },
    'gujarattitans': {
      poster: P2,
      description: [
        'Gujarat Titans Registrations is an exciting sports documentary that captures the essence of the TATA IPL 2026 season. Follow the thrilling journey of India\'s newest cricket franchise as they build their team and pursue glory.',
        'This film showcases the determination, talent, and spirit of cricket with behind-the-scenes footage and exclusive interviews with players and coaches.',
      ],
      cast: ['Shubman Gill', 'Rashid Khan', 'Hardik Pandya', 'Sai Sudharsan'],
    },
    'dhurandharrevenge': {
      poster: P2,
      description: [
        'Dhurandhar The Revenge is an action-packed thriller that brings intense sequences and gripping storytelling. This film follows a powerful narrative of justice and redemption with stellar performances from the cast.',
        'With heart-pounding action scenes and emotional depth, this movie will keep you on the edge of your seat from start to finish.',
      ],
      cast: ['Akshay Kumar', 'Sunny Leone', 'Ajay Devgn', 'Katrina Kaif'],
    },
    'dhurandhar': {
      poster: P3,
      description: [
        'Dhurandhar is a masterpiece of suspense and drama that delves into the complexities of human nature. The film presents a unique storyline with brilliant cinematography and memorable dialogues.',
        'This cinematic experience offers a perfect blend of entertainment and meaningful storytelling that resonates with audiences of all ages.',
      ],
      cast: ['Nawazuddin Siddiqui', 'Vidya Balan', 'Pankaj Tripathi', 'Taapsee Pannu'],
    },
    'kanchana': {
      poster: P4,
      description: [
        'Kanchana 2011 is a horror-comedy film that masterfully balances scares with laughter. This iconic film revolutionized the horror genre in Indian cinema with its innovative approach and memorable characters.',
        'The movie combines supernatural elements with humor and emotional moments, making it a perfect entertainment package for movie enthusiasts.',
      ],
      cast: ['Raghava Lawrence', 'Thulasi Nivas', 'Kovai Sarala', 'Sangeetha'],
    },
    'keralastory2': {
      poster: P5,
      description: [
        'The Kerala Story 2: Goes Beyond continues the compelling narrative with deeper exploration of characters and their journeys. This film showcases the beauty of Kerala with stunning visuals and engaging storytelling.',
        'With a well-crafted plot and outstanding performances, this movie delivers a captivating experience that will leave you wanting more.',
      ],
      cast: ['Adah Sharma', 'Yograj Bhat', 'Asha Sharath', 'Tovino Thomas'],
    },
    'ustaadsingh': {
      poster: P1,
      description: [
        'Ustaad Bhagat Singh is a biographical drama that honors the life and legacy of a legendary freedom fighter. The film captures the essence of sacrifice and patriotism with powerful performances and historical authenticity.',
        'This inspiring tale of courage and determination brings to life the extraordinary journey of a hero who shaped the nation\'s history.',
      ],
      cast: ['Irrfan Khan', 'Chandrachur Singh', 'Nana Patekar', 'Kay Kay Menon'],
    },
    'toxic': {
      poster: P2,
      description: [
        'Toxic: A Fairy Tale for Grown-ups is a dark comedy that reinvents classic fairy tales for adult audiences. With witty dialogue and unexpected plot twists, this film offers a fresh and entertaining take on beloved stories.',
        'The movie blends fantasy and humor seamlessly, creating an unforgettable cinematic experience that challenges traditional storytelling.',
      ],
      cast: ['Ranveer Singh', 'Deepika Padukone', 'Arjun Kapoor', 'Karisma Kapoor'],
    },
  };

  const movieTitleFormatted = movieTitle?.toLowerCase() || '';
  const movieKey = movieTitleFormatted;

  const movie = movieDescriptions[movieKey];

  // Map URL keys to display titles
  const urlKeyToTitle: { [key: string]: string } = {
    'akash': 'Akash',
    'gujarattitans': 'Gujarat Titans Registrations - TATA IPL 2026',
    'dhurandharrevenge': 'Dhurandhar The Revenge',
    'dhurandhar': 'Dhurandhar',
    'kanchana': 'Kanchana (2011)',
    'keralastory2': 'The Kerala Story 2: Goes Beyond',
    'ustaadsingh': 'Ustaad Bhagat Singh',
    'toxic': 'Toxic: A Fairy Tale for Grown-ups',
  };

  const displayTitle = urlKeyToTitle[movieKey] || movieKey;

  if (!movie) {
    return (
      <div className="movie-details-page">
        <div className="movie-not-found">
          <h2>Movie not found</h2>
          <button onClick={() => navigate('/home')} className="back-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo" onClick={() => navigate('/home')}>
            <img src="/logo (2).png" alt="CineVault" className="logo-img" />
            CineVault
          </div>
          <button className="book-tickets-btn" onClick={() => setShowBookingModal(true)}>Book Tickets</button>
        </div>
      </nav>

      {/* Movie Details Content */}
      <div className="movie-details-container">
        <div className="movie-details-content">
          <h1 className="movie-title">{displayTitle}</h1>

          <div className="movie-poster-section">
            <img src={movie.poster} alt={movieTitle} className="movie-poster-landscape" />
          </div>

          <div className="about-section">
            <h2 className="about-heading">About the movie</h2>
            <div className="about-description">
              {movie.description.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
          </div>

          <div className="cast-section">
            <h2 className="cast-heading">Cast</h2>
            <div className="cast-list">
              {movie.cast.map((actor, index) => (
                <div key={index} className="cast-item">
                  {actor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="booking-modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => {
              setShowBookingModal(false);
              setSelectedLanguage(null);
              setSelectedFormat(null);
            }}>×</button>

            <h2 className="modal-title">{displayTitle}</h2>

            {/* Language Selection */}
            <div className="modal-section">
              <h3 className="modal-label">Select Language</h3>
              <div className="selection-options">
                {['Hindi', 'Kannada', 'English'].map((lang) => (
                  <button
                    key={lang}
                    className={`option-btn ${selectedLanguage === lang ? 'selected' : ''}`}
                    onClick={() => setSelectedLanguage(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="modal-section">
              <h3 className="modal-label">Select Format</h3>
              <div className="selection-options">
                {['2D', '3D', 'IMAX'].map((format) => (
                  <button
                    key={format}
                    className={`option-btn ${selectedFormat === format ? 'selected' : ''}`}
                    onClick={() => setSelectedFormat(format)}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            {selectedLanguage && selectedFormat && (
              <button 
                className="modal-action-btn"
                onClick={() => {
                  navigate(`/booking/${movieKey}/${selectedLanguage}/${selectedFormat}`);
                  setShowBookingModal(false);
                }}
              >
                Continue to Theaters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
