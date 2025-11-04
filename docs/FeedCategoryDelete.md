
# FeedCategoryDelete

Delete category information for removing categories from the catalog.

## Properties

Name | Type
------------ | -------------
`slug` | string
`source` | [Source](Source.md)

## Example

```typescript
import type { FeedCategoryDelete } from ''

// TODO: Update the object below with actual values
const example = {
  "slug": men/clothing/pants,
  "source": null,
} satisfies FeedCategoryDelete

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedCategoryDelete
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


