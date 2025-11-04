# ProductsApi

All URIs are relative to *https://na1-sandbox.api.commerce.adobe.com/string*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createProducts**](ProductsApi.md#createproducts) | **POST** /v1/catalog/products | Create or replace products |
| [**deleteProducts**](ProductsApi.md#deleteproducts) | **POST** /v1/catalog/products/delete | Delete products |
| [**updateProducts**](ProductsApi.md#updateproducts) | **PATCH** /v1/catalog/products | Update products |



## createProducts

> ProcessFeedResponse createProducts(authorization, contentType, contentEncoding, feedProduct)

Create or replace products

You can create different types of products, such as simple products and configurable products.  When creating products:  - Each product requires a unique SKU identifier.  - Products must have a defined catalog source, for example &#x60;locale&#x60;.  - Add values for the required &#x60;name&#x60;, &#x60;slug&#x60;, and &#x60;status&#x60; fields.  - Define optional fields such as descriptions, images, and custom attributes as needed.  - Use the &#x60;links&#x60; field to define relationships between products, such as linking a product variant to its parent  configurable product.  - You can create multiple products in a single request, and also create product variants for configurable products in the same request.  - Use the &#x60;routes&#x60; field to set category paths. The &#x60;path&#x60; value must match an existing category slug, for example &#x60;men/clothing&#x60;.   - Create a route for each category path. For example to include a product in each of the following categories &#x60;men&#x60;, &#x60;men/clothing&#x60;, and &#x60;men/clothing/pants&#x60;, specify three &#x60;path&#x60; values, one for each category.    &lt;h3 id&#x3D;\&quot;simpleProducts\&quot;&gt;Simple products&lt;/h3&gt; Create products or replace existing products with specified &#x60;sku&#x60; and &#x60;source&#x60; values.  Use the &lt;strong&gt;[update operation](#operation/updateProducts)&lt;/strong&gt; to modify values for an existing product.  &lt;h3 id&#x3D;\&quot;configurableProducts\&quot;&gt;Configurable products&lt;/h3&gt;  A configurable product is a parent product that allows customers to select from multiple predefined attributes such as color, size, and material. Each unique combination of these attribute values (for example, &#x60;color&#x3D;green&#x60;, &#x60;size&#x3D;large&#x60;) represents a product variant.  Each variant is treated as a distinct child product with its own SKU, price, and inventory. These variants are stored as separate entities in the database and linked to the parent configurable product.  The configurable product itself acts as a container or abstraction layer, enabling a unified frontend experience while maintaining granular control over each variant on the backend.  To create a configurable product, you need the following:  * &lt;strong&gt;Product attributes&lt;/strong&gt;—&lt;a href&#x3D;\&quot;#operation/createProductMetadata\&quot;&gt;Create product attributes&lt;/a&gt; (for example, \&quot;color\&quot;, \&quot;size\&quot;) that will be used to differentiate product variants. These attributes must be registered in the system before they can be referenced in product definitions.  * &lt;strong&gt;Configurable product&lt;/strong&gt;—Define the parent product and include a   [configurations](#operation/createProducts!path&#x3D;configurations&amp;t&#x3D;request) array that specifies the selectable options   and maps each option to a set of possible values. Each value must include a   [variantReferenceId](#operation/createProducts!path&#x3D;configurations/values/variantReferenceId&amp;t&#x3D;request),   which links to a specific variant.  * &lt;strong&gt;Product variants&lt;/strong&gt;—Define a product variant for each valid combination of attribute values. Each variant must:   * Include relevant attribute values in an [attributes](#operation/createProducts!path&#x3D;attributes&amp;t&#x3D;request) array.   * Reference the parent configurable product using variantReferenceId.   * Include a [links](#operation/createProducts!path&#x3D;links&amp;t&#x3D;request) array with a link of type &#x60;VARIANT_OF&#x60; pointing to the configurable product.    For example:    &lt;pre&gt;   {     \&quot;sku\&quot;: \&quot;pants-red-32\&quot;,     \&quot;attributes\&quot;: [       {         \&quot;code\&quot;: \&quot;color\&quot;,         \&quot;values\&quot;: [\&quot;Red\&quot;],         \&quot;variantReferenceId\&quot;: \&quot;pants-color-red\&quot;       }     ],     \&quot;links\&quot;: [       {         \&quot;type\&quot;: \&quot;VARIANT_OF\&quot;,         \&quot;sku\&quot;: \&quot;pants\&quot;       }     ]   } &lt;/pre&gt;    Each product variant links back to the configurable product through its &#x60;variantReferenceId&#x60;, which corresponds to specific &#x60;configurations[].values[].variantReferenceId&#x60; in the configurable product.    To unassign a product variant from a configurable product, do one of the following:   - Use [Delete Product API](#operation/deleteProducts) to delete the product variant.   - Use [Update Product API](#operation/updateProducts) to set the [\&quot;variantReferenceId\&quot;](#operation/createProducts!path&#x3D;attributes/variantReferenceId&amp;t&#x3D;request) to &#x60;null&#x60; and unassign the product variant from the configurable product by removing the [\&quot;links\&quot;](#operation/createProducts!path&#x3D;links&amp;t&#x3D;request) association.  &lt;h3&gt;Bundle products&lt;/h3&gt;  A bundle product combines several simple products into one sellable unit. Items within the bundle can be categorized into logical groups like &#x60;tops&#x60;, &#x60;bottoms&#x60;, and &#x60;accessories&#x60;. Each group can have multiple items, and shoppers can select items from each group to create a customized bundle.  To create a bundle product, you need the following:  * &lt;strong&gt;Bundle product&lt;/strong&gt;—[Define the parent product](#operation/createProducts) and include a [bundles](#operation/createProducts!path&#x3D;bundles) array that specifies the groups and items included in the bundle. Each group must define:   * &#x60;group&#x60; - Name of the group (for example, \&quot;tops\&quot;, \&quot;bottoms\&quot;)   * &#x60;required&#x60; - Whether a selection from this group is mandatory   * &#x60;multiSelect&#x60; - Whether multiple items can be selected   * &#x60;items&#x60; - List of products that can be selected from this group  * &lt;strong&gt;Simple products&lt;/strong&gt;—Define each simple product to include in the bundle. Each product must:   * Include a [links](#operation/createProducts!path&#x3D;links) array with a link of type &#x60;IN_BUNDLE&#x60; pointing to the bundle product   * Be created separately using the [create product API](#operation/createProducts)  &lt;strong&gt;Note:&lt;/strong&gt; A simple product can be included only once in each bundle. If the same item is specified in multiple groups, the API returns a &#x60;Duplicate SKU found in bundle items&#x60; error.  To update a bundle product, do one of the following: * Use the [Update products API](#operation/updateProducts) to modify the groups and items in the bundle * Use the [Delete products API](#operation/deleteProducts) to remove items from the bundle 

### Example

```ts
import {
  Configuration,
  ProductsApi,
} from '';
import type { CreateProductsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductsApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedProduct> (optional)
    feedProduct: [{"sku":"red-pants","source":{"locale":"en-US"},"name":"red pants","slug":"red-pants.html","status":"ENABLED","description":"long description about red pants","shortDescription":"just pants","visibleIn":["CATALOG","SEARCH"],"metaTags":{"title":"Yoga pants ","description":"Climb with Zeppelin Yoga Pant","keywords":["pants","yoga"]},"attributes":[{"code":"cost","values":["10.5"]},{"code":"states","values":["TX","CA"]}],"images":[{"url":"https://example.com/images/pants.jpg","label":"photo of my pants!","roles":["BASE","SMALL"],"customRoles":["widget"]}],"routes":[{"path":"men"},{"path":"men/clothing/","position":1},{"path":"men/clothing/pants","position":1}]}],
  } satisfies CreateProductsRequest;

  try {
    const data = await api.createProducts(body);
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
| **feedProduct** | `Array<FeedProduct>` |  | [Optional] |

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


## deleteProducts

> ProcessFeedResponse deleteProducts(authorization, contentType, contentEncoding, feedProductDelete)

Delete products

Delete products with specified &#x60;sku&#x60; and &#x60;source&#x60; values 

### Example

```ts
import {
  Configuration,
  ProductsApi,
} from '';
import type { DeleteProductsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductsApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedProductDelete> (optional)
    feedProductDelete: [{"sku":"red-pants","source":{"locale":"en-US"}}],
  } satisfies DeleteProductsRequest;

  try {
    const data = await api.deleteProducts(body);
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
| **feedProductDelete** | `Array<FeedProductDelete>` |  | [Optional] |

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


## updateProducts

> ProcessFeedResponse updateProducts(authorization, contentType, contentEncoding, feedProductUpdate)

Update products

Update products with specified &#x60;sku&#x60; and &#x60;source&#x60; values to replace existing field data with the data supplied in the request. When the update is processed, the merge strategy is used to apply changes to &#x60;scalar&#x60; and &#x60;object&#x60; type fields.  For &#x60;array&#x60; type fields, a new value can be appended to the existing list. For an object list, you can update a specific object by matching on a key field. The following fields are supported: * &#x60;attributes&#x60; - match on &#x60;code&#x60; * &#x60;images&#x60; - match on &#x60;url&#x60; * &#x60;routes&#x60; - match on &#x60;path&#x60; * &#x60;links&#x60; - match on &#x60;type&#x60; and &#x60;sku&#x60; * &#x60;bundles&#x60; match on &#x60;type&#x60; and &#x60;group&#x60; * &#x60;configurations&#x60; match on &#x60;type&#x60; and &#x60;attributeCode&#x60; * &#x60;externalIds&#x60; match on &#x60;type&#x60; and &#x60;origin&#x60; 

### Example

```ts
import {
  Configuration,
  ProductsApi,
} from '';
import type { UpdateProductsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ProductsApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedProductUpdate> (optional)
    feedProductUpdate: [{"sku":"red-pants","source":{"locale":"en-US"},"name":"Red pants - discounts!","metaTags":{"title":"Updated - Red"}}],
  } satisfies UpdateProductsRequest;

  try {
    const data = await api.updateProducts(body);
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
| **feedProductUpdate** | `Array<FeedProductUpdate>` |  | [Optional] |

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

