
# PriceBookBase


## Properties

Name | Type
------------ | -------------
`priceBookId` | string
`name` | string
`currency` | string

## Example

```typescript
import type { PriceBookBase } from ''

// TODO: Update the object below with actual values
const example = {
  "priceBookId": us-base,
  "name": US Base Pricing,
  "currency": USD,
} satisfies PriceBookBase

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PriceBookBase
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


