---
name: "serverless-testing"
description: "Testing strategies for serverless applications including Lambda unit tests, integration tests, E2E tests, and mocking AWS services."
version: "1.0.0"
---

# Serverless Testing Skill

This skill provides comprehensive testing strategies for AWS serverless applications.

## When to Use This Skill

- Writing unit tests for Lambda handlers
- Testing API Gateway integration
- Mocking AWS SDK calls
- Running integration tests locally
- E2E testing of serverless apps

## Testing Layers

### 1. Unit Tests

```typescript
import { handler } from "./handler";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("Lambda Handler", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it("saves item to DynamoDB", async () => {
    ddbMock.on(PutCommand).resolves({});

    const event = {
      body: JSON.stringify({ name: "John", email: "john@example.com" }),
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(ddbMock).toHaveReceivedCommandWith(PutCommand, {
      TableName: "users",
      Item: expect.objectContaining({
        name: "John",
        email: "john@example.com",
      }),
    });
  });

  it("handles errors gracefully", async () => {
    ddbMock.on(PutCommand).rejects(new Error("DynamoDB error"));

    const event = {
      body: JSON.stringify({ name: "John" }),
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
  });
});
```

### 2. Integration Tests with LocalStack

```typescript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

describe("DynamoDB Integration", () => {
  let client: DynamoDBDocumentClient;

  beforeAll(() => {
    // Connect to LocalStack
    client = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        endpoint: "http://localhost:4566",
        region: "us-east-1",
        credentials: {
          accessKeyId: "test",
          secretAccessKey: "test",
        },
      }),
    );
  });

  it("writes and reads from DynamoDB", async () => {
    const item = {
      id: "test-id",
      name: "John",
      email: "john@example.com",
    };

    // Write
    await client.send(
      new PutCommand({
        TableName: "users",
        Item: item,
      }),
    );

    // Read
    const result = await client.send(
      new GetCommand({
        TableName: "users",
        Key: { id: "test-id" },
      }),
    );

    expect(result.Item).toEqual(item);
  });
});
```

### 3. API Testing

```typescript
import { handler } from "./api-handler";
import { APIGatewayProxyEvent } from "aws-lambda";

const createEvent = (
  overrides: Partial<APIGatewayProxyEvent> = {},
): APIGatewayProxyEvent => ({
  body: null,
  headers: {},
  multiValueHeaders: {},
  httpMethod: "GET",
  isBase64Encoded: false,
  path: "/users",
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {} as any,
  resource: "",
  ...overrides,
});

describe("API Handler", () => {
  it("returns 200 for valid GET request", async () => {
    const event = createEvent({
      httpMethod: "GET",
      pathParameters: { id: "123" },
    });

    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body).toHaveProperty("id", "123");
  });

  it("returns 400 for missing parameters", async () => {
    const event = createEvent({
      httpMethod: "POST",
      body: JSON.stringify({}),
    });

    const result = await handler(event);

    expect(result.statusCode).toBe(400);
  });

  it("sets CORS headers", async () => {
    const event = createEvent();
    const result = await handler(event);

    expect(result.headers).toHaveProperty("Access-Control-Allow-Origin", "*");
  });
});
```

### 4. E2E Tests

```typescript
import axios from "axios";

describe("E2E API Tests", () => {
  const API_URL = process.env.API_URL || "http://localhost:3000";

  it("creates and retrieves a user", async () => {
    // Create user
    const createResponse = await axios.post(`${API_URL}/users`, {
      name: "John",
      email: "john@example.com",
    });

    expect(createResponse.status).toBe(201);
    const userId = createResponse.data.id;

    // Get user
    const getResponse = await axios.get(`${API_URL}/users/${userId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.data).toMatchObject({
      id: userId,
      name: "John",
      email: "john@example.com",
    });
  });

  it("handles authentication", async () => {
    const response = await axios.get(`${API_URL}/protected`, {
      validateStatus: () => true,
    });

    expect(response.status).toBe(401);
  });
});
```

## Testing Local Setup

### docker-compose.yml for LocalStack

```yaml
version: "3.8"

services:
  localstack:
    image: localstack/localstack:latest
    ports:
      - "4566:4566"
    environment:
      - SERVICES=dynamodb,s3,sqs,lambda
      - DEBUG=1
      - DATA_DIR=/tmp/localstack/data
    volumes:
      - "./localstack:/tmp/localstack"
      - "/var/run/docker.sock:/var/run/docker.sock"
```

## Best Practices

- **Mock AWS SDK** calls in unit tests
- Use **LocalStack** for integration tests
- Test **error scenarios** and edge cases
- Include **auth/authorization** tests
- Test **CORS** headers
- Use **test fixtures** for consistent data
- Run tests in **CI/CD pipeline**
- Measure **code coverage** (target 80%+)
