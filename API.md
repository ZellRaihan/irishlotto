# Irish Lotto Results API Documentation

This document provides information about the API endpoints available in the Irish Lotto Results application.

## Base URL

For local development:
```
http://localhost:3000/api
```

For production:
```
https://your-domain.com/api
```

## Authentication

Some endpoints require authentication using a token. The token should be provided as a query parameter:

```
?token=your_token_here
```

The token value should match the `REVALIDATE_TOKEN` environment variable.

## CORS Support

The API supports Cross-Origin Resource Sharing (CORS), allowing it to be accessed from different domains. By default, the API allows requests from any origin (`*`), but this can be restricted by setting the `CORS_ORIGIN` environment variable.

The following CORS headers are included in all API responses:

```
Access-Control-Allow-Origin: * (or the value of CORS_ORIGIN)
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

The API also supports preflight requests with the OPTIONS method.

## Response Format

All API responses follow a standard format:

### Success Response

```json
{
  "success": true,
  "data": {...},  // or other relevant fields
  "timestamp": "2023-05-01T12:34:56.789Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message",
  "timestamp": "2023-05-01T12:34:56.789Z"
}
```

## Endpoints

### Get Lottery Results

Retrieves lottery results for a specific date.

```
GET /api/lottery?date=YYYY-MM-DD
```

#### Parameters

| Parameter | Type   | Required | Description                                |
|-----------|--------|----------|--------------------------------------------|
| date      | string | Yes      | The date of the lottery draw (YYYY-MM-DD)  |
| limit     | number | No       | Maximum number of results to return (default: 10) |

#### Success Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "2023-05-01",
      "drawDate": "2023-05-01T20:00:00.000Z",
      "mainDraw": {
        "gameType": "Main Draw",
        "jackpotAmount": 5000000,
        "winningNumbers": {
          "standard": [1, 2, 3, 4, 5, 6],
          "bonus": 7
        },
        "prizes": [...]
      },
      "plusOne": {...},
      "plusTwo": {...},
      "raffle": {...}
    }
  ],
  "timestamp": "2023-05-01T12:34:56.789Z"
}
```

#### Error Responses

- **400 Bad Request**: Missing required parameters
- **404 Not Found**: No results found for the specified date
- **500 Internal Server Error**: Server error

### Clear Cache

Clears the cache for specified tags or all results.

```
GET /api/clear-cache?token=your_token_here&tags=results,latest-results
```

#### Parameters

| Parameter | Type   | Required | Description                                |
|-----------|--------|----------|--------------------------------------------|
| token     | string | Yes      | Authentication token                       |
| tags      | string | No       | Comma-separated list of cache tags to clear |

#### Success Response

```json
{
  "success": true,
  "revalidated": true,
  "message": "Cache cleared for tags: results, latest-results",
  "tags": ["results", "latest-results"],
  "timestamp": "2023-05-01T12:34:56.789Z"
}
```

#### Error Responses

- **401 Unauthorized**: Invalid token
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Cache clearing failed

## Rate Limiting

The API implements rate limiting to prevent abuse. By default, the rate limit is:

- **Window**: 60 seconds
- **Max Requests**: 5 requests per window

When the rate limit is exceeded, the API returns a 429 Too Many Requests response with the following headers:

- **Retry-After**: Time in seconds to wait before making another request
- **X-RateLimit-Limit**: Maximum number of requests allowed per window
- **X-RateLimit-Remaining**: Number of requests remaining in the current window
- **X-RateLimit-Reset**: Timestamp when the rate limit will reset

## Cache Tags

The following cache tags are used in the application:

- **results**: All lottery results
- **latest-results**: Latest draw results
- **history-results**: Historical results
- **result-[date]**: Specific date results (e.g., result-2023-05-01)

## Error Codes

| Status Code | Description                                |
|-------------|--------------------------------------------|
| 200         | Success                                    |
| 400         | Bad Request - Missing or invalid parameters |
| 401         | Unauthorized - Invalid token               |
| 404         | Not Found - Resource not found             |
| 429         | Too Many Requests - Rate limit exceeded    |
| 500         | Internal Server Error - Server error       | 