import type {FC} from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingPage.css';

interface Seat {
  id: number;
  seat_number: string;
  amount: number;
}

interface Show {
  show_id: number;
  movie_time: string;
  theater_name: string;
  screen_name: string;
  screen_id: number;
  seats: Seat[];
  bookedSeatIds: number[];
}

const BookingPage: FC = () => {
  const { movieTitle, language, format } = useParams<{ movieTitle: string; language: string; format: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(0);
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [error, setError] = useState<string>('');
  
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  useEffect(() => {
    if (movieTitle) {
      fetch(`http://localhost:3000/api/bookings/shows/${movieTitle}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch show details');
          }
          return res.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                setShows(data);
            } else {
                setError('No shows available for this movie.');
            }
        })
        .catch(err => {
          setError(err.message);
          console.error(err);
        });
    }
  }, [movieTitle]);

  const handleSeatSelection = (seat: Seat) => {
    setSelectedSeats(prev => {
      if (prev.find(s => s.id === seat.id)) {
        return prev.filter(s => s.id !== seat.id);
      }
      return [...prev, seat];
    });
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0 || !selectedShow) {
      alert("Please select seats first.");
      return;
    }

    const userString = localStorage.getItem('user');
    if (!userString) {
      alert("Please log in to book tickets.");
      navigate('/'); 
      return;
    }
    const user = JSON.parse(userString);
    
    try {
      const res = await fetch('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          show_id: selectedShow.show_id,
          seats: selectedSeats.map(s => s.id),
          amount: getTotalPrice(),
          currency: 'INR',
        }),
      });

      if (res.ok) {
        const { order } = await res.json();
        
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
          amount: order.amount,
          currency: order.currency,
          name: 'CineVault',
          description: 'Movie Ticket Booking',
          order_id: order.razorpay_order_id,
          handler: async function (response: any) {
            const verifyRes = await fetch('http://localhost:3000/api/payments/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              alert('Payment successful!');
              setShowSeatModal(false);
              setSelectedSeats([]);
              // Refetch shows to update booked seats
              if (movieTitle) {
                  fetch(`http://localhost:3000/api/bookings/shows/${movieTitle}`)
                      .then(res => res.json())
                      .then(data => setShows(data));
              }
            } else {
              alert('Payment verification failed.');
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone_number
          },
          theme: {
            color: '#3399cc'
          }
        };
        
        const rzp = new (window as any).Razorpay(options);
        rzp.open();

      } else {
        const errorData = await res.json();
        alert(`Booking failed: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during booking.');
    }
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

  const dates = generateDates();

  const groupedShows = shows.reduce((acc, show) => {
    const key = show.theater_name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(show);
    return acc;
  }, {} as Record<string, Show[]>);

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.amount, 0);
  };

  return (
    <div className="booking-page">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1>{movieTitle}</h1>
        <p>{language} • {format}</p>
      </div>

      <div className="date-selector">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`date-card ${selectedDate === index ? 'selected' : ''}`}
            onClick={() => setSelectedDate(index)}
          >
            <p>{date.day}</p>
            <p>{date.dateNum}</p>
            <p>{date.month}</p>
          </div>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="theaters-list">
        {Object.entries(groupedShows).map(([theaterName, theaterShows]) => (
          <div key={theaterName} className="theater-section">
            <h3>{theaterName}</h3>
            <div className="showtimes">
              {theaterShows.map((show) => (
                <button
                  key={show.show_id}
                  className="showtime-btn"
                  onClick={() => {
                    setSelectedShow(show);
                    setShowSeatModal(true);
                  }}
                >
                  {new Date(show.movie_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showSeatModal && selectedShow && (
        <div className="modal-overlay" onClick={() => setShowSeatModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowSeatModal(false)}>×</button>
            <h2>Select Your Seats</h2>
            <div className="seat-map">
              {selectedShow.seats.map(seat => {
                const isBooked = selectedShow.bookedSeatIds.includes(seat.id);
                const isSelected = selectedSeats.some(s => s.id === seat.id);
                return (
                  <div
                    key={seat.id}
                    className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => !isBooked && handleSeatSelection(seat)}
                  >
                    {seat.seat_number}
                  </div>
                );
              })}
            </div>
            <div className="screen-line">Screen This Way</div>
            <div className="booking-summary">
              <p>Selected Seats: {selectedSeats.map(s => s.seat_number).join(', ')}</p>
              <p>Total Price: ₹{getTotalPrice()}</p>
              <button className="submit-btn" onClick={handleBooking}>Pay ₹{getTotalPrice()}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
