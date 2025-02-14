const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

const SOURCE_IMAGE = path.join(__dirname, '../public/Irish Lotto Results.webp');
const OUTPUT_DIR = path.join(__dirname, '../public');

const ICONS = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'og-image.jpg', width: 1200, height: 630 },
];

async function generateIcons() {
  try {
    // Read the source image
    const sourceBuffer = await fs.readFile(SOURCE_IMAGE);

    // Generate each icon
    for (const icon of ICONS) {
      const outputPath = path.join(OUTPUT_DIR, icon.name);
      let transform = sharp(sourceBuffer);

      // Special handling for OG image
      if (icon.width && icon.height) {
        transform = transform
          .resize(icon.width, icon.height, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          });
      } else {
        transform = transform
          .resize(icon.size, icon.size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 1 }
          });
      }

      // Convert to appropriate format
      if (icon.name.endsWith('.jpg')) {
        transform = transform.toFormat('jpeg', { quality: 90 });
      } else {
        transform = transform.toFormat('png');
      }

      await transform.toFile(outputPath);
      console.log(`Generated: ${icon.name}`);
    }

    // Generate favicon.ico from the 32x32 PNG
    const favicon32Buffer = await fs.readFile(path.join(OUTPUT_DIR, 'favicon-32x32.png'));
    await fs.copyFile(
      path.join(OUTPUT_DIR, 'favicon-32x32.png'),
      path.join(OUTPUT_DIR, 'favicon.ico')
    );
    console.log('Generated: favicon.ico');

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
