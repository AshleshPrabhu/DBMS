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

interface Snack {
  id: number;
  name: string;
  price: number;
  image: string;
}

const BookingPage: FC = () => {
  const { movieTitle, language, format } = useParams<{ movieTitle: string; language: string; format: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(0);
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<Record<number, number>>({});
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
    fetch('http://localhost:3000/api/snacks')
      .then(res => res.json())
      .then(data => setSnacks(data))
      .catch(err => console.error("Failed to fetch snacks", err));
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

  const handleSnackQuantityChange = (snackId: number, quantity: number) => {
    setSelectedSnacks(prev => {
      const newSnacks = { ...prev };
      if (quantity <= 0) {
        delete newSnacks[snackId];
      } else {
        newSnacks[snackId] = quantity;
      }
      return newSnacks;
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
    
    const snacksToBook = Object.entries(selectedSnacks).map(([id, quantity]) => ({
      id: Number(id),
      quantity,
    }));

    try {
      const res = await fetch('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          show_id: selectedShow.show_id,
          seat_ids: selectedSeats.map(s => s.id),
          snacks: snacksToBook,
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
                user_id: user.id,
                show_id: selectedShow.show_id,
                seat_ids: selectedSeats.map(s => s.id),
                snacks: snacksToBook,
              }),
            });

            if (verifyRes.ok) {
                const selectedSnackDetails = snacksToBook.map(snack => {
                    const snackInfo = snacks.find(s => s.id === snack.id);
                    return { ...snackInfo, quantity: snack.quantity };
                });

                navigate('/success', {
                    state: {
                        bookingDetails: {
                            movie_name: movieTitle,
                            theater_name: selectedShow.theater_name,
                            movie_time: selectedShow.movie_time,
                            seats: selectedSeats,
                            snacks: selectedSnackDetails,
                            totalAmount: getTotalPrice(),
                        }
                    }
                });
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
    const seatsPrice = selectedSeats.reduce((total, seat) => total + seat.amount, 0);
    const snacksPrice = Object.entries(selectedSnacks).reduce((total, [snackId, quantity]) => {
      const snack = snacks.find(s => s.id === Number(snackId));
      return total + (snack ? snack.price * quantity : 0);
    }, 0);
    return seatsPrice + snacksPrice;
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1 className="booking-title">{movieTitle}</h1>
        <div className="booking-pills">
          <span className="pill">{language}</span>
          <span className="pill">{format}</span>
        </div>
      </div>

      <div className="dates-and-filters">
        <div className="dates-scroll">
          {dates.map((date, index) => (
            <div
              key={index}
              className={`date-item ${selectedDate === index ? 'active' : ''}`}
              onClick={() => setSelectedDate(index)}
            >
              <span className="date-item-day">{date.day}</span>
              <span className="date-item-number">{date.dateNum}</span>
              <span className="date-item-month">{date.month}</span>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="theaters-container">
        {Object.entries(groupedShows).map(([theaterName, theaterShows]) => (
          <div key={theaterName} className="theater-card">
            <div className="theater-header">
              <div className="theater-info">
                <h3 className="theater-name">{theaterName}</h3>
              </div>
            </div>
            <div className="showtimes-grid">
              {theaterShows.map((show) => (
                <button
                  key={show.show_id}
                  className="showtime-btn"
                  onClick={() => {
                    setSelectedShow(show);
                    setShowSeatModal(true);
                  }}
                >
                  <span className="showtime-time">{new Date(show.movie_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showSeatModal && selectedShow && (
        <div className="seat-modal-overlay" onClick={() => setShowSeatModal(false)}>
          <div className="seat-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowSeatModal(false)}>×</button>
            <h2>Select Your Seats</h2>
            <div className="theater-layout">
              <div className="screen">Screen This Way</div>
              <div className="seats-container">
                {Object.entries(
                  selectedShow.seats.reduce((acc, seat) => {
                    const row = seat.seat_number.charAt(0);
                    if (!acc[row]) {
                      acc[row] = [];
                    }
                    acc[row].push(seat);
                    return acc;
                  }, {} as Record<string, Seat[]>)
                ).map(([row, seats]) => (
                  <div className="seat-row" key={row}>
                    <div className="row-label">{row}</div>
                    <div className="seats">
                      {seats.map(seat => {
                        const isBooked = selectedShow.bookedSeatIds.includes(seat.id);
                        const isSelected = selectedSeats.some(s => s.id === seat.id);
                        return (
                          <div
                            key={seat.id}
                            className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => !isBooked && handleSeatSelection(seat)}
                          >
                            {seat.seat_number.substring(1)}
                          </div>
                        );
                      })}
                    </div>
                    <div className="row-price">₹{seats[0].amount}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="snacks-section">
              <h3>Add Some Snacks</h3>
              <div className="snacks-container">
                {snacks.map(snack => (
                  <div key={snack.id} className="snack-item">
                    <img src={snack.image} alt={snack.name} className="snack-image" />
                    <div className="snack-details">
                      <span className="snack-name">{snack.name}</span>
                      <span className="snack-price">₹{snack.price}</span>
                    </div>
                    <div className="snack-quantity">
                      <button onClick={() => handleSnackQuantityChange(snack.id, (selectedSnacks[snack.id] || 0) - 1)}>-</button>
                      <span>{selectedSnacks[snack.id] || 0}</span>
                      <button onClick={() => handleSnackQuantityChange(snack.id, (selectedSnacks[snack.id] || 0) + 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div className="seat available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="seat selected"></div>
                <span>Selected</span>
              </div>
              <div className="legend-item">
                <div className="seat booked"></div>
                <span>Booked</span>
              </div>
            </div>
            <div className="seat-modal-footer">
              <p>Selected Seats: {selectedSeats.map(s => s.seat_number).join(', ')}</p>
              <p>Total Price: ₹{getTotalPrice()}</p>
              <button className="continue-btn" onClick={handleBooking}>Pay ₹{getTotalPrice()}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
