import type { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import MovieDetailsPage from './MovieDetailsPage';
import BookingPage from './BookingPage';
import ProfilePage from './ProfilePage';
import SuccessPage from './SuccessPage';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/movie/:movieTitle" element={<MovieDetailsPage />} />
        <Route path="/booking/:movieTitle/:language/:format" element={<BookingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
