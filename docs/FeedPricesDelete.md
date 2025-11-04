
# FeedPricesDelete

Delete product price information.

## Properties

Name | Type
------------ | -------------
`sku` | string
`priceBookId` | string

## Example

```typescript
import type { FeedPricesDelete } from ''

// TODO: Update the object below with actual values
const example = {
  "sku": null,
  "priceBookId": null,
} satisfies FeedPricesDelete

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedPricesDelete
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


