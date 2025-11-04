
# FeedMetadataUpdate

Metadata information for a product attribute.

## Properties

Name | Type
------------ | -------------
`code` | string
`source` | [Source](Source.md)
`visibleIn` | Array&lt;string&gt;
`label` | string
`dataType` | string
`filterable` | boolean
`sortable` | boolean
`searchable` | boolean
`searchWeight` | number
`searchTypes` | Array&lt;string&gt;

## Example

```typescript
import type { FeedMetadataUpdate } from ''

// TODO: Update the object below with actual values
const example = {
  "code": null,
  "source": null,
  "visibleIn": null,
  "label": Attribute Name,
  "dataType": TEXT,
  "filterable": true,
  "sortable": true,
  "searchable": true,
  "searchWeight": null,
  "searchTypes": null,
} satisfies FeedMetadataUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedMetadataUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


