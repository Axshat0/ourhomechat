# Overview

This is a private chat application built as a full-stack web application with React frontend and Express backend. The app is designed specifically for two users ("akshu" and "paru") to communicate privately. It features real-time messaging with a clean, modern UI built using shadcn/ui components and styled with a warm color palette.

**Project Structure**: Reorganized into clean MERN/Vite + Node style for easy deployment to Render with separate backend/ and frontend/ folders.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom warm color palette (coral, peach, cream, beige tones)
- **Build Tool**: Vite for fast development and optimized builds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON responses
- **Storage**: In-memory storage implementation (MemStorage class) with interface for future database integration
- **Session Management**: Session storage for client-side user persistence
- **Middleware**: Custom logging middleware for API request monitoring

## Data Storage
- **Current**: In-memory storage using Maps for users and messages
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Schema**: Two main entities - users (id, username) and messages (id, sender, text, timestamp)
- **Migration**: Drizzle Kit configured for database migrations

## Authentication & Authorization
- **Simple Login**: Username-based authentication without passwords
- **Access Control**: Hardcoded allowlist restricting access to only "akshu" and "paru"
- **Session Persistence**: Client-side session storage for maintaining login state
- **API Protection**: Server-side validation ensures only allowed users can send messages

## External Dependencies
- **Database**: Neon Database (PostgreSQL) configured but not actively used
- **UI Components**: Radix UI primitives for accessible, unstyled components
- **Icons**: Lucide React for consistent iconography
- **Form Handling**: React Hook Form with Zod for validation
- **Date Handling**: date-fns for timestamp formatting
- **Development**: Replit-specific plugins for development environment integration

## Key Design Decisions

**Full-Stack Structure**: Clean separation of concerns with backend/ (Node.js API), frontend/ (React Vite app), and shared/ (common types) for easy Render deployment.

**Real-time Updates**: Polling-based approach (1-second intervals) for message synchronization instead of WebSockets for simplicity.

**Memory vs Database**: Currently uses in-memory storage for rapid development, with database infrastructure ready for production deployment.

**Component Architecture**: Separation of concerns with dedicated components for chat interface, login modal, and UI primitives.

**Type Safety**: Full TypeScript implementation with shared schema types between frontend and backend using Drizzle's type inference.