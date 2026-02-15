# AI Workflow Implementation Plan

This document provides a complete overview of the AI workflow template repository structure.

## 📁 Repository Structure

```
MyAIworkflow/
├── agents/                           # Custom AI agents (10 total)
│   ├── aws-serverless-architect.agent.md
│   ├── amazon-connect-expert.agent.md
│   ├── aws-cdk-engineer.agent.md
│   ├── react-frontend-engineer.agent.md
│   ├── nodejs-backend-engineer.agent.md
│   ├── gcp-cloud-engineer.agent.md
│   ├── devops-engineer.agent.md
│   ├── fullstack-planner.agent.md
│   ├── code-reviewer.agent.md
│   └── testing-engineer.agent.md
│
├── instructions/                     # Technology-specific standards (12 total)
│   ├── nodejs-typescript.instructions.md
│   ├── reactjs.instructions.md
│   ├── aws-lambda.instructions.md
│   ├── aws-cdk.instructions.md
│   ├── amazon-connect.instructions.md
│   ├── dynamodb.instructions.md
│   ├── api-gateway.instructions.md
│   ├── gcp-cloud.instructions.md
│   ├── testing.instructions.md
│   ├── docker.instructions.md
│   ├── github-actions.instructions.md
│   └── database.instructions.md
│
├── prompts/                          # Reusable prompts (8 total)
│   ├── sa-plan.prompt.md            # Structured Autonomy Phase 1
│   ├── sa-generate.prompt.md        # Structured Autonomy Phase 2
│   ├── sa-implement.prompt.md       # Structured Autonomy Phase 3
│   ├── create-lambda.prompt.md
│   ├── create-react-component.prompt.md
│   ├── create-connect-flow.prompt.md
│   ├── create-cdk-stack.prompt.md
│   └── debug-lambda.prompt.md
│
├── skills/                           # Detailed patterns (5 total)
│   ├── aws-cdk-patterns/
│   │   └── SKILL.md
│   ├── amazon-connect-toolkit/
│   │   └── SKILL.md
│   ├── serverless-testing/
│   │   └── SKILL.md
│   ├── react-component-generator/
│   │   └── SKILL.md
│   └── docker-compose-stacks/
│       └── SKILL.md
│
├── collections/                      # Resource groupings (7 total)
│   ├── aws-fullstack.collection.yml
│   ├── amazon-connect.collection.yml
│   ├── react-frontend.collection.yml
│   ├── gcp-cloud.collection.yml
│   ├── structured-autonomy.collection.yml
│   ├── devops-cicd.collection.yml
│   └── testing.collection.yml
│
├── .github/
│   ├── hooks/                        # Automation hooks
│   │   ├── session-logger.js
│   │   └── session-auto-commit.js
│   ├── logs/                         # Session logs (gitignored)
│   └── copilot-instructions.md       # Global standards
│
├── .vscode/
│   ├── mcp.json                      # MCP server configuration
│   └── settings.json                 # VS Code settings
│
├── scripts/
│   ├── validate.js                   # Validation script
│   └── list-resources.js             # Resource listing
│
├── README.md                         # Main documentation
├── AGENTS.md                         # Agent usage guidelines
├── package.json                      # Project configuration
├── .gitignore                        # Git ignore rules
├── .env.example                      # Environment template
└── PLAN.md                          # This file
```

## 🎯 Component Breakdown

### Agents (10)

| Agent                    | Purpose                                           | Lines | Handoffs                                  |
| ------------------------ | ------------------------------------------------- | ----- | ----------------------------------------- |
| aws-serverless-architect | Lambda, API Gateway, DynamoDB, S3, Step Functions | 600+  | aws-cdk-engineer, testing-engineer        |
| amazon-connect-expert    | Contact flows, CCP, Lex, Lambda integrations      | 500+  | aws-serverless-architect                  |
| aws-cdk-engineer         | Infrastructure as code with CDK                   | 450+  | aws-serverless-architect, devops-engineer |
| react-frontend-engineer  | React 19+, hooks, components                      | 500+  | testing-engineer                          |
| nodejs-backend-engineer  | Node.js, Express, APIs                            | 450+  | testing-engineer                          |
| gcp-cloud-engineer       | Cloud Functions, Firestore, Cloud Run             | 400+  | devops-engineer                           |
| devops-engineer          | Docker, CI/CD, deployment                         | 450+  | testing-engineer                          |
| fullstack-planner        | Orchestrator for complex projects                 | 700+  | All other agents                          |
| code-reviewer            | Code quality and best practices                   | 400+  | None (terminal)                           |
| testing-engineer         | Unit, integration, E2E tests                      | 500+  | code-reviewer                             |

### Instructions (12)

