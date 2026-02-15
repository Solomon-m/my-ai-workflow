---
name: "aws-cdk-patterns"
description: "Reusable AWS CDK construct patterns including API + Lambda, VPC configurations, CI/CD pipelines, and observability stacks."
version: "1.0.0"
---

# AWS CDK Patterns Skill

This skill provides production-ready AWS CDK construct patterns for common architectures.

## When to Use This Skill

- Building serverless APIs with API Gateway + Lambda
- Setting up VPC with private/public subnets
- Creating CI/CD pipelines with CodePipeline
- Configuring observability (CloudWatch, X-Ray)
- Deploying multi-environment stacks

## Available Patterns

### 1. API Gateway + Lambda Pattern

```typescript
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export interface ApiLambdaPatternProps {
  functionName: string;
  codePath: string;
  environment?: Record<string, string>;
}

export class ApiLambdaPattern extends Construct {
  public readonly api: apigateway.RestApi;
  public readonly handler: lambda.Function;

  constructor(scope: Construct, id: string, props: ApiLambdaPatternProps) {
    super(scope, id);

    this.handler = new lambda.Function(this, "Handler", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset(props.codePath),
      handler: "index.handler",
      functionName: props.functionName,
      environment: props.environment,
      timeout: cdk.Duration.seconds(30),
      memorySize: 512,
      tracing: lambda.Tracing.ACTIVE,
    });

    this.api = new apigateway.RestApi(this, "Api", {
      restApiName: `${props.functionName}-api`,
      deployOptions: {
        stageName: "prod",
        tracingEnabled: true,
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const integration = new apigateway.LambdaIntegration(this.handler);
    this.api.root.addProxy({
      defaultIntegration: integration,
    });
  }
}
```

### 2. DynamoDB Single Table Pattern

```typescript
export class SingleTablePattern extends Construct {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new dynamodb.Table(this, "Table", {
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
    });

    // GSI1 for inverted index
    this.table.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: { name: "GSI1PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "GSI1SK", type: dynamodb.AttributeType.STRING },
    });

    // Tags
    cdk.Tags.of(this.table).add("Pattern", "SingleTable");
  }
}
```

### 3. VPC with Bastion Host

```typescript
export class VpcBastionPattern extends Construct {
  public readonly vpc: ec2.Vpc;
  public readonly bastionHost: ec2.BastionHostLinux;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.vpc = new ec2.Vpc(this, "Vpc", {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "Public",
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "Private",
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });

    this.bastionHost = new ec2.BastionHostLinux(this, "Bastion", {
      vpc: this.vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO,
      ),
    });
  }
}
```

## Usage Example

```typescript
import { App, Stack } from "aws-cdk-lib";
import { ApiLambdaPattern } from "./patterns/api-lambda-pattern";

const app = new App();
const stack = new Stack(app, "MyStack");

const api = new ApiLambdaPattern(stack, "UserApi", {
  functionName: "user-handler",
  codePath: "./lambda",
  environment: {
    TABLE_NAME: "users",
  },
});

app.synth();
```

## Best Practices

- Use **L2 constructs** over L1 (CfnXxx) constructs
- Enable **X-Ray tracing** for observability
- Configure **removal policies** appropriately
- Use **grant methods** for IAM permissions
- Add **CloudFormation outputs** for important values
- Tag resources with **cdk.Tags.of()**
