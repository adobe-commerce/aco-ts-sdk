
# TierPercentage

Percentage discount applied to the regular price when purchasing at or above a specific quantity threshold. Example: $100 regular price with 20% discount for quantity of 10 or more. 

## Properties

Name | Type
------------ | -------------
`qty` | number
`percentage` | number

## Example

```typescript
import type { TierPercentage } from ''

// TODO: Update the object below with actual values
const example = {
  "qty": 10,
  "percentage": 20.0,
} satisfies TierPercentage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TierPercentage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


