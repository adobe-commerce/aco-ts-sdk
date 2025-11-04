# PricesApi

All URIs are relative to *https://na1-sandbox.api.commerce.adobe.com/string*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPrices**](PricesApi.md#createprices) | **POST** /v1/catalog/products/prices | Create prices |
| [**deletePrices**](PricesApi.md#deleteprices) | **POST** /v1/catalog/products/prices/delete | Delete prices |
| [**updatePrices**](PricesApi.md#updateprices) | **PATCH** /v1/catalog/products/prices | Update prices |



## createPrices

> ProcessFeedResponse createPrices(authorization, contentType, contentEncoding, feedPrices)

Create prices

Create or replace existing product prices with support for regular pricing, discounts, and tiered pricing.  &lt;h3&gt;Pricing structure&lt;/h3&gt;  Each price record can include:  * **Regular Price** - The base price for the product SKU * **Discounts** - Percentage or fixed amount discounts applied to the regular price * **Tiered Pricing** - Quantity-based pricing for bulk purchases  &lt;h3&gt;Discount configuration&lt;/h3&gt;  Discounts can be configured in two ways:  * **Fixed Amount Discounts** - Use &#x60;price&#x60; field to specify a fixed discount amount (e.g., 10.00 for $10 off) * **Percentage Discounts** - Use &#x60;percentage&#x60; field to specify a discount percentage (e.g., 20 for 20% off)  Each discount requires a unique &#x60;code&#x60; identifier to distinguish between different discount types.  &lt;h3&gt;Tiered pricing&lt;/h3&gt;  Tiered pricing offers different prices based on purchase quantity:  * **Tier Fixed Prices** - Use &#x60;price&#x60; field with &#x60;qty&#x60; to specify quantity-based fixed prices * **Tier Percentage Discounts** - Use &#x60;percentage&#x60; field with &#x60;qty&#x60; to specify quantity-based percentage discounts  Tier quantities must be greater than 1.  &lt;h3&gt;Pricing for configurable products&lt;/h3&gt; Because configurable product price is calculated based on the price of the selected product variant, you don\&#39;t need to send the price data for configurable product SKUs. Sending price data for these SKUs can cause incorrect price calculations. 

### Example

```ts
import {
  Configuration,
  PricesApi,
} from '';
import type { CreatePricesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PricesApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedPrices> (optional)
    feedPrices: [{"sku":"red-pants","priceBookId":"us","regular":20},{"sku":"red-pants","priceBookId":"dealer-north","regular":19.9,"discounts":[{"code":"seasonal_sale","percentage":10},{"code":"loyalty_discount","price":2.0}],"tierPrices":[{"qty":5,"percentage":15},{"qty":10,"price":15.0}]}],
  } satisfies CreatePricesRequest;

  try {
    const data = await api.createPrices(body);
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
| **feedPrices** | `Array<FeedPrices>` |  | [Optional] |

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


## deletePrices

> ProcessFeedResponse deletePrices(authorization, contentType, contentEncoding, feedPricesDelete)

Delete prices

Delete existing product prices 

### Example

```ts
import {
  Configuration,
  PricesApi,
} from '';
import type { DeletePricesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PricesApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedPricesDelete> (optional)
    feedPricesDelete: [{"sku":"red-pants","priceBookId":"dealer-north"}],
  } satisfies DeletePricesRequest;

  try {
    const data = await api.deletePrices(body);
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
| **feedPricesDelete** | `Array<FeedPricesDelete>` |  | [Optional] |

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


## updatePrices

> ProcessFeedResponse updatePrices(authorization, contentType, contentEncoding, feedPricesUpdate)

Update prices

Change existing product prices, discounts, and tiered pricing.  When the update is processed, the merge strategy is used to apply changes to &#x60;scalar&#x60; and &#x60;object&#x60; type fields.  For &#x60;array&#x60; type fields, a new value can be appended to the existing list. For an object list, you can update a specific object by matching on a key field. The following fields are supported: * &#x60;discounts&#x60; - match on &#x60;code&#x60; * &#x60;tierPrices&#x60; - match on &#x60;qty&#x60;  &lt;h3&gt;Update strategies&lt;/h3&gt;  * **Regular Price** - Updated using merge strategy * **Discounts Array** - Updated using the append or merge strategy * **Tiered Pricing Array** - Updated using the append or merge strategy  &lt;h3&gt;Discount and tier pricing updates&lt;/h3&gt;  When updating discounts or tiered pricing:  * Include all desired discounts/tiers in the array * The entire array replaces the existing configuration * To remove all discounts/tiers, send an empty array * To add new discounts/tiers, include both existing and new items  &lt;h3&gt;Best practices&lt;/h3&gt;  * Always include the complete array of discounts/tiers when updating * Use descriptive discount codes for easier management * Ensure tier quantities are in ascending order * Test updates in a development environment first 

### Example

```ts
import {
  Configuration,
  PricesApi,
} from '';
import type { UpdatePricesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PricesApi();

  const body = {
    // string
    authorization: authorization_example,
    // 'application/json'
    contentType: contentType_example,
    // 'gzip' | Use this header if the payload is compressed with gzip. (optional)
    contentEncoding: contentEncoding_example,
    // Array<FeedPricesUpdate> (optional)
    feedPricesUpdate: [{"sku":"red-pants","priceBookId":"dealer-north","discounts":[{"code":"seasonal_sale","percentage":30},{"code":"holiday_sale","price":5.0}],"tierPrices":[{"qty":5,"percentage":20},{"qty":20,"price":13}]}],
  } satisfies UpdatePricesRequest;

  try {
    const data = await api.updatePrices(body);
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
| **feedPricesUpdate** | `Array<FeedPricesUpdate>` |  | [Optional] |

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

