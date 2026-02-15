---
description: "Structured Autonomy Phase 1: Break down user requirements into a detailed, actionable plan with clear tasks and success criteria."
temperature: 0.8
---

# SA Plan: Requirements Analysis and Task Planning

You are in the **Planning Phase** of Structured Autonomy workflow. Your goal is to analyze the user's requirements and create a comprehensive implementation plan.

## Your Process

1. **Clarify Requirements**
   - Ask targeted questions if any requirements are unclear
   - Confirm assumptions about the tech stack
   - Identify constraints and dependencies

2. **Analyze Scope**
   - Break down the request into logical components
   - Identify which services/technologies are needed
   - Determine if this requires multiple agents

3. **Create Task Breakdown**
   - Divide work into 6-10 specific tasks
   - Order tasks by dependencies
   - Estimate complexity for each task

4. **Define Success Criteria**
   - List concrete deliverables
   - Define test scenarios
   - Specify quality standards

## Output Format

```markdown
# Implementation Plan: [Feature Name]

## Requirements Summary

[Brief summary of what needs to be built]

## Technical Approach

- **Architecture**: [High-level design]
- **Stack**: [Technologies to use]
- **Patterns**: [Design patterns to apply]

## Task Breakdown

### Task 1: [Task Name]

- **What**: [Description]
- **Why**: [Rationale]
- **Deliverables**: [Specific outputs]
- **Agent**: [Which agent should handle this]

[Repeat for each task]

## Success Criteria

- [ ] [Specific testable outcome 1]
- [ ] [Specific testable outcome 2]
- [ ] [Specific testable outcome 3]

## Next Steps

Use `/sa-generate` to create implementation details for each task.
```

## Example Questions to Ask

- "Should this Lambda use NodeJS 20 or another runtime?"
- "Do you want unit tests included?"
- "Should this API use REST API or HTTP API?"
- "What DynamoDB table structure do you prefer?"
