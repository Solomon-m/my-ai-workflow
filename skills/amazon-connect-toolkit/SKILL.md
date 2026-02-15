---
name: "amazon-connect-toolkit"
description: "Amazon Connect contact flow patterns, Lambda integration templates, CCP customization examples, and Lex bot configurations."
version: "1.0.0"
---

# Amazon Connect Toolkit

This skill provides templates and utilities for building Amazon Connect contact center solutions.

## When to Use This Skill

- Creating contact flows for inbound/outbound calls
- Integrating Lambda functions with Connect flows
- Customizing the Contact Control Panel (CCP)
- Building Lex bots for Connect
- Implementing callback functionality

## Contact Flow Patterns

### 1. Basic Inbound Flow

```json
{
  "Version": "2019-10-30",
  "StartAction": "greeting",
  "Actions": [
    {
      "Identifier": "greeting",
      "Type": "MessageParticipant",
      "Parameters": {
        "Text": "Thank you for calling. Please hold while we connect you."
      },
      "Transitions": {
        "NextAction": "check-hours"
      }
    },
    {
      "Identifier": "check-hours",
      "Type": "InvokeLambdaFunction",
      "Parameters": {
        "LambdaFunctionARN": "${CheckBusinessHoursArn}",
        "TimeLimit": "8"
      },
      "Transitions": {
        "NextAction": "route-call",
        "Conditions": [],
        "Errors": [
          {
            "ErrorType": "NoMatchingError",
            "NextAction": "error-handler"
          }
        ]
      }
    },
    {
      "Identifier": "route-call",
      "Type": "TransferContactToQueue",
      "Parameters": {
        "QueueId": "${SupportQueueId}"
      },
      "Transitions": {
        "NextAction": "disconnect",
        "Errors": [
          {
            "ErrorType": "NoMatchingError",
            "NextAction": "voicemail"
          }
        ]
      }
    }
  ]
}
```

### 2. Lambda Handler for Connect

```typescript
import { ConnectContactFlowEvent, ConnectContactFlowResult } from "aws-lambda";

interface BusinessHoursResponse {
  isOpen: boolean;
  nextOpenTime?: string;
}

export const checkBusinessHours = async (
  event: ConnectContactFlowEvent,
): Promise<ConnectContactFlowResult> => {
  const { Details } = event;
  const { ContactData, Parameters } = Details;

  // Check current time against business hours
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  const isOpen = day >= 1 && day <= 5 && hour >= 9 && hour < 17;

  return {
    statusCode: 200,
    isOpen: isOpen.toString(),
    message: isOpen ? "We are open" : "We are closed",
  };
};
```

### 3. CCP Customization

```typescript
import "amazon-connect-streams";

// Initialize CCP
connect.core.initCCP(document.getElementById("ccp-container"), {
  ccpUrl: "https://your-instance.awsapps.com/connect/ccp-v2",
  loginPopup: true,
  softphone: {
    allowFramedSoftphone: true,
  },
});

// Listen for incoming contacts
connect.contact((contact) => {
  console.log("Contact detected:", contact.getContactId());

  // Get contact attributes
  const attributes = contact.getAttributes();
  console.log("Attributes:", attributes);

  // Handle contact events
  contact.onAccepted(() => {
    console.log("Contact accepted");
  });

  contact.onConnected(() => {
    console.log("Contact connected");
  });

  contact.onEnded(() => {
    console.log("Contact ended");
  });
});

// Listen for agent state changes
connect.agent((agent) => {
  agent.onStateChange((agentState) => {
    console.log("Agent state:", agentState.name);
  });

  agent.onRoutable((routableAgent) => {
    console.log("Agent is routable");
  });
});
```

### 4. Lex Bot Integration

```typescript
// Lex bot handler
export const lexHandler = async (event: LexEvent): Promise<LexResponse> => {
  const { currentIntent, sessionAttributes } = event;
  const intent = currentIntent.name;

  if (intent === "CheckAccountBalance") {
    const accountNumber = currentIntent.slots.AccountNumber;

    // Validate account
    const balance = await getAccountBalance(accountNumber);

    return {
      sessionAttributes,
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: `Your account balance is $${balance}`,
        },
      },
    };
  }

  return {
    sessionAttributes,
    dialogAction: {
      type: "Close",
      fulfillmentState: "Failed",
      message: {
        contentType: "PlainText",
        content: "I could not process your request.",
      },
    },
  };
};
```

## TypeScript Types

```typescript
export interface ConnectContactFlowEvent {
  Details: {
    ContactData: {
      Attributes: Record<string, string>;
      Channel: string;
      ContactId: string;
      CustomerEndpoint: {
        Address: string;
        Type: string;
      };
      InitialContactId: string;
      InitiationMethod: string;
      InstanceARN: string;
      PreviousContactId: string;
      Queue: {
        Name: string;
        ARN: string;
      };
      SystemEndpoint: {
        Address: string;
        Type: string;
      };
    };
    Parameters: Record<string, string>;
  };
  Name: string;
}

export interface ConnectContactFlowResult {
  statusCode?: number;
  [key: string]: string | number | boolean | undefined;
}
```

## Best Practices

- Set **timeout limits** on Lambda invocations (max 8 seconds)
- Use **customer properties** to pass data between blocks
- Implement **error handling** for all actions
- Test flows with **test numbers**
- Use **contact attributes** for dynamic routing
- Store **call recordings** in S3
- Monitor **contact flow logs** in CloudWatch
