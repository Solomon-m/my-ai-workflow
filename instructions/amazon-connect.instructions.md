---
description: "Amazon Connect contact flow best practices, Lambda integration patterns, Lex bot configuration, security rules, and CTR processing guidelines."
applyTo: "**/connect/**/*.ts, **/contact-flows/**/*.json, **/lex/**/*.json"
---

# Amazon Connect Development Standards

## Contact Flow Lambda Handler

```typescript
export interface ConnectEvent {
  Details: {
    ContactData: {
      Attributes: Record<string, string>;
      ContactId: string;
      CustomerEndpoint: { Address: string; Type: string };
      InitiationMethod: string;
      InstanceARN: string;
      Queue: string | null;
    };
    Parameters: Record<string, string>;
  };
}

export interface ConnectResponse {
  [key: string]: string | number | boolean;
}

export const handler = async (
  event: ConnectEvent,
): Promise<ConnectResponse> => {
  const { ContactData, Parameters } = event.Details;

  console.log("Contact ID:", ContactData.ContactId);
  console.log("Customer:", ContactData.CustomerEndpoint.Address);

  // Business logic here
  const result = await lookupCustomer(Parameters.customerId);

  // Return attributes that become contact attributes in the flow
  return {
    customerName: result.name,
    accountStatus: result.status,
    priority: result.priority,
  };
};
```

## Contact Flow Best Practices

1. **Always set logging behavior** at flow start
2. **Set contact attributes** early for tracking
3. **Lambda timeout** must be ≤ 8 seconds
4. **Return string values** from Lambda (Connect requirement)
5. **Add error branches** for all Lambda invocations
6. **Check queue status** before transfer
7. **Version control** flows (export JSON regularly)

## Flow Structure

```
Set logging behavior
  ↓
Set contact attributes (caller info)
  ↓
Get customer input (DTMF or Lex)
  ↓
Invoke Lambda (lookup/validation)
  ↓
Check contact attributes (routing logic)
  ↓
Set working queue
  ↓
Transfer to queue OR Transfer to flow
  ↓
Disconnect
```

## Lex Bot Integration

```json
{
  "botName": "CustomerService",
  "botAlias": "prod",
  "localeId": "en_US",
  "intents": [
    {
      "name": "CheckBalance",
      "slots": [
        {
          "name": "AccountNumber",
          "type": "AMAZON.AlphaNumeric"
        }
      ]
    }
  ]
}
```

## Error Handling

- Always have error branches for Lambda failures
- Set default paths for unexpected values
- Log errors to CloudWatch
- Have fallback routing (transfer to agent)
