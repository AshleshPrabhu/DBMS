import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { bookingDetails } = location.state || {};

    if (!bookingDetails) {
        return (
            <div className="success-page">
                <h1 className="failed-title">Booking Failed</h1>
                <p>Something went wrong. Please try again.</p>
                <button onClick={() => navigate('/home')} className="home-btn">Go to Home</button>
            </div>
        );
    }

    const { movie_name, theater_name, movie_time, seats, snacks, totalAmount } = bookingDetails;

    return (
        <div className="success-page">
            <div className="success-icon">
                <svg viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <h1>You're all set!</h1>
            <p className="success-subtitle">Your booking has been confirmed.</p>

            <div className="booking-summary">
                <h2>{movie_name}</h2>
                <p><strong>Theater</strong> {theater_name}</p>
                <p><strong>Show Time</strong> {new Date(movie_time).toLocaleString()}</p>
                <p><strong>Seats</strong> {seats.map((s: any) => s.seat_number).join(', ')}</p>
                {snacks && snacks.length > 0 && (
                    <p><strong>Snacks</strong> {snacks.map((s: any) => `${s.name} (x${s.quantity})`).join(', ')}</p>
                )}
                <p><strong>Total</strong> ₹{totalAmount}</p>
            </div>

            <button onClick={() => navigate('/home')} className="home-btn">Go to Home</button>
        </div>
    );
};

export default SuccessPage;