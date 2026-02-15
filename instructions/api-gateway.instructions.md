---
description: "API Gateway REST and HTTP API design patterns, request validation, CORS configuration, authorizers, throttling, and Lambda integration best practices."
applyTo: "**/api/**/*.ts, **/*.openapi.yml, **/*.api.json"
---

# API Gateway Development Standards

## REST API with Lambda Integration

```typescript
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

const api = new apigateway.RestApi(this, "Api", {
  restApiName: "my-api",
  description: "My REST API",
  deployOptions: {
    stageName: "prod",
    tracingEnabled: true,
    loggingLevel: apigateway.MethodLoggingLevel.INFO,
    dataTraceEnabled: false, // ❌ Disable in prod (logs request/response bodies)
    metricsEnabled: true,
  },
  defaultCorsPreflightOptions: {
    allowOrigins: apigateway.Cors.ALL_ORIGINS,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  },
});

const items = api.root.addResource("items");
items.addMethod("GET", new apigateway.LambdaIntegration(listHandler));
items.addMethod("POST", new apigateway.LambdaIntegration(createHandler), {
  requestValidator: new apigateway.RequestValidator(this, "Validator", {
    restApi: api,
    validateRequestBody: true,
  }),
  requestModels: {
    "application/json": createItemModel,
  },
});

const item = items.addResource("{id}");
item.addMethod("GET", new apigateway.LambdaIntegration(getHandler));
item.addMethod("PUT", new apigateway.LambdaIntegration(updateHandler));
item.addMethod("DELETE", new apigateway.LambdaIntegration(deleteHandler));
```

## Request Validation

```typescript
const createItemModel = new apigateway.Model(this, "CreateItemModel", {
  restApi: api,
  contentType: "application/json",
  schema: {
    type: apigateway.JsonSchemaType.OBJECT,
    required: ["name", "price"],
    properties: {
      name: { type: apigateway.JsonSchemaType.STRING, minLength: 1 },
      price: { type: apigateway.JsonSchemaType.NUMBER, minimum: 0 },
      description: { type: apigateway.JsonSchemaType.STRING },
    },
  },
});
```

## Lambda Authorizer

```typescript
export const handler = async (event: APIGatewayTokenAuth AuthorizerEvent) => {
  const token = event.authorizationToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return {
      principalId: decoded.userId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn,
          },
        ],
      },
      context: {
        userId: decoded.userId,
        email: decoded.email,
      },
    };
  } catch (error) {
    throw new Error('Unauthorized');
  }
};
```

## Best Practices

- Use **HTTP APIs** for simple, low-latency APIs
- Use **REST APIs** for advanced features (caching, usage plans)
- Implement **request validation** with JSON Schema
- Enable **CORS** for browser clients
- Use **Lambda authorizers** for custom auth
- Enable **API Gateway caching** for GET requests
- Set **throttling** limits per stage
- Use **usage plans** and **API keys** for rate limiting
