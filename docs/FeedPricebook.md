
# FeedPricebook

Price book information supporting hierarchical pricing structures. Use base price books to define currency and create child price books for specific pricing scenarios. 

## Properties

Name | Type
------------ | -------------
`priceBookId` | string
`name` | string
`currency` | string
`parentId` | string

## Example

```typescript
import type { FeedPricebook } from ''

// TODO: Update the object below with actual values
const example = {
  "priceBookId": us-retail,
  "name": US Retail Channel,
  "currency": USD,
  "parentId": null,
} satisfies FeedPricebook

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedPricebook
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


