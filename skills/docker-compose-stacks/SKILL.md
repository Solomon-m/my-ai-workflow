---
name: "docker-compose-stacks"
description: "Docker Compose configurations for development including database stacks, message queues, caching layers, and full-stack applications."
version: "1.0.0"
---

# Docker Compose Stacks

This skill provides production-ready Docker Compose configurations for common development stacks.

## When to Use This Skill

- Setting up local development environment
- Running databases locally (PostgreSQL, MongoDB, Redis)
- Testing with message queues (RabbitMQ, SQS)
- Full-stack application development
- Integration testing environments

## Stack Templates

### 1. Node.js + PostgreSQL + Redis

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
      DATABASE_URL: postgres://user:password@db:5432/myapp
      REDIS_URL: redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_healthy
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev

  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

volumes:
  postgres_data:
  redis_data:
```

### 2. React + Node.js + MongoDB

```yaml
version: "3.8"

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:4000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm start

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    ports:
      - "4000:4000"
    environment:
      NODE_ENV: development
      MONGODB_URI: mongodb://db:27017/myapp
      JWT_SECRET: dev-secret-key
    depends_on:
      - db
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run dev

  db:
    image: mongo:7
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: myapp
    volumes:
      - mongo_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js

volumes:
  mongo_data:
```

### 3. Full Microservices Stack

```yaml
version: "3.8"

services:
  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    environment:
      USER_SERVICE_URL: http://user-service:3001
      ORDER_SERVICE_URL: http://order-service:3002
    depends_on:
      - user-service
      - order-service

  user-service:
    build: ./services/user
    environment:
      DATABASE_URL: postgres://user:password@postgres:5432/users
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

  order-service:
    build: ./services/order
    environment:
      DATABASE_URL: postgres://user:password@postgres:5432/orders
      RABBITMQ_URL: amqp://rabbitmq:5672
    depends_on:
      - postgres
      - rabbitmq

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "15672:15672" # Management UI
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: password
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq

volumes:
  postgres_data:
  redis_data:
  rabbitmq_data:
```

### 4. Testing Stack with LocalStack

```yaml
version: "3.8"

services:
  app:
    build: .
    environment:
      AWS_ENDPOINT: http://localstack:4566
      AWS_REGION: us-east-1
      AWS_ACCESS_KEY_ID: test
      AWS_SECRET_ACCESS_KEY: test
    depends_on:
      - localstack

  localstack:
    image: localstack/localstack:latest
    ports:
      - "4566:4566"
    environment:
      SERVICES: s3,dynamodb,sqs,lambda
      DEBUG: 1
      DATA_DIR: /tmp/localstack/data
    volumes:
      - "./localstack:/tmp/localstack"
      - "/var/run/docker.sock:/var/run/docker.sock"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4566/_localstack/health"]
      interval: 10s
      timeout: 5s
      retries: 3

  test:
    build: .
    command: npm test
    environment:
      AWS_ENDPOINT: http://localstack:4566
    depends_on:
      localstack:
        condition: service_healthy
```

## Helper Scripts

### Start Development Environment

```bash
#!/bin/bash
# dev.sh

echo "Starting development environment..."
docker-compose up -d

echo "Waiting for services..."
docker-compose exec -T db pg_isready -U user

echo "Running migrations..."
docker-compose exec app npm run migrate

echo "Development environment ready!"
echo "App: http://localhost:3000"
```

## Best Practices

- Use **specific image tags** (not `latest`)
- Add **health checks** for all services
- Use **named volumes** for persistence
- Set **depends_on** with conditions
- Use **.env files** for secrets (not committed)
- Add **resource limits** for production
- Use **networks** to isolate services
- Include **init scripts** for databases
