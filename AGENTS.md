# Coding Agent Guidelines

This document provides best practices for working with GitHub Copilot agents in this workspace.

## 🎯 Agent Selection Guide

### When to Use Each Agent

#### @fullstack-planner

**Use for:**

- Complex features requiring multiple technologies
- Breaking down large projects into tasks
- Coordinating work across frontend and backend
- Determining which specialized agents to involve

**Example:**

```
@fullstack-planner I need to build a user registration flow with email
verification, including React frontend, Node.js API, and DynamoDB storage
```

#### @aws-serverless-architect

**Use for:**

- Lambda function development
- API Gateway configuration
- DynamoDB data modeling
- S3, CloudFront, Step Functions
- Serverless architecture decisions

**Example:**

```
@aws-serverless-architect Design a Step Functions workflow for processing
uploaded images with multiple Lambda steps
```

#### @amazon-connect-expert

**Use for:**

- Contact flow creation
- Lambda integrations with Connect
- CCP customization
- Lex bot configuration
- Call routing logic

**Example:**

```
@amazon-connect-expert Create an IVR flow that checks business hours via
Lambda and routes to queue or voicemail
```

#### @aws-cdk-engineer

**Use for:**

- CDK stack creation
- Infrastructure as code
- Resource configuration
- IAM policies
- Multi-environment setups

**Example:**

```
@aws-cdk-engineer Create a CDK stack for a Lambda + API Gateway + DynamoDB
with proper IAM permissions
```

#### @react-frontend-engineer

**Use for:**

- React component development
- State management
- Routing and navigation
- Form handling
- UI/UX patterns

**Example:**

```
@react-frontend-engineer Build a data table component with sorting,
filtering, and pagination
```

#### @nodejs-backend-engineer

**Use for:**

- Node.js API development
- Express/Fastify servers
- Middleware
- Authentication/authorization
- Business logic

**Example:**

```
@nodejs-backend-engineer Create a REST API with JWT authentication and
role-based access control
```

#### @gcp-cloud-engineer

**Use for:**

- Cloud Functions development
- Firestore operations
- Cloud Run deployment
- Pub/Sub messaging
- GCP-specific patterns

**Example:**

```
@gcp-cloud-engineer Build a Cloud Function triggered by Firestore changes
that sends notifications via Pub/Sub
```

#### @devops-engineer

**Use for:**

- Docker configuration
- CI/CD pipelines
- GitHub Actions
- Deployment automation
- Monitoring setup

**Example:**

```
@devops-engineer Create a GitHub Actions workflow for testing, building,
and deploying to AWS
```

#### @code-reviewer

**Use for:**

- Code quality review
- Best practices validation
- Security review
- Performance optimization
- Refactoring suggestions

**Example:**

```
@code-reviewer Review this Lambda function for performance issues and
suggest optimizations
```

#### @testing-engineer

**Use for:**

- Unit test creation
- Integration tests
- E2E test strategies
- Test coverage improvement
- Mocking patterns

**Example:**

```
@testing-engineer Write comprehensive unit tests for this service including
edge cases and error scenarios
```

## 🔄 Multi-Agent Workflows

### Pattern 1: Full-Stack Feature

```
1. @fullstack-planner "Break down this feature: [description]"
   → Provides task breakdown

2. @aws-cdk-engineer "Create infrastructure for [feature]"
   → Builds CDK stack

3. @aws-serverless-architect "Implement Lambda handlers"
   → Writes backend logic

4. @react-frontend-engineer "Build UI components"
   → Creates frontend

5. @testing-engineer "Add tests for all components"
   → Writes test suite

6. @code-reviewer "Review the implementation"
   → Final quality check
```

### Pattern 2: Structured Autonomy

```
1. Use /sa-plan prompt
   → Creates detailed plan

2. Use /sa-generate prompt
   → Generates specifications

3. Use /sa-implement prompt
   → Implements code

4. @testing-engineer "Add tests"
   → Adds testing

5. @code-reviewer "Final review"
   → Reviews quality
```

## 💡 Best Practices

### Do's

✅ **Be Specific**

```
Good: "@aws-serverless-architect Create a Lambda that processes SQS messages,
validates JSON schema, writes to DynamoDB with error handling and logging"

Bad: "@aws-serverless-architect Make a Lambda"
```

✅ **Provide Context**

```
"@react-frontend-engineer Build a user profile form. The form should have
name, email, bio fields. On submit, call POST /api/users. Show validation
errors inline."
```

✅ **Chain Agents Logically**

```
Infrastructure → Backend → Frontend → Tests → Review
```

✅ **Use Collections**

```
"@workspace Use aws-fullstack collection to build this API"
```

### Don'ts

❌ **Don't Be Vague**

```
Bad: "Make it work"
Bad: "Fix this"
Bad: "Add a feature"
```

❌ **Don't Mix Concerns**

```
Bad: "@react-frontend-engineer Also create the CDK stack"
Better: Use @fullstack-planner to coordinate
```

❌ **Don't Skip Planning**

```
For complex features, always start with @fullstack-planner or /sa-plan
```

## 🎨 Prompt Templates

### New Lambda Function

```
@aws-serverless-architect Create a Lambda function that:
- Triggers from: [SQS/API Gateway/EventBridge]
- Processes: [data description]
- Integrates with: [DynamoDB/S3/etc]
- Returns: [response format]
- Includes: Error handling, logging, tests
```

### New React Component

```
@react-frontend-engineer Create a [component type] component that:
- Accepts props: [list]
- Displays: [UI description]
- Handles: [interactions]
- Includes: TypeScript types, CSS module, tests
```

### Infrastructure Stack

```
@aws-cdk-engineer Create a CDK stack for:
- Resources: [Lambda, API Gateway, DynamoDB, etc]
- Environment: [dev/staging/prod]
- Includes: IAM policies, outputs, tags
```

### Debugging

```
@aws-serverless-architect /debug-lambda MyFunction
[Paste CloudWatch logs]

Describe the issue: [description]
```

## 🔍 Verification

After agent work, verify:

1. **Code Quality**
   - TypeScript types are complete
   - Error handling is comprehensive
   - Logging is in place

2. **Tests**
   - Unit tests exist
   - Coverage is adequate (80%+)
   - Edge cases are tested

3. **Documentation**
   - JSDoc comments are present
   - README is updated if needed
   - Complex logic is explained

4. **Standards**
   - Follows instruction files
   - Matches team conventions
   - No hardcoded secrets

## 📊 Measuring Agent Effectiveness

Track in `.github/logs/`:

- Which agents are used most
- Average session duration
- Files modified per session
- Outcome success rate

Review logs weekly to optimize workflows.

---

**Remember**: Agents are tools to augment your development, not replace your judgment. Always review and understand the generated code.
