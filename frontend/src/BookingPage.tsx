import type {FC} from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingPage.css';

interface Theater {
  name: string;
  location: string;
  showtimes: Array<{
    time: string;
    format: string;
    language: string;
  }>;
}

const BookingPage: FC = () => {
  const { movieKey, language, format } = useParams<{ movieKey: string; language: string; format: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Pre-booked seats
  const bookedSeats = ['N3', 'N4', 'N5', 'M1', 'M2', 'M8', 'M9', 'L5', 'L6', 'L7', 'K10', 'K11', 'K12', 'J2', 'J3', 'J14', 'J15', 'H4', 'H5', 'G1', 'G2', 'B8', 'B9', 'A11', 'A12', 'A13'];

  // Movie titles mapping
  const movieTitles: { [key: string]: string } = {
    'akash': 'Akash',
    'gujarattitans': 'Gujarat Titans Registrations - TATA IPL 2026',
    'dhurandharrevenge': 'Dhurandhar The Revenge',
    'dhurandhar': 'Dhurandhar',
    'kanchana': 'Kanchana (2011)',
    'keralastory2': 'The Kerala Story 2: Goes Beyond',
    'ustaadsingh': 'Ustaad Bhagat Singh',
    'toxic': 'Toxic: A Fairy Tale for Grown-ups',
  };

  // Generate dates
  const generateDates = () => {
    const dates = [];
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const day = dayNames[date.getDay()];
      const dateNum = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
      
      dates.push({
        day,
        dateNum,
        month,
      });
    }
    
    return dates;
  };

  // Sample theater data
  const theaters: Theater[] = [
    {
      name: 'PVR: Orion Mall, Dr Rajkumar Road',
      location: 'Bangalore',
      showtimes: [
        { time: '08:00 PM', format: format || '2D', language: language || 'Hindi' },
        { time: '08:45 PM', format: format || '2D', language: language || 'Hindi' },
        { time: '09:15 PM', format: 'ATMOS', language: language || 'Hindi' },
        { time: '10:00 PM', format: format || '2D', language: language || 'Hindi' },
        { time: '10:10 PM', format: format || '2D', language: language || 'Hindi' },
        { time: '10:15 PM', format: 'GOLD', language: language || 'Hindi' },
        { time: '10:30 PM', format: 'PXL', language: language || 'Hindi' },
        { time: '10:30 PM', format: 'GOLD', language: language || 'Hindi' },
      ],
    },
    {
      name: 'INOX: Megaplex Mall of Asia Bangalore',
      location: 'Bangalore',
      showtimes: [
        { time: '08:45 PM', format: 'LASER', language: language || 'Hindi' },
        { time: '09:15 PM', format: 'LASER', language: language || 'Hindi' },
        { time: '09:30 PM', format: 'INSIGNIA', language: language || 'Hindi' },
        { time: '09:45 PM', format: format || '2D', language: language || 'Hindi' },
        { time: '10:00 PM', format: 'LASER', language: language || 'Hindi' },
        { time: '10:05 PM', format: 'LASER', language: language || 'Hindi' },
        { time: '10:15 PM', format: 'INSIGNIA', language: language || 'Hindi' },
        { time: '10:15 PM', format: 'LASER', language: language || 'Hindi' },
        { time: '10:30 PM', format: 'LASER', language: language || 'Hindi' },
      ],
    },
    {
      name: 'Cinepolis: Nexus Shantiniketan, Bengaluru',
      location: 'Bangalore',
      showtimes: [
        { time: '09:30 PM', format: 'ATMOS', language: language || 'Hindi' },
        { time: '09:35 PM', format: format || '2D', language: language || 'Hindi' },
        { time: '09:50 PM', format: '4DX', language: language || 'Hindi' },
        { time: '10:00 PM', format: format || '2D', language: language || 'Hindi' },
        { time: '10:30 PM', format: 'DOLBY 7.1', language: language || 'Hindi' },
      ],
    },
  ];

  const dates = generateDates();
  const movieTitle = movieTitles[movieKey || ''] || movieKey || '';

  return (
    <div className="booking-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo" onClick={() => navigate('/home')}>
            <img src="/logo (2).png" alt="CineVault" className="logo-img" />
            CineVault
          </div>
          <button className="book-tickets-btn">Book Tickets</button>
        </div>
      </nav>

      {/* Booking Header */}
      <div className="booking-header">
        <h1 className="booking-title">{movieTitle} - ({language})</h1>
        <div className="booking-pills">
          <span className="pill">Movie runtime: 3h 49m</span>
          <span className="pill">A</span>
          <span className="pill">Action</span>
          <span className="pill">Thriller</span>
        </div>
      </div>

      {/* Dates and Filters Section */}
      <div className="dates-and-filters">
        <div className="dates-scroll">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`date-item ${selectedDate === index ? 'active' : ''}`}
              onClick={() => setSelectedDate(index)}
            >
              <div className="date-item-day">{date.day}</div>
              <div className="date-item-number">{date.dateNum}</div>
              <div className="date-item-month">{date.month}</div>
            </div>
          ))}
        </div>

        <div className="filters">
          <button className="filter-btn">
            {language} - {format} <span className="dropdown-arrow">▼</span>
          </button>
          <button className="filter-btn">
            Price Range <span className="dropdown-arrow">▼</span>
          </button>
          <button className="filter-btn">
            Special Formats <span className="dropdown-arrow">▼</span>
          </button>
          <button className="filter-btn">
            Other Filters <span className="dropdown-arrow">▼</span>
          </button>
          <button className="filter-btn">
            Preferred Time <span className="dropdown-arrow">▼</span>
          </button>
          <button className="filter-btn">
            Sort By <span className="dropdown-arrow">▼</span>
          </button>
        </div>
      </div>

      {/* Theaters Section */}
      <div className="theaters-container">
        {theaters.map((theater, index) => (
          <div key={index} className="theater-card">
            <div className="theater-header">
              <div className="theater-info">
                <h3 className="theater-name">{theater.name}</h3>
                {/* Theater icons and details */}
              </div>
              <button className="like-btn">♡</button>
            </div>

            <div className="showtimes-grid">
              {theater.showtimes.map((showtime, stIndex) => (
                <button
                  key={stIndex}
                  className={`showtime-btn ${selectedShowtime === `${index}-${stIndex}` ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedShowtime(`${index}-${stIndex}`);
                    setShowSeatModal(true);
                  }}
                >
                  <div className="showtime-time">{showtime.time}</div>
                  <div className="showtime-format">{showtime.format}</div>
                </button>
              ))}
            </div>

            <div className="theater-footer">
              <span className="non-cancellable">Non-cancellable</span>
            </div>
          </div>
        ))}
      </div>

      {/* Seat Selection Modal */}
      {showSeatModal && (
        <div className="seat-modal-overlay" onClick={() => setShowSeatModal(false)}>
          <div className="seat-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowSeatModal(false)}>×</button>
            
            <div className="theater-layout">
              <div className="seats-container">
                {/* Row labels and seats */}
                <div className="rows-wrapper">
                  <div className="row-labels">
                    {['N', 'M', 'L', 'K', 'J', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'].map((row) => (
                      <div key={row} className="row-label">{row}</div>
                    ))}
                  </div>

                  <div className="seat-rows">
                    {/* ₹800 PRIME ROWS */}
                    <div className="section-label">₹800 PRIME ROWS</div>
                    {['N', 'M', 'L', 'K', 'J'].map((row, _) => (
                      <div key={row} className="seat-row">
                        {Array.from({ length: 16 }).map((_, seatIdx) => {
                          const seatId = `${row}${seatIdx + 1}`;
                          return (
                            <button
                              key={seatId}
                              className={`seat ${bookedSeats.includes(seatId) ? 'booked' : ''} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                              onClick={() => {
                                if (bookedSeats.includes(seatId)) return;
                                if (selectedSeats.includes(seatId)) {
                                  setSelectedSeats(selectedSeats.filter(s => s !== seatId));
                                } else {
                                  setSelectedSeats([...selectedSeats, seatId]);
                                }
                              }}
                              disabled={bookedSeats.includes(seatId)}
                            >
                              {seatIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    ))}

                    {/* ₹600 CLASSIC PLUS ROWS */}
                    <div className="section-label">₹600 CLASSIC PLUS ROWS</div>
                    {['H', 'G', 'F', 'E', 'D', 'C'].map((row, _) => (
                      <div key={row} className="seat-row">
                        {Array.from({ length: 14 }).map((_, seatIdx) => {
                          const seatId = `${row}${seatIdx + 1}`;
                          return (
                            <button
                              key={seatId}
                              className={`seat ${bookedSeats.includes(seatId) ? 'booked' : ''} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                              onClick={() => {
                                if (bookedSeats.includes(seatId)) return;
                                if (selectedSeats.includes(seatId)) {
                                  setSelectedSeats(selectedSeats.filter(s => s !== seatId));
                                } else {
                                  setSelectedSeats([...selectedSeats, seatId]);
                                }
                              }}
                              disabled={bookedSeats.includes(seatId)}
                            >
                              {seatIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    ))}

                    {/* ₹600 CLASSIC ROWS */}
                    <div className="section-label">₹600 CLASSIC ROWS</div>
                    {['B', 'A'].map((row, _) => (
                      <div key={row} className="seat-row">
                        {Array.from({ length: 16 }).map((_, seatIdx) => {
                          const seatId = `${row}${seatIdx + 1}`;
                          return (
                            <button
                              key={seatId}
                              className={`seat ${bookedSeats.includes(seatId) ? 'booked' : ''} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                              onClick={() => {
                                if (bookedSeats.includes(seatId)) return;
                                if (selectedSeats.includes(seatId)) {
                                  setSelectedSeats(selectedSeats.filter(s => s !== seatId));
                                } else {
                                  setSelectedSeats([...selectedSeats, seatId]);
                                }
                              }}
                              disabled={bookedSeats.includes(seatId)}
                            >
                              {seatIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screen */}
                <div className="screen">
                  <div className="screen-label">All eyes this way please</div>
                </div>
              </div>
            </div>

            <div className="seat-modal-footer">
              <button 
                className="continue-btn" 
                disabled={selectedSeats.length === 0}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
