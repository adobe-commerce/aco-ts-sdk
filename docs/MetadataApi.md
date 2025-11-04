# MetadataApi

All URIs are relative to *https://na1-sandbox.api.commerce.adobe.com/string*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createProductMetadata**](MetadataApi.md#createproductmetadata) | **POST** /v1/catalog/products/metadata | Create product attribute metadata |
| [**deleteProductMetadata**](MetadataApi.md#deleteproductmetadata) | **POST** /v1/catalog/products/metadata/delete | Delete product attributes metadata |
| [**updateProductMetadata**](MetadataApi.md#updateproductmetadata) | **PATCH** /v1/catalog/products/metadata | Update product attribute metadata |



## createProductMetadata

> ProcessFeedResponse createProductMetadata(authorization, contentType, contentEncoding, feedMetadata)

Create product attribute metadata

To ensure product data is indexed for discovery, create or replace existing product attribute metadata resources before creating products.  For each Commerce project, you must define metadata for the following attributes for each catalog source (&#x60;locale&#x60;):   - &#x60;sku&#x60;   - &#x60;name&#x60;   - &#x60;description&#x60;   - &#x60;shortDescription&#x60;   - &#x60;price&#x60;  Also, you can define metadata for custom attributes.  When creating product attribute metadata:   - Each product attribute requires a unique &#x60;code&#x60; and &#x60;source&#x60;.   - Use the &#x60;dataType&#x60; field to define the data type for the product attribute.   - Use the &#x60;visibleIn&#x60; field to define where the product attribute is displayed on the storefront.   - Use the &#x60;filterable&#x60;, &#x60;sortable&#x60;, and &#x60;searchable&#x60; fields to define how the product attribute     is used for filtering, sorting, and searching.   - Use the &#x60;searchWeight&#x60; field to define the search weight for the product attribute.   - Use the &#x60;searchTypes&#x60; field to define the search type for the product attribute.  To update existing product attribute metadata, use the update operation. 

### Example

```ts
import {
  Configuration,
  MetadataApi,
} from '';
import type { CreateProductMetadataRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MetadataApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedMetadata> (optional)
    feedMetadata: [{"code":"sku","source":{"locale":"en-US"},"label":"Product Name","dataType":"TEXT","visibleIn":["PRODUCT_DETAIL","PRODUCT_LISTING","SEARCH_RESULTS","PRODUCT_COMPARE"],"filterable":true,"sortable":false,"searchable":true,"searchWeight":1,"searchTypes":["AUTOCOMPLETE"]},{"code":"name","source":{"locale":"en-US"},"label":"Product Name","dataType":"TEXT","visibleIn":["PRODUCT_DETAIL","PRODUCT_LISTING","SEARCH_RESULTS","PRODUCT_COMPARE"],"filterable":false,"sortable":true,"searchable":true,"searchWeight":1,"searchTypes":["AUTOCOMPLETE"]},{"code":"description","source":{"locale":"en-US"},"label":"Product Description","dataType":"TEXT","visibleIn":["PRODUCT_DETAIL"],"filterable":false,"sortable":false,"searchable":false,"searchWeight":1,"searchTypes":["AUTOCOMPLETE"]},{"code":"shortDescription","source":{"locale":"en-US"},"label":"Product Short Description","dataType":"TEXT","visibleIn":["PRODUCT_DETAIL"],"filterable":false,"sortable":false,"searchable":true,"searchWeight":1,"searchTypes":["AUTOCOMPLETE"]},{"code":"price","source":{"locale":"en-US"},"label":"Price","dataType":"DECIMAL","visibleIn":["PRODUCT_DETAIL","PRODUCT_LISTING","SEARCH_RESULTS","PRODUCT_COMPARE"],"filterable":true,"sortable":true,"searchable":false,"searchWeight":1,"searchTypes":[]}],
  } satisfies CreateProductMetadataRequest;

  try {
    const data = await api.createProductMetadata(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` |  | [Defaults to `undefined`] |
| **contentType** | `application/json` |  | [Defaults to `&#39;application/json&#39;`] [Enum: application/json] |
| **contentEncoding** | `gzip` | Use this header if the payload is compressed with gzip. | [Optional] [Defaults to `undefined`] [Enum: gzip] |
| **feedMetadata** | `Array<FeedMetadata>` |  | [Optional] |

### Return type

[**ProcessFeedResponse**](ProcessFeedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json;charset=UTF-8`, `text/html;charset=UTF-8`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | All items accepted and will be processed asynchronously  |  -  |
| **400** | Some of the received items are invalid. Check the \&quot;message\&quot; and \&quot;errors\&quot; fields for details.  Common causes of validation errors include:  * **Invalid SKU**: SKU does not exist in the catalog * **Invalid Price Book**: Price book ID does not exist * **Invalid Discount Code**: Duplicate or invalid discount codes * **Invalid Tier Quantities**: Quantities not in ascending order or less than 2 * **Configurable Product Price**: Attempting to set price for configurable product SKU * **Invalid Price Format**: Non-numeric or negative price values * **Incorrect Category Slug**: Invalid category slug format * **Incorrect hierarchy configuration**: Misconfiguration of price book parent-child relationship  |  -  |
| **401** | Verify that the Bearer token provided in the &#x60;Authorization&#x60; header is still valid.  |  -  |
| **403** | Verify that the &#x60;Authorization&#x60; header is present, and that the Bearer token is still valid.  |  -  |
| **429** | Indicates that a client has exceeded the rate limit of 300 requests per minute. Check the &#x60;retry-after&#x60; header to get the time (in seconds) to wait before sending the next request.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteProductMetadata

> ProcessFeedResponse deleteProductMetadata(authorization, contentType, contentEncoding, feedMetadataDelete)

Delete product attributes metadata

Remove product attribute metadata resources from the catalog data.

### Example

```ts
import {
  Configuration,
  MetadataApi,
} from '';
import type { DeleteProductMetadataRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MetadataApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedMetadataDelete> (optional)
    feedMetadataDelete: [{"code":"name","source":{"locale":"en-US"}}],
  } satisfies DeleteProductMetadataRequest;

  try {
    const data = await api.deleteProductMetadata(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` |  | [Defaults to `undefined`] |
| **contentType** | `application/json` |  | [Defaults to `&#39;application/json&#39;`] [Enum: application/json] |
| **contentEncoding** | `gzip` | Use this header if the payload is compressed with gzip. | [Optional] [Defaults to `undefined`] [Enum: gzip] |
| **feedMetadataDelete** | `Array<FeedMetadataDelete>` |  | [Optional] |

### Return type

[**ProcessFeedResponse**](ProcessFeedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json;charset=UTF-8`, `text/html;charset=UTF-8`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | All items accepted and will be processed asynchronously  |  -  |
| **400** | Some of the received items are invalid. Check the \&quot;message\&quot; and \&quot;errors\&quot; fields for details.  Common causes of validation errors include:  * **Invalid SKU**: SKU does not exist in the catalog * **Invalid Price Book**: Price book ID does not exist * **Invalid Discount Code**: Duplicate or invalid discount codes * **Invalid Tier Quantities**: Quantities not in ascending order or less than 2 * **Configurable Product Price**: Attempting to set price for configurable product SKU * **Invalid Price Format**: Non-numeric or negative price values * **Incorrect Category Slug**: Invalid category slug format * **Incorrect hierarchy configuration**: Misconfiguration of price book parent-child relationship  |  -  |
| **401** | Verify that the Bearer token provided in the &#x60;Authorization&#x60; header is still valid.  |  -  |
| **403** | Verify that the &#x60;Authorization&#x60; header is present, and that the Bearer token is still valid.  |  -  |
| **429** | Indicates that a client has exceeded the rate limit of 300 requests per minute. Check the &#x60;retry-after&#x60; header to get the time (in seconds) to wait before sending the next request.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateProductMetadata

> ProcessFeedResponse updateProductMetadata(authorization, contentType, contentEncoding, feedMetadataUpdate)

Update product attribute metadata

Update existing product attribute metadata with new values. When the update is processed, the merge strategy is used to apply changes to &#x60;scalar&#x60; and &#x60;object&#x60; type fields. The replace strategy is used to apply changes for fields in an &#x60;array&#x60;. 

### Example

```ts
import {
  Configuration,
  MetadataApi,
} from '';
import type { UpdateProductMetadataRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MetadataApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedMetadataUpdate> (optional)
    feedMetadataUpdate: [{"code":"name","source":{"locale":"en-US"},"label":"Updated - Product Name","visibleIn":["PRODUCT_DETAIL","PRODUCT_LISTING"]}],
  } satisfies UpdateProductMetadataRequest;

  try {
    const data = await api.updateProductMetadata(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` |  | [Defaults to `undefined`] |
| **contentType** | `application/json` |  | [Defaults to `&#39;application/json&#39;`] [Enum: application/json] |
| **contentEncoding** | `gzip` | Use this header if the payload is compressed with gzip. | [Optional] [Defaults to `undefined`] [Enum: gzip] |
| **feedMetadataUpdate** | `Array<FeedMetadataUpdate>` |  | [Optional] |

### Return type

[**ProcessFeedResponse**](ProcessFeedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json;charset=UTF-8`, `text/html;charset=UTF-8`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | All items accepted and will be processed asynchronously  |  -  |
| **400** | Some of the received items are invalid. Check the \&quot;message\&quot; and \&quot;errors\&quot; fields for details.  Common causes of validation errors include:  * **Invalid SKU**: SKU does not exist in the catalog * **Invalid Price Book**: Price book ID does not exist * **Invalid Discount Code**: Duplicate or invalid discount codes * **Invalid Tier Quantities**: Quantities not in ascending order or less than 2 * **Configurable Product Price**: Attempting to set price for configurable product SKU * **Invalid Price Format**: Non-numeric or negative price values * **Incorrect Category Slug**: Invalid category slug format * **Incorrect hierarchy configuration**: Misconfiguration of price book parent-child relationship  |  -  |
| **401** | Verify that the Bearer token provided in the &#x60;Authorization&#x60; header is still valid.  |  -  |
| **403** | Verify that the &#x60;Authorization&#x60; header is present, and that the Bearer token is still valid.  |  -  |
| **429** | Indicates that a client has exceeded the rate limit of 300 requests per minute. Check the &#x60;retry-after&#x60; header to get the time (in seconds) to wait before sending the next request.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

