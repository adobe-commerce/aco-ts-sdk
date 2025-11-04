
# ProductConfiguration


## Properties

Name | Type
------------ | -------------
`attributeCode` | string
`label` | string
`defaultVariantReferenceId` | string
`type` | string
`values` | [Array&lt;ProductOptionValue&gt;](ProductOptionValue.md)

## Example

```typescript
import type { ProductConfiguration } from ''

// TODO: Update the object below with actual values
const example = {
  "attributeCode": null,
  "label": null,
  "defaultVariantReferenceId": null,
  "type": null,
  "values": null,
} satisfies ProductConfiguration

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ProductConfiguration
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


