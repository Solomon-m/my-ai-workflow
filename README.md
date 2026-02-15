# AI Workflow Template

A comprehensive GitHub Copilot workspace template with custom agents, skills, instructions, and prompts for fullstack AWS/GCP development.

## 🚀 Features

- **10 Custom Agents** - Specialized AI agents for AWS, React, Node.js, Amazon Connect, GCP, DevOps, and more
- **12 Instructions** - Technology-specific coding standards and best practices
- **8 Prompts** - Structured Autonomy workflow and component generators
- **5 Skills** - Reusable patterns for CDK, Connect, testing, React, and Docker
- **7 Collections** - Curated resource sets for different workflows
- **Hooks** - Session logging and auto-commit automation
- **MCP Servers** - Context7, GitHub, and filesystem integrations

## 📋 Quick Start

### 1. Clone This Template

```bash
git clone <your-repo-url>
cd MyAIworkflow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 4. Enable GitHub Copilot

Ensure GitHub Copilot is enabled in VS Code:

- Install the GitHub Copilot extension
- Sign in with your GitHub account
- Restart VS Code

### 5. Verify Setup

```bash
npm run validate
```

## 🤖 Using Custom Agents

### Available Agents

| Agent                       | Purpose                           | Usage                          |
| --------------------------- | --------------------------------- | ------------------------------ |
| `@aws-serverless-architect` | AWS Lambda, API Gateway, DynamoDB | Serverless backend development |
| `@amazon-connect-expert`    | Amazon Connect contact flows      | Contact center solutions       |
| `@aws-cdk-engineer`         | Infrastructure as code            | CDK stack development          |
| `@react-frontend-engineer`  | React 19+ frontend                | UI component development       |
| `@nodejs-backend-engineer`  | Node.js/TypeScript backend        | API and service development    |
| `@gcp-cloud-engineer`       | Google Cloud Platform             | GCP services development       |
| `@devops-engineer`          | CI/CD, Docker, deployment         | DevOps workflows               |
| `@fullstack-planner`        | Project orchestration             | Multi-agent workflows          |
| `@code-reviewer`            | Code quality review               | Pull request reviews           |
| `@testing-engineer`         | Testing strategies                | Unit/integration tests         |

### Example: Create a Lambda Function

```
@aws-serverless-architect Create a Lambda function that processes SQS messages
and saves data to DynamoDB
```

### Example: Plan a Full-Stack Feature

```
@fullstack-planner I need to build a user authentication system with React
frontend, Node.js API, and AWS Cognito
```

## 📚 Using Prompts

### Structured Autonomy Workflow

Break down complex projects into phases:

```
/sa-plan Build a serverless API with CRUD operations for users
```

Then generate specs:

```
/sa-generate [task from plan]
```

Finally implement:

```
/sa-implement [spec from generate]
```

### One-Shot Generators

```
/create-lambda getUserById api
/create-react-component UserCard card
/create-connect-flow customer-support inbound
/create-cdk-stack user-service api-lambda
/debug-lambda MyFunction
```

## 🎯 Using Collections

Collections group related resources for specific workflows:

- **aws-fullstack** - Complete AWS serverless stack
- **amazon-connect** - Contact center development
- **react-frontend** - React application development
- **gcp-cloud** - Google Cloud Platform
- **structured-autonomy** - SA workflow prompts
- **devops-cicd** - DevOps and deployment
- **testing** - Testing and quality assurance

Load a collection in Copilot Chat:

```
@workspace Use the aws-fullstack collection to build an API
```

## 📖 Instructions

Instructions automatically apply to matching files:

- **nodejs-typescript.instructions.md** → `**/*.ts, **/*.js`
- **reactjs.instructions.md** → `**/*.tsx, **/*.jsx`
- **aws-lambda.instructions.md** → `**/lambda/**/*.ts`
- **aws-cdk.instructions.md** → `**/cdk/**/*.ts, **/lib/**/*.ts`
- **amazon-connect.instructions.md** → `**/connect/**/*.ts`
- **dynamodb.instructions.md** → `**/dynamodb/**/*.ts`
- **api-gateway.instructions.md** → `**/api/**/*.ts`
- **gcp-cloud.instructions.md** → `**/cloud-functions/**/*.ts`
- **testing.instructions.md** → `**/*.test.ts, **/*.spec.ts`
- **docker.instructions.md** → `**/Dockerfile`
- **github-actions.instructions.md** → `.github/workflows/**/*.yml`
- **database.instructions.md** → `**/migrations/**/*.sql`

## 🛠️ Skills

Skills provide detailed patterns and templates:

- **aws-cdk-patterns** - Reusable CDK constructs
- **amazon-connect-toolkit** - Contact flow templates
- **serverless-testing** - Testing strategies
- **react-component-generator** - Component templates
- **docker-compose-stacks** - Docker configurations

## 🔧 Configuration

### MCP Servers

Configured in [.vscode/mcp.json](.vscode/mcp.json):

- **context7** - Enhanced context awareness
- **awesome-copilot** - Copilot resource discovery
- **github** - GitHub integration (requires PAT)
- **filesystem** - Local file operations

### Hooks

Located in [.github/hooks/](.github/hooks/):

- **session-logger.js** - Logs Copilot sessions to `.github/logs/`
- **session-auto-commit.js** - Auto-commits changes to feature branches

## 📝 Team Guidelines

See [AGENTS.md](AGENTS.md) for detailed coding agent guidelines and [.github/copilot-instructions.md](.github/copilot-instructions.md) for global team standards.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run validation: `npm run validate`
4. Submit a pull request

## 📄 License

MIT

## 🙋 Support

For questions or issues, please open a GitHub issue or contact the team.

---

**Built with ❤️ for efficient AI-assisted development**
