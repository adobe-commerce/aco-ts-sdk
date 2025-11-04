
# DiscountsPercentage

Percentage discount that reduces the regular price by a specified percentage. Example: $100 regular price with a 20% discount results in $80 final price. 

## Properties

Name | Type
------------ | -------------
`code` | string
`percentage` | number

## Example

```typescript
import type { DiscountsPercentage } from ''

// TODO: Update the object below with actual values
const example = {
  "code": seasonal_sale,
  "percentage": 15.5,
} satisfies DiscountsPercentage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DiscountsPercentage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


