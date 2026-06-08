# Movie Ticket Booking System

A full-stack web application for browsing movies, selecting showtimes, and booking seats at various theaters.

---

## Table of Contents

- [Overview](#overview)
  - [Problem Statement](#problem-statement)
  - [Solution](#solution)
- [Key Features](#key-features)
- [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [System Design](#system-design)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Environment Configuration](#environment-configuration)
  - [Local Development](#local-development)
- [API Documentation](#api-documentation)

---

## Overview

### Problem Statement

Traditional movie ticket booking can be a hassle, often involving:

- Long queues at the theater.
- Uncertainty about seat availability.
- Time-consuming process of checking showtimes for different movies and theaters.
- Lack of a centralized platform to browse movies and book tickets seamlessly.

These issues can lead to a frustrating experience for moviegoers.

### Solution

This project provides a modern, user-friendly web platform to streamline the movie ticket booking process. It allows users to:

- Discover movies currently playing in their city.
- View detailed information about movies, including cast and description.
- Browse theaters and their available showtimes.
- Select seats using an interactive seat map.
- Book tickets and process payments online.
- Manage their bookings through a personal profile.

---

## Key Features

### User Management

- Secure user registration and login.
- Profile page to view and manage personal information and booking history.

### Movie & Theater Browsing

- **Homepage**: Displays a list of currently running movies.
- **Movie Details**: Shows comprehensive details for each movie.
- **City & Theater Selection**: Filter theaters by location to find convenient options.
- **Showtimes**: View all available showtimes for a selected movie at a specific theater.

### Booking Flow

- **Interactive Seat Selection**: A visual seat map allows users to pick their desired seats.
- **Snack Selection**: Option to add snacks and beverages to the booking.
- **Payment Processing**: Integration with Razorpay to complete the transaction securely.
- **Booking Confirmation**: Users receive a success confirmation upon booking.

### Dashboard

- **My Bookings**: A section in the user profile to view past and upcoming bookings.
- **Status Tracking**: Real-time status of bookings.

---

## Architecture

### Tech Stack

#### Frontend

```md
React + TypeScript
├── Vite - Build tool and dev server
├── CSS - For styling components
└── React Router - For client-side routing
```

#### Backend

```md
Node.js + Express.js + TypeScript
├── MySQL - For data storage
└── REST API - For communication between frontend and backend
```

### System Design

The application is built with a classic client-server architecture:

- **Frontend**: A single-page application (SPA) built with React and Vite, responsible for rendering the user interface and managing client-side state.
- **Backend**: A RESTful API built with Node.js and Express, handling business logic, database interactions, and user authentication.
- **Database**: A SQL database to store information about users, movies, theaters, shows, bookings, and more. The schema is defined in `db/schema.sql`.

---

## Project Structure

```md
/
├── backend/
│   ├── db/
│   │   ├── schema.sql         # Database schema
│   │   └── seed.sql           # Initial data for the database
│   ├── src/
│   │   ├── config/            # Database connection config
│   │   ├── controllers/       # Request handlers and business logic
│   │   ├── routes/            # API endpoint definitions
│   │   ├── app.ts             # Express app setup
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/            # Static assets like images
│   │   ├── App.tsx            # Root component with routing
│   │   ├── main.tsx           # React app entry point
│   │   ├── index.css          # Global styles
│   │   └── *.tsx              # React components for pages and UI elements
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A running instance of a SQL database (e.g., MySQL)

### Installation

1.  **Clone the repository**

    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install Backend Dependencies**

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**

    ```bash
    cd ../frontend
    npm install
    ```

### Database Setup

1.  Make sure your MySQL database server is running.
2.  Create a new database for the project.
3.  Execute the schema file to create the necessary tables:

    ```bash
    # Example for MySQL
    mysql -u your_username -p your_database_name < backend/db/schema.sql
    ```

4.  (Optional) Execute the seed file to populate the database with initial data:

    ```bash
    # Example for MySQL
    mysql -u your_username -p your_database_name < backend/db/seed.sql
    ```

### Environment Configuration

Create a `.env` file in the `backend` directory and add your database connection details:

```env
# backend/.env

DB_USER=your_database_user
DB_HOST=localhost
DB_DATABASE=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
```

### Local Development

1.  **Start the Backend Server**

    ```bash
    cd backend
    npm run dev
    ```

    The backend server will start, typically on `http://localhost:3000`.

2.  **Start the Frontend Development Server**
    In a new terminal window:

    ```bash
    cd frontend
    npm run dev
    ```

    The frontend application will be available at `http://localhost:5173`.

---

## API Documentation

The backend exposes a RESTful API with the following primary resources:

- `GET /api/movies`: Get a list of all movies.
- `GET /api/movies/:id`: Get details for a specific movie.
- `GET /api/theaters`: Get a list of all theaters.
- `GET /api/theaters/:id/shows`: Get showtimes for a specific theater.
- `POST /api/bookings`: Create a new booking.
- `GET /api/users/:id/bookings`: Get all bookings for a user.
- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in a user.

Each resource has a dedicated router in the `backend/src/routes` directory. Refer to the controller files in `backend/src/controllers` for implementation details.
