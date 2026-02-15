---
description: "Generate a complete AWS CDK stack with resources, IAM policies, and deployment configuration."
temperature: 0.5
---

# Create CDK Stack

Generate a production-ready AWS CDK stack with infrastructure resources.

## What You'll Create

1. **CDK Stack** - TypeScript CDK stack
2. **Resources** - Lambda, API Gateway, DynamoDB, etc.
3. **IAM Policies** - Least-privilege permissions
4. **Configuration** - Environment-specific configs
5. **Deployment Guide** - How to deploy

## Usage

```
@workspace /create-cdk-stack <stack-name> <resources>
```

**Resource Types:**

- `api-lambda` - API Gateway + Lambda
- `serverless` - Full serverless app
- `data` - Database stack
- `frontend` - CloudFront + S3
- `queue` - SQS + processing Lambda

## Example

```
@workspace /create-cdk-stack user-service api-lambda
```

## Stack Template

```typescript
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class UserServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const table = new dynamodb.Table(this, "UsersTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For dev only
    });

    // Lambda Function
    const handler = new lambda.Function(this, "UserHandler", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "handler.main",
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Grant permissions
    table.grantReadWriteData(handler);

    // API Gateway
    const api = new apigateway.RestApi(this, "UserApi", {
      restApiName: "User Service",
      deployOptions: {
        stageName: "prod",
        tracingEnabled: true,
      },
    });

    const users = api.root.addResource("users");
    users.addMethod("GET", new apigateway.LambdaIntegration(handler));
    users.addMethod("POST", new apigateway.LambdaIntegration(handler));

    // Outputs
    new cdk.CfnOutput(this, "ApiUrl", {
      value: api.url,
      description: "API Gateway URL",
    });
  }
}
```

## Best Practices Applied

- ✅ L2 Constructs over L1
- ✅ Grant methods for IAM
- ✅ Environment variables
- ✅ CloudFormation outputs
- ✅ Removal policies
- ✅ Tagging
- ✅ Observability (X-Ray, logs)
