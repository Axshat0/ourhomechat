# Our Home - Private Chat Application

A modern, private chat application designed for two users with real-time messaging and an integrated physics formulas reference.

## Features

- **Private Access**: Restricted to authorized users only (akshu and paru)
- **Real-time Messaging**: Live chat with automatic message updates
- **Physics Reference**: Comprehensive physics formulas overlay for privacy
- **Mobile Responsive**: Optimized for all device sizes
- **Modern UI**: Clean design with dark/light theme support

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- TailwindCSS for styling
- shadcn/ui component library
- TanStack Query for data fetching
- Wouter for routing

### Backend
- Node.js with Express
- TypeScript
- In-memory storage (production-ready for database)
- RESTful API design

## Project Structure

```
├── backend/           # Express API server
│   ├── src/
│   │   ├── index.ts   # Main server entry
│   │   ├── routes.ts  # API routes
│   │   └── storage.ts # Data storage layer
│   └── package.json
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── lib/
│   └── package.json
├── shared/            # Shared TypeScript types
└── attached_assets/   # Static assets
```

## Quick Start

### Development

1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install  
   npm run dev
   ```

### Production Build

1. **Backend**:
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

## Deployment

Ready for deployment to Render.com with separate frontend (Static Site) and backend (Web Service) deployments.

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend domain for CORS

### Frontend  
- `VITE_API_URL` - Backend API URL

## Access Control

The application restricts access to a predefined list of users. Only authorized usernames can:
- Log into the chat
- Send messages
- Access the application features

## Physics Reference

The integrated physics formulas reference provides:
- Mechanics formulas
- Electricity & Magnetism
- Waves & Optics
- Quick category navigation
- Mobile-optimized interface

## License

Private application for personal use.