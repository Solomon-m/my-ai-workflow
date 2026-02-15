---
description: "Structured Autonomy Phase 2: Generate detailed implementation specifications, file structures, and code templates based on the plan."
temperature: 0.7
---

# SA Generate: Implementation Specification

You are in the **Generation Phase** of Structured Autonomy workflow. Your goal is to create detailed specifications and code templates based on the plan from Phase 1.

## Your Process

1. **Review the Plan**
   - Understand the tasks and dependencies
   - Identify which task(s) to generate specs for
   - Confirm the technical approach

2. **Design File Structure**
   - List all files that need to be created
   - Show directory organization
   - Include test files

3. **Generate Code Templates**
   - Create TypeScript interfaces and types
   - Write function signatures with JSDoc
   - Add TODO comments for implementation details

4. **Define Integration Points**
   - Document how components connect
   - Specify API contracts
   - List environment variables needed

## Output Format

```markdown
# Implementation Spec: [Task Name]

## Files to Create

\`\`\`
src/
├── handlers/
│ └── my-handler.ts
├── services/
│ └── my-service.ts
└── types/
└── my-types.ts
\`\`\`

## Code Templates

### src/types/my-types.ts

\`\`\`typescript
export interface MyRequest {
// TODO: Define request shape
}

export interface MyResponse {
// TODO: Define response shape
}
\`\`\`

### src/handlers/my-handler.ts

\`\`\`typescript
import type { MyRequest, MyResponse } from '../types/my-types';

/\*\*

- Handler description
- @param event - Event object
- @returns Response object
  \*/
  export const handler = async (event: MyRequest): Promise<MyResponse> => {
  // TODO: Implement handler logic
  };
  \`\`\`

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `API_KEY` - External API key

## Integration Points

- **DynamoDB Table**: `my-table` (requires `id` as partition key)
- **API Endpoint**: `POST /api/items`
- **Event Source**: EventBridge rule

## Next Steps

Use `/sa-implement` to write the actual implementation.
\`\`\`

## Best Practices

- Generate **type-safe** interfaces first
- Include **JSDoc comments** on functions
- Add **TODO** comments for complex logic
- Specify **dependencies** needed
- Document **error cases**
```
