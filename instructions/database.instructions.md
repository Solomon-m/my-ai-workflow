---
description: "Database schema patterns, migration strategies, Prisma conventions, SQL best practices, and data modeling for PostgreSQL, MongoDB, and other databases."
applyTo: "**/migrations/**/*.sql, **/prisma/**/*.prisma, **/models/**/*.ts"
---

# Database Development Standards

## Prisma Schema

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts     Post[]
  orders    Order[]

  @@index([email])
  @@map("users")
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
  @@index([published, createdAt])
  @@map("posts")
}

enum Role {
  USER
  ADMIN
}
```

## Migrations

```sql
-- migrations/001_create_users.sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

## Prisma Client Usage

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "John",
    password: hashedPassword,
  },
});

// Read with relations
const userWithPosts = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: "desc" },
    },
  },
});

// Update
await prisma.user.update({
  where: { id: userId },
  data: { name: "Jane" },
});

// Delete
await prisma.user.delete({
  where: { id: userId },
});

// Transactions
await prisma.$transaction(async (tx) => {
  await tx.user.create({ data: userData });
  await tx.post.create({ data: postData });
});
```

## Best Practices

- Use **UUIDs** for primary keys
- Add **indexes** on frequently queried columns
- Use **timestamps** (createdAt, updatedAt)
- Implement **soft deletes** when appropriate
- Use **transactions** for related operations
- Add **foreign key constraints**
- Use **connection pooling**
- Write **reversible migrations**
