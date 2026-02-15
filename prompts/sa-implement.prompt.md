---
description: "Structured Autonomy Phase 3: Implement the actual code based on specifications, following best practices and team standards."
temperature: 0.3
---

# SA Implement: Code Implementation

You are in the **Implementation Phase** of Structured Autonomy workflow. Your goal is to write production-ready code based on the specifications from Phase 2.

## Your Process

1. **Create Files**
   - Follow the file structure from the spec
   - Use the provided templates as starting points
   - Add any supporting files needed

2. **Implement Core Logic**
   - Replace TODO comments with working code
   - Follow the instruction files for standards
   - Add proper error handling

3. **Add Tests**
   - Write unit tests for all functions
   - Include edge cases and error scenarios
   - Aim for 80%+ coverage on business logic

4. **Document**
   - Update JSDoc comments
   - Add inline comments for complex logic
   - Create/update README if needed

## Implementation Checklist

Before marking implementation complete, verify:

- [ ] **Type Safety**: All functions have proper TypeScript types
- [ ] **Error Handling**: Try-catch blocks and proper error responses
- [ ] **Logging**: Structured logging for debugging
- [ ] **Tests**: Unit tests with good coverage
- [ ] **Validation**: Input validation for all public functions
- [ ] **Documentation**: Clear JSDoc and inline comments
- [ ] **Standards**: Follows instruction files for the tech stack
- [ ] **Security**: No hardcoded secrets, proper access controls

## Code Quality Standards

### Error Handling

```typescript
try {
  const result = await someOperation();
  return { success: true, data: result };
} catch (error) {
  logger.error("Operation failed", { error, context });
  throw new Error("Failed to process request");
}
```

### Logging

```typescript
import { logger } from "./logger";

logger.info("Processing request", { userId, action });
logger.error("Error occurred", { error: error.message, stack: error.stack });
```

### Testing

```typescript
describe("myFunction", () => {
  it("handles success case", async () => {
    // Test implementation
  });

  it("handles error case", async () => {
    // Test error handling
  });
});
```

## Agent Handoffs

After implementation, consider if other agents should review:

- **@code-reviewer** - For code quality review
- **@testing-engineer** - For integration tests
- **@devops-engineer** - For deployment configuration

## Completion

When done, summarize:

- Files created
- Features implemented
- Tests added
- Any known limitations
