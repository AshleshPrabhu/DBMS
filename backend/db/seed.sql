-- =================================================================
-- DUMMY DATA FOR CINEVAULT MOVIE BOOKING APPLICATION
-- =================================================================

-- To use this file:
-- 1. Make sure you have run schema.sql to create the tables.
-- 2. Connect to your MySQL database.
-- 3. Run this script to populate the tables with dummy data.

-- -----------------------------------------------------------------
-- RESETTING TABLES
-- -----------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `payment`;
TRUNCATE TABLE `booking_seat`;
TRUNCATE TABLE `booking`;
TRUNCATE TABLE `shows`;
TRUNCATE TABLE `movies`;
TRUNCATE TABLE `seat`;
TRUNCATE TABLE `screen`;
TRUNCATE TABLE `theater`;
TRUNCATE TABLE `location`;
TRUNCATE TABLE `users`;

SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------------------
-- USERS
-- Note: Passwords should be hashed in a real application.
-- The hash below is a placeholder for 'password123'.
-- -----------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`) VALUES
(1, 'Ashlesh Prabhu', 'ashlesh@example.com', '$2b$10$E2.67j.8k5z/OKnJ9qJpS.9Y8U9jZ.zY7X.zY7X.zY7X.zY7X'),
(2, 'Jane Doe', 'jane.doe@example.com', '$2b$10$E2.67j.8k5z/OKnJ9qJpS.9Y8U9jZ.zY7X.zY7X.zY7X.zY7X');

-- -----------------------------------------------------------------
-- LOCATIONS
-- -----------------------------------------------------------------
INSERT INTO `location` (`id`, `city`, `state`, `pincode`, `name`) VALUES
(1, 'Mangalore', 'Karnataka', 575001, 'Downtown Mangalore'),
(2, 'Bangalore', 'Karnataka', 560001, 'Koramangala'),
(3, 'Mumbai', 'Maharashtra', 400001, 'Andheri West');

-- -----------------------------------------------------------------
-- THEATERS
-- -----------------------------------------------------------------
INSERT INTO `theater` (`id`, `name`, `location_id`) VALUES
(1, 'Cineplex City Center', 1),
(2, 'PVR Forum Mall', 1),
(3, 'INOX Orion Mall', 2),
(4, 'PVR Juhu', 3);

-- -----------------------------------------------------------------
-- SCREENS
-- -----------------------------------------------------------------
INSERT INTO `screen` (`id`, `theater_id`, `name`) VALUES
(1, 1, 'Screen 1'),
(2, 1, 'Screen 2 (IMAX)'),
(3, 2, 'Audi 1'),
(4, 2, 'Audi 2'),
(5, 3, 'Screen A'),
(6, 4, 'LUXE Screen');

-- -----------------------------------------------------------------
-- SEATS
-- FIX: MySQL does not support standalone CTEs before INSERT statements.
-- Seats are inserted directly as explicit VALUES rows.
-- -----------------------------------------------------------------

-- Screen 1 (Cineplex City Center) - Standard Seating (Rows A-E, Cols 1-8, ₹180)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(1,'A1',180),(1,'A2',180),(1,'A3',180),(1,'A4',180),(1,'A5',180),(1,'A6',180),(1,'A7',180),(1,'A8',180),
(1,'B1',180),(1,'B2',180),(1,'B3',180),(1,'B4',180),(1,'B5',180),(1,'B6',180),(1,'B7',180),(1,'B8',180),
(1,'C1',180),(1,'C2',180),(1,'C3',180),(1,'C4',180),(1,'C5',180),(1,'C6',180),(1,'C7',180),(1,'C8',180),
(1,'D1',180),(1,'D2',180),(1,'D3',180),(1,'D4',180),(1,'D5',180),(1,'D6',180),(1,'D7',180),(1,'D8',180),
(1,'E1',180),(1,'E2',180),(1,'E3',180),(1,'E4',180),(1,'E5',180),(1,'E6',180),(1,'E7',180),(1,'E8',180);

-- Screen 2 (Cineplex City Center) - IMAX Premium Seating (Rows A-F, Cols 1-10, ₹350)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(2,'A1',350),(2,'A2',350),(2,'A3',350),(2,'A4',350),(2,'A5',350),(2,'A6',350),(2,'A7',350),(2,'A8',350),(2,'A9',350),(2,'A10',350),
(2,'B1',350),(2,'B2',350),(2,'B3',350),(2,'B4',350),(2,'B5',350),(2,'B6',350),(2,'B7',350),(2,'B8',350),(2,'B9',350),(2,'B10',350),
(2,'C1',350),(2,'C2',350),(2,'C3',350),(2,'C4',350),(2,'C5',350),(2,'C6',350),(2,'C7',350),(2,'C8',350),(2,'C9',350),(2,'C10',350),
(2,'D1',350),(2,'D2',350),(2,'D3',350),(2,'D4',350),(2,'D5',350),(2,'D6',350),(2,'D7',350),(2,'D8',350),(2,'D9',350),(2,'D10',350),
(2,'E1',350),(2,'E2',350),(2,'E3',350),(2,'E4',350),(2,'E5',350),(2,'E6',350),(2,'E7',350),(2,'E8',350),(2,'E9',350),(2,'E10',350),
(2,'F1',350),(2,'F2',350),(2,'F3',350),(2,'F4',350),(2,'F5',350),(2,'F6',350),(2,'F7',350),(2,'F8',350),(2,'F9',350),(2,'F10',350);

-- Screen 3 (PVR Forum Mall) - Recliner Seating (Rows A-D, Cols 1-5, ₹250)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(3,'A1',250),(3,'A2',250),(3,'A3',250),(3,'A4',250),(3,'A5',250),
(3,'B1',250),(3,'B2',250),(3,'B3',250),(3,'B4',250),(3,'B5',250),
(3,'C1',250),(3,'C2',250),(3,'C3',250),(3,'C4',250),(3,'C5',250),
(3,'D1',250),(3,'D2',250),(3,'D3',250),(3,'D4',250),(3,'D5',250);

-- Screen 4 (PVR Forum Mall) - Standard Seating (Rows A-E, Cols 1-7, ₹200)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(4,'A1',200),(4,'A2',200),(4,'A3',200),(4,'A4',200),(4,'A5',200),(4,'A6',200),(4,'A7',200),
(4,'B1',200),(4,'B2',200),(4,'B3',200),(4,'B4',200),(4,'B5',200),(4,'B6',200),(4,'B7',200),
(4,'C1',200),(4,'C2',200),(4,'C3',200),(4,'C4',200),(4,'C5',200),(4,'C6',200),(4,'C7',200),
(4,'D1',200),(4,'D2',200),(4,'D3',200),(4,'D4',200),(4,'D5',200),(4,'D6',200),(4,'D7',200),
(4,'E1',200),(4,'E2',200),(4,'E3',200),(4,'E4',200),(4,'E5',200),(4,'E6',200),(4,'E7',200);

-- -----------------------------------------------------------------
-- MOVIES
-- -----------------------------------------------------------------
INSERT INTO `movies` (`id`, `name`, `image`, `about`, `reviews`, `actors`) VALUES
(1, 'Kalki 2898-AD',       'https://upload.wikimedia.org/wikipedia/en/0/02/Kalki_2898_AD_poster.jpg',                                         'A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to Earth to protect the world from evil forces.', 8500,  '["Prabhas", "Amitabh Bachchan", "Kamal Haasan", "Deepika Padukone", "Disha Patani"]'),
(2, 'Fighter',             'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Fighter_2024_film_poster.jpg/220px-Fighter_2024_film_poster.jpg','Top IAF aviators come together in the face of imminent danger to form Air Dragons. They must band together to overcome their inner demons and emerge victorious.', 7200,  '["Hrithik Roshan", "Deepika Padukone", "Anil Kapoor"]'),
(3, 'Manjummel Boys',      'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Manjummel_Boys_poster.jpg/220px-Manjummel_Boys_poster.jpg',    'A group of friends from a small town called Manjummel, near Kochi, decide to have a vacation in Kodaikanal.',                9800,  '["Soubin Shahir", "Sreenath Bhasi", "Balu Varghese"]'),
(4, 'Dune: Part Two',      'https://upload.wikimedia.org/wikipedia/en/5/55/Dune_Part_Two_poster.jpeg',                                         'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',    11200, '["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"]');

-- -----------------------------------------------------------------
-- SHOWS
-- FIX: Used DATE_ADD(CURDATE(), INTERVAL N DAY) for future dates,
-- which is cleaner and unambiguous inside CONCAT().
-- -----------------------------------------------------------------
INSERT INTO `shows` (`movie_id`, `screen_id`, `movie_time`) VALUES
-- Kalki 2898-AD
(1, 1, CONCAT(CURDATE(), ' 10:00:00')),                               -- Cineplex Screen 1, Today 10:00 AM
(1, 1, CONCAT(CURDATE(), ' 13:30:00')),                               -- Cineplex Screen 1, Today 1:30 PM
(1, 2, CONCAT(CURDATE(), ' 19:00:00')),                               -- Cineplex Screen 2 (IMAX), Today 7:00 PM
(1, 3, CONCAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), ' 11:00:00')),     -- PVR Forum Audi 1, Tomorrow 11:00 AM

-- Fighter
(2, 3, CONCAT(CURDATE(), ' 14:00:00')),                               -- PVR Forum Audi 1, Today 2:00 PM
(2, 3, CONCAT(CURDATE(), ' 17:30:00')),                               -- PVR Forum Audi 1, Today 5:30 PM
(2, 4, CONCAT(CURDATE(), ' 21:00:00')),                               -- PVR Forum Audi 2, Today 9:00 PM

-- Manjummel Boys
(3, 4, CONCAT(CURDATE(), ' 09:30:00')),                               -- PVR Forum Audi 2, Today 9:30 AM
(3, 4, CONCAT(CURDATE(), ' 12:30:00')),                               -- PVR Forum Audi 2, Today 12:30 PM
(3, 1, CONCAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), ' 17:00:00')),     -- Cineplex Screen 1, Tomorrow 5:00 PM

-- Dune: Part Two
(4, 2, CONCAT(CURDATE(), ' 11:00:00')),                               -- Cineplex Screen 2 (IMAX), Today 11:00 AM
(4, 2, CONCAT(CURDATE(), ' 15:00:00')),                               -- Cineplex Screen 2 (IMAX), Today 3:00 PM
(4, 2, CONCAT(DATE_ADD(CURDATE(), INTERVAL 1 DAY), ' 22:00:00'));     -- Cineplex Screen 2 (IMAX), Tomorrow 10:00 PM

-- =================================================================
-- END OF DUMMY DATA
-- =================================================================