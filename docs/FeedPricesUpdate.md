
# FeedPricesUpdate

Product price information.

## Properties

Name | Type
------------ | -------------
`sku` | string
`priceBookId` | string
`regular` | number
`discounts` | [Array&lt;FeedPricesDiscountsInner&gt;](FeedPricesDiscountsInner.md)
`tierPrices` | [Array&lt;FeedPricesTierPricesInner&gt;](FeedPricesTierPricesInner.md)

## Example

```typescript
import type { FeedPricesUpdate } from ''

// TODO: Update the object below with actual values
const example = {
  "sku": null,
  "priceBookId": null,
  "regular": null,
  "discounts": null,
  "tierPrices": null,
} satisfies FeedPricesUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedPricesUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


