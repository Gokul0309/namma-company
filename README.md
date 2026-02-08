# Namma Company - Full Stack Service Aggregator (V1)

Production-ready monorepo for a service aggregator platform similar to Urban Company.

## Monorepo Structure

- `frontend/`: Next.js + Tailwind booking and admin UI
- `backend/`: NestJS REST API with modular architecture
- `database/`: PostgreSQL schema, seed data, Docker Compose

## Core Modules (Backend)

- `Users`
- `Service Categories`
- `Services`
- `Technicians`
- `Bookings`
- `Admin`

Each module includes `controller`, `service`, `dto`, and `entity/model`.

## Booking Flow

1. Customer selects category
2. Customer selects sub-service
3. Customer chooses slot and enters details
4. Booking is created with `pending`
5. Admin manually assigns technician in V1
6. Status transitions: `pending`, `assigned`, `in_progress`, `completed`, `cancelled`

## Scalability / Future-ready Design

- Modular NestJS architecture with clear boundaries
- PostgreSQL schema with extension points (`metadata` JSONB columns)
- Technician-service mapping table for future auto-assignment
- Overlap protection for technician time slots using DB-level exclusion constraint plus service-level checks
- Ready for future add-ons: ratings, payments, availability, notifications, background jobs

## Local Setup

### 1) Start PostgreSQL

```bash
cd database
docker compose up -d
```

### 2) Configure backend env

```bash
cd backend
copy .env.example .env
```

### 3) Configure frontend env

```bash
cd frontend
copy .env.local.example .env.local
```

### 4) Install dependencies

```bash
cd C:\namma-company
npm install
```

### 5) Run backend

```bash
npm run dev:backend
```

Backend runs on `http://localhost:3001`.

### 6) Run frontend

```bash
npm run dev:frontend
```

Frontend runs on `http://localhost:3000`.

## Key API Endpoints

### Public APIs

- `GET /service-categories`
- `GET /services?categoryId=<id>`
- `POST /bookings`
- `GET /bookings`

### Admin APIs

- `POST|GET|PATCH|DELETE /admin/categories`
- `POST|GET|PATCH|DELETE /admin/services`
- `GET /admin/bookings`
- `PATCH /admin/bookings/:id/assign`
- `PATCH /admin/bookings/:id/status`

### Technician APIs

- `POST|GET|PATCH|DELETE /technicians`
- `POST /technicians/:id/services`
- `DELETE /technicians/:id/services/:serviceId`

## Production Hardening Notes

For production deployment, add:

- JWT auth and role guards for admin routes
- API rate limiting and structured logging
- Migrations pipeline (TypeORM migration CLI)
- Redis plus queue workers for async notifications/jobs
- Monitoring (health checks, metrics, tracing)
