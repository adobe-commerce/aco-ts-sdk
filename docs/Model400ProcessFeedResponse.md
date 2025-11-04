
# Model400ProcessFeedResponse


## Properties

Name | Type
------------ | -------------
`status` | string
`message` | string
`errors` | [Array&lt;FeedItemFailedValidationResult&gt;](FeedItemFailedValidationResult.md)

## Example

```typescript
import type { Model400ProcessFeedResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "status": null,
  "message": null,
  "errors": null,
} satisfies Model400ProcessFeedResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Model400ProcessFeedResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


