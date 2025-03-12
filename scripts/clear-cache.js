const https = require('https');
const http = require('http');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env and .env.local if they exist
try {
  const envPath = path.resolve(process.cwd(), '.env');
  const envLocalPath = path.resolve(process.cwd(), '.env.local');
  
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
  
  if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
  }
} catch (error) {
  console.error('Error loading environment variables:', error);
}

// Get domain from environment variables or use localhost as fallback
const domain = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'localhost:3000';
const token = process.env.REVALIDATE_TOKEN;

if (!token) {
  console.error('Error: REVALIDATE_TOKEN is not defined in environment variables');
  process.exit(1);
}

// Determine if we should use HTTPS or HTTP based on the domain
const isLocalhost = domain.includes('localhost') || domain.includes('127.0.0.1');
const protocol = isLocalhost ? 'http' : 'https';
const url = `${protocol}://${domain}/api/clear-cache?token=${token}`;

console.log(`Clearing cache at: ${url}`);

// Choose the appropriate request module based on protocol
const requestModule = protocol === 'https' ? https : http;

// Set a timeout for the request
const requestOptions = {
  timeout: 10000, // 10 seconds timeout
};

const req = requestModule.get(url, requestOptions, (resp) => {
  let data = '';

  // A chunk of data has been received
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received
  resp.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      
      if (resp.statusCode >= 200 && resp.statusCode < 300) {
        console.log('✅ Cache cleared successfully:', parsedData);
      } else {
        console.error(`❌ Error clearing cache (Status ${resp.statusCode}):`, parsedData);
      }
    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      console.log('Raw response:', data);
    }
  });
});

// Handle request errors
req.on('error', (err) => {
  console.error('❌ Error clearing cache:', err.message);
  
  if (err.code === 'ECONNREFUSED' && isLocalhost) {
    console.log('💡 Tip: Make sure your local development server is running on port 3000');
  }
});

// Handle timeout
req.on('timeout', () => {
  console.error('❌ Request timed out after 10 seconds');
  req.destroy();
});
