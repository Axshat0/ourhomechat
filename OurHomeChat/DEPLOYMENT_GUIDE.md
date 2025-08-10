# Deployment Guide for Our Home Chat App

## Overview
This application is structured for easy deployment to Render.com with separate frontend and backend services.

## Project Structure
```
our-home-chat/
├── backend/           # Node.js API server
├── frontend/          # React Vite app  
├── shared/            # Shared TypeScript types
├── attached_assets/   # Static assets
└── replit_config/     # Replit configuration files
```

## Deployment to Render

### Backend Deployment (Node.js Service)

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Set the root directory to `backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

2. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

3. **Required Files in /backend:**
   - `package.json` - Dependencies and scripts
   - `src/index.ts` - Main server file
   - `src/routes.ts` - API routes
   - `src/storage.ts` - Data storage layer
   - `tsconfig.json` - TypeScript configuration

### Frontend Deployment (Static Site)

1. **Create a new Static Site on Render**
   - Connect your GitHub repository  
   - Set the root directory to `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

2. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

3. **Required Files in /frontend:**
   - `package.json` - Dependencies and scripts
   - `vite.config.ts` - Vite configuration
   - `index.html` - Main HTML file
   - `src/` - React application source

## Development Setup

### Backend Development
```bash
cd backend
npm install
npm run dev
```

### Frontend Development
```bash
cd frontend  
npm install
npm run dev
```

## Build Process

### Backend Build
```bash
cd backend
npm run build
```
Creates `dist/` directory with compiled JavaScript.

### Frontend Build
```bash
cd frontend
npm run build
```
Creates `dist/` directory with optimized static files.

## Features
- Real-time messaging with polling
- Physics formulas reference overlay
- Mobile-responsive design
- Access control for authorized users only
- In-memory storage (ready for database upgrade)

## Security Notes
- CORS configured for frontend domain
- User access restricted to allowlist
- Environment variables for sensitive configuration
- HTTPS enforced in production

## Monitoring
- Health check endpoint: `/health`
- Request logging middleware
- Error handling and reporting