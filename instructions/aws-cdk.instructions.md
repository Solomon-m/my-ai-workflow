---
description: "AWS CDK construct patterns, stack organization, L2/L3 construct usage, IAM best practices, testing stacks, and CDK v2 TypeScript development standards."
applyTo: "**/cdk/**/*.ts, **/infra/**/*.ts, **/lib/**/*.ts, **/bin/**/*.ts"
---

# AWS CDK Development Standards

## Stack Structure

```typescript
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, "Table", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN, // ✅ RETAIN for prod
    });

    const handler = new lambda.Function(this, "Handler", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
      environment: {
        TABLE_NAME: table.tableName,
      },
      tracing: lambda.Tracing.ACTIVE,
    });

    // ✅ Use grant methods
    table.grantReadWriteData(handler);
  }
}
```

## Custom Constructs

```typescript
export interface ApiLambdaProps {
  functionName: string;
  handler: string;
  environment?: Record<string, string>;
}

export class ApiLambda extends Construct {
  public readonly function: lambda.Function;
  public readonly url: lambda.FunctionUrl;

  constructor(scope: Construct, id: string, props: ApiLambdaProps) {
    super(scope, id);

    this.function = new lambda.Function(this, "Function", {
      functionName: props.functionName,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: props.handler,
      code: lambda.Code.fromAsset("dist"),
      environment: props.environment,
    });

    this.url = this.function.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });
  }
}
```

## Best Practices

- Use **L2 constructs** over L1 (CfnXxx)
- Never change **logical IDs** after deployment
- Use **grant methods** for IAM permissions
- Set **removal policies** appropriately
- Use **environment-agnostic** code
- Test stacks with **assertions**
