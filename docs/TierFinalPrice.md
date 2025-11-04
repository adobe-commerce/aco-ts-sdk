
# TierFinalPrice

Final price offered for bulk purchases at a specific quantity threshold. Example: $100 regular price with tier price of $80 for quantity of 5 or more. 

## Properties

Name | Type
------------ | -------------
`qty` | number
`price` | number

## Example

```typescript
import type { TierFinalPrice } from ''

// TODO: Update the object below with actual values
const example = {
  "qty": 5,
  "price": 80.0,
} satisfies TierFinalPrice

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TierFinalPrice
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


