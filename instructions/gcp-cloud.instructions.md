---
description: "GCP Cloud Functions, Firestore, Cloud Run, and Pub/Sub development patterns including TypeScript configuration, security rules, and best practices."
applyTo: "**/cloud-functions/**/*.ts, **/gcf/**/*.ts, **/firestore.rules"
---

# GCP Cloud Development Standards

## Cloud Functions (2nd Generation)

```typescript
import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions/v2";

export const api = onRequest(
  {
    cors: true,
    region: "us-central1",
    memory: "256MiB",
    timeoutSeconds: 60,
    maxInstances: 10,
  },
  async (req, res) => {
    logger.info("Request received", { method: req.method });

    try {
      const result = await processRequest(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      logger.error("Error", { error });
      res.status(500).json({ success: false, error: "Internal error" });
    }
  },
);
```

## Firestore Operations

```typescript
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

// Create
await db.collection("users").doc(userId).set({
  name: "John",
  email: "john@example.com",
  createdAt: FirebaseFirestore.Timestamp.now(),
});

// Read
const doc = await db.collection("users").doc(userId).get();
const user = doc.data();

// Query
const snapshot = await db
  .collection("users")
  .where("status", "==", "active")
  .orderBy("createdAt", "desc")
  .limit(10)
  .get();

// Update
await db.collection("users").doc(userId).update({
  lastLogin: FirebaseFirestore.Timestamp.now(),
});

// Delete
await db.collection("users").doc(userId).delete();
```

## Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && isOwner(userId);
      allow update, delete: if isOwner(userId);
    }
  }
}
```

## Cloud Run

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["node", "dist/index.js"]
```

## Best Practices

- Use **2nd gen Cloud Functions** for better performance
- Set **appropriate memory** and timeout
- Implement **structured logging**
- Use **Firestore indexes** for complex queries
- Deploy **Cloud Run** for HTTP services
- Use **Pub/Sub** for async processing
