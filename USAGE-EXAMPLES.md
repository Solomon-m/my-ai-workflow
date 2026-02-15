# 🚀 Quick Usage Examples

Try these examples in VS Code with GitHub Copilot to see your AI workflow in action!

## 1. Simple Agent Interactions

### AWS Lambda Development

```
@aws-serverless-architect Create a Lambda function that:
- Processes SQS messages
- Validates the JSON payload
- Writes data to DynamoDB
- Includes error handling and X-Ray tracing
```

### React Component

```
@react-frontend-engineer Build a UserProfile component that:
- Shows user avatar, name, and email
- Has an edit button
- Uses TypeScript
- Includes tests
```

### Infrastructure

```
@aws-cdk-engineer Create a CDK stack for a serverless API with:
- API Gateway
- Lambda function
- DynamoDB table
- Proper IAM permissions
```

## 2. Structured Autonomy Workflow

### Step 1: Plan

```
/sa-plan Build a user authentication system with:
- React login form
- JWT-based authentication
- Password reset functionality
- User session management
- DynamoDB user storage
```

### Step 2: Generate Specs

```
/sa-generate Task 1: Create DynamoDB user table schema
```

### Step 3: Implement

```
/sa-implement
[paste the generated spec from step 2]
```

## 3. Using Collections

### Full AWS Stack

```
@workspace Use the aws-fullstack collection

Create a REST API for managing tasks with:
- CRUD operations
- DynamoDB storage
- API Gateway endpoint
- Lambda handlers
- CDK infrastructure
```

### Amazon Connect

```
@workspace Use the amazon-connect collection

Create a customer support IVR that:
- Checks business hours via Lambda
- Routes to appropriate queue
- Provides callback option
- Logs call data to DynamoDB
```

### Testing

```
@workspace Use the testing collection

Add comprehensive tests for my UserService including:
- Unit tests for all methods
- Integration tests with DynamoDB
- Mock AWS SDK calls
- Edge cases and error scenarios
```

## 4. Multi-Agent Workflows

### Complex Feature Development

```
Step 1: @fullstack-planner
"I need to build a real-time notification system with:
- React frontend displaying notifications
- WebSocket connection
- Amazon Connect integration for SMS
- DynamoDB for persistence
- CloudWatch for monitoring"

Step 2: Follow the planner's task breakdown

Step 3: @aws-cdk-engineer "Implement the infrastructure from task 1"

Step 4: @aws-serverless-architect "Implement the Lambda functions from task 2"

Step 5: @react-frontend-engineer "Build the UI components from task 3"

Step 6: @testing-engineer "Add tests for all components"

Step 7: @code-reviewer "Review the complete implementation"
```

## 5. Debugging

### Lambda Issues

```
@aws-serverless-architect /debug-lambda ProcessOrderFunction

[Paste CloudWatch logs showing the error]

The function is timing out after 3 seconds. What could be causing this?
```

### React Performance

```
@react-frontend-engineer My DataTable component is slow with 10,000 rows.
How can I optimize it?
```

## 6. Quick Generators

### Lambda Function

```
/create-lambda processPayment api
```

### React Component

```
/create-react-component PaymentForm form
```

### Amazon Connect Flow

```
/create-connect-flow customer-service inbound
```

### CDK Stack

```
/create-cdk-stack payment-service api-lambda
```

## 7. Code Review

### Review Pull Request

```
@code-reviewer Review this Lambda function for:
- Security vulnerabilities
- Performance issues
- AWS best practices
- Error handling
- Code quality

[paste the code]
```

### Review Architecture

```
@fullstack-planner Review my system architecture:
- React SPA on CloudFront/S3
- API Gateway REST API
- 5 Lambda functions
- DynamoDB single table
- Step Functions for orders

Is this well-designed? Any improvements?
```

## 8. GCP Development

### Cloud Functions

```
@gcp-cloud-engineer Create a Cloud Function that:
- Triggers on Firestore document creation
- Sends notification via Pub/Sub
- Uses TypeScript
- Includes error handling
```

### Firestore Schema

```
@gcp-cloud-engineer Design a Firestore schema for a blog with:
- Users collection
- Posts collection
- Comments subcollection
- Security rules
```

## 9. DevOps

### GitHub Actions Pipeline

```
@devops-engineer Create a GitHub Actions workflow that:
- Runs tests on pull requests
- Builds Docker image
- Deploys to AWS using CDK
- Runs only on main branch
```

### Docker Compose

```
@devops-engineer Create a docker-compose.yml for local development with:
- Node.js app
- PostgreSQL database
- Redis cache
- Hot reload enabled
```

## 10. Testing Strategies

### Unit Tests

```
@testing-engineer Write unit tests for this UserService class:
- Test all methods
- Mock DynamoDB calls
- Include edge cases
- Achieve 90%+ coverage

[paste the UserService code]
```

### Integration Tests

```
@testing-engineer Create integration tests for my API that:
- Uses LocalStack for AWS services
- Tests complete workflows
- Validates error handling
- Can run in CI/CD
```

## Tips for Success

### DO:

✅ Be specific in your requests  
✅ Provide context and requirements  
✅ Use collections for related work  
✅ Chain agents for complex tasks  
✅ Review generated code

### DON'T:

❌ Use vague requests like "make it work"  
❌ Skip the planning phase for complex features  
❌ Mix concerns across agents  
❌ Blindly trust generated code  
❌ Forget to add tests

## Getting Help

### Agent Capabilities

```
@fullstack-planner What agents should I use for building a chat application?
```

### Best Practices

```
@code-reviewer What are the AWS Lambda best practices I should follow?
```

### Architecture Advice

```
@fullstack-planner Should I use DynamoDB or RDS for this use case?
[describe your use case]
```

## Common Workflows

### New Feature Workflow

1. `@fullstack-planner` - Plan the feature
2. `@aws-cdk-engineer` - Create infrastructure
3. `@aws-serverless-architect` - Implement backend
4. `@react-frontend-engineer` - Build frontend
5. `@testing-engineer` - Add tests
6. `@code-reviewer` - Final review

### Bug Fix Workflow

1. Identify the issue
2. Use appropriate agent for the layer
3. `@testing-engineer` - Add regression test
4. `@code-reviewer` - Review the fix

### Refactoring Workflow

1. `@code-reviewer` - Identify issues
2. Use specialized agent to refactor
3. `@testing-engineer` - Ensure tests pass
4. `@code-reviewer` - Verify improvements

---

**Start with simple requests and gradually move to complex multi-agent workflows!**

Happy coding! 🎉
