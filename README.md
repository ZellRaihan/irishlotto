# Irish Lotto Results

A modern, responsive web application built with Next.js 14 that displays Irish Lotto results, including the main draw, Plus 1, Plus 2, and raffle results.

## Features

- 🎯 Real-time lottery results display
- 📱 Fully responsive design for all devices
- 🔍 SEO optimized with meta tags and structured data
- ⚡ Fast loading with skeleton states
- 📅 Historical results with date navigation
- 💰 Detailed prize breakdowns
- 🎲 Raffle results
- 🌙 Smooth animations and transitions
- ♿ Accessibility focused with ARIA labels
- 🔄 Automatic updates for latest results

## Security Improvements

The application has been enhanced with several security improvements:

1. **Secure Environment Variables**: Sensitive credentials are stored in environment variables and not committed to version control.
2. **MongoDB Connection Security**: Improved connection handling with retry logic and proper error handling.
3. **Cache Token Validation**: Implemented secure token validation using constant-time comparison to prevent timing attacks.
4. **Rate Limiting**: Added rate limiting to the cache clearing API to prevent abuse.
5. **Input Validation**: Added validation for cache tag inputs to prevent arbitrary tag revalidation.
6. **CORS Support**: Implemented proper CORS headers with configurable origin restrictions.

## Performance Optimizations

Several performance optimizations have been implemented:

1. **Connection Pooling**: MongoDB connection pooling has been configured for better performance.
2. **Pagination**: Added pagination for large result sets to improve loading times.
3. **Error Handling**: Comprehensive error handling with fallbacks for when data is unavailable.
4. **Cache Management**: Improved cache management with configurable TTL and validation.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org)
- **Database**: [MongoDB](https://www.mongodb.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Deployment**: [Vercel](https://vercel.com)
- **Icons**: [Lucide Icons](https://lucide.dev)
- **Date Handling**: [date-fns](https://date-fns.org)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB database

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster-url]/lottery?retryWrites=true&w=majority
REVALIDATE_TOKEN=your_secure_token_here
CACHE_TTL=3600
DB_NAME=lottery
RATE_LIMIT_WINDOW=60
MAX_REQUESTS_PER_WINDOW=5
DISABLE_RATE_LIMIT=false
CORS_ORIGIN=*
```

Replace `[username]`, `[password]`, and `[cluster-url]` with your MongoDB credentials.

- `MONGODB_URI`: Your MongoDB connection string
- `REVALIDATE_TOKEN`: A secure token for cache revalidation
- `CACHE_TTL`: Cache time-to-live in seconds (default: 3600 = 1 hour)
- `DB_NAME`: MongoDB database name (default: lottery)
- `RATE_LIMIT_WINDOW`: Time window for rate limiting in seconds (default: 60)
- `MAX_REQUESTS_PER_WINDOW`: Maximum number of requests allowed per window (default: 5)
- `DISABLE_RATE_LIMIT`: Set to 'true' to disable rate limiting in development (default: false)
- `CORS_ORIGIN`: Allowed origins for CORS (default: * for all origins)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ZellRaihan/irishlotto.git
```

2. Install dependencies:
```bash
cd irishlotto
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

- `/app` - Next.js 14 app directory with route handlers and pages
- `/components` - Reusable UI components
- `/lib` - Database and utility functions
- `/public` - Static assets
- `/utils` - Helper functions and formatters

## Cache Management

The application uses Next.js's caching system to optimize performance. By default, lottery results are cached for 1 hour (configurable via `CACHE_TTL` environment variable).

### Cache Tags

- `results` - All lottery results
- `latest-results` - Latest draw results
- `history-results` - Historical results
- `result-[date]` - Specific date results

### Clear Cache Endpoint

The application provides an API endpoint to clear the cache. For detailed API documentation, see [API.md](API.md).

```
GET /api/clear-cache?token=[REVALIDATE_TOKEN]&tags=results,latest-results
```

#### Parameters:

- `token` (required): Security token matching `REVALIDATE_TOKEN` environment variable
- `tags` (optional): Comma-separated list of cache tags to clear. If not provided, all result-related caches will be cleared.

#### Example Response:

```json
{
  "revalidated": true,
  "message": "Cache cleared for tags: results, latest-results",
  "timestamp": "2023-05-01T12:34:56.789Z"
}
```

#### Error Responses:

- `401 Unauthorized`: Invalid token
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Cache clearing failed

## Error Handling

The application includes comprehensive error handling:

1. **Database Connection Errors**: Fallback data is displayed when the database is unavailable.
2. **API Errors**: Proper error responses with status codes.
3. **Rate Limiting**: Protection against excessive API requests.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- Raihan ([GitHub](https://github.com/ZellRaihan))

## Acknowledgments

- Irish National Lottery for the data
- Next.js team for the amazing framework
- Vercel for hosting