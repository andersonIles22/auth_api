# auth_api
Sistema de autenticación con JWT usando Node.js, Express y PostgreSQL.

## Features

- Registro de usuarios
- Login con JWT
- Password hashing con bcrypt
- Validación de inputs

## Tech Stack

- Node.js + Express
- PostgreSQL
- JWT para autenticación
- Bcrypt para hashing

## Setup

1. Instalar dependencias:
```powershell
pnpm i express dotenv express-validator jsonwebtoken nodemon pg bcryptjs
```

2. Configurar `.env`:
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
```

3. Crear base de datos:
```sql
CREATE DATABASE auth_db;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

4. Correr servidor:
```powershell 
pnpm dev
```

## Endpoints

### POST /api/auth/register
Registra nuevo usuario.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response 201:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "..."
  }
}
```

### POST /api/auth/login
Login usuario existente.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "..."
  }
}