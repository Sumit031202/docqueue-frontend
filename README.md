# DocQueue Frontend

Frontend for **DocQueue**, a real-time clinic queue management system that helps clinics reduce waiting room congestion and allows patients to track their queue position live.

## Features

- Modern SaaS landing page
- Responsive UI
- Doctor dashboard preview
- Patient queue preview
- Clinic registration flow (coming soon)
- Live queue tracking integration (planned)
- Spring Boot backend integration

## Tech Stack

- React
- Vite
- CSS
- JavaScript

## Project Structure

```
src/
│
├── assets/
├── components/
│   ├── Navbar
│   ├── Hero
│   └── ...
│
├── LandingPage.jsx
├── App.jsx
└── main.jsx
```

## Getting Started

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

## Planned Features

- Clinic discovery
- Doctor authentication
- Patient registration
- Real-time queue updates using Server-Sent Events (SSE)
- QR code based queue joining
- Responsive dashboard
- Browser notifications

## Backend

The backend is built using:

- Spring Boot
- PostgreSQL
- JPA / Hibernate
- REST APIs
- Server-Sent Events (SSE)

## Status

🚧 Currently under active development.
