-- =================================================================
-- DUMMY DATA FOR CINEVAULT MOVIE BOOKING APPLICATION
-- =================================================================

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `payment`;
TRUNCATE TABLE `booking_snack`;
TRUNCATE TABLE `booking_seat`;
TRUNCATE TABLE `booking`;
TRUNCATE TABLE `shows`;
TRUNCATE TABLE `movies`;
TRUNCATE TABLE `seat_lock`;
TRUNCATE TABLE `seat`;
TRUNCATE TABLE `screen`;
TRUNCATE TABLE `theater`;
TRUNCATE TABLE `location`;
TRUNCATE TABLE `users`;
TRUNCATE TABLE `snacks`;

SET FOREIGN_KEY_CHECKS = 1;

-- -----------------------------------------------------------------
-- SNACKS
-- -----------------------------------------------------------------
INSERT INTO `snacks` (`id`, `name`, `price`, `image`) VALUES
(1,  'Popcorn',      150, 'https://png.pngtree.com/png-clipart/20250103/original/pngtree-watch-movie-popcorn-maker-snack-foods-png-image_18726224.png'),
(2,  'Nachos',       200, 'https://www.tastyrewards.com/sites/default/files/2024-01/Ultimate%20Four%20Cheese%20Nachos.jpg'),
(3,  'Coke',          80, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqoAQKr42RQJGb8jO9JquZ7VFE6wctvsS29A&s'),
(4,  'Samosa',       120, 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/samosa-recipe.jpg'),
(5,  'Burger',       180, 'https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg'),
(6,  'Pizza',        320, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Lj3_8eh0xYQLDhyh1pYwOF6l00mL7hIfww&s'),
(7,  'French Fries', 130, 'https://kirbiecravings.com/wp-content/uploads/2019/09/easy-french-fries-1.jpg'),
(8,  'Sandwich',     140, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-v-yguhGWLf5pkTXUv4FD3NR0tsMH67Qrmg&s'),
(9,  'Ice Cream',    100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrfMq5lrxLX5qVKy09cVcQl-tI0mHs0xlZYQ&s'),
(10, 'Chips',        160, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ70P77xEe--f0OiEIU1wCsn6ToaJ6TPvIxjg&s');

-- -----------------------------------------------------------------
-- USERS
-- -----------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`) VALUES
(1, 'Ashlesh Prabhu', 'ashlesh@example.com',  '$2b$10$E2.67j.8k5z/OKnJ9qJpS.9Y8U9jZ.zY7X.zY7X.zY7X.zY7X'),
(2, 'Jane Doe',       'jane.doe@example.com', '$2b$10$E2.67j.8k5z/OKnJ9qJpS.9Y8U9jZ.zY7X.zY7X.zY7X.zY7X');

-- -----------------------------------------------------------------
-- LOCATIONS
-- -----------------------------------------------------------------
INSERT INTO `location` (`id`, `city`, `state`, `pincode`, `name`) VALUES
(1, 'Mangalore', 'Karnataka',   575001, 'Downtown Mangalore'),
(2, 'Bangalore', 'Karnataka',   560001, 'Koramangala'),
(3, 'Mumbai',    'Maharashtra', 400001, 'Andheri West'),
(4, 'Delhi',     'Delhi',       110001, 'Connaught Place'),
(5, 'Chennai',   'Tamil Nadu',  600001, 'T Nagar');

-- -----------------------------------------------------------------
-- THEATERS
-- -----------------------------------------------------------------
INSERT INTO `theater` (`id`, `name`, `location_id`) VALUES
(1, 'Cineplex City Center', 1),
(2, 'PVR Forum Mall',       1),
(3, 'INOX Orion Mall',      2),
(4, 'PVR Juhu',             3),
(5, 'INOX CP Central',      4),
(6, 'Sathyam Cinemas',      5);

-- -----------------------------------------------------------------
-- SCREENS
-- -----------------------------------------------------------------
INSERT INTO `screen` (`id`, `theater_id`, `name`) VALUES
(1,  1, 'Screen 1'),
(2,  1, 'Screen 2 (IMAX)'),
(3,  2, 'Audi 1'),
(4,  2, 'Audi 2 (Compact)'),
(5,  3, 'Screen A (Standard)'),
(6,  4, 'LUXE Screen'),
(7,  5, 'Screen 1 (Standard)'),
(8,  5, 'Audi (Premium)'),
(9,  6, 'Audi 1 (Budget)'),
(10, 6, 'Audi 2 (Dolby Atmos)');

-- -----------------------------------------------------------------
-- SEATS
-- NOTE: Every INSERT block ends with a semicolon before the next comment.
-- -----------------------------------------------------------------

-- Screen 1: Rows A-C (Rs.150), D-G (Rs.180), H-J (Rs.220)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(1,'A1',150),(1,'A2',150),(1,'A3',150),(1,'A4',150),(1,'A5',150),(1,'A6',150),(1,'A7',150),(1,'A8',150),(1,'A9',150),(1,'A10',150),(1,'A11',150),(1,'A12',150),
(1,'B1',150),(1,'B2',150),(1,'B3',150),(1,'B4',150),(1,'B5',150),(1,'B6',150),(1,'B7',150),(1,'B8',150),(1,'B9',150),(1,'B10',150),(1,'B11',150),(1,'B12',150),
(1,'C1',150),(1,'C2',150),(1,'C3',150),(1,'C4',150),(1,'C5',150),(1,'C6',150),(1,'C7',150),(1,'C8',150),(1,'C9',150),(1,'C10',150),(1,'C11',150),(1,'C12',150),
(1,'D1',180),(1,'D2',180),(1,'D3',180),(1,'D4',180),(1,'D5',180),(1,'D6',180),(1,'D7',180),(1,'D8',180),(1,'D9',180),(1,'D10',180),(1,'D11',180),(1,'D12',180),
(1,'E1',180),(1,'E2',180),(1,'E3',180),(1,'E4',180),(1,'E5',180),(1,'E6',180),(1,'E7',180),(1,'E8',180),(1,'E9',180),(1,'E10',180),(1,'E11',180),(1,'E12',180),
(1,'F1',180),(1,'F2',180),(1,'F3',180),(1,'F4',180),(1,'F5',180),(1,'F6',180),(1,'F7',180),(1,'F8',180),(1,'F9',180),(1,'F10',180),(1,'F11',180),(1,'F12',180),
(1,'G1',180),(1,'G2',180),(1,'G3',180),(1,'G4',180),(1,'G5',180),(1,'G6',180),(1,'G7',180),(1,'G8',180),(1,'G9',180),(1,'G10',180),(1,'G11',180),(1,'G12',180),
(1,'H1',220),(1,'H2',220),(1,'H3',220),(1,'H4',220),(1,'H5',220),(1,'H6',220),(1,'H7',220),(1,'H8',220),(1,'H9',220),(1,'H10',220),(1,'H11',220),(1,'H12',220),
(1,'I1',220),(1,'I2',220),(1,'I3',220),(1,'I4',220),(1,'I5',220),(1,'I6',220),(1,'I7',220),(1,'I8',220),(1,'I9',220),(1,'I10',220),(1,'I11',220),(1,'I12',220),
(1,'J1',220),(1,'J2',220),(1,'J3',220),(1,'J4',220),(1,'J5',220),(1,'J6',220),(1,'J7',220),(1,'J8',220),(1,'J9',220),(1,'J10',220),(1,'J11',220),(1,'J12',220);

-- Screen 2 (IMAX): Rows A-D (Rs.200), E-H (Rs.250), I-L (Rs.320)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(2,'A1',200),(2,'A2',200),(2,'A3',200),(2,'A4',200),(2,'A5',200),(2,'A6',200),(2,'A7',200),(2,'A8',200),(2,'A9',200),(2,'A10',200),(2,'A11',200),(2,'A12',200),(2,'A13',200),(2,'A14',200),
(2,'B1',200),(2,'B2',200),(2,'B3',200),(2,'B4',200),(2,'B5',200),(2,'B6',200),(2,'B7',200),(2,'B8',200),(2,'B9',200),(2,'B10',200),(2,'B11',200),(2,'B12',200),(2,'B13',200),(2,'B14',200),
(2,'C1',200),(2,'C2',200),(2,'C3',200),(2,'C4',200),(2,'C5',200),(2,'C6',200),(2,'C7',200),(2,'C8',200),(2,'C9',200),(2,'C10',200),(2,'C11',200),(2,'C12',200),(2,'C13',200),(2,'C14',200),
(2,'D1',200),(2,'D2',200),(2,'D3',200),(2,'D4',200),(2,'D5',200),(2,'D6',200),(2,'D7',200),(2,'D8',200),(2,'D9',200),(2,'D10',200),(2,'D11',200),(2,'D12',200),(2,'D13',200),(2,'D14',200),
(2,'E1',250),(2,'E2',250),(2,'E3',250),(2,'E4',250),(2,'E5',250),(2,'E6',250),(2,'E7',250),(2,'E8',250),(2,'E9',250),(2,'E10',250),(2,'E11',250),(2,'E12',250),(2,'E13',250),(2,'E14',250),
(2,'F1',250),(2,'F2',250),(2,'F3',250),(2,'F4',250),(2,'F5',250),(2,'F6',250),(2,'F7',250),(2,'F8',250),(2,'F9',250),(2,'F10',250),(2,'F11',250),(2,'F12',250),(2,'F13',250),(2,'F14',250),
(2,'G1',250),(2,'G2',250),(2,'G3',250),(2,'G4',250),(2,'G5',250),(2,'G6',250),(2,'G7',250),(2,'G8',250),(2,'G9',250),(2,'G10',250),(2,'G11',250),(2,'G12',250),(2,'G13',250),(2,'G14',250),
(2,'H1',250),(2,'H2',250),(2,'H3',250),(2,'H4',250),(2,'H5',250),(2,'H6',250),(2,'H7',250),(2,'H8',250),(2,'H9',250),(2,'H10',250),(2,'H11',250),(2,'H12',250),(2,'H13',250),(2,'H14',250),
(2,'I1',320),(2,'I2',320),(2,'I3',320),(2,'I4',320),(2,'I5',320),(2,'I6',320),(2,'I7',320),(2,'I8',320),(2,'I9',320),(2,'I10',320),(2,'I11',320),(2,'I12',320),(2,'I13',320),(2,'I14',320),
(2,'J1',320),(2,'J2',320),(2,'J3',320),(2,'J4',320),(2,'J5',320),(2,'J6',320),(2,'J7',320),(2,'J8',320),(2,'J9',320),(2,'J10',320),(2,'J11',320),(2,'J12',320),(2,'J13',320),(2,'J14',320),
(2,'K1',320),(2,'K2',320),(2,'K3',320),(2,'K4',320),(2,'K5',320),(2,'K6',320),(2,'K7',320),(2,'K8',320),(2,'K9',320),(2,'K10',320),(2,'K11',320),(2,'K12',320),(2,'K13',320),(2,'K14',320),
(2,'L1',320),(2,'L2',320),(2,'L3',320),(2,'L4',320),(2,'L5',320),(2,'L6',320),(2,'L7',320),(2,'L8',320),(2,'L9',320),(2,'L10',320),(2,'L11',320),(2,'L12',320),(2,'L13',320),(2,'L14',320);

-- Screen 3: Rows A-C (Rs.160), D-F (Rs.200), G-H (Rs.240)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(3,'A1',160),(3,'A2',160),(3,'A3',160),(3,'A4',160),(3,'A5',160),(3,'A6',160),(3,'A7',160),(3,'A8',160),(3,'A9',160),(3,'A10',160),
(3,'B1',160),(3,'B2',160),(3,'B3',160),(3,'B4',160),(3,'B5',160),(3,'B6',160),(3,'B7',160),(3,'B8',160),(3,'B9',160),(3,'B10',160),
(3,'C1',160),(3,'C2',160),(3,'C3',160),(3,'C4',160),(3,'C5',160),(3,'C6',160),(3,'C7',160),(3,'C8',160),(3,'C9',160),(3,'C10',160),
(3,'D1',200),(3,'D2',200),(3,'D3',200),(3,'D4',200),(3,'D5',200),(3,'D6',200),(3,'D7',200),(3,'D8',200),(3,'D9',200),(3,'D10',200),
(3,'E1',200),(3,'E2',200),(3,'E3',200),(3,'E4',200),(3,'E5',200),(3,'E6',200),(3,'E7',200),(3,'E8',200),(3,'E9',200),(3,'E10',200),
(3,'F1',200),(3,'F2',200),(3,'F3',200),(3,'F4',200),(3,'F5',200),(3,'F6',200),(3,'F7',200),(3,'F8',200),(3,'F9',200),(3,'F10',200),
(3,'G1',240),(3,'G2',240),(3,'G3',240),(3,'G4',240),(3,'G5',240),(3,'G6',240),(3,'G7',240),(3,'G8',240),(3,'G9',240),(3,'G10',240),
(3,'H1',240),(3,'H2',240),(3,'H3',240),(3,'H4',240),(3,'H5',240),(3,'H6',240),(3,'H7',240),(3,'H8',240),(3,'H9',240),(3,'H10',240);

-- Screen 4: Rows A-B (Rs.150), C-D (Rs.180), E-F (Rs.220)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(4,'A1',150),(4,'A2',150),(4,'A3',150),(4,'A4',150),(4,'A5',150),(4,'A6',150),(4,'A7',150),(4,'A8',150),(4,'A9',150),(4,'A10',150),
(4,'B1',150),(4,'B2',150),(4,'B3',150),(4,'B4',150),(4,'B5',150),(4,'B6',150),(4,'B7',150),(4,'B8',150),(4,'B9',150),(4,'B10',150),
(4,'C1',180),(4,'C2',180),(4,'C3',180),(4,'C4',180),(4,'C5',180),(4,'C6',180),(4,'C7',180),(4,'C8',180),(4,'C9',180),(4,'C10',180),
(4,'D1',180),(4,'D2',180),(4,'D3',180),(4,'D4',180),(4,'D5',180),(4,'D6',180),(4,'D7',180),(4,'D8',180),(4,'D9',180),(4,'D10',180),
(4,'E1',220),(4,'E2',220),(4,'E3',220),(4,'E4',220),(4,'E5',220),(4,'E6',220),(4,'E7',220),(4,'E8',220),(4,'E9',220),(4,'E10',220),
(4,'F1',220),(4,'F2',220),(4,'F3',220),(4,'F4',220),(4,'F5',220),(4,'F6',220),(4,'F7',220),(4,'F8',220),(4,'F9',220),(4,'F10',220);

-- Screen 5: Rows A-C (Rs.160), D-F (Rs.200), G-H (Rs.240)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(5,'A1',160),(5,'A2',160),(5,'A3',160),(5,'A4',160),(5,'A5',160),(5,'A6',160),(5,'A7',160),(5,'A8',160),(5,'A9',160),(5,'A10',160),
(5,'B1',160),(5,'B2',160),(5,'B3',160),(5,'B4',160),(5,'B5',160),(5,'B6',160),(5,'B7',160),(5,'B8',160),(5,'B9',160),(5,'B10',160),
(5,'C1',160),(5,'C2',160),(5,'C3',160),(5,'C4',160),(5,'C5',160),(5,'C6',160),(5,'C7',160),(5,'C8',160),(5,'C9',160),(5,'C10',160),
(5,'D1',200),(5,'D2',200),(5,'D3',200),(5,'D4',200),(5,'D5',200),(5,'D6',200),(5,'D7',200),(5,'D8',200),(5,'D9',200),(5,'D10',200),
(5,'E1',200),(5,'E2',200),(5,'E3',200),(5,'E4',200),(5,'E5',200),(5,'E6',200),(5,'E7',200),(5,'E8',200),(5,'E9',200),(5,'E10',200),
(5,'F1',200),(5,'F2',200),(5,'F3',200),(5,'F4',200),(5,'F5',200),(5,'F6',200),(5,'F7',200),(5,'F8',200),(5,'F9',200),(5,'F10',200),
(5,'G1',240),(5,'G2',240),(5,'G3',240),(5,'G4',240),(5,'G5',240),(5,'G6',240),(5,'G7',240),(5,'G8',240),(5,'G9',240),(5,'G10',240),
(5,'H1',240),(5,'H2',240),(5,'H3',240),(5,'H4',240),(5,'H5',240),(5,'H6',240),(5,'H7',240),(5,'H8',240),(5,'H9',240),(5,'H10',240);

-- Screen 6 (LUXE / Recliner): Rows A-B (Rs.400), C-D (Rs.550)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(6,'A1',400),(6,'A2',400),(6,'A3',400),(6,'A4',400),(6,'A5',400),(6,'A6',400),(6,'A7',400),(6,'A8',400),
(6,'B1',400),(6,'B2',400),(6,'B3',400),(6,'B4',400),(6,'B5',400),(6,'B6',400),(6,'B7',400),(6,'B8',400),
(6,'C1',550),(6,'C2',550),(6,'C3',550),(6,'C4',550),(6,'C5',550),(6,'C6',550),(6,'C7',550),(6,'C8',550),
(6,'D1',550),(6,'D2',550),(6,'D3',550),(6,'D4',550),(6,'D5',550),(6,'D6',550),(6,'D7',550),(6,'D8',550);

-- Screen 7 (Standard Multiplex): Rows A-B (Rs.170), C-E (Rs.210), F-G (Rs.260)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(7,'A1',170),(7,'A2',170),(7,'A3',170),(7,'A4',170),(7,'A5',170),(7,'A6',170),(7,'A7',170),(7,'A8',170),(7,'A9',170),(7,'A10',170),(7,'A11',170),(7,'A12',170),
(7,'B1',170),(7,'B2',170),(7,'B3',170),(7,'B4',170),(7,'B5',170),(7,'B6',170),(7,'B7',170),(7,'B8',170),(7,'B9',170),(7,'B10',170),(7,'B11',170),(7,'B12',170),
(7,'C1',210),(7,'C2',210),(7,'C3',210),(7,'C4',210),(7,'C5',210),(7,'C6',210),(7,'C7',210),(7,'C8',210),(7,'C9',210),(7,'C10',210),(7,'C11',210),(7,'C12',210),
(7,'D1',210),(7,'D2',210),(7,'D3',210),(7,'D4',210),(7,'D5',210),(7,'D6',210),(7,'D7',210),(7,'D8',210),(7,'D9',210),(7,'D10',210),(7,'D11',210),(7,'D12',210),
(7,'E1',210),(7,'E2',210),(7,'E3',210),(7,'E4',210),(7,'E5',210),(7,'E6',210),(7,'E7',210),(7,'E8',210),(7,'E9',210),(7,'E10',210),(7,'E11',210),(7,'E12',210),
(7,'F1',260),(7,'F2',260),(7,'F3',260),(7,'F4',260),(7,'F5',260),(7,'F6',260),(7,'F7',260),(7,'F8',260),(7,'F9',260),(7,'F10',260),(7,'F11',260),(7,'F12',260),
(7,'G1',260),(7,'G2',260),(7,'G3',260),(7,'G4',260),(7,'G5',260),(7,'G6',260),(7,'G7',260),(7,'G8',260),(7,'G9',260),(7,'G10',260),(7,'G11',260),(7,'G12',260);

-- Screen 8 (Premium Audi): Rows A-C (Rs.190), D-F (Rs.240), G-I (Rs.300)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(8,'A1',190),(8,'A2',190),(8,'A3',190),(8,'A4',190),(8,'A5',190),(8,'A6',190),(8,'A7',190),(8,'A8',190),(8,'A9',190),(8,'A10',190),(8,'A11',190),(8,'A12',190),
(8,'B1',190),(8,'B2',190),(8,'B3',190),(8,'B4',190),(8,'B5',190),(8,'B6',190),(8,'B7',190),(8,'B8',190),(8,'B9',190),(8,'B10',190),(8,'B11',190),(8,'B12',190),
(8,'C1',190),(8,'C2',190),(8,'C3',190),(8,'C4',190),(8,'C5',190),(8,'C6',190),(8,'C7',190),(8,'C8',190),(8,'C9',190),(8,'C10',190),(8,'C11',190),(8,'C12',190),
(8,'D1',240),(8,'D2',240),(8,'D3',240),(8,'D4',240),(8,'D5',240),(8,'D6',240),(8,'D7',240),(8,'D8',240),(8,'D9',240),(8,'D10',240),(8,'D11',240),(8,'D12',240),
(8,'E1',240),(8,'E2',240),(8,'E3',240),(8,'E4',240),(8,'E5',240),(8,'E6',240),(8,'E7',240),(8,'E8',240),(8,'E9',240),(8,'E10',240),(8,'E11',240),(8,'E12',240),
(8,'F1',240),(8,'F2',240),(8,'F3',240),(8,'F4',240),(8,'F5',240),(8,'F6',240),(8,'F7',240),(8,'F8',240),(8,'F9',240),(8,'F10',240),(8,'F11',240),(8,'F12',240),
(8,'G1',300),(8,'G2',300),(8,'G3',300),(8,'G4',300),(8,'G5',300),(8,'G6',300),(8,'G7',300),(8,'G8',300),(8,'G9',300),(8,'G10',300),(8,'G11',300),(8,'G12',300),
(8,'H1',300),(8,'H2',300),(8,'H3',300),(8,'H4',300),(8,'H5',300),(8,'H6',300),(8,'H7',300),(8,'H8',300),(8,'H9',300),(8,'H10',300),(8,'H11',300),(8,'H12',300),
(8,'I1',300),(8,'I2',300),(8,'I3',300),(8,'I4',300),(8,'I5',300),(8,'I6',300),(8,'I7',300),(8,'I8',300),(8,'I9',300),(8,'I10',300),(8,'I11',300),(8,'I12',300);

-- Screen 9 (Budget): Rows A-B (Rs.140), C-D (Rs.170), E-F (Rs.200)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(9,'A1',140),(9,'A2',140),(9,'A3',140),(9,'A4',140),(9,'A5',140),(9,'A6',140),(9,'A7',140),(9,'A8',140),(9,'A9',140),(9,'A10',140),
(9,'B1',140),(9,'B2',140),(9,'B3',140),(9,'B4',140),(9,'B5',140),(9,'B6',140),(9,'B7',140),(9,'B8',140),(9,'B9',140),(9,'B10',140),
(9,'C1',170),(9,'C2',170),(9,'C3',170),(9,'C4',170),(9,'C5',170),(9,'C6',170),(9,'C7',170),(9,'C8',170),(9,'C9',170),(9,'C10',170),
(9,'D1',170),(9,'D2',170),(9,'D3',170),(9,'D4',170),(9,'D5',170),(9,'D6',170),(9,'D7',170),(9,'D8',170),(9,'D9',170),(9,'D10',170),
(9,'E1',200),(9,'E2',200),(9,'E3',200),(9,'E4',200),(9,'E5',200),(9,'E6',200),(9,'E7',200),(9,'E8',200),(9,'E9',200),(9,'E10',200),
(9,'F1',200),(9,'F2',200),(9,'F3',200),(9,'F4',200),(9,'F5',200),(9,'F6',200),(9,'F7',200),(9,'F8',200),(9,'F9',200),(9,'F10',200);

-- Screen 10 (Dolby Atmos): Rows A-C (Rs.200), D-G (Rs.260), H-J (Rs.320)
INSERT INTO `seat` (`screen_id`, `seat_number`, `amount`) VALUES
(10,'A1',200),(10,'A2',200),(10,'A3',200),(10,'A4',200),(10,'A5',200),(10,'A6',200),(10,'A7',200),(10,'A8',200),(10,'A9',200),(10,'A10',200),(10,'A11',200),(10,'A12',200),
(10,'B1',200),(10,'B2',200),(10,'B3',200),(10,'B4',200),(10,'B5',200),(10,'B6',200),(10,'B7',200),(10,'B8',200),(10,'B9',200),(10,'B10',200),(10,'B11',200),(10,'B12',200),
(10,'C1',200),(10,'C2',200),(10,'C3',200),(10,'C4',200),(10,'C5',200),(10,'C6',200),(10,'C7',200),(10,'C8',200),(10,'C9',200),(10,'C10',200),(10,'C11',200),(10,'C12',200),
(10,'D1',260),(10,'D2',260),(10,'D3',260),(10,'D4',260),(10,'D5',260),(10,'D6',260),(10,'D7',260),(10,'D8',260),(10,'D9',260),(10,'D10',260),(10,'D11',260),(10,'D12',260),
(10,'E1',260),(10,'E2',260),(10,'E3',260),(10,'E4',260),(10,'E5',260),(10,'E6',260),(10,'E7',260),(10,'E8',260),(10,'E9',260),(10,'E10',260),(10,'E11',260),(10,'E12',260),
(10,'F1',260),(10,'F2',260),(10,'F3',260),(10,'F4',260),(10,'F5',260),(10,'F6',260),(10,'F7',260),(10,'F8',260),(10,'F9',260),(10,'F10',260),(10,'F11',260),(10,'F12',260),
(10,'G1',260),(10,'G2',260),(10,'G3',260),(10,'G4',260),(10,'G5',260),(10,'G6',260),(10,'G7',260),(10,'G8',260),(10,'G9',260),(10,'G10',260),(10,'G11',260),(10,'G12',260),
(10,'H1',320),(10,'H2',320),(10,'H3',320),(10,'H4',320),(10,'H5',320),(10,'H6',320),(10,'H7',320),(10,'H8',320),(10,'H9',320),(10,'H10',320),(10,'H11',320),(10,'H12',320),
(10,'I1',320),(10,'I2',320),(10,'I3',320),(10,'I4',320),(10,'I5',320),(10,'I6',320),(10,'I7',320),(10,'I8',320),(10,'I9',320),(10,'I10',320),(10,'I11',320),(10,'I12',320),
(10,'J1',320),(10,'J2',320),(10,'J3',320),(10,'J4',320),(10,'J5',320),(10,'J6',320),(10,'J7',320),(10,'J8',320),(10,'J9',320),(10,'J10',320),(10,'J11',320),(10,'J12',320);

-- -----------------------------------------------------------------
-- MOVIES
-- -----------------------------------------------------------------
INSERT INTO `movies` (`id`, `name`, `image`, `about`, `reviews`, `actors`, `language`, `genre`, `rating`, `release_date`) VALUES
(1, 'Kalki 2898-AD',  'https://m.media-amazon.com/images/S/pv-target-images/8e0d90bcbc47ad1528ed1d1f0b0e88bfdf31125fa46acf0201fafa3250b40eac.png',
    'A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to Earth to protect the world from evil forces.',
    8500, '["Prabhas", "Amitabh Bachchan", "Kamal Haasan", "Deepika Padukone", "Disha Patani"]',
    'Telugu', 'Sci-Fi/Action', 8.5, '2024-06-27'),
(2, 'Fighter',        'https://m.media-amazon.com/images/M/MV5BMzlmOGU5MDYtODVhZC00ZGEzLThjNmEtNTgyYjQ2ZTQwNWYzXkEyXkFqcGc@._V1_.jpg',
    'Top IAF aviators come together in the face of imminent danger to form Air Dragons. They must band together to overcome their inner demons and emerge victorious.',
    7200, '["Hrithik Roshan", "Deepika Padukone", "Anil Kapoor"]',
    'Hindi', 'Action/Thriller', 7.8, '2024-01-25'),
(3, 'Manjummel Boys', 'https://cdn.gulte.com/wp-content/uploads/2024/02/Manjummel-Boys-review.jpg',
    'A group of friends from a small town called Manjummel, near Kochi, decide to have a vacation in Kodaikanal.',
    9800, '["Soubin Shahir", "Sreenath Bhasi", "Balu Varghese"]',
    'Malayalam', 'Survival/Thriller', 8.6, '2024-02-22'),
(4, 'Dune: Part Two', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8P5uwVwfPAX9FnmiLtcFECf8l28lS9FN-g&s',
    'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    11200, '["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"]',
    'English', 'Sci-Fi/Adventure', 8.8, '2024-03-01'),
(5, 'RRR', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxWB6mPm5SCRpJGjFi7EWG5vWtN294B10Aw&s',
 'A fictional story about two legendary revolutionaries and their journey away from home.',
 15000, '["NTR Jr.", "Ram Charan", "Alia Bhatt"]',
 'Telugu', 'Action/Drama', 8.7, '2022-03-25'),
(6, 'Vikram', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_IJtm72uJ_oU-osXt-d6In8wpbjdc5q3aw&s',
 'A special investigator is assigned to track down a serial killer who targets police officers.',
 11000, '["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil"]',
 'Tamil', 'Action/Thriller', 8.4, '2022-06-03'),
(7, 'Kantara', 'https://m.media-amazon.com/images/M/MV5BNDU2ZTYxYTMtMjhlZC00ZjEwLThhNDUtMzdlNWM4ZDcyYTM1XkEyXkFqcGc@._V1_.jpg',
 'A tribal man clashes with forest officers in a battle rooted in culture and tradition.',
 12500, '["Rishab Shetty", "Sapthami Gowda"]',
 'Kannada', 'Action/Drama', 8.5, '2022-09-30'),
(8, 'Drishyam 2', 'https://m.media-amazon.com/images/M/MV5BM2Q2YTczM2QtNDBkNC00M2I5LTkyMzgtOTMwNzQ0N2UyYWQ0XkEyXkFqcGc@._V1_.jpg',
 'A man tries to protect his family from the consequences of a crime they committed years ago.',
 9000, '["Mohanlal", "Meena"]',
 'Malayalam', 'Crime/Thriller', 8.4, '2021-02-19'),
(9, 'Jawan', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3OMsQqM_hs8eK5mM8KBCyY8hBfSeJMxGkjQ&s',
 'A soldier sets out to correct societal wrongs and seek revenge.',
 14000, '["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"]',
 'Hindi', 'Action/Thriller', 7.6, '2023-09-07'),
(10, 'Pathaan', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIo4_amMd40pWriK0ChyzUiFsrB4vlQCcsFQ&s',
 'An Indian agent races against time to stop a mercenary from spreading chaos.',
 13000, '["Shah Rukh Khan", "Deepika Padukone", "John Abraham"]',
 'Hindi', 'Action/Spy', 7.5, '2023-01-25'),
(11, 'Leo', 'https://m.media-amazon.com/images/M/MV5BMDk5ODNjNzMtYzI5Yy00NmI3LWIwYzctMTFjZjcwN2I2Yzk2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
 'A cafe owner becomes the target of a gang due to his mysterious past.',
 10500, '["Vijay", "Sanjay Dutt", "Trisha"]',
 'Tamil', 'Action/Thriller', 7.8, '2023-10-19'),
(12, 'KGF: Chapter 1', 'https://m.media-amazon.com/images/S/pv-target-images/0978dc3775492a124027b21df5153ab61b4c90cc518cbe126ebb3769d34640d5.jpg',
 'A young man rises from poverty to become a powerful figure in the gold mafia.',
 14500, '["Yash", "Srinidhi Shetty"]',
 'Kannada', 'Action/Drama', 8.2, '2018-12-21'),
(13, 'Inception', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
 'A thief who steals corporate secrets through dream-sharing technology is given a task of planting an idea.',
 20000, '["Leonardo DiCaprio", "Joseph Gordon-Levitt"]',
 'English', 'Sci-Fi/Thriller', 8.8, '2010-07-16'),
(14, 'The Platform', 'https://m.media-amazon.com/images/M/MV5BYjUyZjNmYmMtNjA1My00ZWMyLTliZGQtODgzZjIxM2Y4NGI1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
 'A vertical prison where inmates are fed via a descending platform, leading to extreme social commentary on class and survival.',
 12500, '["Iván Massagué", "Zorion Eguileor"]',
 'Spanish', 'Sci-Fi/Thriller', 7.0, '2019-11-08');
-- -----------------------------------------------------------------
-- SHOWS
-- -----------------------------------------------------------------

INSERT INTO `shows` (`movie_id`, `screen_id`, `movie_time`) VALUES
(1,1,CONCAT(CURDATE(),' 10:00:00')),
(2,2,CONCAT(CURDATE(),' 10:00:00')),
(3,3,CONCAT(CURDATE(),' 10:00:00')),
(4,4,CONCAT(CURDATE(),' 10:00:00')),
(5,5,CONCAT(CURDATE(),' 10:00:00')),
(6,6,CONCAT(CURDATE(),' 10:00:00')),
(7,7,CONCAT(CURDATE(),' 10:00:00')),
(8,8,CONCAT(CURDATE(),' 10:00:00')),
(9,9,CONCAT(CURDATE(),' 10:00:00')),
(10,10,CONCAT(CURDATE(),' 10:00:00')),
(11,1,CONCAT(CURDATE(),' 13:30:00')),
(12,2,CONCAT(CURDATE(),' 13:30:00')),
(13,3,CONCAT(CURDATE(),' 13:30:00')),
(14,4,CONCAT(CURDATE(),' 13:30:00')),
(1,5,CONCAT(CURDATE(),' 13:30:00')),
(2,6,CONCAT(CURDATE(),' 13:30:00')),
(3,7,CONCAT(CURDATE(),' 13:30:00')),
(4,8,CONCAT(CURDATE(),' 13:30:00')),
(5,9,CONCAT(CURDATE(),' 13:30:00')),
(6,10,CONCAT(CURDATE(),' 13:30:00')),
(7,1,CONCAT(CURDATE(),' 17:00:00')),
(8,2,CONCAT(CURDATE(),' 17:00:00')),
(9,3,CONCAT(CURDATE(),' 17:00:00')),
(10,4,CONCAT(CURDATE(),' 17:00:00')),
(11,5,CONCAT(CURDATE(),' 17:00:00')),
(12,6,CONCAT(CURDATE(),' 17:00:00')),
(13,7,CONCAT(CURDATE(),' 17:00:00')),
(14,8,CONCAT(CURDATE(),' 17:00:00')),
(1,9,CONCAT(CURDATE(),' 17:00:00')),
(2,10,CONCAT(CURDATE(),' 17:00:00')),
(3,1,CONCAT(CURDATE(),' 21:00:00')),
(4,2,CONCAT(CURDATE(),' 21:00:00')),
(5,3,CONCAT(CURDATE(),' 21:00:00')),
(6,4,CONCAT(CURDATE(),' 21:00:00')),
(7,5,CONCAT(CURDATE(),' 21:00:00')),
(8,6,CONCAT(CURDATE(),' 21:00:00')),
(9,7,CONCAT(CURDATE(),' 21:00:00')),
(10,8,CONCAT(CURDATE(),' 21:00:00')),
(11,9,CONCAT(CURDATE(),' 21:00:00')),
(12,10,CONCAT(CURDATE(),' 21:00:00')),
(13,1,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00')),
(14,2,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00')),
(1,3,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00')),
(2,4,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00')),
(3,5,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00')),
(4,6,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00')),
(5,7,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00')),
(6,8,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00')),
(7,9,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00')),
(8,10,CONCAT(DATE_ADD(CURDATE(),INTERVAL 1 DAY),' 10:00:00'));


-- =================================================================
-- END OF DUMMY DATA
-- =================================================================