---
description: "TypeScript 5+ and Node.js 20+ development standards including ESM, async/await patterns, error handling, logging conventions, and modern JavaScript best practices."
applyTo: "**/*.ts, **/*.js, **/*.mjs, **/tsconfig.json, **/package.json"
---

# Node.js TypeScript Development Standards

## TypeScript Configuration

### tsconfig.json Settings

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

## Module System

### Use ESM (ECMAScript Modules)

```typescript
// ✅ Good: ESM imports
import { readFile } from "fs/promises";
import express from "express";
import type { Request, Response } from "express";

// ❌ Avoid: CommonJS
const express = require("express");
```

### Package.json Configuration

```json
{
  "type": "module",
  "engines": {
    "node": ">=20.0.0"
  }
}
```

## TypeScript Patterns

### Strict Type Safety

```typescript
// ✅ Good: Explicit types, no any
interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

function getUser(id: string): Promise<User | null> {
  // implementation
}

// ❌ Avoid: any types
function getUser(id: any): any {
  // implementation
}
```

### Discriminated Unions

```typescript
// ✅ Good: Type-safe error handling
type Result<T> = { success: true; data: T } | { success: false; error: string };

function processData(input: string): Result<ProcessedData> {
  try {
    const data = parse(input);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

## Async/Await Patterns

### Always Use Async/Await

```typescript
// ✅ Good: async/await
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  return await response.json();
}

// ❌ Avoid: Promise chains
function fetchUser(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then((response) => response.json());
}
```

### Error Handling

```typescript
// ✅ Good: Explicit error handling
async function processRequest(req: Request, res: Response) {
  try {
    const data = await fetchData();
    res.json({ success: true, data });
  } catch (error) {
    logger.error("Failed to process request", { error });
    res.status(500).json({
      success: false,
      error: "Failed to process request",
    });
  }
}
```

## Error Handling

### Custom Error Classes

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}
```

### Type Guards for Error Handling

```typescript
function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

try {
  await riskyOperation();
} catch (error) {
  if (isAppError(error)) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  logger.error("Unexpected error", { error });
  return res.status(500).json({ error: "Internal server error" });
}
```

## Logging

### Structured Logging

```typescript
import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

// ✅ Good: Structured logs with context
logger.info({ userId, action: "login" }, "User logged in");
logger.error({ error, userId }, "Failed to process user request");

// ❌ Avoid: Plain string logs
console.log("User logged in:", userId);
```

## Environment Variables

### Type-Safe Configuration

```typescript
// src/config/index.ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export const config = envSchema.parse(process.env);

// Usage
import { config } from "./config";
const port = config.PORT; // type-safe, validated
```

## File Structure

```
src/
├── config/          # Configuration files
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── middleware/      # Express middleware
├── routes/          # Route handlers
├── controllers/     # Request controllers
├── services/        # Business logic
├── models/          # Data models
├── index.ts         # Entry point
└── app.ts           # Express app setup
```

## Dependencies

### Use Exact Versions in Production

```json
{
  "dependencies": {
    "express": "4.18.2" // ✅ Exact version
  },
  "devDependencies": {
    "@types/node": "^20.0.0" // ✅ Can use ^ for dev deps
  }
}
```

## Testing

### Co-locate Test Files

```
src/
├── utils/
│   ├── format.ts
│   └── format.test.ts  # ✅ Co-located test
```

## Naming Conventions

- **Files**: kebab-case (user-service.ts)
- **Classes**: PascalCase (UserService)
- **Functions**: camelCase (getUserById)
- **Constants**: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
- **Interfaces**: PascalCase with I prefix optional (User or IUser)
- **Types**: PascalCase (UserRole)
