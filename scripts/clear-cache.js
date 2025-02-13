const https = require('https');

const domain = process.env.VERCEL_URL || 'your-domain.com'; // Replace with your actual domain
const token = process.env.REVALIDATE_TOKEN || 'irishlotto_cache_2025'; // Replace with your token

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
