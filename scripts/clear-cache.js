const https = require('https');

const domain = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'localhost:3000';
const token = process.env.REVALIDATE_TOKEN || 'irishlotto_cache_2025';

const url = `https://${domain}/api/clear-cache?token=${token}`;

https.get(url, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    console.log('Cache clearing response:', JSON.parse(data));
  });
}).on("error", (err) => {
  console.log("Error clearing cache:", err.message);
});
