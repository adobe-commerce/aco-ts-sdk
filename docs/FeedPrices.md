
# FeedPrices

Product price information with support for regular pricing, discounts, and tiered pricing. Each price record must reference an existing price book and can include multiple discount types and tiered pricing levels for different quantity thresholds. 

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
import type { FeedPrices } from ''

// TODO: Update the object below with actual values
const example = {
  "sku": red-pants-xl,
  "priceBookId": us-retail,
  "regular": 29.99,
  "discounts": [{"code":"seasonal_sale","percentage":15},{"code":"loyalty_discount","price":5.0}],
  "tierPrices": [{"qty":5,"percentage":10},{"qty":10,"price":25.0}],
} satisfies FeedPrices

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedPrices
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


