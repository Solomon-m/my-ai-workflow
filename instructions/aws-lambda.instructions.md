---
description: "AWS Lambda development patterns for Node.js including handler structure, cold start optimization, error handling, middleware with Middy, and environment variable best practices."
applyTo: "**/lambda/**/*.ts, **/functions/**/*.ts, **/handlers/**/*.ts"
---

# AWS Lambda Development Standards

## Handler Pattern

### Basic Lambda Handler

```typescript
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || "{}");
    const result = await processRequest(body);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ data: result }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
```

## Cold Start Optimization

### Initialize Outside Handler

```typescript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// ✅ Initialize once, reused across invocations
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: any) => {
  // Use ddbDocClient here
  const result = await ddbDocClient.send(command);
};
```

## Middy Middleware

### Using Middy for Common Patterns

```typescript
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import httpCors from "@middy/http-cors";
import validator from "@middy/validator";
import { transpileSchema } from "@middy/validator/transpile";

const inputSchema = {
  type: "object",
  required: ["body"],
  properties: {
    body: {
      type: "object",
      required: ["email", "name"],
      properties: {
        email: { type: "string", format: "email" },
        name: { type: "string", minLength: 2 },
      },
    },
  },
};

const baseHandler = async (event: any) => {
  const { email, name } = event.body;
  const user = await createUser({ email, name });
  return { statusCode: 201, body: JSON.stringify({ data: user }) };
};

export const handler = middy(baseHandler)
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema: transpileSchema(inputSchema) }))
  .use(httpCors())
  .use(httpErrorHandler());
```

## Environment Variables

```typescript
// ✅ Validate at startup
const TABLE_NAME = process.env.TABLE_NAME;
if (!TABLE_NAME) {
  throw new Error("TABLE_NAME environment variable is required");
}

// Use in handler
export const handler = async (event: any) => {
  await ddb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: data,
    }),
  );
};
```

## Error Handling

### Custom Error Classes

```typescript
export class LambdaError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = "LambdaError";
  }
}

// Error handler middleware
const errorHandler = (): middy.MiddlewareObj => ({
  onError: async (request) => {
    const error = request.error;

    if (error instanceof LambdaError) {
      request.response = {
        statusCode: error.statusCode,
        body: JSON.stringify({
          error: error.message,
          code: error.code,
        }),
      };
    }
  },
});
```

## Logging

### Structured Logging with Powertools

```typescript
import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger({ serviceName: "my-service" });

export const handler = async (event: any) => {
  logger.info("Processing request", {
    requestId: event.requestContext.requestId,
  });

  try {
    const result = await process(event);
    logger.info("Request processed successfully");
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    logger.error("Request failed", { error });
    throw error;
  }
};
```

## Best Practices

- Set appropriate **timeout** (default 3s, max 15min)
- Set appropriate **memory** (128MB to 10GB)
- Enable **X-Ray tracing** for debugging
- Use **environment variables** for configuration
- Implement **idempotency** for critical operations
- Use **provisioned concurrency** for latency-sensitive functions
- Keep **deployment package small** (< 50MB)
