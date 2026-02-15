---
description: "Jest and Vitest testing conventions including unit test structure, mocking patterns, test organization, coverage targets, and best practices."
applyTo: "**/*.test.ts, **/*.spec.ts, **/*.test.tsx, **/*.spec.tsx, **/jest.config.js, **/vitest.config.ts"
---

# Testing Standards

## Test File Organization

### Co-locate Tests

```
src/
├── utils/
│   ├── format.ts
│   └── format.test.ts  # ✅ Next to source
└── services/
    ├── user.service.ts
    └── user.service.test.ts
```

## Test Structure (AAA Pattern)

```typescript
describe("UserService", () => {
  describe("getUserById", () => {
    it("returns user when found", async () => {
      // Arrange
      const userId = "123";
      const mockUser = { id: userId, name: "John" };
      vi.mocked(db.findById).mockResolvedValue(mockUser);

      // Act
      const result = await userService.getUserById(userId);

      // Assert
      expect(result).toEqual(mockUser);
      expect(db.findById).toHaveBeenCalledWith(userId);
    });

    it("returns null when not found", async () => {
      vi.mocked(db.findById).mockResolvedValue(null);

      const result = await userService.getUserById("999");

      expect(result).toBeNull();
    });
  });
});
```

## Mocking with Vitest

```typescript
// Mock entire module
vi.mock("./database", () => ({
  db: {
    findById: vi.fn(),
    create: vi.fn(),
  },
}));

// Mock implementation
vi.mocked(db.findById).mockImplementation(async (id) => {
  return id === "123" ? mockUser : null;
});

// Mock resolved value
vi.mocked(db.create).mockResolvedValue(newUser);

// Mock rejected value
vi.mocked(api.call).mockRejectedValue(new Error("API error"));
```

## React Component Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('LoginForm', () => {
  it('submits form with credentials', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    await fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    await fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

## Best Practices

### Test Naming

```typescript
// ✅ Good: Descriptive names
it('returns 404 when user not found', ...)
it('throws ValidationError for invalid email', ...)

// ❌ Bad: Vague names
it('works', ...)
it('test 1', ...)
```

### Coverage Targets

- **Critical paths**: 100%
- **Business logic**: 90%+
- **Overall**: 80%+

### What to Test

- ✅ Business logic
- ✅ Edge cases
- ✅ Error handling
- ✅ Integration points
- ❌ Third-party libraries
- ❌ Simple getters/setters
