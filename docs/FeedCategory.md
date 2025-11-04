
# FeedCategory

Category information for organizing products with hierarchical structure and localization support.

## Properties

Name | Type
------------ | -------------
`slug` | string
`source` | [Source](Source.md)
`name` | string
`families` | Array&lt;string&gt;

## Example

```typescript
import type { FeedCategory } from ''

// TODO: Update the object below with actual values
const example = {
  "slug": men/clothing/pants,
  "source": null,
  "name": Men's Pants,
  "families": ["apparel","clothing"],
} satisfies FeedCategory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedCategory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


