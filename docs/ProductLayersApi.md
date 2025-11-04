# ProductLayersApi

All URIs are relative to *https://na1-sandbox.api.commerce.adobe.com/string*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createProductLayers**](ProductLayersApi.md#createproductlayers) | **POST** /v1/catalog/products/layers | Create or replace product layers |
| [**deleteProductLayers**](ProductLayersApi.md#deleteproductlayers) | **POST** /v1/catalog/products/layers/delete | Delete product layers |



## createProductLayers

> ProcessFeedResponse createProductLayers(authorization, contentType, contentEncoding, feedProductLayer)

Create or replace product layers

You can create a product layer to merge and override a base product.  When creating product layers:  - Each product layer requires a SKU identifier which matches to a base product.  - A product layer may have a defined catalog &#x60;source.locale&#x60;, and if absent is treated as a global layer for any locale.  - A product layer must have a defined catalog &#x60;source.layer&#x60;.  - All other fields are optional. If provided, they are used to override the base product.  - When merging array lists, the first array is merged with the base list. All other inner lists of the same object are treated as replace values.    For example &#x60;attributes&#x60; is merged with base list, but &#x60;attributes.values&#x60; is a replacement.    &lt;pre&gt;    {      \&quot;sku\&quot;: \&quot;pants-red-32\&quot;,      \&quot;source\&quot;: {        \&quot;locale\&quot;: \&quot;en\&quot;,        \&quot;layer\&quot;: \&quot;custom-layer\&quot;      },      \&quot;attributes\&quot;: [        {          \&quot;code\&quot;: \&quot;color\&quot;,          \&quot;values\&quot;: [\&quot;Green\&quot;, \&quot;Light Green\&quot;],          \&quot;variantReferenceId\&quot;: \&quot;pants-color-green\&quot;        }      ]    }    &lt;/pre&gt; 

### Example

```ts
import {
  Configuration,
  ProductLayersApi,
} from '';
import type { CreateProductLayersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductLayersApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedProductLayer> (optional)
    feedProductLayer: [{"sku":"red-pants","source":{"locale":"en-US","layer":"custom-layer"},"name":"red pants for my custom layer","description":"long description about red pants for my custom layer","shortDescription":"just pants for custom layer","images":[{"url":"https://example.com/images/pants.jpg","label":"photo of my pants for my custom layer","roles":["BASE","SMALL"],"customRoles":["widget"]}]}],
  } satisfies CreateProductLayersRequest;

  try {
    const data = await api.createProductLayers(body);
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
| **feedProductLayer** | `Array<FeedProductLayer>` |  | [Optional] |

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


## deleteProductLayers

> ProcessFeedResponse deleteProductLayers(authorization, contentType, contentEncoding, feedProductLayerDelete)

Delete product layers

Delete product layers with specified &#x60;sku&#x60; and &#x60;source&#x60; values 

### Example

```ts
import {
  Configuration,
  ProductLayersApi,
} from '';
import type { DeleteProductLayersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductLayersApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedProductLayerDelete> (optional)
    feedProductLayerDelete: [{"sku":"red-pants","source":{"locale":"en-US","layer":"custom-layer"}}],
  } satisfies DeleteProductLayersRequest;

  try {
    const data = await api.deleteProductLayers(body);
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
| **feedProductLayerDelete** | `Array<FeedProductLayerDelete>` |  | [Optional] |

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

