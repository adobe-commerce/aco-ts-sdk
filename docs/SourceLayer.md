
# SourceLayer

Source of the entity, for example, \"en-US\" for US English for layer \"MyLayer\"

## Properties

Name | Type
------------ | -------------
`locale` | string
`layer` | string

## Example

```typescript
import type { SourceLayer } from ''

// TODO: Update the object below with actual values
const example = {
  "locale": English,
  "layer": MyLayer,
} satisfies SourceLayer

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SourceLayer
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


