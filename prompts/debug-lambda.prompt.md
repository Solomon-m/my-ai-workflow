---
description: "Analyze and debug AWS Lambda execution errors including CloudWatch logs analysis, timeout issues, and permission problems."
temperature: 0.4
---

# Debug Lambda Function

Analyze Lambda errors and provide solutions with specific fixes.

## What This Prompt Does

1. **Analyze Error** - Parse CloudWatch logs and error messages
2. **Identify Root Cause** - Determine the underlying issue
3. **Provide Solution** - Give specific code fixes
4. **Prevent Recurrence** - Suggest monitoring and tests

## Usage

```
@workspace /debug-lambda <function-name>
```

Then paste the error logs or describe the issue.

## Common Issues Analyzed

### 1. Timeout Errors

```
Task timed out after 3.00 seconds
```

**Diagnosis:**

- Check for unresolved promises
- Look for API calls without timeouts
- Review database query performance

**Solution:**

```typescript
// Add timeout wrapper
const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms),
    ),
  ]);
};

// Use it
const result = await withTimeout(apiCall(), 2000);
```

### 2. Permission Errors

```
AccessDeniedException: User is not authorized to perform: dynamodb:PutItem
```

**Diagnosis:**

- Missing IAM permissions
- Check CDK grant methods
- Review Lambda execution role

**Solution:**

```typescript
// In CDK stack
table.grantReadWriteData(lambdaFunction);

// Or explicit policy
lambdaFunction.addToRolePolicy(
  new iam.PolicyStatement({
    actions: ["dynamodb:PutItem", "dynamodb:GetItem"],
    resources: [table.tableArn],
  }),
);
```

### 3. Memory Issues

```
JavaScript heap out of memory
```

**Diagnosis:**

- Processing large payloads
- Memory leaks
- Insufficient memory allocation

**Solution:**

```typescript
// In CDK - increase memory
new lambda.Function(this, "MyFunction", {
  memorySize: 1024, // Increase from default 128MB
  timeout: cdk.Duration.seconds(30),
});

// In code - stream large files
const s3Stream = s3.getObject({ Bucket, Key }).createReadStream();
await pipeline(s3Stream, processStream, uploadStream);
```

### 4. Cold Start Issues

```
Init duration: 5000ms
```

**Diagnosis:**

- Large dependencies
- Slow initialization
- Not using Lambda layers

**Solution:**

```typescript
// Move imports inside handler for conditional loading
export const handler = async (event) => {
  if (event.heavy) {
    const heavy = await import("heavy-library");
    return heavy.process();
  }
  // Fast path
};

// Or use Lambda layers for shared dependencies
```

## Analysis Checklist

When debugging, I'll check:

- [ ] **CloudWatch Logs** - Error messages and stack traces
- [ ] **Lambda Metrics** - Duration, errors, throttles
- [ ] **IAM Permissions** - Execution role policies
- [ ] **Environment Variables** - Correct configuration
- [ ] **VPC Configuration** - Network connectivity
- [ ] **Dependencies** - Package versions and conflicts
- [ ] **Timeout Settings** - Appropriate for workload
- [ ] **Memory Allocation** - Sufficient for operations

## Output Format

I'll provide:

1. **Root Cause** - What's causing the error
2. **Immediate Fix** - Code changes to apply now
3. **Long-term Solution** - Architectural improvements
4. **Prevention** - Tests and monitoring to add
