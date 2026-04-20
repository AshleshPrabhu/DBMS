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
  const { movieTitle } = useParams<{ movieTitle: string; language: string; format: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(0);
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<Record<number, number>>({});
  const [error, setError] = useState<string>('');
  const [lockedSeats, setLockedSeats] = useState<number[]>([]);
  const [isSeatLocking, setIsSeatLocking] = useState(false);
  const [lockTimer, setLockTimer] = useState<number | null>(null);
  const [lockExpiresAt, setLockExpiresAt] = useState<Date | null>(null);
  const [timerValue, setTimerValue] = useState<number | null>(null);


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

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
    fetch('http://localhost:3000/api/snacks')
      .then(res => res.json())
      .then(data => setSnacks(data))
      .catch(err => console.error("Failed to fetch snacks", err));
  }, []);

  useEffect(() => {
    if (movieTitle) {
      const date = dates[selectedDate];
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      
      setError('');
      setShows([]); 

      fetch(`http://localhost:3000/api/shows/${movieTitle}/${dateString}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch show details for the selected date.');
          }
          return res.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                setShows(data);
            } else {
                setError('No shows available for this movie on the selected date.');
            }
        })
        .catch(err => {
          setError(err.message);
          console.error(err);
        });
    }
  }, [movieTitle, selectedDate]);

  useEffect(() => {
    if (selectedShow) {
        fetch(`http://localhost:3000/api/v1/seat-lock/locked/${selectedShow.show_id}`)
            .then(res => res.json())
            .then(data => setLockedSeats(data))
            .catch(err => console.error("Failed to fetch locked seats", err));
    }
  }, [selectedShow]);

  const handleRefreshLockedSeats = () => {
    if (selectedShow) {
      fetch(`http://localhost:3000/api/v1/seat-lock/locked/${selectedShow.show_id}`)
        .then(res => res.json())
        .then(data => setLockedSeats(data))
        .catch(() => setLockedSeats([]));
    }
  };

  const handleCloseModal = () => {
    if (lockExpiresAt) {
      return;
    }
    setShowSeatModal(false);
    setLockExpiresAt(null);
    if (lockTimer) clearInterval(lockTimer);
    setTimerValue(null);
    setSelectedSeats([]);
  };

  const handleLockSeats = async () => {
    if (selectedSeats.length === 0 || !selectedShow) {
        alert("Please select seats to lock.");
        return;
    }

    const userString = localStorage.getItem('user');
    if (!userString) {
        alert("Please log in to lock seats.");
        navigate('/');
        return;
    }
    const user = JSON.parse(userString);

    setIsSeatLocking(true);
    try {
        const res = await fetch('http://localhost:3000/api/v1/seat-lock/lock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                show_id: selectedShow.show_id,
                seat_ids: selectedSeats.map(s => s.id),
                user_id: user.id,
            }),
        });

        if (res.ok) {
            const { expires_at } = await res.json();
            const expirationTime = new Date(expires_at);
            setLockExpiresAt(expirationTime);

            const timer = setInterval(() => {
                const remaining = Math.round((expirationTime.getTime() - new Date().getTime()) / 1000);
                setTimerValue(remaining);
                if (remaining <= 0) {
                    clearInterval(timer);
                    setLockExpiresAt(null);
                    setTimerValue(null);
                    

                    if (selectedShow) {
                        fetch(`http://localhost:3000/api/v1/seat-lock/locked/${selectedShow.show_id}`)
                            .then(res => res.json())
                            .then(data => setLockedSeats(data))
                            .catch(() => setLockedSeats([]));
                    }
                }
            }, 1000);
            setLockTimer(timer);

            fetch(`http://localhost:3000/api/v1/seat-lock/locked/${selectedShow.show_id}`)
                .then(res => res.json())
                .then(data => setLockedSeats(data));

        } else {
            const errorData = await res.json();
            alert(`Failed to lock seats: ${errorData.message}`);
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred while locking seats.');
    } finally {
        setIsSeatLocking(false);
    }
  };

  useEffect(() => {
    return () => {
        if (lockTimer) {
            clearInterval(lockTimer);
        }
    };
  }, [lockTimer]);

  const handleSeatSelection = (seat: Seat) => {
    if (lockExpiresAt) {
        return;
    }
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

  const getTotalPrice = () => {
    const seatsPrice = selectedSeats.reduce((total, seat) => total + seat.amount, 0);
    const snacksPrice = Object.entries(selectedSnacks).reduce((total, [snackId, quantity]) => {
      const snack = snacks.find(s => s.id === Number(snackId));
      return total + (snack ? snack.price * quantity : 0);
    }, 0);
    return seatsPrice + snacksPrice;
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

  const groupedShows = shows.reduce((acc, show) => {
    const key = `${show.theater_name} - ${show.screen_name}`; 
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(show);
    return acc;
  }, {} as Record<string, Show[]>);

  const formattedDates = dates.map(date => ({
    day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
    dateNum: date.getDate(),
    month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
  }));

  return (
    <div className="booking-page">
      <div className="booking-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <h1 className="booking-title">{movieTitle}</h1>
      </div>

      <div className="dates-and-filters">
        <div className="dates-scroll">
          {formattedDates.map((date, index) => (
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
        {Object.entries(groupedShows).map(([groupName, theaterShows]) => {
          const screenName = theaterShows[0]?.screen_name;
          return (
            <div key={groupName} className="theater-card">
              <div className="theater-header">
                <div className="theater-info">
                  <h3 className="theater-name">{groupName.split(' - ')[0]}</h3>
                </div>
                <div className="screen-info">
                  <span>{screenName}</span>
                </div>
              </div>
              <div className="showtimes-grid">
                {theaterShows.map((show) => (
                  <button
                    key={show.show_id}
                    className="showtime-btn"
                    onClick={() => {
                      setSelectedSeats([]);
                      setSelectedShow(show);
                      setShowSeatModal(true);
                    }}
                  >
                    <span className="showtime-time">{new Date(show.movie_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {showSeatModal && selectedShow && (
        <div className="seat-modal-overlay" onClick={handleCloseModal}>
          <div className="seat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="refresh-btn" onClick={handleRefreshLockedSeats}>⟳</button>
              <button className="modal-close-btn" onClick={handleCloseModal} disabled={!!lockExpiresAt}>×</button>
            </div>
            <h2>Select Your Seats</h2>
            <div className="theater-layout">
              <div className="screen-wrapper">
                <div className="screen"></div>
                <span className="screen-label">SCREEN</span>
              </div>
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
                        const isLocked = lockedSeats.includes(seat.id) && !isSelected;
                        return (
                          <div
                            key={seat.id}
                            className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`}
                            onClick={() => !isBooked && !isLocked && handleSeatSelection(seat)}
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
              {timerValue !== null && timerValue > 0 && (
                <div className="timer">
                    Time left to pay: {timerValue}s
                </div>
              )}
              <button 
                className="lock-btn" 
                onClick={handleLockSeats} 
                disabled={isSeatLocking || !!lockExpiresAt}
              >
                {isSeatLocking ? 'Locking...' : lockExpiresAt ? 'Seats Locked' : 'Lock Seats'}
              </button>
              <button className="continue-btn" onClick={handleBooking} disabled={!lockExpiresAt}>Pay ₹{getTotalPrice()}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;