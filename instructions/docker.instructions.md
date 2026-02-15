---
description: "Dockerfile multi-stage builds, security best practices, image optimization, layer caching, and container runtime configuration."
applyTo: "**/Dockerfile, **/docker-compose*.yml, **/.dockerignore"
---

# Docker Development Standards

## Multi-Stage Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 -G nodejs nodejs

WORKDIR /app

# Copy from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" || exit 1

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

## Docker Compose

```yaml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgres://user:pass@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## .dockerignore

```
node_modules
npm-debug.log
dist
.git
.gitignore
README.md
.env
.env.local
.DS_Store
coverage
*.test.ts
*.spec.ts
```

## Best Practices

- ✅ Use **multi-stage builds**
- ✅ Run as **non-root user**
- ✅ Use **specific tags** (not latest)
- ✅ Minimize **layers**
- ✅ Add **.dockerignore**
- ✅ Include **health checks**
- ✅ Set **WORKDIR**
- ✅ Use **COPY** over ADD
