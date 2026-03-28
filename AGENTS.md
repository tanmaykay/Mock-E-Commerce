# AGENTS.md

## 1. Purpose

This document defines the architecture, responsibilities, and operational rules for a production-grade full-stack e-commerce system built using a multi-agent (vibe coding) approach.

The system must be:

* Modular
* Secure
* Scalable
* Maintainable
* Deployment-ready

---

## 2. System Architecture

### 2.1 High-Level Overview

* Frontend: React (Vite)
* Backend: Node.js (Express)
* Database: PostgreSQL (Prisma ORM)
* Authentication: JWT-based
* Payments: Stripe (optional, pluggable)
* Deployment: Container-ready (Docker)

---

### 2.2 Architectural Principles

* Separation of concerns across agents
* Stateless backend services
* API-first design
* Environment-driven configuration
* Strict layering (no cross-layer leakage)
* Idempotent APIs where applicable

---

## 3. Repository Structure

```
/ecommerce-demo
  /frontend
  /backend
  /infra
  AGENTS.md
  README.md
```

---

## 4. Agent Definitions

### 4.1 Frontend Agent

#### Responsibilities

* UI rendering and user interaction
* State management
* API communication
* Form validation and UX feedback

#### Constraints

* Must not contain business logic
* Must not directly access database
* Must not hardcode API endpoints

#### Structure

```
/frontend/src
  /components
  /pages
  /hooks
  /services
  /store
  /utils
```

#### Rules

* All API calls must go through `/services`
* Global state must be managed via Zustand or Redux
* Components must be reusable and isolated
* All async flows must handle:

  * loading state
  * error state
  * empty state

---

### 4.2 Backend Agent

#### Responsibilities

* API development
* Business logic execution
* Authentication and authorization
* Data validation

#### Structure

```
/backend
  /controllers
  /services
  /routes
  /middleware
  /models
  /config
```

#### Rules

* Controllers must be thin (no business logic)
* Business logic must reside in `/services`
* All routes must be versioned (`/api/v1`)
* Use middleware for:

  * authentication
  * logging
  * validation

---

### 4.3 Database Agent

#### Responsibilities

* Schema design and migrations
* Data integrity and relationships
* Query performance

#### Core Schema

```sql
User
- id (PK)
- email (unique)
- password_hash
- role (USER | ADMIN)
- created_at

Product
- id (PK)
- name
- description
- price
- stock
- image_url
- created_at

Order
- id (PK)
- user_id (FK)
- total_price
- status
- created_at

OrderItem
- id (PK)
- order_id (FK)
- product_id (FK)
- quantity
- price
```

#### Rules

* All schema changes must go through migrations
* Use indexes on:

  * email
  * foreign keys
* No raw SQL in application layer unless justified
* Enforce referential integrity

---

### 4.4 Authentication Agent

#### Responsibilities

* User registration and login
* Token issuance and validation
* Role-based access control

#### Rules

* Passwords must be hashed using bcrypt
* JWT must include:

  * user_id
  * role
  * expiration
* Refresh token strategy recommended
* All protected routes must verify token

---

### 4.5 Cart and Checkout Agent

#### Responsibilities

* Cart lifecycle management
* Order creation
* Payment integration

#### Rules

* Guest cart stored in localStorage
* Authenticated cart stored in database
* Validate stock before order placement
* Ensure idempotent order creation

---

### 4.6 Product Management Agent

#### Responsibilities

* Product CRUD operations
* Inventory updates

#### Rules

* Admin-only access required
* Input validation mandatory
* Prevent negative stock values

---

### 4.7 API Integration Agent

#### Responsibilities

* Centralized API communication layer
* Error handling and retries

#### Rules

* Single API client instance
* Implement:

  * timeout handling
  * retry logic (optional)
* No direct API calls in UI components

---

### 4.8 DevOps Agent

#### Responsibilities

* Environment configuration
* Build and deployment pipelines
* Containerization

#### Rules

* All secrets must be stored in environment variables
* Separate configurations:

  * development
  * staging
  * production
* Docker support recommended

---

## 5. Environment Configuration

### Backend `.env`

```
DATABASE_URL=
JWT_SECRET=
PORT=5000
NODE_ENV=development
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 6. API Specification

### 6.1 Authentication

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### 6.2 Products

```
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products        (admin)
PUT    /api/v1/products/:id    (admin)
DELETE /api/v1/products/:id    (admin)
```

### 6.3 Orders

```
POST /api/v1/orders
GET  /api/v1/orders/user
```

---

## 7. Security Standards

* All inputs must be validated (server-side)
* Use HTTPS in production
* Implement rate limiting
* Sanitize user inputs to prevent injection
* Do not expose internal errors to clients

---

## 8. Testing Strategy

### Backend

* Unit tests for services
* Integration tests for APIs

### Frontend

* Component testing
* End-to-end flows:

  * add to cart
  * checkout

---

## 9. Code Quality Standards

* Use ESLint and Prettier
* Naming conventions:

  * camelCase for variables/functions
  * PascalCase for components
  * snake_case for database fields
* Functions should be small and composable
* Avoid duplication (DRY principle)

---

## 10. Deployment Strategy

### Frontend

* Vercel or Netlify

### Backend

* Render, Railway, or AWS

### Database

* Supabase or Neon

---

## 11. Observability

* Implement logging (winston or similar)
* Track:

  * API errors
  * request latency
* Add health check endpoint:

```
GET /api/v1/health
```

---

## 12. Future Extensions

* Recommendation engine
* Search with vector database
* Admin analytics dashboard
* Multi-vendor marketplace support

---

## 13. Operational Guidelines

* Each agent must operate independently within its boundary
* Cross-agent communication must happen only via defined interfaces
* Avoid tight coupling between modules
* Prioritize clarity over premature optimization
