# CategoriesApi

All URIs are relative to *https://na1-sandbox.api.commerce.adobe.com/string*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createCategories**](CategoriesApi.md#createcategories) | **POST** /v1/catalog/categories | Create categories |
| [**deleteCategories**](CategoriesApi.md#deletecategories) | **POST** /v1/catalog/categories/delete | Delete categories |
| [**updateCategories**](CategoriesApi.md#updatecategories) | **PATCH** /v1/catalog/categories | Update categories |



## createCategories

> ProcessFeedResponse createCategories(authorization, contentType, contentEncoding, feedCategory)

Create categories

Create new categories with hierarchical structure and slug-based paths. Categories organize products into logical groups and support nested hierarchies.  When creating categories:   - Each category requires a unique &#x60;slug&#x60; and &#x60;source&#x60;.   - To create parent-child relationships, create the &#x60;slug&#x60; field in a hierarchical format, for example &#x60;men/clothing/pants\&#39;.   - A category &#x60;slug&#x60; string can contain only lowercase letters, numbers, and hyphens with &#x60;/&#x60; used as a separator for hierarchy.   - Create each category as a separate entity.   - Use the &#x60;name&#x60; field to define the display name for the category.   - Use the optional &#x60;families&#x60; field to associate categories with product families for enhanced organization.  After you create categories, link a product to a category using the &#x60;path&#x60; value for the [routes](#operation/createProducts!path&#x3D;routes&amp;t&#x3D;request) field. When you create or update products. The value of &#x60;path&#x60; in the route must match the &#x60;slug&#x60; value for the category.  To update existing categories, use the update operation. 

### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { CreateCategoriesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriesApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedCategory> (optional)
    feedCategory: [{"slug":"men","source":{"locale":"en-US"},"name":"Men","families":["apparel","accessories"]},{"slug":"men/clothing","source":{"locale":"en-US"},"name":"Men's Clothing","families":["apparel"]},{"slug":"men/clothing/pants","source":{"locale":"en-US"},"name":"Men's Pants","families":["apparel"]}],
  } satisfies CreateCategoriesRequest;

  try {
    const data = await api.createCategories(body);
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
| **feedCategory** | `Array<FeedCategory>` |  | [Optional] |

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


## deleteCategories

> ProcessFeedResponse deleteCategories(authorization, contentType, contentEncoding, feedCategoryDelete)

Delete categories

Delete categories and all their associated children  &lt;h3&gt;Cascading Deletion&lt;/h3&gt;  When you delete a category: * **Child categories**: All child categories in the hierarchy are deleted automatically * **Hierarchy Impact**: The entire branch below the deleted category is removed  &lt;h3&gt;Recovery Options&lt;/h3&gt;  If a category is deleted by mistake: * **Time Window**: You have up to one week to restore deleted categories * **Restoration Method**: Recreate the top-level deleted category using the [Create category operation](#operation/createCategories) * **State Recovery**: Categories are restored to their exact state from the time of deletion, including all metadata, family associations, and hierarchy relationships * **Hierarchy Reconstruction**: The entire hierarchy is rebuilt from the restoration payload 

### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { DeleteCategoriesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriesApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedCategoryDelete> (optional)
    feedCategoryDelete: [{"slug":"men/clothing/pants","source":{"locale":"en-US"}},{"slug":"women/shoes/boots","source":{"locale":"en-US"}}],
  } satisfies DeleteCategoriesRequest;

  try {
    const data = await api.deleteCategories(body);
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
| **feedCategoryDelete** | `Array<FeedCategoryDelete>` |  | [Optional] |

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


## updateCategories

> ProcessFeedResponse updateCategories(authorization, contentType, contentEncoding, feedCategoryUpdate)

Update categories

Update existing product categories with new values. When the update is processed, the merge strategy is used to apply changes to &#x60;scalar&#x60; and &#x60;object&#x60; type fields. The replace strategy is used to apply changes for fields in an &#x60;array&#x60;. 

### Example

```ts
import {
  Configuration,
  CategoriesApi,
} from '';
import type { UpdateCategoriesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CategoriesApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedCategoryUpdate> (optional)
    feedCategoryUpdate: [{"slug":"men/clothing","source":{"locale":"en-US"},"name":"Men's Apparel","families":["clothing","fashion"]}],
  } satisfies UpdateCategoriesRequest;

  try {
    const data = await api.updateCategories(body);
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
| **feedCategoryUpdate** | `Array<FeedCategoryUpdate>` |  | [Optional] |

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

