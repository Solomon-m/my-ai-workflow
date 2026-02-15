---
description: "DynamoDB single-table design patterns, GSI strategies, access patterns, DocumentClient v3 usage, and data modeling best practices for NoSQL."
applyTo: "**/models/**/*.ts, **/repositories/**/*.ts, **/data/**/*.ts"
---

# DynamoDB Development Standards

## Single-Table Design

### Table Structure

```typescript
// Primary Key: PK (Partition Key), SK (Sort Key)
// GSI1: GSI1PK, GSI1SK
// GSI2: GSI2PK, GSI2SK

interface BaseItem {
  PK: string;
  SK: string;
  GSI1PK?: string;
  GSI1SK?: string;
  EntityType: string;
  CreatedAt: string;
  UpdatedAt: string;
}

interface User extends BaseItem {
  EntityType: "USER";
  PK: `USER#${string}`; // USER#123
  SK: `PROFILE`;
  Email: string;
  Name: string;
  GSI1PK: `EMAIL#${string}`; // For email lookups
  GSI1SK: "USER";
}

interface Order extends BaseItem {
  EntityType: "ORDER";
  PK: `USER#${string}`; // USER#123
  SK: `ORDER#${string}`; // ORDER#456
  OrderId: string;
  Total: number;
  Status: string;
  GSI1PK: `ORDER#${string}`; // For order lookups
  GSI1SK: string; // Status#Timestamp for sorting
}
```

## AWS SDK v3 Usage

```typescript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get Item
const result = await ddbDocClient.send(
  new GetCommand({
    TableName: "MyTable",
    Key: { PK: "USER#123", SK: "PROFILE" },
  }),
);

// Query
const orders = await ddbDocClient.send(
  new QueryCommand({
    TableName: "MyTable",
    KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
    ExpressionAttributeValues: {
      ":pk": "USER#123",
      ":sk": "ORDER#",
    },
  }),
);

// Put Item
await ddbDocClient.send(
  new PutCommand({
    TableName: "MyTable",
    Item: {
      PK: "USER#123",
      SK: "PROFILE",
      Email: "user@example.com",
      Name: "John",
      CreatedAt: new Date().toISOString(),
    },
  }),
);
```

## Access Patterns

### Pattern: Get User by ID

```
PK = USER#{userId}
SK = PROFILE
```

### Pattern: Get User by Email (GSI1)

```
GSI1PK = EMAIL#{email}
GSI1SK = USER
```

### Pattern: Get Orders for User

```
PK = USER#{userId}
SK begins_with ORDER#
```

### Pattern: Get Order by OrderId (GSI1)

```
GSI1PK = ORDER#{orderId}
```

## Best Practices

- Use **composite keys** for hierarchical data
- Use **begins_with** for range queries
- Use **GSIs** for alternative access patterns
- Use **batch operations** for multiple items
- Implement **optimistic locking** with versioning
- Use **TTL** for auto-expiration
- Keep items **< 400KB**
- Enable **point-in-time recovery**
