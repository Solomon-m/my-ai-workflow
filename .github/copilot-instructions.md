# Global Copilot Instructions

These instructions apply to all files in the workspace and are followed by all agents.

## Team Coding Standards

### TypeScript

- **Always use TypeScript** for type safety
- **Prefer interfaces** over types for object shapes
- **Use strict mode** - no `any` without justification
- **Document complex types** with JSDoc comments

### Code Organization

- **One component per file** for React
- **Co-locate tests** with source files (`.test.ts` next to `.ts`)
- **Use barrel exports** (`index.ts`) for clean imports
- **Group by feature** not by file type

### Naming Conventions

- **PascalCase** for components, classes, types, interfaces
- **camelCase** for functions, variables, properties
- **kebab-case** for file names
- **UPPER_SNAKE_CASE** for constants

### Error Handling

- **Always catch errors** in async functions
- **Use structured logging** with context
- **Return meaningful error messages** to clients
- **Log errors with stack traces**

### Testing

- **Write tests for all business logic**
- **Use AAA pattern** (Arrange, Act, Assert)
- **Mock external dependencies**
- **Test edge cases and errors**
- **Target 80%+ coverage**

### Security

- ❌ **Never commit secrets** to git
- ✅ **Use environment variables** for config
- ✅ **Validate all inputs**
- ✅ **Sanitize outputs**
- ✅ **Follow principle of least privilege** for IAM

### Performance

- **Avoid N+1 queries** in databases
- **Use connection pooling** for databases
- **Implement caching** where appropriate
- **Optimize Lambda cold starts** (minimize dependencies)
- **Use pagination** for large datasets

### AWS Best Practices

- **Enable X-Ray tracing** for Lambda
- **Set appropriate timeouts** (don't use defaults)
- **Use VPC only when needed** (adds cold start time)
- **Implement dead letter queues** for async processing
- **Tag all resources** for cost tracking

### React Best Practices

- **Use functional components** with hooks
- **Implement proper key props** in lists
- **Memoize expensive computations** with `useMemo`
- **Memoize callbacks** with `useCallback`
- **Extract custom hooks** for reusable logic

### Documentation

- **Write JSDoc** for public APIs
- **Include usage examples** in comments
- **Update README** when adding features
- **Document decisions** in code comments
- **Keep docs up to date**

## Code Review Requirements

Before submitting PRs:

1. ✅ All tests pass
2. ✅ No linting errors
3. ✅ TypeScript types are complete
4. ✅ JSDoc comments on public functions
5. ✅ No hardcoded secrets
6. ✅ Error handling is comprehensive
7. ✅ Logging is in place
8. ✅ Tests have good coverage

## Git Commit Messages

Follow conventional commits:

```
feat: Add user registration endpoint
fix: Handle null values in DynamoDB query
docs: Update API documentation
test: Add tests for user service
chore: Update dependencies
refactor: Simplify Lambda handler logic
```

## Questions?

- See [AGENTS.md](../AGENTS.md) for agent-specific guidelines
- See [README.md](../README.md) for setup instructions
- Ask @code-reviewer for code quality questions
- Ask @fullstack-planner for architecture questions