| Instruction       | Applies To                   | Purpose                      |
| ----------------- | ---------------------------- | ---------------------------- |
| nodejs-typescript | `**/*.ts, **/*.js`           | TypeScript/Node.js standards |
| reactjs           | `**/*.tsx, **/*.jsx`         | React component patterns     |
| aws-lambda        | `**/lambda/**/*.ts`          | Lambda handler patterns      |
| aws-cdk           | `**/cdk/**/*.ts`             | CDK construct patterns       |
| amazon-connect    | `**/connect/**/*.ts`         | Connect Lambda handlers      |
| dynamodb          | `**/dynamodb/**/*.ts`        | DynamoDB single-table design |
| api-gateway       | `**/api/**/*.ts`             | API Gateway patterns         |
| gcp-cloud         | `**/cloud-functions/**/*.ts` | GCP Cloud Functions          |
| testing           | `**/*.test.ts, **/*.spec.ts` | Testing conventions          |
| docker            | `**/Dockerfile`              | Docker best practices        |
| github-actions    | `.github/workflows/**/*.yml` | CI/CD workflows              |
| database          | `**/migrations/**/*.sql`     | Database patterns            |

### Prompts (8)

| Prompt                 | Type                | Purpose                    |
| ---------------------- | ------------------- | -------------------------- |
| sa-plan                | Structured Autonomy | Phase 1: Planning          |
| sa-generate            | Structured Autonomy | Phase 2: Specification     |
| sa-implement           | Structured Autonomy | Phase 3: Implementation    |
| create-lambda          | Generator           | Complete Lambda function   |
| create-react-component | Generator           | React component with tests |
| create-connect-flow    | Generator           | Amazon Connect flow        |
| create-cdk-stack       | Generator           | CDK infrastructure         |
| debug-lambda           | Diagnostic          | Lambda debugging           |

### Skills (5)

| Skill                     | Contents                | Use Cases                     |
| ------------------------- | ----------------------- | ----------------------------- |
| aws-cdk-patterns          | Reusable CDK constructs | API+Lambda, VPC, Single Table |
| amazon-connect-toolkit    | Contact flow templates  | IVR, CCP, Lex integration     |
| serverless-testing        | Testing strategies      | LocalStack, mocking, E2E      |
| react-component-generator | Component templates     | Forms, tables, modals         |
| docker-compose-stacks     | Docker configs          | Full-stack dev environments   |

### Collections (7)

| Collection          | Resources    | Purpose                             |
| ------------------- | ------------ | ----------------------------------- |
| aws-fullstack       | 14 resources | Complete AWS serverless development |
| amazon-connect      | 8 resources  | Contact center development          |
| react-frontend      | 8 resources  | React application development       |
| gcp-cloud           | 5 resources  | Google Cloud Platform               |
| structured-autonomy | 6 resources  | SA workflow prompts                 |
| devops-cicd         | 7 resources  | DevOps and deployment               |
| testing             | 6 resources  | Testing and quality                 |

## 🔄 Workflow Examples

### Example 1: Build a Serverless API

```
Step 1: Plan
@fullstack-planner "Build a REST API for user management with CRUD operations"

Step 2: Infrastructure
@aws-cdk-engineer "Create the CDK stack based on the plan"

Step 3: Implement
@aws-serverless-architect "Implement the Lambda handlers"

Step 4: Test
@testing-engineer "Add unit and integration tests"

Step 5: Review
@code-reviewer "Review the implementation"
```

### Example 2: Structured Autonomy

```
/sa-plan "Build a user authentication system"
→ Creates detailed task breakdown

/sa-generate "Task 1: Database schema"
→ Generates DynamoDB table design

/sa-implement
→ Creates actual CDK stack and Lambda functions
```

### Example 3: Amazon Connect Flow

```
@amazon-connect-expert "Create an IVR that checks business hours"
→ Generates contact flow JSON and Lambda handler
```

## 📊 Statistics

- **Total Files**: 53+
- **Total Lines of Code**: ~10,000+
- **Agents**: 10
- **Instructions**: 12
- **Prompts**: 8
- **Skills**: 5
- **Collections**: 7
- **Hooks**: 2
- **MCP Servers**: 4

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Copy environment**: `cp .env.example .env`
4. **Validate structure**: `npm run validate`
5. **List resources**: `npm run list:all`

## 📝 Maintenance

### Adding New Agents

1. Create `agents/your-agent.agent.md`
2. Add frontmatter with `description`
3. Include handoff strategy
4. Add code examples
5. Run `npm run validate:agents`

### Adding New Skills

1. Create `skills/your-skill/SKILL.md`
2. Add frontmatter with `name`, `description`, `version`
3. Include usage examples
4. Run `npm run validate:skills`

## 🎓 Learning Path

1. **Start with README.md** - Overview and quick start
2. **Read AGENTS.md** - Understand agent capabilities
3. **Try /sa-plan prompt** - Experience structured workflow
4. **Explore collections** - See resource groupings
5. **Review skills** - Learn patterns and templates

## 🤝 Contributing

See [README.md](README.md) for contribution guidelines.

## 📄 License

MIT

---

**Document Version**: 1.0.0  
**Last Updated**: 2024  
**Maintained By**: Your Team
