---
description: "Generate a production-ready AWS Lambda function with handler, types, tests, and CDK infrastructure."
temperature: 0.5
---

# Create Lambda Function

Generate a complete Lambda function with infrastructure and tests.

## What You'll Create

1. **Lambda Handler** - TypeScript handler with Middy middleware
2. **Types** - Event and response interfaces
3. **Unit Tests** - Jest/Vitest tests with mocks
4. **CDK Stack** - Infrastructure as code
5. **README** - Deployment and usage docs

## Usage

```
@workspace /create-lambda <function-name> <trigger-type>
```

**Trigger Types:**

- `api` - API Gateway REST API
- `http` - API Gateway HTTP API
- `sqs` - SQS queue
- `eventbridge` - EventBridge rule
- `dynamodb-stream` - DynamoDB stream
- `s3` - S3 bucket notification

## Example

```
@workspace /create-lambda getUserById api
```

## File Structure

```
lambdas/get-user-by-id/
├── src/
│   ├── handler.ts          # Main handler
│   ├── types.ts            # TypeScript types
│   └── handler.test.ts     # Unit tests
├── cdk/
│   └── stack.ts            # CDK infrastructure
├── package.json
└── README.md
```

## Handler Template

```typescript
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { logger } from "./logger";

const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters || {};
  logger.info("Processing request", { id });

  try {
    // Your logic here
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    logger.error("Error", { error });
    throw error;
  }
};

export const main = middy(handler)
  .use(httpJsonBodyParser())
  .use(httpErrorHandler());
```

## Best Practices Applied

- ✅ Middy middleware for clean handlers
- ✅ Structured logging with context
- ✅ TypeScript types for events
- ✅ Error handling with proper HTTP codes
- ✅ Environment variable validation
- ✅ Unit tests with high coverage
