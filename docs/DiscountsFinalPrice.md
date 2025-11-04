
# DiscountsFinalPrice

Fixed amount discount that reduces the regular price by a specific monetary value. Example: $100 regular price with a $10 fixed discount results in $90 final price. 

## Properties

Name | Type
------------ | -------------
`code` | string
`price` | number

## Example

```typescript
import type { DiscountsFinalPrice } from ''

// TODO: Update the object below with actual values
const example = {
  "code": loyalty_discount,
  "price": 10.0,
} satisfies DiscountsFinalPrice

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DiscountsFinalPrice
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


