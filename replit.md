# Overview

This is a full-stack web application for "Escuadrón 404", a developer community platform with both community and corporate sections. The project features a React frontend with TypeScript, an Express.js backend, and includes authentication, form handling, and responsive design. The application serves dual purposes: a community page for developers to connect and join Discord, and a corporate page for businesses to request development services.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 18 with TypeScript and Vite for development tooling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and local React state for UI
- **Styling**: Tailwind CSS with custom CSS variables and shadcn/ui component library
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui
- **Forms**: React Hook Form with Zod validation schemas
- **Build Tool**: Vite with custom configuration for development and production

**Component Structure**: 
- Modular component architecture with clear separation of concerns
- Shared UI components in `/components/ui/` following shadcn/ui patterns
- Page-specific components in `/components/` 
- Custom hooks for Firebase authentication and toast notifications

## Backend Architecture

**Framework**: Express.js with TypeScript
- **Development Setup**: Custom Vite integration for hot reloading in development
- **API Structure**: RESTful API with `/api` prefix routing
- **Error Handling**: Centralized error middleware with structured error responses
- **Request Logging**: Custom middleware for API request/response logging
- **Storage Interface**: Abstracted storage layer with in-memory implementation

**Server Configuration**:
- Express middleware for JSON parsing and URL encoding
- Custom Vite middleware integration for development
- Static file serving for production builds

## Data Storage Solutions

**Database**: PostgreSQL with Drizzle ORM
- **ORM**: Drizzle with TypeScript-first schema definitions
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL
- **Schema**: Shared schema definitions between client and server
- **Validation**: Zod schemas derived from Drizzle tables

**Development Storage**: In-memory storage implementation for development/testing

## Authentication and Authorization

**Primary**: Firebase Authentication
- **Fallback**: Demo mode when Firebase is not configured
- **Implementation**: Custom hook (`useFirebaseAuth`) managing auth state
- **User Management**: Email/password authentication with display name support
- **Session Handling**: Firebase auth state persistence

**Security Features**:
- Environment variable configuration for Firebase credentials
- Graceful degradation to demo mode
- Protected routes and conditional UI rendering based on auth state

## External Dependencies

**Core Dependencies**:
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm & drizzle-kit**: TypeScript ORM and migration tools
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Unstyled, accessible UI primitives
- **react-hook-form & @hookform/resolvers**: Form handling and validation
- **zod**: TypeScript-first schema validation
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority & clsx**: Dynamic class name generation
- **wouter**: Minimalist routing for React

**Development Tools**:
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-***: Replit-specific development enhancements

**Firebase Integration**:
- Firebase Authentication (via CDN)
- Graceful fallback to demo mode when Firebase SDK unavailable
- Environment-based configuration

**UI Enhancement Libraries**:
- **embla-carousel-react**: Touch-friendly carousels
- **date-fns**: Date utility functions
- **cmdk**: Command palette component
- **lucide-react**: Icon library