
# FeedMetadataDelete

Delete metadata information for a product attribute.

## Properties

Name | Type
------------ | -------------
`code` | string
`source` | [Source](Source.md)

## Example

```typescript
import type { FeedMetadataDelete } from ''

// TODO: Update the object below with actual values
const example = {
  "code": null,
  "source": null,
} satisfies FeedMetadataDelete

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedMetadataDelete
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


