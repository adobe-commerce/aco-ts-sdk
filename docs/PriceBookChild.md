
# PriceBookChild

Nested price book that inherits currency from its parent and can extend the pricing hierarchy. Child price books can have up to 3 levels of nesting from the base price book. 

## Properties

Name | Type
------------ | -------------
`priceBookId` | string
`name` | string
`parentId` | string

## Example

```typescript
import type { PriceBookChild } from ''

// TODO: Update the object below with actual values
const example = {
  "priceBookId": us-retail,
  "name": US Retail Channel,
  "parentId": null,
} satisfies PriceBookChild

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PriceBookChild
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


