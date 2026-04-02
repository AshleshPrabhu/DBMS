import type { FC} from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

interface Seat {
    seat_number: string;
    amount: number;
}

interface Snack {
    name: string;
    price: number;
    quantity: number;
}

interface Booking {
    booking_id: number;
    created_at: string;
    movie_name: string;
    movie_image: string;
    movie_time: string;
    theater_name: string;
    seats: Seat[];
    snacks: Snack[];
}

const ProfilePage: FC = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/?auth=required');
            return;
        }
        const userId = JSON.parse(user).id;

        fetch(`http://localhost:3000/api/users/${userId}/bookings`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch booking history');
                }
                return res.json();
            })
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
                console.error(err);
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (loading) {
        return <div>Loading booking history...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <button onClick={() => navigate('/home')} className="back-btn">← Home</button>
                <h1>My Bookings</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
            {bookings.length === 0 ? (
                <p>You have no bookings yet.</p>
            ) : (
                <div className="booking-list">
                    {bookings.map(booking => (
                        <div key={booking.booking_id} className="booking-card">
                            <img src={booking.movie_image} alt={booking.movie_name} className="movie-poster" />
                            <div className="booking-details">
                                <h2>{booking.movie_name}</h2>
                                <p><strong>Theater:</strong> {booking.theater_name}</p>
                                <p><strong>Show Time:</strong> {new Date(booking.movie_time).toLocaleString()}</p>
                                <p><strong>Booked on:</strong> {new Date(booking.created_at).toLocaleDateString()}</p>
                                <p><strong>Seats:</strong> {booking.seats.map(s => s.seat_number).join(', ')}</p>
                                {booking.snacks && booking.snacks.length > 0 && (
                                    <p><strong>Snacks:</strong> {booking.snacks.map(s => `${s.name} (x${s.quantity})`).join(', ')}</p>
                                )}
                                <p><strong>Total Amount:</strong> ₹{
                                    booking.seats.reduce((acc, seat) => acc + seat.amount, 0) +
                                    (booking.snacks ? booking.snacks.reduce((acc, snack) => acc + snack.price * snack.quantity, 0) : 0)
                                }</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
