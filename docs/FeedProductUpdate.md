
# FeedProductUpdate


## Properties

Name | Type
------------ | -------------
`sku` | string
`source` | [Source](Source.md)
`name` | string
`slug` | string
`description` | string
`shortDescription` | string
`status` | string
`visibleIn` | Array&lt;string&gt;
`metaTags` | [ProductMetaAttribute](ProductMetaAttribute.md)
`attributes` | [Array&lt;ProductAttribute&gt;](ProductAttribute.md)
`images` | [Array&lt;ProductImage&gt;](ProductImage.md)
`links` | [Array&lt;ProductLink&gt;](ProductLink.md)
`routes` | [Array&lt;ProductRoutes&gt;](ProductRoutes.md)
`configurations` | [Array&lt;ProductConfiguration&gt;](ProductConfiguration.md)
`bundles` | [Array&lt;ProductBundle&gt;](ProductBundle.md)
`externalIds` | [Array&lt;ProductExternalId&gt;](ProductExternalId.md)

## Example

```typescript
import type { FeedProductUpdate } from ''

// TODO: Update the object below with actual values
const example = {
  "sku": MH01,
  "source": null,
  "name": Kangaroo Hoodie,
  "slug": kangaroo-hoodie.html,
  "description": A kangaroo hoodie for all seasons,
  "shortDescription": A hoodie for all seasons with a kangaroo pocket,
  "status": ENABLED,
  "visibleIn": ["CATALOG"],
  "metaTags": null,
  "attributes": null,
  "images": null,
  "links": null,
  "routes": null,
  "configurations": null,
  "bundles": null,
  "externalIds": null,
} satisfies FeedProductUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FeedProductUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


