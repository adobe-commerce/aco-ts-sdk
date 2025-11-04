# PriceBooksApi

All URIs are relative to *https://na1-sandbox.api.commerce.adobe.com/string*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPriceBooks**](PriceBooksApi.md#createpricebooks) | **POST** /v1/catalog/price-books | Create price books |
| [**deletePriceBooks**](PriceBooksApi.md#deletepricebooks) | **POST** /v1/catalog/price-books/delete | Delete price books |
| [**updatePriceBooks**](PriceBooksApi.md#updatepricebooks) | **PATCH** /v1/catalog/price-books | Update price books |



## createPriceBooks

> ProcessFeedResponse createPriceBooks(contentType, authorization, contentEncoding, feedPricebook)

Create price books

Create or replace existing price books with support for hierarchical pricing structures.  &lt;h3&gt;Creating Base Price Books&lt;/h3&gt;  Base price books are the foundation of your pricing hierarchy:  * **Required Fields**: &#x60;priceBookId&#x60;, &#x60;name&#x60;, &#x60;currency&#x60; * **Currency Definition**: Sets the currency for the entire branch of child price books * **No Parent**: Base price books cannot reference a parent price book * **Unique ID**: Must have a unique &#x60;priceBookId&#x60; across all price books  &lt;h3&gt;Creating Child Price Books&lt;/h3&gt;  Child price books inherit from their parent and can extend the hierarchy:  * **Required Fields**: &#x60;priceBookId&#x60;, &#x60;name&#x60;, &#x60;parentId&#x60; * **Parent Reference**: Must reference an existing parent price book * **Currency Inheritance**: Automatically inherits currency from parent * **Hierarchy Depth**: Can create up to 3 levels of nesting  &lt;h3&gt;Hierarchy Management&lt;/h3&gt;  * **Parent Assignment**: Once a &#x60;parentId&#x60; is assigned, it cannot be changed via update operations * **Restructuring**: To change parent-child relationships, delete and recreate the child price book * **Validation**: The system validates parent references and hierarchy depth limits  Use the [update price books operation](#operation/updatePriceBooks) to modify existing price book names or base price book currencies. 

### Example

```ts
import {
  Configuration,
  PriceBooksApi,
} from '';
import type { CreatePriceBooksRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PriceBooksApi();

  const body = {
    // 'application/json'
    contentType: contentType_example,
    // string
    authorization: authorization_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedPricebook> (optional)
    feedPricebook: [{"priceBookId":"us","name":"US Base Price Book","currency":"USD"},{"priceBookId":"us-north","parentId":"us","name":"US North Region"},{"priceBookId":"us-south","parentId":"us","name":"US South Region"},{"priceBookId":"us-north-east","parentId":"us-north","name":"US Northeast Territory"},{"priceBookId":"us-north-west","parentId":"us-north","name":"US Northwest Territory"}],
  } satisfies CreatePriceBooksRequest;

  try {
    const data = await api.createPriceBooks(body);
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
| **contentType** | `application/json` |  | [Defaults to `undefined`] [Enum: application/json] |
| **authorization** | `string` |  | [Defaults to `undefined`] |
| **contentEncoding** | `gzip` | Use this header if the payload is compressed with gzip. | [Optional] [Defaults to `undefined`] [Enum: gzip] |
| **feedPricebook** | `Array<FeedPricebook>` |  | [Optional] |

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
| **200** | All items in the request are accepted for further processing. |  -  |
| **400** | Request rejected. Some of the received items are invalid. Check the \&quot;invalidFeedItems\&quot; node for specific errors. |  -  |
| **401** | Unauthorized request. Verify that the Bearer token provided in the &#x60;Authorization&#x60; header is still valid. |  -  |
| **403** | Forbidden request. Verify that the &#x60;Authorization&#x60; header is present, and that the Bearer token is still valid. |  -  |
| **429** | Too many requests. Indicates that a client has exceeded the rate limit of 300 requests per minute. Check the &#x60;retry-after&#x60; header to get the time (in seconds) to wait before sending the next request.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deletePriceBooks

> ProcessFeedResponse deletePriceBooks(contentType, authorization, contentEncoding, feedPriceBookDelete)

Delete price books

Delete price books and their associated pricing data with cascading effects on the hierarchy.  &lt;h3&gt;Cascading Deletion&lt;/h3&gt;  When you delete a price book: * **Child Price Books**: All child price books in the hierarchy are automatically deleted * **Associated Prices**: All prices assigned to the deleted price book and its children are removed * **Hierarchy Impact**: The entire branch below the deleted price book is removed  &lt;h3&gt;Deletion Scenarios&lt;/h3&gt;  * **Base Price Book**: Deletes entire pricing hierarchy and all associated prices * **Child Price Book**: Deletes the specific price book and its children, but preserves sibling price books * **Leaf Price Book**: Deletes only the specified price book and its associated prices  &lt;h3&gt;Recovery Options&lt;/h3&gt;  If a price book is deleted by mistake: * **Time Window**: You have up to one week to restore deleted price books * **Restoration Method**: Recreate the top-level parent price book using the original create payload * **State Recovery**: Price books and prices are restored to their state when deleted * **Hierarchy Reconstruction**: The entire hierarchy is rebuilt from the restoration payload  &lt;h3&gt;Best Practices&lt;/h3&gt;  * **Backup Strategy**: Keep copies of price book configurations for recovery * **Validation**: Verify hierarchy structure before deletion * **Impact Assessment**: Review associated prices before deleting price books 

### Example

```ts
import {
  Configuration,
  PriceBooksApi,
} from '';
import type { DeletePriceBooksRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PriceBooksApi();

  const body = {
    // 'application/json'
    contentType: contentType_example,
    // string
    authorization: authorization_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedPriceBookDelete> (optional)
    feedPriceBookDelete: [{"priceBookId":"dealer-north"}],
  } satisfies DeletePriceBooksRequest;

  try {
    const data = await api.deletePriceBooks(body);
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
| **contentType** | `application/json` |  | [Defaults to `undefined`] [Enum: application/json] |
| **authorization** | `string` |  | [Defaults to `undefined`] |
| **contentEncoding** | `gzip` | Use this header if the payload is compressed with gzip. | [Optional] [Defaults to `undefined`] [Enum: gzip] |
| **feedPriceBookDelete** | `Array<FeedPriceBookDelete>` |  | [Optional] |

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
| **200** | All items in the request are accepted for further processing. |  -  |
| **400** | Request rejected. Some of the received items are invalid. Check the \&quot;invalidFeedItems\&quot; node for specific errors. |  -  |
| **401** | Unauthorized request. Verify that the Bearer token provided in the &#x60;Authorization&#x60; header is still valid. |  -  |
| **403** | Forbidden request. Verify that the &#x60;Authorization&#x60; header is present, and that the Bearer token is still valid. |  -  |
| **429** | Too many requests. Indicates that a client has exceeded the rate limit of 300 requests per minute. Check the &#x60;retry-after&#x60; header to get the time (in seconds) to wait before sending the next request.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updatePriceBooks

> ProcessFeedResponse updatePriceBooks(contentType, authorization, contentEncoding, feedPricebook)

Update price books

Update existing price books with limitations on hierarchical changes.  &lt;h3&gt;Updatable Fields&lt;/h3&gt;  * **Name**: Can be updated for both base and child price books * **Currency**: Can only be updated for base price books (affects entire hierarchy) * **Parent ID**: Cannot be updated - use delete and recreate to change hierarchy  &lt;h3&gt;Update Restrictions&lt;/h3&gt;  * **Parent Assignment**: Cannot change &#x60;parentId&#x60; via update operations * **Hierarchy Changes**: To restructure the hierarchy, delete and recreate child price books * **Currency Inheritance**: Child price books automatically inherit currency changes from parent * **Validation**: System validates that &#x60;parentId&#x60; references exist and hierarchy depth is maintained  &lt;h3&gt;Update Strategies&lt;/h3&gt;  * **Base Price Books**: Update name and currency as needed * **Child Price Books**: Include correct &#x60;parentId&#x60; in request (will be ignored if different) * **Hierarchy Restructuring**: Delete child price book and recreate with new parent reference 

### Example

```ts
import {
  Configuration,
  PriceBooksApi,
} from '';
import type { UpdatePriceBooksRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PriceBooksApi();

  const body = {
    // 'application/json'
    contentType: contentType_example,
    // string
    authorization: authorization_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedPricebook> (optional)
    feedPricebook: [{"priceBookId":"dealer-north","parentId":"us","name":"North dealership"}],
  } satisfies UpdatePriceBooksRequest;

  try {
    const data = await api.updatePriceBooks(body);
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
| **contentType** | `application/json` |  | [Defaults to `undefined`] [Enum: application/json] |
| **authorization** | `string` |  | [Defaults to `undefined`] |
| **contentEncoding** | `gzip` | Use this header if the payload is compressed with gzip. | [Optional] [Defaults to `undefined`] [Enum: gzip] |
| **feedPricebook** | `Array<FeedPricebook>` |  | [Optional] |

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
| **200** | All items in the request are accepted for further processing. |  -  |
| **400** | Request rejected. Some of the received items are invalid. Check the &#x60;invalidFeedItems&#x60; node for specific errors. |  -  |
| **401** | Unauthorized request. Verify that the Bearer token provided in the &#x60;Authorization&#x60; header is still valid. |  -  |
| **403** | Forbidden request. Verify that the &#x60;Authorization&#x60; header is present, and that the Bearer token is still valid. |  -  |
| **429** | Too many requests. Indicates that a client has exceeded the rate limit of 300 requests per minute. Check the &#x60;retry-after&#x60; header to get the time (in seconds) to wait before sending the next request.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

